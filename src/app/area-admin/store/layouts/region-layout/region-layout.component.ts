import {Component, Injector, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {API_RESOURCES_REGION} from 'src/app/area-admin/configuration/api.configuration';
import {DatastoreService} from '../../services';
import {Region} from '../../models';
import {TableDefinition} from '../../models/table-definition.model';

@Component({
  selector: 'app-region-layout',
  templateUrl: './region-layout.component.html',
  styleUrls: ['./region-layout.component.scss']
})
export class RegionLayoutComponent implements OnInit {

    areaTitle = 'Regions';

    storeTitle = 'Region';
    datastore: DatastoreService<Region> | null;
    entity = Region;
    adapter: (item: any) => Region = new Region().adapter;
    tableDefinition: TableDefinition<Region> = new Region().table_definition();
    dataSource: MatTableDataSource<Region> | null ;

    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Region>(
            Region,
            API_RESOURCES_REGION,
            this.injector
        );
    }
}
