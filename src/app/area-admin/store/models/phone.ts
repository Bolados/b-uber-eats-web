import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';


export class Phone extends MetaEntity<Phone> {


    number: string = null;
    user: any = null;
    restaurant: any = null;

    adapter(item: any): Phone {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Phone> {
        throw new Error('Method not implemented.');
    }

}
