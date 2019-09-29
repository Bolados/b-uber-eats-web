import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../../authentication/guards';


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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaEaterRoutingModule {
}
