import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Phone, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {API_RESOURCES_PHONE} from 'src/app/area-admin/configuration';

@Component({
  selector: 'app-phone-layout',
  templateUrl: './phone-layout.component.html',
  styleUrls: ['./phone-layout.component.scss']
})
export class PhoneLayoutComponent implements OnInit {

    areaTitle = 'Phones';

    storeTitle = 'Phone';
    datastore: DatastoreService<Phone> | null;
    entity = Phone;
    adapter: (item: any) => Phone = new Phone().adapter;
    tableDefinition: TableDefinition<Phone> = new Phone().table_definition();
    dataSource: MatTableDataSource<Phone> | null ;

    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Phone>(
            Phone,
            API_RESOURCES_PHONE,
            this.injector
        );
    }
}
