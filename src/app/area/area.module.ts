import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaAdminModule} from './area-admin';
import {AreaDriverModule} from './area-driver';
import {AreaEaterModule} from './area-eater';
import {AreaRestaurantModule} from './area-restaurant';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AreaAdminModule,
        AreaDriverModule,
        AreaEaterModule,
        AreaRestaurantModule
    ],
    exports: [
        AreaAdminModule,
        AreaDriverModule,
        AreaEaterModule,
        AreaRestaurantModule
    ]

})
export class AreaModule {
}
