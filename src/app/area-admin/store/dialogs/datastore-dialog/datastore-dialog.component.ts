import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Resource} from '@lagoshny/ngx-hal-client';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TableDefinition, FieldDefinition, validatorsOf, FieldElementDefinitionType, MetaEntity, RelatedFieldDefinition} from '../../models';

export enum DatastoreDialogType {
    UPDATE = 'Update',
    SAVE = 'Create New',
    DETAILS = 'Details of'
}

export interface DatastoreDialogInputData<T extends Resource> {
    title: string;
    kind: DatastoreDialogType;
    data: T;
    tableDefinition: TableDefinition<T>;
    relatedData: Array<RelatedData>;
}

export interface RelatedData {
    name: string;
    data: Array<any>;
}

@Component({
  selector: 'app-datastore-dialog',
  templateUrl: './datastore-dialog.component.html',
  styleUrls: ['./datastore-dialog.component.scss']
})
export class DatastoreDialogComponent implements OnInit {

    private canClose = false;

    formGroup: FormGroup;

    private storage = [];

    constructor(
        public dialogRef: MatDialogRef<DatastoreDialogComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: DatastoreDialogInputData<any>
    ) {
        this.dialogRef.disableClose = true;
        this.dialogRef.backdropClick().subscribe(() => {
            this.close();
        });
        console.log('receive data :' , data.data);
        if (data && data.tableDefinition && data.tableDefinition.table && data.tableDefinition.table.length > 1) {
            const config = {};
            data.tableDefinition.table.forEach( field => {
                let start = '';
                if (data.kind !== DatastoreDialogType.SAVE) {
                    if (field.related) {
                        start = data.data[field.def][field.related.field];
                    } else {
                        start = data.data[field.def];
                    }
                }
                console.log(data.kind, field.def, start, this.validators(field));
                config[field.def] = field.el.control(start, this.validators(field));
                if (data.kind === DatastoreDialogType.DETAILS) {
                    config[field.def] = field.el.control(start, this.validators(field), true);
                }

            });
            this.formGroup = this.formBuilder.group(config);
        }
    }

    isRequiredField(validators: Array<ValidatorFn>) {
        let required = false;
        if (validators) {
            validators.forEach(v => {
                if (v === Validators.required) {
                    required = true;
                }
            });
        }

        return required;
    }

    relationsData(fieldDef: string) {
        let values: Array<any> = [];
        if ( this.data && this.data.relatedData) {
            this.data.relatedData.forEach(rel => {
                if (rel.name === fieldDef) {
                   values = rel.data;
                }
            });
        }
        return values;
    }

    validators(field: FieldDefinition<any>): Array<ValidatorFn> | false {
        const def = 'validators';
        let validators: Array<ValidatorFn> | false = false;
        if (field && field.el && this.isSaveDialog()) {
            validators = validatorsOf(FieldElementDefinitionType.add, field.el);
        }
        if (field && field.el && this.isUpdateDialog()) {
            validators = validatorsOf(FieldElementDefinitionType.update, field.el);
        }
        if (field && field.el && this.isDetailsDialog()) {
            validators = validatorsOf(FieldElementDefinitionType.details, field.el);
        }
        return validators;
    }

    ngOnInit() {
    }

    getErrorMessage(errorDefinition: any, fieldDef: string) {
        for (const key in errorDefinition) {
            if (errorDefinition.hasOwnProperty(key) && this.formGroup.get(fieldDef).hasError(key)) {
                return errorDefinition[key];
            }
        }
        return null;
    }

    alertClose() {
        let alert = false;
        if (this.data && this.data.tableDefinition && this.data.tableDefinition.table) {
            this.data.tableDefinition.table.forEach(field => {

                if (field.def !== MetaEntity.idDef) {
                    let current: string = this.data.data[field.def];
                    const formData: string = this.formGroup.value[field.def];
                    if (this.isUpdateDialog() && current ) {
                        if (field.related && current) {
                            current = current[field.related.field];
                        }
                        console.log('compare', field.def, current, formData);
                        if (current !== formData) {
                            alert = true;
                        }
                    }
                    if (this.isSaveDialog() && !current && formData) {
                        alert = true;
                    }
                }
            });
        }
        return alert;
    }

    relatedFieldsOf(tableDefinition: TableDefinition<any>): RelatedFieldDefinition[] {
        const relatedFields: RelatedFieldDefinition[] = [];
        if (tableDefinition && tableDefinition.table && tableDefinition.table.length > 1) {
            tableDefinition.table.forEach( field => {
                if (field.related) {
                    relatedFields.push(field.related);
                }
            });
        }
        return relatedFields;
    }

    hasRelatedFields(tableDefinition: TableDefinition<any>): boolean {
        return (this.relatedFieldsOf(tableDefinition).length > 0);
    }

    resolveRelation(relation: RelatedFieldDefinition, value: string): any {
        if (relation && value) {
            const relatedData = this.relationsData(relation.name);
            const found = relatedData.filter(data => {
                const relatedValue: string = data[relation.field];
                return  relatedValue.toLowerCase() === value.toLowerCase();
            });
            if (found.length === 1) {
                return found[0];
            }
        }
        return value;
    }

    send(value) {
        if (this.isUpdateDialog()) {
            const relatedFiels: RelatedFieldDefinition[] = this.relatedFieldsOf(this.data.tableDefinition);
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    const found = relatedFiels.filter(f => f.name === key );
                    if (found.length === 1) {
                        const resolved = this.resolveRelation(found[0], value[key]);
                        this.data.data[key] = resolved;
                    } else {
                        this.data.data[key] = value[key];
                    }
                }
            }
        }

        if (this.isSaveDialog()) {
            this.data.data = value;
        }

        console.log('form data: ', value);
        console.log('send ', this.data.kind, ' data: ', this.data.data);
    }


    submit(value) {
        if (this.formGroup.valid) {
            this.send(value);
        }
    }

    isSaveDialog() {
        return this.data.kind === DatastoreDialogType.SAVE;
    }

    isUpdateDialog() {
        return this.data.kind === DatastoreDialogType.UPDATE;
    }

    isDetailsDialog() {
        return this.data.kind === DatastoreDialogType.DETAILS;
    }

    @HostListener('window:keyup.esc')
    close() {
        if (this.alertClose()) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'We started edit data, once you close it, you will not be able to recover it!',
                type: 'warning',
                showConfirmButton: true,
                showCancelButton: true
            })
            .then((close) => {
                if (close.value) {
                    this.data.data = null;
                    this.dialogRef.close();
                }
            });
        } else {
            this.data.data = null;
            this.dialogRef.close();
        }

    }

    @HostListener('window:beforeunload', ['$event'])
    unloadHandler(event: Event) {
        //   event.returnValue = false;
    }

}
