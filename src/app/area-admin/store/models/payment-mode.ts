import {MetaEntity} from './meta/entitiy.meta';
import {TableDefinition} from './meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';

export class PaymentMode extends MetaEntity<PaymentMode> {

    static entity = 'payment_mode';
    static relation = 'payment_mode';

    static fieldRelation = [
        'mode',
    ];

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
                row: {
                    display: true,
                    cell: (element: PaymentMode) => element.mode,
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
                    cell: (element: PaymentMode) => element.description,
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
