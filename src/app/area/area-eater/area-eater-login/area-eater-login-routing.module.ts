import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationRoutes} from '../../../authentication/authentication-routing.module';
import {AreaEaterLoginLayoutComponent} from './area-eater-login-layout/area-eater-login-layout.component';


const routes: Routes = authenticationRoutes(AreaEaterLoginLayoutComponent);


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaEaterLoginRoutingModule {
}
