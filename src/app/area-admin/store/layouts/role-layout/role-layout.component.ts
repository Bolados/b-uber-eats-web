import { Component, OnInit, Injector } from '@angular/core';
import { Role } from '../../models';
import { DatastoreService } from '../../services';
import { TableDefinition } from '../../models/table-definition.model';
import { MatTableDataSource } from '@angular/material';
import { API_RESOURCES_USERS_ROLE } from 'src/app/area-admin/configuration';

@Component({
  selector: 'app-role-layout',
  templateUrl: './role-layout.component.html',
  styleUrls: ['./role-layout.component.scss']
})
export class RoleLayoutComponent implements OnInit {

    areaTitle = 'Phones';

    storeTitle = 'Phone';
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
