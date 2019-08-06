import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaAdminRoutingModule} from './area-admin-routing.module';
import {SharedModule} from '../shared';
import {CoreModule} from '../core';
import {AreaAdminComponent} from './area-admin.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {AreaAdminCommonsModule} from './area-admin-commons';

@NgModule({
    declarations: [
        AreaAdminComponent
    ],
    imports: [
        CommonModule,
        AreaAdminRoutingModule,
        DashboardModule,
        SharedModule,
        CoreModule,
        AreaAdminCommonsModule,
    ],
    providers: [

    ],
})
export class AreaAdminModule {
}
