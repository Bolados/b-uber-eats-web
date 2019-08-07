import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';
import { FormControl, Validators } from '@angular/forms';

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

            {
                def: 'mode',
                cell: (element: PaymentMode) => element.mode,
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
                cell: (element: PaymentMode) => element.description,
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
