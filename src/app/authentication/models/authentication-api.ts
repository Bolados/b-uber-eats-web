import {Resource} from '@lagoshny/ngx-hal-client';

export class AuthenticationApi extends Resource {

    token: string;
    application: any;

    adapter(item: any): any {
        return item;
    }
}
