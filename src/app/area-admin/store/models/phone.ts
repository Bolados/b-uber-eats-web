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
                            Validators.pattern(new RegExp('^[0-9]+$'))
                        ]
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
