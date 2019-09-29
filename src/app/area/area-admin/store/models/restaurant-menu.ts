import {MetaEntity} from '../../../../domains/models/meta/entitiy.meta';
import {TableDefinition} from '../../../../domains/models/meta/table-definition.model';
import {Town} from './town';

export class RestaurantMenu extends MetaEntity<RestaurantMenu> {

    static entity = 'RestaurantMenu';
    static relation = 'RestaurantMenu';

    static fieldRelation = [];


    adapter(item: any): RestaurantMenu {
        const entity: RestaurantMenu = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<RestaurantMenu> {
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

