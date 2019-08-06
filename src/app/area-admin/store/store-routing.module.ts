import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RegionLayoutComponent } from './layouts/region-layout/region-layout.component';
import { MediaLayoutComponent, OrderStatusLayoutComponent, PaymentModeLayoutComponent, RoleLayoutComponent, PhoneLayoutComponent } from './layouts';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'regions',
        pathMatch: 'full'
    },
    {
        path: 'regions',
        component: RegionLayoutComponent,
        data: {breadcrumb: 'Regions'}
    },
    {
        path: 'media',
        component: MediaLayoutComponent,
        data: {breadcrumb: 'Media'}
    },
    {
        path: 'orders/status',
        component: OrderStatusLayoutComponent,
        data: {breadcrumb: 'Orders Status'}
    },
    {
        path: 'payments/mode',
        component: PaymentModeLayoutComponent,
        data: {breadcrumb: 'Payment Mode'}
    },
    {
        path: 'users/roles',
        component: RoleLayoutComponent,
        data: {breadcrumb: 'Users Roles'}
    },
    {
        path: 'phones',
        component: PhoneLayoutComponent,
        data: {breadcrumb: 'Phones'}
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class StoreRoutingModule {
}
