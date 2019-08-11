import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_USER} from '../../../configuration';
import {User} from '../../models/user';

@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {


    areaTitle = 'Users';

    storeTitle = 'User';
    datastore: DatastoreService<User> | null;
    entity = User;
    adapter: (item: any) => User = new User().adapter;
    tableDefinition: TableDefinition<User> = new User().table_definition();
    dataSource: MatTableDataSource<User> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<User>(
            User,
            API_RESOURCES_USER,
            this.injector
        ).setAdpter(new User().adapter);

    }

}
