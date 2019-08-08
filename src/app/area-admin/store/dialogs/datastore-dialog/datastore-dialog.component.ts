import {ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import {Resource} from '@lagoshny/ngx-hal-client';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {
    FieldDefinition,
    FieldElementDefinitionType,
    FieldTypeDefinition,
    FieldTypeDefinitionEnum,
    MetaEntity,
    RelatedFieldDefinition,
    TableDefinition,
    validatorsOf
} from '../../models';
import {DatastoreActionInputDataConverter} from '../../components/datastore-actions/datastore-actions.component';
import {Overlay} from '@angular/cdk/overlay';
import {RelatedStore} from '../../components/datastore';
import {DatastoreService} from '../../services';
import {DatastoreDialogHelpers} from './datastore-dialog.helpers';

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
    entity: new () => any;
    adapter?: (item: any) => any;
    tableDefinition: TableDefinition<any>;
    relatedStore?: Array<RelatedStore<any>>;
    datastore: DatastoreService<any>;
}

// const ACTIONS_BUTTONS = {
//     display: {
//         all: true
//     },
//     callback: {
//         add: DatastoreHelpers.Add,
//         edit: DatastoreHelpers.Edit,
//         delete: DatastoreHelpers.Delete,
//         details: DatastoreHelpers.Details,
//     },
//     data: (component: any, data: any) => DatastoreActionInputDataConverter(component, data)
// };

@Component({
    selector: 'app-datastore-dialog',
    templateUrl: './datastore-dialog.component.html',
    styleUrls: ['./datastore-dialog.component.scss']
})
export class DatastoreDialogComponent implements OnInit {


    private canClose = false;

    childDialogRef = null;
    childRelatedData: Array<RelatedData> = [];
    actionsButtons = {
        display: {
            all: true
        },
        callback: {
            add: DatastoreDialogHelpers.Add,
            edit: DatastoreDialogHelpers.Edit,
            delete: DatastoreDialogHelpers.Delete,
            details: DatastoreDialogHelpers.Details,
        },
        data: (data: any) => DatastoreActionInputDataConverter(this, data)
    };

    formGroup: FormGroup;
    fieldType = FieldTypeDefinitionEnum;
    private date = new Date();

    constructor(
        private cdr: ChangeDetectorRef,
        public childDialog: MatDialog,
        public  overlay: Overlay,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DatastoreDialogComponent>,
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

        if (this.data.relatedData) {
            console.log('easy loading child datastore');
            this.data.relatedData.forEach(relData => {
                // subscription for change data
                relData.datastore.data.subscribe((values: Array<any>) => {
                    console.log('subscription');
                    relData.data = values;
                });
                // load child store if exist
                if (relData && relData.relatedStore) {
                    relData.relatedStore.forEach(relStore => {
                        if (relStore && relStore.datastore) {
                            relStore.datastore.data.subscribe((values: Array<any>) => {
                                console.log('subscribe datastore', relData.name, relStore.name, values);
                                const childRelData: RelatedData = {
                                    name: relStore.name,
                                    data: values,
                                    entity: relStore.entity,
                                    tableDefinition: relStore.tableDefinition,
                                    relatedStore: relStore.subRelatedStore,
                                    datastore: relStore.datastore
                                };
                                const foundIndex = this.childRelatedData.findIndex(x => x.name === childRelData.name);
                                this.childRelatedData.splice(foundIndex, 1);
                                this.childRelatedData.push(childRelData);
                            });
                            relStore.datastore.initData();
                        }

                    });
                }
            });
        }
    }

    isSelected(fieldName: string) {
        return !(this.formGroup && this.formGroup.value
            && this.formGroup.value[fieldName]
            && this.formGroup.value[fieldName].id
        );
    }

    buildActionData(relation: RelatedFieldDefinition, fieldName: string): RelatedData {
        const relatedData: RelatedData = this.relatedData(relation.name);
        const name = relation.name;
        let entity = null;
        let datastore = null;
        let adapter = null;
        let tableDefinition = null;
        let data = null;
        if (relatedData) {
            entity = relatedData.entity;
            tableDefinition = relatedData.tableDefinition;
            adapter = relatedData.adapter;
            data = this.formGroup.value[fieldName];
            datastore = relatedData.datastore;
        }
        return {
            name,
            entity,
            adapter,
            tableDefinition,
            data,
            relatedStore: relatedData.relatedStore,
            datastore
        };
    }

    // storage

    save = (datastore: DatastoreService<any>, data: any, adapter: (item: any) => any) => DatastoreDialogHelpers
        .Save(datastore, data, adapter);

    update = (datastore: DatastoreService<any>, data: any, adapter: (item: any) => any) => DatastoreDialogHelpers
        .Update(datastore, data, adapter);

    remove = (datastore: DatastoreService<any>, data: any) => DatastoreDialogHelpers
        .Remove(datastore, data);

    refreshForDelete(receivedData: RelatedData) {
        this.formGroup.value[receivedData.name] = null;
        this.date = new Date();
        this.cdr.detectChanges();
        console.log('refresh data', this.data.relatedData);
    }

    refresh(receivedData: RelatedData) {

    }

    // actions
    add = (receivedData: RelatedData) => DatastoreDialogHelpers.Add(this, receivedData);
    details = (receivedData: RelatedData) => DatastoreDialogHelpers.Details(this, receivedData);
    delete = (receivedData: RelatedData) => DatastoreDialogHelpers.Delete(this, receivedData);
    edit = (receivedData: RelatedData) => DatastoreDialogHelpers.Edit(this, receivedData);


    el(field: FieldDefinition<any>): FieldTypeDefinition {

        if (this.isSaveDialog() && field && field.el && field.el.add) {
            return field.el.add;
        }
        if (this.isUpdateDialog() && field && field.el && field.el.update) {
            return field.el.update;
        }
        if (this.isDetailsDialog() && field && field.el && field.el.details) {
            return field.el.details;
        }
        return null;
    }

    isRequiredField(validators: Array<ValidatorFn> | false): boolean {
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

    relatedData(fieldDef: string) {
        if (this.data && this.data.relatedData) {
            const relations = this.data.relatedData.filter(rel => (rel.name === fieldDef));
            if (relations.length === 1) {
                return relations[0];
            }
        }
        return null;
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
                text: 'We started Edit data, once you close it, you will not be able to recover it!',
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
