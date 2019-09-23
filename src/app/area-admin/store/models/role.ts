import {MetaEntity} from '../../../domains/models/meta/entitiy.meta';
import {TableDefinition} from '../../../domains/models/meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';

export class Role extends MetaEntity<Role> {

    static entity = 'role';
    static relation = 'role';

    static fieldRelation = [
        'name',
    ];

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
                row: {
                    display: true,
                    cell: (element: Role) => element.name,
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
                    cell: (element: Role) => element.description,
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
