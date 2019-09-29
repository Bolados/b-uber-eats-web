import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaTemplateComponent} from './area-template';
import {SharedModule} from '../../shared';
import {CoreModule} from '../../core';
import {UserProfileComponent} from './user-profile';


@NgModule({
    declarations: [
        AreaTemplateComponent,
        UserProfileComponent
    ],
    exports: [
        AreaTemplateComponent,
        UserProfileComponent
    ],
    imports: [
        CommonModule,

        SharedModule,
        CoreModule,
    ]
})
export class AreaSharedModule {
}
