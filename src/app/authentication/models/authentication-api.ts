import {Resource} from '@lagoshny/ngx-hal-client';
import {Application} from './application';

export class AuthenticationApi extends Resource {

    token: string;
    application: Application;

    adapter(item: any): any {
        return item;
    }
}
