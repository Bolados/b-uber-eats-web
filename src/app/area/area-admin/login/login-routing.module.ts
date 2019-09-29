import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginLayoutComponent} from './login-layout/login-layout.component';
import {authenticationRoutes} from '../../../authentication/authentication-routing.module';

const routes: Routes = authenticationRoutes(LoginLayoutComponent);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
