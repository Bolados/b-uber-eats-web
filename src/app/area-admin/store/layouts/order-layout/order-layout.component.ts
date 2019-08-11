import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Order, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_ORDER} from '../../../configuration';

@Component({
    selector: 'app-order-layout',
    templateUrl: './order-layout.component.html',
    styleUrls: ['./order-layout.component.scss']
})
export class OrderLayoutComponent implements OnInit {


    areaTitle = 'Orders';

    storeTitle = 'Order';
    datastore: DatastoreService<Order> | null;
    entity = Order;
    adapter: (item: any) => Order = new Order().adapter;
    tableDefinition: TableDefinition<Order> = new Order().table_definition();
    dataSource: MatTableDataSource<Order> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Order>(
            Order,
            API_RESOURCES_ORDER,
            this.injector
        ).setAdpter(new Order().adapter);

    }

}
