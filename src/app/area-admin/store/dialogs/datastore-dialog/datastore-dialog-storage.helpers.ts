import Swal from 'sweetalert2';
import {DatastoreService} from '../../services';


export class DatastoreDialogStorageHelpers {

    static Remove(datastore: DatastoreService<any>, data: any) {
        console.log('remove', data);
        const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
        datastore.data.value.splice(foundIndex, 1);
        datastore.data.next(datastore.data.value);
        Swal.fire({
            title: 'Successfully deleted',
            type: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
        // datastore.delete(data).subscribe(result => {
        //     console.log('deleted result', result);
        //     // for Delete we use splice in order to remove single object from DataService
        //     const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
        //     datastore.data.value.splice(foundIndex, 1);
        //     datastore.data.next(datastore.data.value);
        //     Swal.fire({
        //         title: 'Successfully deleted',
        //         type: 'success',
        //         showConfirmButton: false,
        //         timer: 1000,
        //     });
        // },
        // (err: HttpErrorResponse) => {
        //     Swal.fire({
        //         title: 'Error occurred ',
        //         text: 'Details: ' + err,
        //         type: 'error',
        //         showConfirmButton: true,
        //     });
        // });
    }

    static Update(datastore: DatastoreService<any>, data, adapter: (item: any) => any) {
        console.log('update', data);
        const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
        datastore.data.value.splice(foundIndex, 1);
        datastore.data.value.push(data);
        datastore.data.next(datastore.data.value);
        Swal.fire({
            title: 'Successfully updated',
            type: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
        // datastore.update(data).subscribe(result => {
        //     console.log('update result', result);
        //     if (adapter) {
        //         result = adapter(result);
        //     }
        //     const foundIndex = datastore.data.value.findIndex(x => x.id === data.id);
        //     datastore.data.value.splice(foundIndex, 1);
        //     datastore.data.value.push(result);
        //     datastore.data.next(datastore.data.value);
        //     Swal.fire({
        //         title: 'Successfully updated',
        //         type: 'success',
        //         timer: 1000,
        //         showConfirmButton: false,
        //     });
        // },
        // (err: HttpErrorResponse) => {
        //     Swal.fire({
        //         title: 'Error occurred ',
        //         text: 'Details: ' + err,
        //         type: 'error',
        //         showConfirmButton: true,
        //     });
        // });
    }


    static Save(datastore: DatastoreService<any>, data, adapter: (item: any) => any) {
        console.log('child save data', data, datastore);
        data.id = datastore.data.value.length + 1;
        datastore.data.value.push(data);
        datastore.data.next(datastore.data.value);
        Swal.fire({
            title: 'Successfully Add',
            type: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
        // datastore.create(data).subscribe(result => {
        //     console.log('saved result', result);
        //     // for Delete we use splice in order to remove single object from DataService
        //     if (adapter) {
        //         result = adapter(result);
        //     }
        //     datastore.data.value.push(result);
        //     datastore.data.next(datastore.data.value);
        //     Swal.fire({
        //         title: 'Successfully added',
        //         type: 'success',
        //         timer: 1000,
        //         showConfirmButton: false,
        //     });
        // },
        // (err: HttpErrorResponse) => {
        //     Swal.fire({
        //         title: 'Error occurred ',
        //         text: 'Details: ' + err,
        //         type: 'error',
        //         showConfirmButton: true,
        //     });
        // });
    }
}
