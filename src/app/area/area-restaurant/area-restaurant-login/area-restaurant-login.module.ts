import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaRestaurantLoginRoutingModule} from './area-restaurant-login-routing.module';
import {AreaRestaurantLoginLayoutComponent} from './area-restaurant-login-layout/area-restaurant-login-layout.component';
import {AuthenticationModule} from '../../../authentication';
import {SharedModule} from '../../../shared';
import {CoreModule} from '@angular/flex-layout';


@NgModule({
    declarations: [
        AreaRestaurantLoginLayoutComponent
    ],
    exports: [
        AreaRestaurantLoginLayoutComponent
    ],
    imports: [
        CommonModule,
        AreaRestaurantLoginRoutingModule,
        AuthenticationModule,
        SharedModule,
        CoreModule
    ]
})
export class AreaRestaurantLoginModule {
}
