import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {API_NAME} from './_config/api.configuration';
import {RoleName} from './authentication/models';


const path = (appName: string, roleName: string = null): string => {
    if (appName === null) {
        appName = '';
    }
    if (roleName === null) {
        return appName.toLowerCase();
    }
    return appName.toLowerCase() + '/' + roleName.toLowerCase();
};

const routes: Routes = [
    // {
    //     // path: path(API_NAME),
    //     // redirectTo: 'admin',
    //     // pathMatch: 'full'
    // },
    {
        path: path(API_NAME),
        loadChildren: () => import('./area/area-admin/area-admin.module').then(m => m.AreaAdminModule)
    },
    {
        path: path(API_NAME, RoleName.ADMIN.toString()),
        loadChildren: () => import('./area/area-admin/area-admin.module').then(m => m.AreaAdminModule)
    },
    {
        path: path('driver'),
        loadChildren: () => import('./area/area-driver').then(m => m.AreaDriverRoutingModule)
    },
    {
        path: path('driver', RoleName.ADMIN.toString()),
        loadChildren: () => import('./area/area-driver/area-driver.module').then(m => m.AreaDriverModule)
    },
    {
        path: path('eater'),
        loadChildren: () => import('./area/area-eater/area-eater.module').then(m => m.AreaEaterModule)
    },
    {
        path: path('eater', RoleName.ADMIN.toString()),
        loadChildren: () => import('./area/area-eater/area-eater.module').then(m => m.AreaEaterModule)
    },
    {
        path: path('restaurant'),
        loadChildren: () => import('./area/area-restaurant/area-restaurant.module').then(m => m.AreaRestaurantModule)
    },
    {
        path: path('restaurant', RoleName.ADMIN.toString()),
        loadChildren: () => import('./area/area-restaurant/area-restaurant.module').then(m => m.AreaRestaurantModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                useHash: true,
                scrollPositionRestoration: 'enabled',
            })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
