import {FormControl, Validators} from '@angular/forms';
import {TableDefinition} from './table-definition.model';
import { MetaEntity } from './entitiy.meta';


export class Region extends MetaEntity<Region> {

    code: string = null;
    name: string = null;
    countries: Array<any> = [];

    adapter(item: any): Region {
        const entity = super.adapter(item);
        return entity;
    }


    table_definition(): TableDefinition<Region> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,
            {
                def: 'code',
                cell: (element: Region) => element.code,
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(2)
                            ],
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(2)
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
                        minlength: 'least than 2',
                        maxlength: 'greater than 2'
                    }
                }
            },
            {
                def: 'name',
                cell: (element: Region) => element.name,
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
        ];

        return definition;
    }
}
