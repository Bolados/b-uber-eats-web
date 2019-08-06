import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';

export class OrderStatus extends MetaEntity<OrderStatus> {


    status: string = null;
    description: string = null;
    orders: Array<any> = [];

    adapter(item: any): OrderStatus {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<OrderStatus> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,
        ];
        return definition;
    }

}
