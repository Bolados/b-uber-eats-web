import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Resource } from '@lagoshny/ngx-hal-client';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export enum DatastoreDialogType {
    UPDATE = 'Update',
    SAVE = 'Create New',
    DETAILS = 'Details of'
}

export interface DatastoreDialogInputData<T extends Resource> {
    title: string;
    kind: DatastoreDialogType;
    data: T;
    tableDefinition: any;
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
        this.dialogRef.backdropClick().subscribe(_ => {
            this.close();
        });
        if (data && data.tableDefinition) {
            const config = {};
            data.tableDefinition.forEach(element => {
                let start = '';
                if (data.kind !== DatastoreDialogType.SAVE) {
                    start = data.data[element.columnDef];
                }
                config[element.columnDef] = element.field.control(start);
                if (data.kind === DatastoreDialogType.DETAILS) {
                    config[element.columnDef] = element.field.control(start, true);
                }

            });
            this.formGroup = this.formBuilder.group(config);
        }

    }

    ngOnInit() {
    }

    getErrorMessage(errorDefinition: any, formControl: FormControl) {
        for (const key in errorDefinition) {
            if (errorDefinition.hasOwnProperty(key) && formControl.hasError(key)) {
                return errorDefinition[key];
            }
        }
        return null;
    }

    alertClose() {
        let alert = false;
        this.data.tableDefinition.forEach(element => {
            const current: string = this.data.data[element.columnDef];
            const formData: string = this.formGroup.value[element.columnDef];
            if ( this.isUpdateDialog() && current && formData && current.trim() !== formData.trim()) {
                alert = true;
            }
            if (this.isSaveDialog() && !current && formData) {
                alert = true;
            }
        });
        return alert;
    }

    save(value) {
        this.data.data = value;
    }


    submit() {
    }

    isSaveDialog(){
        return this.data.kind === DatastoreDialogType.SAVE;
    }

    isUpdateDialog(){
        return this.data.kind === DatastoreDialogType.UPDATE;
    }

    isDetailsDialog(){
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
