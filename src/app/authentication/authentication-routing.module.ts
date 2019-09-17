import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login';
import {HomeComponent} from './components/home/home.component';
import {AuthenticationGuard} from './guards';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {breadcrumb: 'Login'}
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthenticationGuard],
        data: {breadcrumb: 'home'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
