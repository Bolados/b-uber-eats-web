import { MetaEntity } from './entitiy.meta';
import { TableDefinition } from './table-definition.model';
import { FormControl, Validators } from '@angular/forms';

export class Role extends MetaEntity<Role> {

    name: string = null;
    description: string = null;
    users: Array<any> = [];

    adapter(item: any): Role {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Role> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,

            {
                def: 'name',
                cell: (element: Role) => element.name,
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
                cell: (element: Role) => element.description,
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
