import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthenticationRequest} from '../models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_AUTHENTICATION_URL, API_KEY_URL} from '../../area-admin/configuration';
import {map} from 'rxjs/operators';
import {AuthenticationUser} from '../models/authentication-user';
import {AuthenticationApi} from '../models/authentication-api';
import {InterceptorSkipHeader} from '../interceptors/skip-interceptor';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public currentUser: Observable<AuthenticationUser>;
    private currentUserSubject: BehaviorSubject<AuthenticationUser>;
    private apiKeySubject: BehaviorSubject<AuthenticationApi>;

    constructor(private http: HttpClient) {
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
        this.currentUserSubject.next(null);
    }
}
