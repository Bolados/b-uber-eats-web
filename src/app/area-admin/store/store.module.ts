import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreRoutingModule} from './store-routing.module';
import {SharedModule} from 'src/app/shared';
import {CoreModule} from '@angular/flex-layout';
import {AreaAdminCommonsModule} from '../area-admin-commons';
import {RegionLayoutComponent} from './layouts/region-layout';
import {DatastoreComponent} from './components/datastore';
import {DatastoreDialogComponent} from './dialogs/datastore-dialog';
import { RoleLayoutComponent } from './layouts/role-layout/role-layout.component';
import { MediaLayoutComponent } from './layouts/media-layout/media-layout.component';
import { OrderStatusLayoutComponent } from './layouts/order-status-layout/order-status-layout.component';
import { PhoneLayoutComponent } from './layouts/phone-layout/phone-layout.component';
import { PaymentModeLayoutComponent } from './layouts/payment-mode-layout/payment-mode-layout.component';


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
