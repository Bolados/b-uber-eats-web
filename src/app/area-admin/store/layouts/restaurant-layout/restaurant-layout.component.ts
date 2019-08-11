import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Restaurant, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_RESTAURANTS} from '../../../configuration';

@Component({
    selector: 'app-restaurant-layout',
    templateUrl: './restaurant-layout.component.html',
    styleUrls: ['./restaurant-layout.component.scss']
})
export class RestaurantLayoutComponent implements OnInit {

    areaTitle = 'Restaurants';

    storeTitle = 'Restaurant';
    datastore: DatastoreService<Restaurant> | null;
    entity = Restaurant;
    adapter: (item: any) => Restaurant = new Restaurant().adapter;
    tableDefinition: TableDefinition<Restaurant> = new Restaurant().table_definition();
    dataSource: MatTableDataSource<Restaurant> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Restaurant>(
            Restaurant,
            API_RESOURCES_RESTAURANTS,
            this.injector
        ).setAdpter(new Restaurant().adapter);

    }

}
