import {DatastoreDialogComponent} from './datastore-dialog.component';
import Swal from 'sweetalert2';
import {DatastoreDialogInputData, DatastoreDialogType, RelatedData} from './datastore-dialog.models';


export class DatastoreDialogActionsHelpers {


    static ConvertRelatedDataToDatastoreDialogInputData(
        that: DatastoreDialogComponent,
        receivedData: RelatedData,
        typeDialog: DatastoreDialogType,
        isEntity: boolean = false
    ): DatastoreDialogInputData<any> {
        return {
            title: receivedData.name,
            kind: typeDialog,
            data: isEntity ? receivedData.entity : receivedData.data,
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
            DatastoreDialogActionsHelpers.ConvertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.SAVE, true
            );
        console.log(that.childDialogRef, data);
        if (DatastoreDialogActionsHelpers.CanOpenedDialog(that.childDialogRef, data)) {
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
            DatastoreDialogActionsHelpers.ConvertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.DETAILS,
            );
        console.log(receivedData.data);
        console.log(data.data);
        if (DatastoreDialogActionsHelpers.CanOpenedDialog(that.childDialogRef, data)) {
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
            DatastoreDialogActionsHelpers.ConvertRelatedDataToDatastoreDialogInputData(
                that, receivedData, DatastoreDialogType.UPDATE,
            );
        if (DatastoreDialogActionsHelpers.CanOpenedDialog(that.childDialogRef, data)) {
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


}
