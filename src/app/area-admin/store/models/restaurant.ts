import {MetaEntity} from './meta/entitiy.meta';
import {TableDefinition} from './meta/table-definition.model';
import {Town} from './town';

export class Restaurant extends MetaEntity<Restaurant> {

    static entity = 'Restaurant';
    static relation = 'Restaurant';

    static fieldRelation = [];


    adapter(item: any): Restaurant {
        const entity: Restaurant = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Restaurant> {
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
