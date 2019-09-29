import {UserProfileComponent} from '../area/area-shared/user-profile';
import {PROFILE_PATH} from './path.routes';
import {RoleName} from '../authentication/models';
import {AuthenticationGuard} from '../authentication/guards';
import {Routes} from '@angular/router';

export const dashboardRoutes = (dashboardComponent: any): Routes => {
    return [
        {
            path: '',
            component: dashboardComponent,
            canActivate: [AuthenticationGuard],
            canLoad: [AuthenticationGuard],
            // data: {
            //     breadcrumb: 'Home',
            //     roles: [RoleName.USER, RoleName.ADMIN]
            // }
        },
        {
            path: PROFILE_PATH,
            component: UserProfileComponent,
            canActivate: [AuthenticationGuard],
            canLoad: [AuthenticationGuard],
            data: {
                breadcrumb: 'Profile',
                roles: [RoleName.USER, RoleName.ADMIN]
            }
        },
    ];
};
