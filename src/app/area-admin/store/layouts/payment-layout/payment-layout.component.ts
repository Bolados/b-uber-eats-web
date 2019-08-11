import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Payment, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_PAYMENT} from '../../../configuration';

@Component({
    selector: 'app-payment-layout',
    templateUrl: './payment-layout.component.html',
    styleUrls: ['./payment-layout.component.scss']
})
export class PaymentLayoutComponent implements OnInit {


    areaTitle = 'Payments';

    storeTitle = 'Payment';
    datastore: DatastoreService<Payment> | null;
    entity = Payment;
    adapter: (item: any) => Payment = new Payment().adapter;
    tableDefinition: TableDefinition<Payment> = new Payment().table_definition();
    dataSource: MatTableDataSource<Payment> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Payment>(
            Payment,
            API_RESOURCES_PAYMENT,
            this.injector
        ).setAdpter(new Payment().adapter);

    }

}
