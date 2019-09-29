import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaDriverLoginRoutingModule} from './area-driver-login-routing.module';
import {AreaDriverLoginLayoutComponent} from './area-driver-login-layout/area-driver-login-layout.component';
import {AuthenticationModule} from '../../../authentication';
import {SharedModule} from '../../../shared';
import {CoreModule} from '@angular/flex-layout';


@NgModule({
    declarations: [AreaDriverLoginLayoutComponent],
    exports: [AreaDriverLoginLayoutComponent],
    imports: [
        CommonModule,
        AreaDriverLoginRoutingModule,
        AuthenticationModule,
        SharedModule,
        CoreModule
    ]
})
export class AreaDriverLoginModule {
}
