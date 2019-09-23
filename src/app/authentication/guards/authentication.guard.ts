import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthenticationService} from '../services';
import {Observable} from 'rxjs';
import {LOGIN_PATH} from '../authentication-routing.module';

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
        if (currentUser) {
            // logged in so return true
            return true;
        }

        const roles = route.data.roles as Array<string>;
        const baseLoginUrl = route.data.baseLoginUrl as string;
        const application = route.data.application as string;
        const loginUrl = application + '/' + baseLoginUrl + '/' + LOGIN_PATH;
        // not logged in so redirect to login page with the return url
        this.router.navigate([loginUrl], {queryParams: {returnUrl: state.url}});
        return false;
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        return false;
    }
}
