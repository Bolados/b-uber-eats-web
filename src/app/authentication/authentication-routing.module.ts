import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login';
import {authenticationRoutes} from '../_routes/authentication.routes';

const routes: Routes = authenticationRoutes(LoginComponent);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
