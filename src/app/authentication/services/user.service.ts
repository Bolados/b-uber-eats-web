import {Injectable} from '@angular/core';
import {User} from '../models';
import {HttpClient} from '@angular/common/http';
import {API_RESOURCES_USER} from '../../area-admin/configuration';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<User[]>(`${API_RESOURCES_USER}`);
    }
}
