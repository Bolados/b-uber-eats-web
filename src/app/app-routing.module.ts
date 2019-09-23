import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {API_NAME} from './_config/api.configuration';


const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'admin',
    //     pathMatch: 'full'
    // },
    {
        path: API_NAME + '/admin',
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
