import {TableDefinition} from './meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';
import {MetaEntity} from './meta/entitiy.meta';
import {District} from './district';
import {Country} from './country';

export class Department extends MetaEntity<Department> {

    static entity = 'department';
    static relation = 'department';

    static fieldRelation = ['name', 'country.name', 'country.region.name'];

    name: string = null;
    variant: string = null;
    code: string = null;
    localCountry: Country = null;
    districts: Array<District> = [];


    get country() {
        if (this.localCountry === null) {
            this.getRelation(Country, Country.relation).subscribe(
                (data: Country) => {
                    this.localCountry = data;
                },
                (err) => console.log('error on load region ', err)
            );
        }

        return this.localCountry;
    }

    set country(country: Country) {
        this.localCountry = country;
    }


    adapter(item: any): Department {
        const entity: Department = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Department> {
        const definition = super.table_definition();

        definition.related = [
            {
                name: Country.relation,
                fields: Country.fieldRelation,
                with: 'country',
            },
        ];

        definition.table = [
            ...definition.table,
            {
                def: 'country',
                row: {
                    display: true,
                    cell: (element: Department) => super.safeValue(element.country, Country.fieldRelation),
                },
                el: {
                    add: {
                        type: 'select',
                        value: {
                            select: true,
                            validators: [
                                Validators.required,
                                // Validators.minLength(2),
                                // Validators.maxLength(2)
                            ],
                        }
                    },
                    update: {
                        type: 'select',
                        value: {
                            select: true,
                            validators: [
                                Validators.required,
                                // Validators.minLength(2),
                                // Validators.maxLength(2)
                            ],
                        },
                    },
                    details: {
                        type: 'select',
                        value: {
                            select: true,
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
                row: {
                    display: true,
                    cell: (element: Department) => element.name,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required
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
                        minlength: 'least than 2',
                        maxlength: 'greater than 2'
                    }
                }
            },
            {
                def: 'variant',
                row: {
                    display: true,
                    cell: (element: Department) => element.variant,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            type: 'number',
                            validators: [
                                // Validators.required,
                                // Validators.minLength(2),
                                // Validators.maxLength(2)
                            ],
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            type: 'number',
                            validators: [
                                // Validators.required,
                                // Validators.minLength(2),
                                // Validators.maxLength(2)
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
                def: 'code',
                row: {
                    display: true,
                    cell: (element: Department) => element.code,
                },
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
        ];

        return definition;
    }
}
