import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationRoutes} from '../../../authentication/authentication-routing.module';
import {AreaDriverLoginLayoutComponent} from './area-driver-login-layout/area-driver-login-layout.component';


const routes: Routes = authenticationRoutes(AreaDriverLoginLayoutComponent);


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaDriverLoginRoutingModule {
}
