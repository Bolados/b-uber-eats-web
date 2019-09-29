import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared';
import {CoreModule} from '@angular/flex-layout';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LogoutComponent} from './components/logout/logout.component';


@NgModule({
    declarations: [LoginComponent, LogoutComponent],
    exports: [
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        SharedModule,
        CoreModule,
    ]
})
export class AuthenticationModule {
}
