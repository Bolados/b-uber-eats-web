import {MetaEntity} from './meta/entitiy.meta';
import {TableDefinition} from './meta/table-definition.model';
import {Town} from './town';

export class Order extends MetaEntity<Order> {

    static entity = 'order';
    static relation = 'order';

    static fieldRelation = [];


    adapter(item: any): Order {
        const entity: Order = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Order> {
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
