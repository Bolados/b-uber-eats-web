import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthenticationRequest, RoleName} from '../models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_AUTHENTICATION_URL, API_KEY_URL} from '../../area/area-admin/configuration';
import {map} from 'rxjs/operators';
import {AuthenticationUser} from '../models/authentication-user';
import {AuthenticationApi} from '../models/authentication-api';
import {InterceptorSkipHeader} from '../interceptors/skip-interceptor';
import {Router} from '@angular/router';
import {LOGIN_PATH} from '../../_routes/path.routes';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public currentUser: Observable<AuthenticationUser>;
    private currentUserSubject: BehaviorSubject<AuthenticationUser>;
    private apiKeySubject: BehaviorSubject<AuthenticationApi>;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.currentUserSubject =
            new BehaviorSubject<AuthenticationUser>(
                JSON.parse(localStorage.getItem('currentUser'))
            );
        this.apiKeySubject =
            new BehaviorSubject<AuthenticationApi>(
                JSON.parse(localStorage.getItem('authenticationApi'))
            );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AuthenticationUser {
        return this.currentUserSubject.value;
    }

    public get authenticationApi(): any {
        return this.apiKeySubject.value;
    }

    get userLoginUrl() {
        let link = '/';
        if (this.currentUserValue) {
            link += this.currentUserValue.user.application.name.toLowerCase() + '/';
            if (this.currentUserValue.user.role.name.toString().toLowerCase() !== RoleName.USER.toString().toLowerCase()) {
                link += RoleName.ADMIN.toString().toLowerCase() + '/';
            }
        }
        return link + LOGIN_PATH;
    }

    get userHomeUrl() {
        let link = '/';
        if (this.currentUserValue) {
            link += this.currentUserValue.user.application.name.toLowerCase() + '/';
            if (this.currentUserValue.user.role.name.toString().toLowerCase() !== RoleName.USER.toString().toLowerCase()) {
                link += RoleName.ADMIN.toString().toLowerCase() + '/';
            }
        }
        return link;
    }
    async api() {
        const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
        await this.http.get<any>(API_KEY_URL, {headers})
            .pipe(map(api => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('authenticationApi', JSON.stringify(api));
                this.apiKeySubject.next(api);
                return api;
            })).toPromise();
    }

    login(request: AuthenticationRequest) {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
        ;
        const body = JSON.stringify(request);
        return this.http.post<any>(API_AUTHENTICATION_URL, body, {headers})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // const userLoginUrl = this.userLoginUrl;
        this.currentUserSubject.next(null);
    }
}
