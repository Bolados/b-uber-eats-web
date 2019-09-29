import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Data, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthenticationService} from '../services';
import {Observable} from 'rxjs';
import {AuthenticationUser, Role, RoleName} from '../models';
import {LOGIN_PATH} from '../../_routes/path.routes';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const application = route.data.application as string;
        if (currentUser) {
            console.log(route.data);

            return this.permissionRoles(route.data, currentUser);
        }


        const role = Role.FromLoginUrl(this.router.url, LOGIN_PATH);
        let loginUrl = LOGIN_PATH;
        if (application) {
            loginUrl = application + '/' + loginUrl;
        }
        if (application && role && role.name.toString().toLowerCase() !== RoleName.USER.toLowerCase()) {
            loginUrl = application + '/' + role.name.toString() + '/' + LOGIN_PATH;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate([loginUrl], {queryParams: {returnUrl: state.url}});
        return false;
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.authenticationService.currentUserValue;
        console.log('can load');
        return this.permissionRoles(route.data, currentUser);
    }

    permissionRoles(data: Data, currentUser: AuthenticationUser) {
        if (currentUser) {
            const user = currentUser.user;
            const userRole = user.role || null;
            if (userRole && RoleName.ADMIN.toString().toLowerCase() !== userRole.name.toString().toLowerCase()) {
                if (data.roles) {
                    return data.roles.filter(
                        value => value.toLowerCase() === userRole.name.toString().toLowerCase()
                    ).length === 1;
                }
            }
        }
        return currentUser !== null;
    }

}
