import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MediaLayoutComponent,
    OrderStatusLayoutComponent,
    PaymentModeLayoutComponent,
    PhoneLayoutComponent,
    RegionLayoutComponent,
    RoleLayoutComponent
} from './layouts';
import {CountryLayoutComponent} from './layouts/country-layout';
import {DepartmentLayoutComponent} from './layouts/department-layout';
import {DistrictLayoutComponent} from './layouts/district-layout';
import {TownLayoutComponent} from './layouts/town-layout';

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
        path: 'medias',
        component: MediaLayoutComponent,
        data: {breadcrumb: 'Medias'}
    },
    {
        path: 'orders/status',
        component: OrderStatusLayoutComponent,
        data: {breadcrumb: 'Orders Status'}
    },
    {
        path: 'payments/modes',
        component: PaymentModeLayoutComponent,
        data: {breadcrumb: 'Payments Modes'}
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
    },
    {
        path: 'countries',
        component: CountryLayoutComponent,
        data: {breadcrumb: 'Countries'}
    },
    {
        path: 'departments',
        component: DepartmentLayoutComponent,
        data: {breadcrumb: 'Departments'}
    },
    {
        path: 'districts',
        component: DistrictLayoutComponent,
        data: {breadcrumb: 'Districts'}
    },
    {
        path: 'towns',
        component: TownLayoutComponent,
        data: {breadcrumb: 'Towns'}
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
