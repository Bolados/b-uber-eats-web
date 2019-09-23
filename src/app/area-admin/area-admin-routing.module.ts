import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard/dashboard-layout/dashboard-layout.component';
import {AuthenticationGuard} from '../authentication/guards';
import {API_NAME} from '../_config/api.configuration';

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
                // canLoad: [AuthenticationGuard],
                canActivate: [AuthenticationGuard],
                data: {
                    breadcrumb: 'Dashboard'
                }
            },
            {
                path: 'store',
                loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
                // canLoad: [AuthenticationGuard],
                canActivate: [AuthenticationGuard],
                data: {breadcrumb: 'Store'}
            },
            {
                path: 'about',
                component: DashboardLayoutComponent,
                data: {breadcrumb: 'About'}
            },
            {
                path: 'github',
                data: {breadcrumb: 'GitHub'},
                children: [
                    {
                        path: '',
                        component: DashboardLayoutComponent
                    },
                    {
                        path: 'org',
                        data: {breadcrumb: 'Organisation'},

                        children: [
                            {
                                path: '',
                                component: DashboardLayoutComponent
                            },
                            {
                                path: 'repo',
                                component: DashboardLayoutComponent,
                                data: {breadcrumb: 'Repo'}
                            }
                        ]
                    }
                ],
            },


        ].map(value => {
            const data = <any> {};
            data.application = API_NAME.toLowerCase();
            data.baseLoginUrl = 'admin';
            data.breadcrumb = value.data ? value.data.breadcrumb : null;
            value.data = data;
            return value;
        })
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaAdminRoutingModule {
}
