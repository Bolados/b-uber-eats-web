import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationModule} from '../../authentication';
import {SharedModule} from '../../shared';
import {CoreModule} from '../../core';
import {AreaDriverLoginModule} from './area-driver-login';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,

        AreaDriverLoginModule,
        AuthenticationModule,
        SharedModule,
        CoreModule,
    ]
})
export class AreaDriverModule {
}

