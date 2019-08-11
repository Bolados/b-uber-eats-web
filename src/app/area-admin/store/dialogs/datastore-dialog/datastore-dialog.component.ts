import {ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {
    FieldDefinition,
    FieldElementDefinitionType,
    FieldTypeDefinition,
    FieldTypeDefinitionEnum,
    FileFile,
    MetaEntity,
    RelatedFieldDefinition,
    validatorsOf
} from '../../models';
import {Overlay} from '@angular/cdk/overlay';
import {DatastoreService} from '../../services';
import {
    DatastoreActionInputDataConverter,
    DatastoreActionsInputDisabled
} from '../../components/datastore-actions/datastore-actions.component';
import {DatastoreDialogInputData, DatastoreDialogType, RelatedData} from './datastore-dialog.models';
import {DatastoreDialogStorageHelpers} from './datastore-dialog-storage.helpers';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'app-datastore-dialog',
    templateUrl: './datastore-dialog.component.html',
    styleUrls: ['./datastore-dialog.component.scss']
})
export class DatastoreDialogComponent implements OnInit {

    file: NgxFileDropEntry = null;


    childDialogRef = null;
    childRelatedData: Array<RelatedData> = [];
    actionsButtons = {
        display: {
            all: true
        },
        disabled: {
            add: true,
            edit: true,
            details: false,
            delete: true,
        },
        callback: {
            add: DatastoreDialogComponent.Add,
            edit: DatastoreDialogComponent.Edit,
            delete: DatastoreDialogComponent.Delete,
            details: DatastoreDialogComponent.Details,
        },
        data: (data: any) => DatastoreActionInputDataConverter(this, data)
    };
    formGroup: FormGroup;
    fieldType = FieldTypeDefinitionEnum;
    private canClose = false;
    private date = new Date();
    previewImage: any = 'none';

    constructor(
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        public childDialog: MatDialog,
        public  overlay: Overlay,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DatastoreDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DatastoreDialogInputData<any>
    ) {
        this.dialogRef.disableClose = true;
        this.dialogRef.backdropClick().subscribe(() => {
            this.close(null);
        });
        console.log('receive data :', data);
        if (data && data.data && data.tableDefinition && data.tableDefinition.table && data.tableDefinition.table.length > 1) {
            const config = {};
            data.tableDefinition.table.forEach( field => {
                let start = '';
                // const relatedField: RelatedFieldDefinition | false = this.relatedFields(field);
                // if (relatedField) {
                //     start = this.safeRelatedData(data.data, relatedField);
                // } else {
                //     start = data.data[field.def];
                // }
                start = data.data[field.def];
                console.log(data.kind, field.def, start, this.validators(field));
                config[field.def] = field.el.control(start, this.validators(field));
                if (data.kind === DatastoreDialogType.DETAILS) {
                    config[field.def] = field.el.control(start, this.validators(field), true);
                }
            });
            if (data.tableDefinition.file) {
                data[MetaEntity.HasFileFieldDef] = data.tableDefinition.file.fileFieldNameDef;
                data[MetaEntity.UrlDef] = data.tableDefinition.file.resourcesUrl;
            }
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


    static ConvertRelatedDataToDatastoreDialogInputData(
        that: DatastoreDialogComponent,
        receivedData: RelatedData,
        typeDialog: DatastoreDialogType,
        isEntity: boolean = false
    ): DatastoreDialogInputData<any> {
        return {
            title: receivedData.name,
            kind: typeDialog,
            data: isEntity ? new receivedData.entity() : receivedData.data,
            tableDefinition: receivedData.tableDefinition,
            relatedData: that.childRelatedData,
        };
    }

    static CanOpenedDialog(dialogRef: any, data: DatastoreDialogInputData<any>): boolean {
        if (dialogRef) {
            return false;
        }
        return (
            data && data.tableDefinition
            && data.tableDefinition.table
            && data.tableDefinition.table.length > 1
        );
    }

    // actions buttons
    static Add(that: DatastoreDialogComponent, receivedData: RelatedData) {
        console.log('datastore dialog relation add', receivedData);
        const data: DatastoreDialogInputData<any> =
            DatastoreDialogComponent.ConvertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.SAVE, true
            );
        console.log('datastore dialog relation add converted for input', data);
        console.log(that.childDialogRef, data);
        if (DatastoreDialogComponent.CanOpenedDialog(that.childDialogRef, data)) {
            that.childDialogRef = that.childDialog.open(DatastoreDialogComponent, {
                panelClass: 'dialog',
                data,
                scrollStrategy: that.overlay.scrollStrategies.noop(),
                hasBackdrop: false,
            });
            that.childDialogRef.afterClosed().subscribe(() => {
                if (data.data) {
                    console.log('after close', data.data);
                    that.save(receivedData.datastore, data.data, receivedData.adapter);
                    that.refresh(receivedData);
                }
                that.childDialogRef = null;
            });
        }
    }

    static Details(that: DatastoreDialogComponent, receivedData: RelatedData) {
        console.log('Details: ', receivedData);
        const data: DatastoreDialogInputData<any> =
            DatastoreDialogComponent.ConvertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.DETAILS,
            );
        console.log(receivedData.data);
        console.log(data.data);
        if (DatastoreDialogComponent.CanOpenedDialog(that.childDialogRef, data)) {
            that.childDialogRef = that.childDialog.open(DatastoreDialogComponent, {
                panelClass: 'dialog',
                data,
                scrollStrategy: that.overlay.scrollStrategies.noop(),
                hasBackdrop: false,
            });
            that.childDialogRef.afterClosed().subscribe(() => {
                that.childDialogRef = null;
            });
        }
    }

    static Edit(that: DatastoreDialogComponent, receivedData: RelatedData) {
        console.log('Edit: ', receivedData);
        const data: DatastoreDialogInputData<any> =
            DatastoreDialogComponent.ConvertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.UPDATE,
            );
        if (DatastoreDialogComponent.CanOpenedDialog(that.childDialogRef, data)) {
            that.childDialogRef = that.childDialog.open(DatastoreDialogComponent, {
                panelClass: 'dialog',
                data,
                scrollStrategy: that.overlay.scrollStrategies.noop(),
                hasBackdrop: false,
            });
            that.childDialogRef.afterClosed().subscribe(() => {
                if (data.data) {
                    console.log('after close', data.data);
                    that.update(receivedData.datastore, data.data, receivedData.adapter);
                    that.refresh(receivedData);
                }
                that.childDialogRef = null;
            });
        }
    }

    static Delete(that: DatastoreDialogComponent, receivedData: RelatedData) {
        console.log('Delete: ', receivedData);
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover it!',
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    that.remove(receivedData.datastore, receivedData.data);
                    that.refreshForDelete(receivedData);
                }
            });
    }

    relatedFields(field: FieldDefinition<any>): RelatedFieldDefinition | false {
        const tableRelatedDefinition = this.data.tableDefinition.related;
        if (tableRelatedDefinition) {
            const filter = tableRelatedDefinition.filter(v => v.with === field.def);
            if (filter && filter.length === 1) {
                return filter[0];
            }
        }
        return false;
    }

    safeRelatedData(data, relatedFieldDefinition: RelatedFieldDefinition | false): string {
        const result = [];
        if (relatedFieldDefinition) {
            const properties = relatedFieldDefinition.fields;
            properties.forEach(property => {
                const splitter = property.split('.');
                let res = data;
                splitter.forEach(v => {
                    if (res && res[v]) {
                        res = res[v];
                    } else {
                        res = null;
                    }
                });
                result.push(res);
            });
        }
        // console.log('safe data', data, relatedFieldDefinition, result);
        return result.join(' ');
    }


    // urlFile(droppedFile: NgxFileDropEntry) {
    //     const reader = new FileReader();
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((file: File) => {
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             return reader.result;
    //         };
    //     });
    //     return null;

    // }
    public dropped(files: NgxFileDropEntry[], field: FieldDefinition<any>) {

        const fieldFile = this.el(field).value as FileFile;
        console.log(fieldFile);
        if (files && files.length === 1) {
            // Is it a file?
            if (files[0].fileEntry.isFile) {
                this.file = files[0];

                const fileEntry = this.file.fileEntry as FileSystemFileEntry;
                const reader = new FileReader();

                fileEntry.file((file: File) => {

                    // preview file
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.previewImage = this.sanitizer.bypassSecurityTrustStyle(`url(${reader.result})`);
                    };

                    const blob = file as Blob;
                    this.formGroup.setControl(
                        field.def,
                        field.el.control(blob, this.validators(field))
                    );
                    // set name file
                    if (fieldFile && fieldFile.fieldName && this.getErrorMessage(field.el.error, field.def) == null) {
                        this.formGroup.setControl(
                            fieldFile.fieldName,
                            this.findFieldDefinitionByName(fieldFile.fieldName).el.control(
                                file.name.slice(0, file.name.lastIndexOf('.')),
                                this.validators(this.findFieldDefinitionByName(fieldFile.fieldName))
                            )
                        );
                    }

                    console.log('preview', this.formGroup.value);

                    // Here you can access the real file
                    console.log(this.file.relativePath, file);
                    //           /**
                    //            // You could upload it like this:
                    //            const formData = new FormData()
                    //            formData.append('logo', file, relativePath)
                    //
                    //            // Headers
                    //            const headers = new HttpHeaders({
                    //   'security-token': 'mytoken'
                    // })
                    //
                    //            this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo',
                    //            formData, { headers: headers, responseType: 'blob' })
                    //            .subscribe(data => {
                    //   // Sanitized logo returned from backend
                    // })
                    //            **/

                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = this.file.fileEntry as FileSystemDirectoryEntry;
                this.file = null;
            }
        }
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }


    disabledActions(fieldName: string): DatastoreActionsInputDisabled {
        const relatedData: RelatedData = this.relatedData(fieldName);
        const selected: boolean = (this.formGroup && this.formGroup.value
            && this.formGroup.value[fieldName]
            && this.formGroup.value[fieldName].id
        );
        const haveDatastore = relatedData && relatedData.datastore;
        const isDetailsDialog = this.isDetailsDialog();
        return {
            add: !haveDatastore || isDetailsDialog,
            edit: !(haveDatastore && selected) || isDetailsDialog,
            details: !(haveDatastore && selected),
            delete: !(relatedData && selected) || isDetailsDialog,
        };
    }

    buildActionData(relation: RelatedFieldDefinition | false, field: FieldDefinition<any>): RelatedData {
        let entity = null;
        let datastore = null;
        let adapter = null;
        let tableDefinition = null;
        let data = null;
        let relatedData: RelatedData = null;
        let name = null;

        if (relation) {
            relatedData = this.relatedData(relation.name);
            name = relation.name;
            if (relatedData) {
                entity = relatedData.entity;
                tableDefinition = relatedData.tableDefinition;
                adapter = relatedData.adapter;
                data = this.formGroup.value[field.def];
                datastore = relatedData.datastore;
            }
        }

        return {
            name,
            entity,
            adapter,
            tableDefinition,
            data,
            relatedStore: relatedData ? relatedData.relatedStore : [],
            datastore
        };
    }

    // storage

    save(datastore: DatastoreService<any>, data: any, adapter: (item: any) => any) {
        return DatastoreDialogStorageHelpers.Save(datastore, data, adapter);
    }

    update(datastore: DatastoreService<any>, data: any, adapter: (item: any) => any) {
        return DatastoreDialogStorageHelpers.Update(datastore, data, adapter);
    }

    remove(datastore: DatastoreService<any>, data: any) {
        return DatastoreDialogStorageHelpers.Remove(datastore, data);
    }

    refreshForDelete(receivedData: RelatedData) {
        this.formGroup.value[receivedData.name] = null;
        this.refresh(receivedData);
    }

    refresh(receivedData: RelatedData) {
        this.date = new Date();
        this.cdr.detectChanges();
        console.log('refresh data', this.data.relatedData);
    }

    // actions
    // add = (receivedData: RelatedData) => DatastoreDialogHelpers.Add(this, receivedData);
    // details = (receivedData: RelatedData) => DatastoreDialogHelpers.Details(this, receivedData);
    // delete = (receivedData: RelatedData) => DatastoreDialogHelpers.Delete(this, receivedData);
    // edit = (receivedData: RelatedData) => DatastoreDialogHelpers.Edit(this, receivedData);

    findFieldDefinitionByName(fieldDef: string): FieldDefinition<any> {
        let result: FieldDefinition<any> = null;
        if (this.data && this.data.tableDefinition && this.data.tableDefinition.table) {
            this.data.tableDefinition.table.forEach(field => {
                if (field.def === fieldDef) {
                    result = field;
                }
            });
        }
        return result;
    }

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
                        const relatedField: RelatedFieldDefinition | false = this.relatedFields(field);
                        if (relatedField && current) {
                            current = this.safeRelatedData(current, relatedField);
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

    resolveRelation(relation: RelatedFieldDefinition, value: object): any {
        const result = value;
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const relatedFields: RelatedFieldDefinition[] | false = this.data.tableDefinition.related;
                if (relatedFields) {
                    const found = relatedFields.filter(f => f.name === key);
                    if (found && found.length === 1) {
                        result[key] = this.resolveRelation(found[0], value[key]);
                    } else {
                        result[key] = value[key];
                    }
                } else {
                    result[key] = value[key];
                }
            }
        }
        return result;
    }


    send(formGroupValue) {
        if (this.isUpdateDialog()) {
            for (const key in formGroupValue) {
                if (formGroupValue.hasOwnProperty(key)) {
                    let value = formGroupValue[key];
                    const relatedFields: RelatedFieldDefinition[] | false = this.data.tableDefinition.related;
                    if (relatedFields) {
                        const found = relatedFields.filter(f => f.name === key);
                        if (found && found.length === 1) {
                            console.log('related field found for send', found, value);
                            value = this.resolveRelation(found[0], value);
                        }
                    }
                    this.data.data[key] = formGroupValue[key];
                }
            }
        }

        if (this.isSaveDialog()) {
            this.data.data = formGroupValue;
        }

        console.log('form data: ', formGroupValue);
        console.log('send ', this.data.kind, ' data: ', this.data.data);
    }

    submit(value) {
        if (this.formGroup.valid) {
            this.send(value);
        }
    }

    onFileSelect(event, fieldName: string) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.formGroup.get(fieldName).setValue(file);
        }
    }

    isSaveDialog = () => this.data.kind === DatastoreDialogType.SAVE;

    isUpdateDialog = () => this.data.kind === DatastoreDialogType.UPDATE;

    isDetailsDialog = () => this.data.kind === DatastoreDialogType.DETAILS;

    @HostListener('window:keyup.esc', ['$event'])
    close(event: Event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
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
