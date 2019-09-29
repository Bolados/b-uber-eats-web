import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared';
import {CoreModule} from '../../../core';
import {BaseAreaAdminComponent} from './base-area-admin';


@NgModule({
  declarations: [
      BaseAreaAdminComponent
  ],
  imports: [
    CommonModule,
      SharedModule,
      CoreModule,
  ],
    exports: [
        BaseAreaAdminComponent
    ]
})
export class AreaAdminCommonsModule { }
