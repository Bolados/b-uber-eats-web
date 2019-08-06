import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';

export class PaymentMode extends MetaEntity<PaymentMode> {


    mode: string = null;
    description: string = null;
    payments: Array<any> = [];

    adapter(item: any): PaymentMode {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<PaymentMode> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,
        ];
        return definition;
    }

}
