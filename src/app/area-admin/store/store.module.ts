import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { RegionLayoutComponent } from './layouts/region-layout/region-layout.component';
import { SharedModule } from 'src/app/shared';
import { CoreModule } from '@angular/flex-layout';
import { AreaAdminCommonsModule } from '../area-admin-commons';
import { DatastoreComponent } from './components/datastore/datastore.component';
import { DatastoreDialogComponent } from './dialogs/datastore-dialog/datastore-dialog.component';


@NgModule({
    declarations: [
        RegionLayoutComponent,
        DatastoreComponent,
        DatastoreDialogComponent
    ],
    entryComponents: [
        DatastoreDialogComponent
    ],
    imports: [
        CommonModule,
        StoreRoutingModule,

        SharedModule,
        CoreModule,

        AreaAdminCommonsModule,

    ]
})
export class StoreModule { }
