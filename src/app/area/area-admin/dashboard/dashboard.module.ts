import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from 'src/app/shared';
import {CoreModule} from 'src/app/core';
import {DashboardLayoutComponent} from './dashboard-layout';
import {AreaSharedModule} from '../../area-shared';

@NgModule({
    declarations: [
        DashboardLayoutComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,

        DashboardRoutingModule,
        AreaSharedModule
    ]
})
export class DashboardModule {
}
