import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaAdminRoutingModule} from './area-admin-routing.module';
import {SharedModule} from '../../shared';
import {CoreModule} from '../../core';
import {AreaAdminComponent} from './area-admin.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {LoginModule} from './login';
import {AuthenticationModule} from '../../authentication';
import {AreaSharedModule} from '../area-shared';

@NgModule({
    declarations: [
        AreaAdminComponent
    ],
    imports: [
        CommonModule,
        AreaAdminRoutingModule,
        DashboardModule,
        LoginModule,
        AuthenticationModule,
        SharedModule,
        CoreModule,
        AreaSharedModule,
    ],
    providers: [

    ],
})
export class AreaAdminModule {
}
