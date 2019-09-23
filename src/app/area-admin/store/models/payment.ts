import {MetaEntity} from '../../../domains/models/meta/entitiy.meta';
import {TableDefinition} from '../../../domains/models/meta/table-definition.model';
import {Town} from './town';

export class Payment extends MetaEntity<Payment> {

    static entity = 'payment';
    static relation = 'payment';

    static fieldRelation = [];


    adapter(item: any): Payment {
        const entity: Payment = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Payment> {
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
