import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationRoutes} from '../../../authentication/authentication-routing.module';
import {AreaRestaurantLoginLayoutComponent} from './area-restaurant-login-layout/area-restaurant-login-layout.component';

const routes: Routes = authenticationRoutes(AreaRestaurantLoginLayoutComponent);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaRestaurantLoginRoutingModule {
}
