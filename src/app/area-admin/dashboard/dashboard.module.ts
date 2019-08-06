import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {SharedModule} from 'src/app/shared';
import {CoreModule} from 'src/app/core';
import {AreaAdminCommonsModule} from '../area-admin-commons';

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
