import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RegionLayoutComponent } from './layouts/region-layout/region-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'regions',
        pathMatch: 'full'
    },
    {
        path: 'regions',
        component: RegionLayoutComponent,
        data: {breadcrumb: 'Regions'}
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class StoreRoutingModule {
}
