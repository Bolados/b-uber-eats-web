import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreRoutingModule} from './store-routing.module';
import {SharedModule} from 'src/app/shared';
import {CoreModule} from '@angular/flex-layout';
import {AreaAdminCommonsModule} from '../area-admin-commons';
import {DatastoreComponent} from './components/datastore';
import {DatastoreDialogComponent} from './dialogs/datastore-dialog';
import {RegionLayoutComponent} from './layouts/region-layout';
import {RoleLayoutComponent} from './layouts/role-layout';
import {MediaLayoutComponent} from './layouts/media-layout';
import {OrderStatusLayoutComponent} from './layouts/order-status-layout';
import {PhoneLayoutComponent} from './layouts/phone-layout';
import {PaymentModeLayoutComponent} from './layouts/payment-mode-layout';


@NgModule({
    declarations: [
        RegionLayoutComponent,
        DatastoreComponent,
        DatastoreDialogComponent,
        RoleLayoutComponent,
        MediaLayoutComponent,
        OrderStatusLayoutComponent,
        PhoneLayoutComponent,
        PaymentModeLayoutComponent
    ],
    entryComponents: [
        DatastoreDialogComponent
    ],
    imports: [
        CommonModule,
        StoreRoutingModule,

        SharedModule,
        CoreModule,

        AreaAdminCommonsModule,

    ]
})
export class StoreModule { }
