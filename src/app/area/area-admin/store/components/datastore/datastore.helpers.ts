import {DatastoreComponent} from './datastore.component';
import {DatastoreDialogComponent} from '../../dialogs/datastore-dialog';
import Swal from 'sweetalert2';
import {DatastoreDialogInputData, DatastoreDialogType} from '../../dialogs/datastore-dialog/datastore-dialog.models';
import {MetaEntity} from '../../models';
import {HttpErrorResponse} from '@angular/common/http';


export class DatastoreHelpers {

    static Remove(that: DatastoreComponent, data) {
        console.log('remove', data);
        that.datastore.delete(data).subscribe(result => {
                console.log('deleted result', result);
                // for Delete we use splice in order to remove single object from DataService
                const foundIndex = that.datastore.data.value.findIndex(x => x.id === data.id);
                that.datastore.data.value.splice(foundIndex, 1);
                that.datastore.data.next(that.datastore.data.value);
                that.refreshTable();
                Swal.fire({
                    title: 'Successfully deleted',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                });
                that.refreshTable();
            },
            (err: HttpErrorResponse) => {
                Swal.fire({
                    title: 'Error occurred ',
                    text: 'Details: ' + err,
                    type: 'error',
                    showConfirmButton: true,
                });
            });
        // const foundIndex = that.datastore.data.value.findIndex(x => x.id === data.id);
        // that.datastore.data.value.splice(foundIndex, 1);
        // that.datastore.data.next(that.datastore.data.value);
        // that.refreshTable();
        // Swal.fire({
        //     title: 'Successfully deleted',
        //     type: 'success',
        //     timer: 1000,
        //     showConfirmButton: false,
        // });
    }


    static Update(that: DatastoreComponent, data) {
        console.log('update', data);
        // const foundIndex = that.datastore.data.value.findIndex(x => x.id === data.id);
        // that.datastore.data.value.splice(foundIndex, 1);
        // that.datastore.data.value.push(data);
        // that.datastore.data.next(that.datastore.data.value);
        // Swal.fire({
        //     title: 'Successfully updated',
        //     type: 'success',
        //     timer: 1000,
        //     showConfirmButton: false,
        // });
        // that.refreshTable();
        that.datastore.update(data).subscribe(result => {
                console.log('update result', result);
                result = that.adapter(result);
                const foundIndex = that.datastore.data.value.findIndex(x => x.id === data.id);
                that.datastore.data.value.splice(foundIndex, 1);
                that.datastore.data.value.push(result);
                that.datastore.data.next(that.datastore.data.value);
                Swal.fire({
                    title: 'Successfully updated',
                    type: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                });
            },
            (err: HttpErrorResponse) => {
                Swal.fire({
                    title: 'Error occurred ',
                    text: 'Details: ' + err,
                    type: 'error',
                    showConfirmButton: true,
                });
            }) ;
    }

    static convertDataToFormData(data): FormData {
        const formData = new FormData();
        if (data[MetaEntity.HasFileFieldDef]) {
            const fileField = data[MetaEntity.HasFileFieldDef];
            formData.append('file', data[fileField]);
            // data.hasFileField = null;
            formData.append('data', data);
        }
        return formData;
    }

    static urlFromData(data): string {
        if (data[MetaEntity.UrlDef]) {
            return data[MetaEntity.UrlDef];
        }
        return null;
    }

    static UpdateFormData(that: DatastoreComponent, data) {
        const formData = DatastoreHelpers.convertDataToFormData(data);
        let url = DatastoreHelpers.urlFromData(data);
        const id = data.id;
        if (id) {
            url += '/' + id.toString();
        }
        if (formData && url) {
            that.httpClient.put<any>(url, formData).subscribe(
                (result) => {
                    console.log('update formdata result', result);
                    result = that.adapter(result);
                    const foundIndex = that.datastore.data.value.findIndex(x => x.id === data.id);
                    that.datastore.data.value.splice(foundIndex, 1);
                    that.datastore.data.value.push(result);
                    that.datastore.data.next(that.datastore.data.value);
                    Swal.fire({
                        title: 'Successfully updated',
                        type: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                },
                (err: HttpErrorResponse) => {
                    Swal.fire({
                        title: 'Error occurred ',
                        text: 'Details: ' + err,
                        type: 'error',
                        showConfirmButton: true,
                    });
                }
            );
            // const foundIndex = that.datastore.data.value.findIndex(x => x.id === data.id);
            // that.datastore.data.value.splice(foundIndex, 1);
            // that.datastore.data.value.push(data);
            // that.datastore.data.next(that.datastore.data.value);
            // Swal.fire({
            //     title: 'Successfully updated formData',
            //     type: 'success',
            //     timer: 1000,
            //     showConfirmButton: false,
            // });
            // that.refreshTable();
        }
    }

    static SaveFormData(that: DatastoreComponent, data) {
        const formData = DatastoreHelpers.convertDataToFormData(data);
        const url = DatastoreHelpers.urlFromData(data);
        if (formData && url) {
            that.httpClient.post<any>(url, formData).subscribe(result => {
                    console.log('saved result', result);
                    // for Delete we use splice in order to remove single object from DataService
                    result = that.adapter(result);
                    that.datastore.data.value.push(result);
                    that.datastore.data.next(that.datastore.data.value);
                    Swal.fire({
                        title: 'Successfully added',
                        type: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                },
                (err: HttpErrorResponse) => {
                    Swal.fire({
                        title: 'Error occurred ',
                        text: 'Details: ' + err,
                        type: 'error',
                        showConfirmButton: true,
                    });
                }
            );

            // data.id = (that.datastore.data.value.length + 1).toString();
            // that.datastore.data.value.push(data);
            // that.datastore.data.next(that.datastore.data.value);
            // Swal.fire({
            //     title: 'Successfully saved formData',
            //     type: 'success',
            //     timer: 1000,
            //     showConfirmButton: false,
            // });
            // that.refreshTable();
        }
    }


    static Save(that: DatastoreComponent, data) {
        console.log('save', data, that.datastore.data.value);
        // data.id = (that.datastore.data.value.length + 1).toString();
        // that.datastore.data.value.push(data);
        // that.datastore.data.next(that.datastore.data.value);
        // Swal.fire({
        //     title: 'Successfully Add',
        //     type: 'success',
        //     timer: 1000,
        //     showConfirmButton: false,
        // });
        // that.refreshTable();
        // console.log('saved', data, that.datastore.data.value);

        that.datastore.create(data).subscribe(result => {
                console.log('saved result', result);
                // for Delete we use splice in order to remove single object from DataService
                result = that.adapter(result);
                that.datastore.data.value.push(result);
                that.datastore.data.next(that.datastore.data.value);
                Swal.fire({
                    title: 'Successfully added',
                    type: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                });
            },
            (err: HttpErrorResponse) => {
                Swal.fire({
                    title: 'Error occurred ',
                    text: 'Details: ' + err,
                    type: 'error',
                    showConfirmButton: true,
                });
            });
    }

    // removeList(elements: Array<any>) {
    //     console.log('remove list', elements);
    //     elements.forEach(data => {
    //         // const foundIndex = this.datastore.data.value.findIndex(x => x.id === data.id);
    //         // this.datastore.data.value.splice(foundIndex, 1);
    //         // this.datastore.data.next(this.datastore.data.value);
    //         // this.refreshTable();
    //         // Swal.fire({
    //         //     title: 'Successfully deleted',
    //         //     type: 'success',
    //         //     timer: 1000,
    //         //     showConfirmButton: false,
    //         // });
    //         this.datastore.Delete(data).subscribe(
    //             result => {
    //                 console.log('deleted result', result);
    //                 // for Delete we use splice in order to remove single object from DataService
    //                 const foundIndex = this.datastore.data.value.findIndex(x => x.id === data.id);
    //                 this.datastore.data.value.splice(foundIndex, 1);
    //                 this.datastore.data.next(this.datastore.data.value);
    //                 this.refreshTable();
    //             },
    //             (err: HttpErrorResponse) => {
    //                 Swal.fire({
    //                     title: 'Error occurred ',
    //                     text: 'Details: ' + err,
    //                     type: 'error',
    //                     showConfirmButton: true,
    //                 });
    //         });
    //     });
    // }

    static Add(that: DatastoreComponent) {
        const data: DatastoreDialogInputData<any> = that.data(
            DatastoreDialogType.SAVE,
            new that.entity()
        );
        if (that.canOpenDialog(data)) {
            that.dialogRef = that.dialog.open(DatastoreDialogComponent, {
                panelClass: 'dialog',
                data,
                scrollStrategy: that.overlay.scrollStrategies.noop(),
                hasBackdrop: false,
            });
            that.dialogRef.afterClosed().subscribe(() => {
                if (data.data) {
                    console.log('after close', data.data, data[MetaEntity.HasFileFieldDef]);
                    if (data.data[MetaEntity.HasFileFieldDef]) {
                        that.saveFormData(data.data);
                    } else {
                        that.save(data.data);
                    }

                    that.refreshTable();
                }
                that.dialogRef = null;
            });
        }
    }

    static Details(that: DatastoreComponent, element: any) {
        that.isSelectionClicked = false;
        console.log('Details: ', element);
        const data: DatastoreDialogInputData<any> = that.data(DatastoreDialogType.DETAILS, element);
        if (that.canOpenDialog(data)) {
            that.dialogRef = that.dialog.open(DatastoreDialogComponent, {
                panelClass: 'dialog',
                data,
                scrollStrategy: that.overlay.scrollStrategies.noop(),
                hasBackdrop: false,
            });
            that.dialogRef.afterClosed().subscribe(() => {
                if (data.data) {
                    console.log('after close', data.data);
                    that.refreshTable();
                }
                that.dialogRef = null;
            });
        }
    }

    static Edit(that: DatastoreComponent, element) {
        that.isSelectionClicked = false;
        console.log('Edit: ', element);
        const data: DatastoreDialogInputData<any> = that.data(DatastoreDialogType.UPDATE, element);
        if (that.canOpenDialog(data)) {
            that.dialogRef = that.dialog.open(DatastoreDialogComponent, {
                panelClass: 'dialog',
                data,
                scrollStrategy: that.overlay.scrollStrategies.noop(),
                hasBackdrop: false,
            });
            that.dialogRef.afterClosed().subscribe(() => {
                if (data.data) {
                    console.log('after close', data.data);
                    if (data.data[MetaEntity.HasFileFieldDef]) {
                        that.updateFormData(data.data);
                    } else {
                        that.update(data.data);
                    }
                    that.refreshTable();
                }
                that.dialogRef = null;
            });
        }
    }

    static Delete(that: DatastoreComponent, element: any) {
        that.isSelectionClicked = false;
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover it!',
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    that.remove(element);
                }
            });
    }
}
