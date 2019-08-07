import {Component, Injector, OnInit} from '@angular/core';
import {Role, TableDefinition} from '../../models';
import {DatastoreService} from '../../services';
import {MatTableDataSource} from '@angular/material';
import {API_RESOURCES_USERS_ROLE} from 'src/app/area-admin/configuration';

@Component({
  selector: 'app-role-layout',
  templateUrl: './role-layout.component.html',
  styleUrls: ['./role-layout.component.scss']
})
export class RoleLayoutComponent implements OnInit {

    areaTitle = 'Users Roles';

    storeTitle = 'Users Role';
    datastore: DatastoreService<Role> | null;
    entity = Role;
    adapter: (item: any) => Role = new Role().adapter;
    tableDefinition: TableDefinition<Role> = new Role().table_definition();
    dataSource: MatTableDataSource<Role> | null ;

    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Role>(
            Role,
            API_RESOURCES_USERS_ROLE,
            this.injector
        );
    }

}
