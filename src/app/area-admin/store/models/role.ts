import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';

export class Role extends MetaEntity<Role> {

    name: string = null;
    description: string = null;
    users: Array<any> = [];

    adapter(item: any): Role {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Role> {
        throw new Error('Method not implemented.');
    }


}
