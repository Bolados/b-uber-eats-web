import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard-layout';
import {dashboardRoutes} from '../../../_routes/daashboard.routes';

const routes: Routes = dashboardRoutes(DashboardLayoutComponent);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
