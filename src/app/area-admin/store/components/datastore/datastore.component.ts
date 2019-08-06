import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckbox, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import {
    DatastoreDialogInputData,
    DatastoreDialogType,
    DatastoreDialogComponent
} from '../../dialogs/datastore-dialog/datastore-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-datastore',
  templateUrl: './datastore.component.html',
  styleUrls: ['./datastore.component.scss']
})
export class DatastoreComponent implements OnInit, AfterViewInit {

    @Input() title;
    @Input() datastore: DatastoreService<any> | null;
    @Input() entity: new () => void;
    @Input() tableDefinition;
    @Input() dataSource: MatTableDataSource<any> | null ;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild('filter', {static: false}) filter: ElementRef;
    @ViewChildren('rowSelection') rowSelections: Array<MatCheckbox>;

    rowsSelectionSelected = false;
    rowsSelectionIndeterminate = false;
    isSelectionClicked = true;


    update(data) {
        console.log('update', data);
        const foundIndex = this.datastore.data.value.findIndex(x => x.code === data.code);
        this.datastore.data.value.splice(foundIndex, 1);
        this.datastore.data.value.push(data);
        this.datastore.data.next(this.datastore.data.value);
        Swal.fire({
            title: 'Successfully updated',
            type: 'success',
            showConfirmButton: false,
        });
        this.refreshTable();
        // this.datastoreRegionService.update(this.data.data).subscribe(data => {
        //     console.log('deleted', data);
        //     // for delete we use splice in order to remove single object from DataService
        //     const foundIndex = this.datastoreRegionService.data.value.findIndex(x => x.id === data.id);
        // this.datastoreRegionService.data.value.splice(foundIndex, 1);
        // this.datastoreRegionService.data.value.push(data);
        //     this.datastoreRegionService.data.next(datastoreRegionService.data.value);
        //     Swal.fire({
        //         title: 'Successfully add',
        //         type: 'success',
        //         showConfirmButton: false,
        //     });
        // },
        // (err: HttpErrorResponse) => {
        //     Swal.fire({
        //         title: 'Error occurred',
        //         text: 'Details: ' + err.name + ' ' + err.message,
        //         type: 'error',
        //         showConfirmButton: false,
        //     });
        // });
    }

    save(data) {
        console.log('save', data);
        this.datastore.data.value.push(data);
        this.datastore.data.next(this.datastore.data.value);
        Swal.fire({
            title: 'Successfully add',
            type: 'success',
            showConfirmButton: false,
        });
        this.refreshTable();
        // this.datastoreRegionService.create(this.data.data).subscribe(data => {
        //     console.log('deleted', data);
        //     // for delete we use splice in order to remove single object from DataService
        //     this.datastoreRegionService.data.value.push(data);
        //     this.datastoreRegionService.data.next(datastoreRegionService.data.value);
        //     Swal.fire({
        //         title: 'Successfully add',
        //         type: 'success',
        //         showConfirmButton: false,
        //     });
        // },
        // (err: HttpErrorResponse) => {
        //     Swal.fire({
        //         title: 'Error occurred',
        //         text: 'Details: ' + err.name + ' ' + err.message,
        //         type: 'error',
        //         showConfirmButton: false,
        //     });
        // });
    }

    data(kind: DatastoreDialogType, example: any): DatastoreDialogInputData<any>  {
        return {
            title: this.title,
            kind,
            data: example,
            tableDefinition: this.tableDefinition
        };
    }


    add() {
        const data: DatastoreDialogInputData<any> = this.data(
            DatastoreDialogType.SAVE,
            new this.entity()
        );
        const dialogRef = this.dialog.open(DatastoreDialogComponent, {
            panelClass: 'dialog',
            data,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            hasBackdrop: false,
        });
        dialogRef.afterClosed().subscribe(value => {
            if (data.data) {
                console.log('after close', data.data);
                this.save(data.data);
                this.refreshTable();
            }
        });
    }

    details(element) {
        this.isSelectionClicked = false;
        console.log('details: ', element);
        const data: DatastoreDialogInputData<any> = this.data(DatastoreDialogType.DETAILS, element);
        const dialogRef = this.dialog.open(DatastoreDialogComponent, {
            panelClass: 'dialog',
            data,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            hasBackdrop: false,
        });
        dialogRef.afterClosed().subscribe(value => {
            if (data.data) {
                console.log('after close', data.data);
                this.save(data.data);
                this.refreshTable();
            }
        });
    }

    edit(element) {
        this.isSelectionClicked = false;
        console.log('edit: ', element);
        const data: DatastoreDialogInputData<any> = this.data(DatastoreDialogType.UPDATE, element);
        const dialogRef = this.dialog.open(DatastoreDialogComponent, {
            panelClass: 'dialog',
            data,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            hasBackdrop: false,
        });
        dialogRef.afterClosed().subscribe(value => {
            if (data.data) {
                console.log('after close', data.data);
                this.update(data.data);
                this.refreshTable();
            }
        });
    }

    delete(element) {
        this.isSelectionClicked = false;
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover it!',
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
        .then((willDelete) => {
            if (willDelete.value) {
                // this.datastoreRegionService.delete(element).subscribe(data => {
                //     console.log('deleted', data);
                //     // for delete we use splice in order to remove single object from DataService
                //     const foundIndex = this.datastoreRegionService.data.value.findIndex(x => x.id === element.id);
                //     this.datastoreRegionService.data.value.splice(foundIndex, 1);
                //     this.datastoreRegionService.data.next(this.datastoreRegionService.data.value);
                //     this.refreshTable();
                //     swal.fire({
                //         title: 'Successfully deleted',
                //         text: 'Successfully deleted',
                //         type: 'success'
                //     });
                //     this.refreshTable();
                // },
                // (err: HttpErrorResponse) => {
                //     swal.fire({
                //         title: 'Error occurred',
                //         text: 'Details: ' + err.name + ' ' + err.message,
                //         type: 'error',
                //         showConfirmButton: false,
                //     });
                // });
                const foundIndex = this.datastore.data.value.findIndex(x => x.id === element.id);
                this.datastore.data.value.splice(foundIndex, 1);
                this.datastore.data.next(this.datastore.data.value);
                this.refreshTable();
                Swal.fire({
                    title: 'Successfully deleted',
                    type: 'success',
                    showConfirmButton: false,
                });
            }
        });
    }

    countSelectedRow() {
        let count = 0;
        if (this.rowSelections) {
            this.rowSelections.forEach(value => {
                if (value.checked) {
                    count ++;
                }
            });
        }
        return count;
    }

    rowsSelection_change() {
        this.rowSelections.forEach(value => {
            value.checked = this.rowsSelectionSelected;
        });
    }

    rowSelection_click() {
        this.isSelectionClicked = false;
    }

    rowSelection_change() {
        const count = this.countSelectedRow();
        if (count > 0 && count < this.rowSelections.length) {
            // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
            this.rowsSelectionIndeterminate = true;
        } else if (count === this.rowSelections.length) {
            // If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
            this.rowsSelectionIndeterminate = false;
            this.rowsSelectionSelected = true;
        } else {
            // If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
            this.rowsSelectionIndeterminate = false;
            this.rowsSelectionSelected = false;
        }
        this.isSelectionClicked = true;
      }

    rowClicked(row) {
        if (this.isSelectionClicked) {
            this.rowSelections.forEach((element, index) => {
                if ( (index + 1) === +row.id) {
                    element.checked = !element.checked;
                    this.rowSelection_change();
                }
            });
        }

    }
    get columns() {
        return this.tableDefinition;
    }

    get displayedColumns() {
        const prev = ['checkbox'];
        const post = ['actions'];
        return prev.concat(
            this.columns.map(c => c.columnDef)
        ).concat(post);
    }

    constructor(
        private dialog: MatDialog,
        private overlay: Overlay,
    ) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }

    ngOnInit() {
        this.datastore.initData();
        this.dataSource = new MatTableDataSource(this.datastore.data.value);
        this.datastore.initData();
        this.datastore.data.subscribe((data: Array<any>) => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        fromEvent(this.filter.nativeElement, 'keyup')
            .subscribe(
                () => {
                if (this.dataSource) {
                    this.dataSource.filter = this.filter.nativeElement.value;
                }
            })
        ;
    }

    refreshTable() {
        if (this.paginator) {
            this.paginator._changePageSize(this.paginator.pageSize);
        }
    }

    refreshStore() {
        this.datastore.initData();
    }


}
