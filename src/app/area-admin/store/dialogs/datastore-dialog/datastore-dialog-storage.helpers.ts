import Swal from 'sweetalert2';
import {DatastoreService} from '../../services';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MetaEntity} from '../../models';


export class DatastoreDialogStorageHelpers {

    static Remove(datastore: DatastoreService<any>, data: any) {
        console.log('remove', data);
        // const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
        // datastore.data.value.splice(foundIndex, 1);
        // datastore.data.next(datastore.data.value);
        // Swal.fire({
        //     title: 'Successfully deleted',
        //     type: 'success',
        //     timer: 1000,
        //     showConfirmButton: false,
        // });
        datastore.delete(data).subscribe(result => {
                console.log('deleted result', result);
                // for Delete we use splice in order to remove single object from DataService
                const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
                datastore.data.value.splice(foundIndex, 1);
                datastore.data.next(datastore.data.value);
                Swal.fire({
                    title: 'Successfully deleted',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1000,
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

    static UpdateFormData(datastore: DatastoreService<any>, data: any, httpClient: HttpClient, adapter: (item: any) => any) {
        const formData = DatastoreDialogStorageHelpers.convertDataToFormData(data);
        let url = DatastoreDialogStorageHelpers.urlFromData(data);
        const id = data.id;
        if (id) {
            url += '/' + id.toString();
        }
        if (formData && url) {
            httpClient.put<any>(url, formData).subscribe(
                (result) => {
                    console.log('update formdata result', result);
                    if (adapter) {
                        result = adapter(result);
                    }
                    const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
                    datastore.data.value.splice(foundIndex, 1);
                    datastore.data.value.push(result);
                    datastore.data.next(datastore.data.value);
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

    static SaveFormData(datastore: DatastoreService<any>, data: any, httpClient: HttpClient, adapter: (value: any) => any) {
        const formData = DatastoreDialogStorageHelpers.convertDataToFormData(data);
        const url = DatastoreDialogStorageHelpers.urlFromData(data);
        if (formData && url) {
            httpClient.post<any>(url, formData).subscribe(result => {
                    console.log('saved result', result);
                    // for Delete we use splice in order to remove single object from DataService
                    if (adapter) {
                        result = adapter(result);
                    }
                    datastore.data.value.push(result);
                    datastore.data.next(datastore.data.value);
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

    static Update(datastore: DatastoreService<any>, data, adapter: (item: any) => any) {
        console.log('update', data);
        // const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
        // datastore.data.value.splice(foundIndex, 1);
        // datastore.data.value.push(data);
        // datastore.data.next(datastore.data.value);
        // Swal.fire({
        //     title: 'Successfully updated',
        //     type: 'success',
        //     timer: 1000,
        //     showConfirmButton: false,
        // });
        datastore.update(data).subscribe(result => {
                console.log('update result', result);
                if (adapter) {
                    result = adapter(result);
                }
                const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
                datastore.data.value.splice(foundIndex, 1);
                datastore.data.value.push(result);
                datastore.data.next(datastore.data.value);
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
            });
    }


    static Save(datastore: DatastoreService<any>, data, adapter: (item: any) => any) {
        console.log('child save data', data, datastore);
        // data.id = datastore.data.value.length + 1;
        // datastore.data.value.push(data);
        // datastore.data.next(datastore.data.value);
        // Swal.fire({
        //     title: 'Successfully Add',
        //     type: 'success',
        //     timer: 1000,
        //     showConfirmButton: false,
        // });
        datastore.create(data).subscribe(result => {
                console.log('saved result', result);
                // for Delete we use splice in order to remove single object from DataService
                if (adapter) {
                    result = adapter(result);
                }
                datastore.data.value.push(result);
                datastore.data.next(datastore.data.value);
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
}
