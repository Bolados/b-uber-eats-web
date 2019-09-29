import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../../authentication/guards';
import {dataRouteMapper} from '../../_config/route.mapper';
import {EATER_APPLICATION} from '../../_config/app.configuration';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        // component: AreaAdminComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./area-eater-login').then(m => m.AreaEaterLoginModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('../area-admin/dashboard/dashboard.module').then(m => m.DashboardModule),
                // canLoad: [AuthenticationGuard],
                canActivate: [AuthenticationGuard],
                canActivateChild: [AuthenticationGuard],
                data: {
                    breadcrumb: 'Dashboard'
                }
            },
        ].map(value => dataRouteMapper(value, EATER_APPLICATION))
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaEaterRoutingModule {
}
