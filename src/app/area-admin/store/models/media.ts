import { TableDefinition } from './table-definition.model';
import { MetaEntity } from './entitiy.meta';
import { Validators, FormControl } from '@angular/forms';

export class Media extends MetaEntity<Media> {


    name: string = null;
    mineType: string = null;
    menu: any = null;

    adapter(item: any): Media {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Media> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,

            {
                def: 'name',
                row: {
                    display: true,
                    cell: (element: Media) => element.name,
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
                def: 'mineType',
                row: {
                    display: true,
                    cell: (element: Media) => element.mineType,
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
        ];
        return definition;
    }


}
