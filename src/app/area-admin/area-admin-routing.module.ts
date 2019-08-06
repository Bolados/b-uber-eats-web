import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard/dashboard-layout/dashboard-layout.component';

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
                path: 'login',
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
                data: {breadcrumb: 'login'}
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                // canLoad: [AuthGuardService]
                data: {breadcrumb: 'Dashboard'}
            },
            {
                path: 'store',
                loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
                // canLoad: [AuthGuardService]
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


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaAdminRoutingModule {
}
