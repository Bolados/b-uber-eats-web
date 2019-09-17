import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {SharedModule} from '../shared';
import {CoreModule} from '@angular/flex-layout';


@NgModule({
    declarations: [LoginComponent, HomeComponent],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,

        SharedModule,
        CoreModule,
    ]
})
export class AuthenticationModule {
}
