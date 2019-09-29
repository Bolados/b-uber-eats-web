import {Routes} from '@angular/router';
import {LogoutComponent} from '../authentication/components/logout';
import {AuthenticationGuard} from '../authentication/guards';
import {LOGIN_PATH, LOGOUT_PATH} from './path.routes';


export const authenticationRoutes = (loginComponent: any): Routes => {
    return [
        {
            path: '',
            redirectTo: LOGIN_PATH,
            pathMatch: 'full'
        },
        {
            path: LOGIN_PATH,
            component: loginComponent,
            data: {breadcrumb: 'Login'}
        },
        {
            path: LOGOUT_PATH,
            component: LogoutComponent,
            canActivate: [AuthenticationGuard],
            data: {breadcrumb: 'Logout'}
        }
    ];
};
