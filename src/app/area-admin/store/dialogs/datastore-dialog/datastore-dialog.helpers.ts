import Swal from 'sweetalert2';
import {DatastoreDialogComponent, DatastoreDialogInputData, DatastoreDialogType, RelatedData} from './datastore-dialog.component';
import {DatastoreService} from '../../services';


export class DatastoreDialogHelpers {

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


    static convertRelatedDataToDatastoreDialogInputData(
        that: DatastoreDialogComponent,
        receivedData: RelatedData,
        typeDialog: DatastoreDialogType,
    ): DatastoreDialogInputData<any> {
        return {
            title: receivedData.name,
            kind: typeDialog,
            data: receivedData.entity,
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
            DatastoreDialogHelpers.convertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.SAVE
            );
        if (DatastoreDialogHelpers.CanOpenedDialog(that.childDialogRef, data)) {
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
                    that.refreshSelect();
                }
                that.childDialogRef = null;
            });
        }
    }

    static Details(that: DatastoreDialogComponent, receivedData: RelatedData) {
        console.log('Details: ', receivedData);
        const data: DatastoreDialogInputData<any> =
            DatastoreDialogHelpers.convertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.DETAILS
            );
        if (DatastoreDialogHelpers.CanOpenedDialog(that.childDialogRef, data)) {
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
            DatastoreDialogHelpers.convertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.UPDATE
            );
        if (DatastoreDialogHelpers.CanOpenedDialog(that.childDialogRef, data)) {
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
                }
                that.dialogRef = null;
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
                }
            });
    }


}
