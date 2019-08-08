import {DatastoreComponent} from './datastore.component';
import {DatastoreDialogComponent, DatastoreDialogInputData, DatastoreDialogType} from '../../dialogs/datastore-dialog';
import Swal from 'sweetalert2';


export class DatastoreHelpers {

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
                    console.log('after close', data.data);
                    that.save(data.data);
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
                    that.save(data.data);
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
                    that.update(data.data);
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
