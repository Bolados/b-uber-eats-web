import {Component, Injector, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {API_RESOURCES_REGION} from 'src/app/_config/api.configuration';
import {DatastoreService} from '../../services';
import {Region} from '../../models';
import {TableDefinition} from '../../../../../domains/models/meta/table-definition.model';
import {RelatedStore} from '../../components/datastore';

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

    get relatedStores(): Array<RelatedStore<any>> {
        return [];
    }


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
