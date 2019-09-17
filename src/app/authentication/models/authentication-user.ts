import {Resource} from '@lagoshny/ngx-hal-client';

export class AuthenticationUser extends Resource {

    token: string;
    user: any;

    adapter(item: any): any {
        return item;
    }
}
