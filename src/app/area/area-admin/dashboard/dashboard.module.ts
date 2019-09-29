import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from 'src/app/shared';
import {CoreModule} from 'src/app/core';
import {AreaAdminCommonsModule} from '../area-admin-commons';
import {DashboardLayoutComponent} from './dashboard-layout';

@NgModule({
    declarations: [
        DashboardLayoutComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,

        DashboardRoutingModule,
        AreaAdminCommonsModule
    ]
})
export class DashboardModule {
}
