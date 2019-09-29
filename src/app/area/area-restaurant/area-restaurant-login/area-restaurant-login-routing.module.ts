import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AreaRestaurantLoginLayoutComponent} from './area-restaurant-login-layout/area-restaurant-login-layout.component';
import {authenticationRoutes} from '../../../_routes/authentication.routes';

const routes: Routes = authenticationRoutes(AreaRestaurantLoginLayoutComponent);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaRestaurantLoginRoutingModule {
}
