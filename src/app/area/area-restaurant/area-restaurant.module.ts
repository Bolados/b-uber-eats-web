import {AuthenticationModule} from '../../authentication';
import {SharedModule} from '../../shared';
import {CoreModule} from '../../core';
import {AreaRestaurantLoginModule} from './area-restaurant-login';
import {CommonModule} from '@angular/common';
import {AreaRestaurantRoutingModule} from './area-restaurant-routing.module';
import {NgModule} from '@angular/core';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AreaRestaurantRoutingModule,
        AreaRestaurantLoginModule,

        AuthenticationModule,
        SharedModule,
        CoreModule,
    ]
})
export class AreaRestaurantModule {
}
