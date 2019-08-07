import { Component, OnInit, Injector } from '@angular/core';
import { DatastoreService } from '../../services';
import { TableDefinition, Region } from '../../models';
import { Country } from '../../models';
import { MatTableDataSource } from '@angular/material';
import { API_RESOURCES_COUNTRY, API_RESOURCES_REGION } from 'src/app/area-admin/configuration';
import { RelatedStore } from '../../components';



@Component({
  selector: 'app-country-layout',
  templateUrl: './country-layout.component.html',
  styleUrls: ['./country-layout.component.scss']
})
export class CountryLayoutComponent implements OnInit {

    areaTitle = 'Countries';

    storeTitle = 'Country';
    datastore: DatastoreService<Country> | null;
    entity = Country;
    adapter: (item: any) => Country = new Country().adapter;
    tableDefinition: TableDefinition<Country> = new Country().table_definition();
    dataSource: MatTableDataSource<Country> | null ;

    get relatedStores(): Array<RelatedStore<any>> {
        return [
            {
                name: Region.relation,
                datastore: new DatastoreService<Region>(
                    Region,
                    API_RESOURCES_REGION,
                    this.injector
                )
                // .setAdpter(new Region().adapter),
            }
        ];
    }
    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Country>(
            Country,
            API_RESOURCES_COUNTRY,
            this.injector
        ).setAdpter(new Country().adapter);

    }
}
