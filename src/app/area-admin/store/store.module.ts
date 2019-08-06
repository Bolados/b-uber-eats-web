import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreRoutingModule} from './store-routing.module';
import {SharedModule} from 'src/app/shared';
import {CoreModule} from '@angular/flex-layout';
import {AreaAdminCommonsModule} from '../area-admin-commons';
import {RegionLayoutComponent} from './layouts/region-layout';
import {DatastoreComponent} from './components/datastore';
import {DatastoreDialogComponent} from './dialogs/datastore-dialog';


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
