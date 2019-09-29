import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AreaDriverLoginLayoutComponent} from './area-driver-login-layout/area-driver-login-layout.component';
import {authenticationRoutes} from '../../../_routes/authentication.routes';


const routes: Routes = authenticationRoutes(AreaDriverLoginLayoutComponent);


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaDriverLoginRoutingModule {
}
