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
                row: {
                    display: true,
                    cell: (element: OrderStatus) => element.status,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                            ],
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                            ],
                        },
                    },
                    details: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: false,
                        }
                    },
                    control: (start, validators, disabled = false) => new FormControl(
                        {value: start, disabled},
                        validators ? validators : [],
                    ),
                    error: {
                        required: 'required',
                    }
                }
            },
            {
                def: 'description',
                row: {
                    display: true,
                    cell: (element: OrderStatus) => element.description,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: false,
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: false,
                        },
                    },
                    details: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: false,
                        }
                    },
                    control: (start, validators, disabled = false) => new FormControl(
                        {value: start, disabled},
                        validators ? validators : [],
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
