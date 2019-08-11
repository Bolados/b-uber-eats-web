import {MetaEntity} from './meta/entitiy.meta';
import {Town} from './town';
import {Phone} from './phone';
import {Address} from './address';
import {Order} from './order';
import {Role} from './role';
import {TableDefinition} from './meta/table-definition.model';

export class User extends MetaEntity<User> {

    static entity = 'user';
    static relation = 'user';

    static fieldRelation = [
        'login',
        'email',
        'phone.number'
    ];

    phone: Phone = new Phone();
    email: string = null;
    login: string = null;
    password: string = null;
    name: string = null;

    localResidenceAddress: Address = null;
    localLocationAddress: Address = null;
    localDelivery: Address = null;

    orders: Array<Order> = [];
    savedAddresses: Array<Address> = [];
    roles: Array<Role> = [];


    get residence(): Address {
        if (this.residence === null) {
            this.getRelation(Address, Address.relation).subscribe(
                (data: Address) => {
                    this.localResidenceAddress = data;
                },
                (err) => console.log('error on load town ', err)
            );
        }

        return this.localResidenceAddress;
    }

    set residence(address: Address) {
        this.localResidenceAddress = address;
    }

    get location(): Address {
        if (this.residence === null) {
            this.getRelation(Address, Address.relation).subscribe(
                (data: Address) => {
                    this.localLocationAddress = data;
                },
                (err) => console.log('error on load town ', err)
            );
        }

        return this.localLocationAddress;
    }

    set location(address: Address) {
        this.localLocationAddress = address;
    }

    get delivery(): Address {
        if (this.residence === null) {
            this.getRelation(Address, Address.relation).subscribe(
                (data: Address) => {
                    this.localDelivery = data;
                },
                (err) => console.log('error on load town ', err)
            );
        }

        return this.localDelivery;
    }

    set delivery(address: Address) {
        this.localDelivery = address;
    }


    adapter(item: any): User {
        const entity: User = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<User> {
        const definition = super.table_definition();

        definition.related = [
            {
                name: Town.relation,
                fields: Town.fieldRelation,
                with: 'town',
            },
        ];

        definition.table = [
            ...definition.table,
        ];
        return definition;
    }
}
