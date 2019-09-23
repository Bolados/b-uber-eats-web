import {Resource} from '@lagoshny/ngx-hal-client';
import {User} from './user';

export class AuthenticationUser extends Resource {

    public token: string;
    public user: User;

    adapter(item: any): any {
        return item;
    }
}
