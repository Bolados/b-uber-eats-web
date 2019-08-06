import { Component, OnInit, Injector } from '@angular/core';
import { OrderStatus } from '../../models';
import { DatastoreService } from '../../services';
import { TableDefinition } from '../../models/table-definition.model';
import { MatTableDataSource } from '@angular/material';
import { API_RESOURCES_ORDERS_STATUS } from 'src/app/area-admin/configuration';

@Component({
  selector: 'app-order-status-layout',
  templateUrl: './order-status-layout.component.html',
  styleUrls: ['./order-status-layout.component.scss']
})
export class OrderStatusLayoutComponent implements OnInit {

    areaTitle = 'Orders Status';

    storeTitle = 'Orders Statut';
    datastore: DatastoreService<OrderStatus> | null;
    entity = OrderStatus;
    adapter: (item: any) => OrderStatus = new OrderStatus().adapter;
    tableDefinition: TableDefinition<OrderStatus> = new OrderStatus().table_definition();
    dataSource: MatTableDataSource<OrderStatus> | null ;

    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<OrderStatus>(
            OrderStatus,
            API_RESOURCES_ORDERS_STATUS,
            this.injector
        );
    }

}
