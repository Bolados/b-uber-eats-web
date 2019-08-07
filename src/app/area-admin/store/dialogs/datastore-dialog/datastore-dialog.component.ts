import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Resource} from '@lagoshny/ngx-hal-client';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TableDefinition} from '../../models';

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
}

@Component({
  selector: 'app-datastore-dialog',
  templateUrl: './datastore-dialog.component.html',
  styleUrls: ['./datastore-dialog.component.scss']
})
export class DatastoreDialogComponent implements OnInit {

    private canClose = false;

    formGroup: FormGroup;

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
            data.tableDefinition.table.forEach(field => {
                let start = '';
                if (data.kind !== DatastoreDialogType.SAVE) {
                    start = data.data[field.def];
                }
                config[field.def] = field.el.control(start);
                if (data.kind === DatastoreDialogType.DETAILS) {
                    config[field.def] = field.el.control(start, true);
                }

            });
            this.formGroup = this.formBuilder.group(config);
        }
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
                const current: string = this.data.data[field.def];
                const formData: string = this.formGroup.value[field.def];
                if (this.isUpdateDialog() && current && formData && current.trim() !== formData.trim()) {
                    alert = true;
                }
                if (this.isSaveDialog() && !current && formData) {
                    alert = true;
                }
            });
        }
        return alert;
    }

    send(value) {
        if (this.isUpdateDialog()) {
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    this.data.data[key] = value[key];
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
