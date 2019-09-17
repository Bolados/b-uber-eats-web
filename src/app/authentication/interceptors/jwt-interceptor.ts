import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationUser} from '../models/authentication-user';
import {AuthenticationApi} from '../models/authentication-api';
import {InterceptorSkipHeader} from '../interceptors/skip-interceptor';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.headers.has(InterceptorSkipHeader)) {
            const headers = request.headers.delete(InterceptorSkipHeader);
            return next.handle(request.clone({headers}));
        }

        // add authorization header with jwt token if available
        let api: AuthenticationApi = this.authenticationService.authenticationApi;
        const currentUser: AuthenticationUser = this.authenticationService.currentUserValue;
        let Authorization = null;
        let API_KEY = null;
        if (api && api.token) {
        } else {
            this.authenticationService.api();
            api = this.authenticationService.authenticationApi;
        }
        API_KEY = `Bearer ${api.token}`;
        if (currentUser && currentUser.token) {
            Authorization = `Bearer ${currentUser.token}`;
        }
        request = request.clone({
            setHeaders: {
                API_KEY,
                Authorization
            }
        });
        // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        //
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


        console.log('interceptor request', request);

        return next.handle(request);
    }
}
