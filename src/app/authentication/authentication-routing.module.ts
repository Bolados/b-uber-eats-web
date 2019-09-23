import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthenticationGuard} from './guards';

export const LOGIN_PATH = 'login';
export const LOGOUT_PATH = 'logout';

export function authenticationRoutes(loginComponent: any): Routes {
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
}

const routes: Routes = authenticationRoutes(LoginComponent);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
