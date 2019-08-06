import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAreaAdminComponent } from './base-area-admin/base-area-admin.component';
import {SharedModule} from '../../shared';
import {CoreModule} from '../../core';



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
