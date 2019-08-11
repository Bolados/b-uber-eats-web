import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {RestaurantMenu, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_RESTAURANTS_MENUS} from '../../../configuration';

@Component({
    selector: 'app-restaurant-menu-layout',
    templateUrl: './restaurant-menu-layout.component.html',
    styleUrls: ['./restaurant-menu-layout.component.scss']
})
export class RestaurantMenuLayoutComponent implements OnInit {


    areaTitle = 'Restaurants Menus';

    storeTitle = 'Restaurants Menu';
    datastore: DatastoreService<RestaurantMenu> | null;
    entity = RestaurantMenu;
    adapter: (item: any) => RestaurantMenu = new RestaurantMenu().adapter;
    tableDefinition: TableDefinition<RestaurantMenu> = new RestaurantMenu().table_definition();
    dataSource: MatTableDataSource<RestaurantMenu> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<RestaurantMenu>(
            RestaurantMenu,
            API_RESOURCES_RESTAURANTS_MENUS,
            this.injector
        ).setAdpter(new RestaurantMenu().adapter);

    }

}
