import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Menu, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_MENU} from '../../../configuration';

@Component({
    selector: 'app-menu-layout',
    templateUrl: './menu-layout.component.html',
    styleUrls: ['./menu-layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {


    areaTitle = 'Menus';

    storeTitle = 'Menu';
    datastore: DatastoreService<Menu> | null;
    entity = Menu;
    adapter: (item: any) => Menu = new Menu().adapter;
    tableDefinition: TableDefinition<Menu> = new Menu().table_definition();
    dataSource: MatTableDataSource<Menu> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Menu>(
            Menu,
            API_RESOURCES_MENU,
            this.injector
        ).setAdpter(new Menu().adapter);

    }


}
