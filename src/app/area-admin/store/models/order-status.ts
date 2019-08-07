import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';
import { FormControl, Validators } from '@angular/forms';

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

            {
                def: 'status',
                cell: (element: OrderStatus) => element.status,
                el: {
                    add: {
                        input: true,
                    },
                    update: {
                        input: true,
                    },
                    details: {
                        input: true,
                    },
                    control: (start, disabled = false) => new FormControl(
                        {value: start, disabled},
                        [
                            Validators.required,
                        ]
                    ),
                    error: {
                        required: 'required',
                    }
                }
            },
            {
                def: 'description',
                cell: (element: OrderStatus) => element.description,
                el: {
                    add: {
                        input: true,
                    },
                    update: {
                        input: true,
                    },
                    details: {
                        input: true,
                    },
                    control: (start, disabled = false) => new FormControl(
                        {value: start, disabled},
                        [
                            Validators.required,
                        ]
                    ),
                    error: {
                        required: 'required',
                    }
                }
            },
        ];
        return definition;
    }

}
