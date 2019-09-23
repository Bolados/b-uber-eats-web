import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard/dashboard-layout/dashboard-layout.component';
import {AuthenticationGuard} from '../authentication/guards';

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
                data: {
                    breadcrumb: 'Store',
                    // ['roles']: [RoleName.ADMIN.toString()].toString()
                }
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
            // const data = <any> {};
            // data.application = API_NAME.toLowerCase();
            // data.roles = [RoleName.USER].toString();
            // if (value.data) {
            //     // if (value.data.roles) {
            //     //     data.roles = [data.roles, value.data.roles].toString();
            //     // }
            //
            //     if (value.data.breadcrumb) {
            //         data.breadcrumb = value.data.breadcrumb;
            //     }
            // }
            // value.data = data;
            // const roles = data.roles.split(',');
            // console.log(roles);
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
