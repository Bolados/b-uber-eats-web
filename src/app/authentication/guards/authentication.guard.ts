import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthenticationService} from '../services';
import {Observable} from 'rxjs';
import {LOGIN_PATH} from '../_config/config';
import {Role, RoleName} from '../models';

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
            const userRole = currentUser.user.role;
            // logged in so return true
            if (RoleName.ADMIN.toString().toLowerCase() !== userRole.name.toString().toLowerCase()) {
                console.log('can load');
                console.log('can load');
                if (route.data.roles) {
                    const roles = route.data.roles.split(',');
                    const size = roles.filter(
                        value => value.toLowerCase() === userRole.name.toString().toLowerCase()
                    ).length;
                    return size === 1;
                }
            }
            return true;
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
        const roles: Array<string> = route.data.roles.split(',');
        if (currentUser) {
            const userRole = currentUser.user.role;
            // logged in so return true
            if (RoleName.ADMIN.toString().toLowerCase() !== userRole.name.toString().toLowerCase()) {
                console.log('can load');
                console.log('can load');
                const size = roles.filter(
                    value => value.toLowerCase() === userRole.name.toString().toLowerCase()
                ).length;
                return size === 1;
            }
            return true;
        }
        return false;
    }
}
