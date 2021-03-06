import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AreaEaterLoginLayoutComponent} from './area-eater-login-layout/area-eater-login-layout.component';
import {authenticationRoutes} from '../../../_routes/authentication.routes';


const routes: Routes = authenticationRoutes(AreaEaterLoginLayoutComponent);


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaEaterLoginRoutingModule {
}
