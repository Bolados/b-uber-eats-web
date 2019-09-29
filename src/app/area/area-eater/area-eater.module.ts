import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaEaterRoutingModule} from './area-eater-routing.module';
import {AuthenticationModule} from '../../authentication';
import {SharedModule} from '../../shared';
import {CoreModule} from '../../core';
import {AreaEaterLoginModule} from './area-eater-login';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AreaEaterRoutingModule,
        AreaEaterLoginModule,

        AuthenticationModule,
        SharedModule,
        CoreModule,
    ]
})
export class AreaEaterModule {
}
