import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard/dashboard-layout/dashboard-layout.component';
import {AuthenticationGuard} from '../../authentication/guards';
import {API_NAME} from '../../_config/api.configuration';
import {RoleName} from '../../authentication/models';
import {dataRouteMapper} from '../../_config/route.mapper';

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
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthenticationGuard],
                canLoad: [AuthenticationGuard],
                data: {
                    breadcrumb: 'Dashboard',
                    roles: [RoleName.USER, RoleName.ADMIN]
                }
            },
            {
                path: 'store',
                loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
                canLoad: [AuthenticationGuard],
                canActivate: [AuthenticationGuard],
                data: {
                    breadcrumb: 'Store',
                    roles: [RoleName.ADMIN]
                }
            },
            {
                path: 'about',
                component: DashboardLayoutComponent,
                data: {
                    breadcrumb: 'About',
                    roles: [RoleName.USER, RoleName.ADMIN]
                }
            },
            // {
            //     path: 'github',
            //     data: {breadcrumb: 'GitHub'},
            //     children: [
            //         {
            //             path: '',
            //             component: DashboardLayoutComponent
            //         },
            //         {
            //             path: 'org',
            //             data: {breadcrumb: 'Organisation'},
            //
            //             children: [
            //                 {
            //                     path: '',
            //                     component: DashboardLayoutComponent
            //                 },
            //                 {
            //                     path: 'repo',
            //                     component: DashboardLayoutComponent,
            //                     data: {breadcrumb: 'Repo'}
            //                 }
            //             ]
            //         }
            //     ],
            // },


        ].map(value => dataRouteMapper(value, API_NAME))
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaAdminRoutingModule {
}
