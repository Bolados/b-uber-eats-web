import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login';
import {LogoutComponent} from './components/logout';
import {AuthenticationGuard} from './guards';
import {LOGIN_PATH, LOGOUT_PATH} from './_config/config';

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

const routes: Routes = authenticationRoutes(LoginComponent);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
