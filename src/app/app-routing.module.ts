import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {API_NAME} from './_config/api.configuration';
import {RoleName} from './authentication/models';


function path(appName: string, roleName: string = null) {
    if (roleName === null) {
        roleName = '';
    }
    if (appName === null) {
        appName = '';
    }
    return appName.toLowerCase() + '/' + roleName.toLowerCase();
}

const routes: Routes = [
    // {
    //     // path: path(API_NAME),
    //     // redirectTo: 'admin',
    //     // pathMatch: 'full'
    // },
    {
        path: path(API_NAME),
        loadChildren: () => import('./area-admin/area-admin.module').then(m => m.AreaAdminModule)
    },
    {
        path: path(API_NAME, RoleName.ADMIN.toString()),
        loadChildren: () => import('./area-admin/area-admin.module').then(m => m.AreaAdminModule)
    },
    {
        path: API_NAME,
        loadChildren: () => import('./area-admin/area-admin.module').then(m => m.AreaAdminModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes,
            {
                useHash: true,
                scrollPositionRestoration: 'enabled',
            })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
