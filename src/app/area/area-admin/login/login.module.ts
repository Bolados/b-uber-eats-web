import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginLayoutComponent} from './login-layout/login-layout.component';
import {SharedModule} from '../../../shared';
import {CoreModule} from '@angular/flex-layout';
import {LoginRoutingModule} from './login-routing.module';
import {AuthenticationModule} from '../../../authentication';

@NgModule({
    declarations: [LoginLayoutComponent],
    imports: [
        CommonModule,

        LoginRoutingModule,
        AuthenticationModule,
        SharedModule,
        CoreModule
    ]
})
export class LoginModule {
}
