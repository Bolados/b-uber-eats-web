import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';
import { Validators, FormControl } from '@angular/forms';


export class Phone extends MetaEntity<Phone> {


    number: string = null;
    user: any = null;
    restaurant: any = null;

    adapter(item: any): Phone {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Phone> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,

            {
                def: 'number',
                cell: (element: Phone) => element.number,
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                                Validators.pattern(new RegExp('^[0-9]+$'))
                            ],
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                                Validators.pattern(new RegExp('^[0-9]+$'))
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
                        pattern: 'number only',
                    }
                }
            }
        ];
        return definition;
    }

}
