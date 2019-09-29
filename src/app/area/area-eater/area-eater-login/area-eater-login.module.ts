import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaEaterLoginRoutingModule} from './area-eater-login-routing.module';
import {AreaEaterLoginLayoutComponent} from './area-eater-login-layout/area-eater-login-layout.component';
import {AuthenticationModule} from '../../../authentication';
import {SharedModule} from '../../../shared';
import {CoreModule} from '@angular/flex-layout';


@NgModule({
    declarations: [AreaEaterLoginLayoutComponent],
    exports: [AreaEaterLoginLayoutComponent],
    imports: [
        CommonModule,
        AreaEaterLoginRoutingModule,
        AuthenticationModule,
        SharedModule,
        CoreModule
    ]
})
export class AreaEaterLoginModule {
}
