import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatCheckbox, MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import Swal from 'sweetalert2';
import {DatastoreDialogInputData, DatastoreDialogType, RelatedData} from '../../dialogs/datastore-dialog';
import {Overlay} from '@angular/cdk/overlay';
import {fromEvent} from 'rxjs';
import {DatastoreService} from '../../services';
import {FieldDefinition, MetaEntity, TableDefinition} from '../../models';
import {Resource} from '@lagoshny/ngx-hal-client';
import {
    DatastoreActionsInputCallback,
    DatastoreActionsInputData,
    DatastoreActionsInputDisplay
} from '../datastore-actions/datastore-actions.component';
import {DatastoreHelpers} from './datastore.helpers';

export  interface RelatedStore<T extends Resource> {
    name: string;
    datastore: DatastoreService<T>;
}

interface DatastoreActionsInputs {
    display: DatastoreActionsInputDisplay;
    callback: DatastoreActionsInputCallback;
    data: DatastoreActionsInputData;
}


const ACTIONS_BUTTONS = {
    header: {
        display: {
            add: true
        },
        callback: {
            add: DatastoreHelpers.Add
        },
        data: (component: any) => DatastoreHelpers.ActionsButtonsData(component, null)
    },
    content: {
        display: {
            details: true,
            edit: true,
            delete: true
        },
        callback: {
            add: DatastoreHelpers.Add,
            edit: DatastoreHelpers.Edit,
            delete: DatastoreHelpers.Delete,
            details: DatastoreHelpers.Details,
        },
        data: (component: any, data: any) => DatastoreHelpers.ActionsButtonsData(component, data)
    },
    data: (component: any, data: any) => DatastoreHelpers.ActionsButtonsData(component, data)
};

@Component({
  selector: 'app-datastore',
  templateUrl: './datastore.component.html',
  styleUrls: ['./datastore.component.scss']
})
export class DatastoreComponent implements OnInit, AfterViewInit {

    relatedData: Array<RelatedData> = [];
    dialogRef = null;

    // rowClicked(row) {
    //     if (this.isSelectionClicked) {
    //         this.rowSelections.forEach((element, index) => {
    //             if ( (index + 1) === +row.id) {
    //                 element.checked = !element.checked;
    //                 this.rowSelection_change();
    //             }
    //         });
    //     }

    // }
    headerActionButton: DatastoreActionsInputs = {
        display: ACTIONS_BUTTONS.header.display,
        callback: ACTIONS_BUTTONS.header.callback,
        data: ACTIONS_BUTTONS.header.data(this)
    };

    @Input() title;
    @Input() datastore: DatastoreService<any>;
    @Input() entity: new () => void;
    @Input() adapter: (item: any) => any;
    @Input() tableDefinition: TableDefinition<any>;
    @Input() relatedStores: Array<RelatedStore<any>> = [];
    @Input() dataSource: MatTableDataSource<any> | null ;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild('filter', {static: false}) filter: ElementRef;
    @ViewChildren('rowSelection') rowSelections: Array<MatCheckbox>;
    @ViewChildren('rowSelectionIds') rowSelectionsIds: Array<ElementRef>;
    actionsButtons = {
        display: ACTIONS_BUTTONS.content.display,
        callback: ACTIONS_BUTTONS.content.callback,
        data: (data: any) => ACTIONS_BUTTONS.content.data(this, data)
    };

    constructor(
        public dialog: MatDialog,
        public overlay: Overlay,
    ) {
    }

    rowsSelectionSelected = false;
    rowsSelectionIndeterminate = false;
    isSelectionClicked = true;

    get columns() {
        const displayedColumns: FieldDefinition<any>[] = this.tableDefinition.table
            .filter(v => v.row.display);
        const columnswithoutId: FieldDefinition<any>[] = displayedColumns
            .filter(v => !v.def.includes(MetaEntity.idDef));
        const columnswithId: FieldDefinition<any>[] = displayedColumns
            .filter(v => v.def.includes(MetaEntity.idDef));
        columnswithId.sort((a, b) => (a.def > b.def) ? 1 : -1);
        columnswithoutId.sort((a, b) => (a.def > b.def) ? 1 : -1);
        return columnswithId.concat(columnswithoutId);
    }

    get displayedColumns() {
        const prev = ['checkbox'];
        const post = ['actions'];
        return prev.concat(
            this.columns.map(c => c.def)
        ).concat(post);
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

    remove(data) {
        console.log('remove', data);
        // this.datastore.Delete(data).subscribe(result => {
        //     console.log('deleted result', result);
        //     // for Delete we use splice in order to remove single object from DataService
        //     const foundIndex = this.datastore.data.value.findIndex(x => x.id === data.id);
        //     this.datastore.data.value.splice(foundIndex, 1);
        //     this.datastore.data.next(this.datastore.data.value);
        //     this.refreshTable();
        //     Swal.fire({
        //         title: 'Successfully deleted',
        //         type: 'success',
        //         showConfirmButton: false,
        //         timer: 1000,
        //     });
        //     this.refreshTable();
        // },
        // (err: HttpErrorResponse) => {
        //     Swal.fire({
        //         title: 'Error occurred ',
        //         text: 'Details: ' + err,
        //         type: 'error',
        //         showConfirmButton: true,
        //     });
        // });
        const foundIndex = this.datastore.data.value.findIndex(x => x.id === data.id);
        this.datastore.data.value.splice(foundIndex, 1);
        this.datastore.data.next(this.datastore.data.value);
        this.refreshTable();
        Swal.fire({
            title: 'Successfully deleted',
            type: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
    }


    update(data) {
        console.log('update', data);
        const foundIndex = this.datastore.data.value.findIndex(x => x.id === data.id);
        this.datastore.data.value.splice(foundIndex, 1);
        this.datastore.data.value.push(data);
        this.datastore.data.next(this.datastore.data.value);
        Swal.fire({
            title: 'Successfully updated',
            type: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
        this.refreshTable();
        // this.datastore.update(data).subscribe(result => {
        //     console.log('update result', result);
        //     result = this.adapter(result);
        //     const foundIndex = this.datastore.data.value.findIndex(x => x.id === data.id);
        //     this.datastore.data.value.splice(foundIndex, 1);
        //     this.datastore.data.value.push(result);
        //     this.datastore.data.next(this.datastore.data.value);
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

    save(data) {
        console.log('save', data);
        data.id = this.datastore.data.value.length + 1;
        this.datastore.data.value.push(data);
        this.datastore.data.next(this.datastore.data.value);
        Swal.fire({
            title: 'Successfully Add',
            type: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
        this.refreshTable();
        // this.datastore.create(data).subscribe(result => {
        //     console.log('saved result', result);
        //     // for Delete we use splice in order to remove single object from DataService
        //     result = this.adapter(result);
        //     this.datastore.data.value.push(result);
        //     this.datastore.data.next(this.datastore.data.value);
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

    data(kind: DatastoreDialogType, example: any): DatastoreDialogInputData<any>  {
        return {
            title: this.title,
            kind,
            data: example,
            tableDefinition: this.tableDefinition,
            relatedData: this.relatedData
        };
    }

    canOpenDialog(data: DatastoreDialogInputData<any>): boolean {
        if (this.dialogRef) {
            return false;
        }
        return (data && data.tableDefinition && data.tableDefinition.table && data.tableDefinition.table.length > 1);
    }


    // deleteSelection() {
    //     const elements: Array<any> = this.selectedData();
    //     console.log('deletings ', elements);
    //     if ( elements.length > 0) {
    //         Swal.fire({
    //             title: 'Are you sure?',
    //             text: 'Once deleted, you will not be able to recover it!',
    //             type: 'warning',
    //             showConfirmButton: true,
    //             showCancelButton: true
    //         })
    //         .then((willDelete) => {
    //             if (willDelete.value) {
    //                 this.removeList(elements);
    //             }
    //         });
    //     }
    // }

    selectedIds(): number[] {
        const result = [];
        if ( this.rowSelections && this.rowSelectionsIds) {
            this.rowSelections.forEach((value, index) => {
                if ( value.checked ) {
                    const found: ElementRef[] = this.rowSelectionsIds.filter((v, i) => i === index);
                    if (found.length === 1) {
                        const id = found[0].nativeElement.value;
                        result.push(id);
                    }
                }
            });
        }
        return result;
    }

    selectedData() {
        const ids: number[] = this.selectedIds();
        if ( ids.length > 0) {
            return this.datastore.data.value.filter(data => ids.includes(data.id));
        }
        return ids;
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


    ngOnInit() {
        this.datastore.initData();
        this.dataSource = new MatTableDataSource(this.datastore.data.value);
        this.datastore.initData();
        this.datastore.data.subscribe((data: Array<any>) => {
            this.dataSource.data = data;
        });
        if (this.relatedStores) {
            this.relatedStores.forEach(relstore => {
                if (relstore && relstore.datastore) {
                    relstore.datastore.data.subscribe(data => {
                        const reldata: RelatedData = {
                            name: relstore.name,
                            data
                        };
                        const foundIndex = this.relatedData.findIndex(x => x.name === reldata.name);
                        this.relatedData.splice(foundIndex, 1);
                        this.relatedData.push(reldata);
                    });
                    relstore.datastore.initData();
                }

            });
        }
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        fromEvent(this.filter.nativeElement, 'keyup')
            .subscribe(
                () => {
                if (this.dataSource) {
                    this.dataSource.filter = this.filter.nativeElement.value.trim();
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
