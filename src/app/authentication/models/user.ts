import {Avatar} from '../../core/domains/models';
import {Application} from './application';
import {Role} from './role';

export class User {

    public identifier: Identifier;
    public credentials: Credentials;
    public details: Details;
    public application: Application;
    public role: Role;
}

export class Identifier {
    public email: string;
    public login: string;
    public phone: Phone;
}

export class Phone {
    public number: string;
}

export class Details {
    public name: string;
    public firstname: string;
    public lastname: string;
    public avatar: Avatar;
}

export class Credentials {
    public enabled: boolean;
    public password: string;

}

export class Media {
    public name: string;
    public type: string;
    public resource: string;
}
