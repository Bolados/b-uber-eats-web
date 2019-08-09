import {DatastoreService} from '../../services';
import {Resource} from '@lagoshny/ngx-hal-client';
import {TableDefinition} from '../../models';
import {RelatedStore} from '../../components/datastore';

export enum DatastoreDialogType {
    UPDATE = 'Update',
    SAVE = 'Create New',
    DETAILS = 'Details of'
}

export interface DatastoreDialogInputData<T extends Resource> {
    title: string;
    kind: DatastoreDialogType;
    data: T;
    tableDefinition: TableDefinition<T>;
    relatedData: Array<RelatedData>;
}

export interface RelatedData {
    name: string;
    data: Array<any>;
    entity: new () => any;
    adapter?: (item: any) => any;
    tableDefinition: TableDefinition<any>;
    relatedStore?: Array<RelatedStore<any>>;
    datastore: DatastoreService<any>;
}
