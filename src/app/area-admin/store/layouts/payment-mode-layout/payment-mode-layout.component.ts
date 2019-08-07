import {Component, Injector, OnInit} from '@angular/core';
import {PaymentMode, TableDefinition} from '../../models';
import {DatastoreService} from '../../services';
import {MatTableDataSource} from '@angular/material';
import {API_RESOURCES_PAYMENTS_MODE} from 'src/app/area-admin/configuration';

@Component({
  selector: 'app-payment-mode-layout',
  templateUrl: './payment-mode-layout.component.html',
  styleUrls: ['./payment-mode-layout.component.scss']
})
export class PaymentModeLayoutComponent implements OnInit {

    areaTitle = 'Payment Modes';

    storeTitle = 'Payment Mode';
    datastore: DatastoreService<PaymentMode> | null;
    entity = PaymentMode;
    adapter: (item: any) => PaymentMode = new PaymentMode().adapter;
    tableDefinition: TableDefinition<PaymentMode> = new PaymentMode().table_definition();
    dataSource: MatTableDataSource<PaymentMode> | null ;

    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<PaymentMode>(
            PaymentMode,
            API_RESOURCES_PAYMENTS_MODE,
            this.injector
        );
    }
}
