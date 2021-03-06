import {MetaEntity} from '../../../../domains/models/meta/entitiy.meta';
import {TableDefinition} from '../../../../domains/models/meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';
import {District} from './district';

export class Town extends MetaEntity<Town> {

    static entity = 'town';
    static relation = 'town';

    static fieldRelation = [
        'name',
        'district.name',
        'district.department.name',
        'district.department.country.name',
        'district.department.country.region.name'
    ];

    name: string = null;
    variant: string = null;
    localDistrict: District = null;
    addresses: Array<any> = [];


    get district() {
        if (this.localDistrict === null) {
            this.getRelation(District, District.relation).subscribe(
                (data: District) => {
                    this.localDistrict = data;
                },
                (err) => console.log('error on load region ', err)
            );
        }

        return this.localDistrict;
    }

    set district(district: District) {
        this.localDistrict = district;
    }


    adapter(item: any): Town {
        const entity: Town = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Town> {
        const definition = super.table_definition();

        definition.related = [
            {
                name: District.relation,
                fields: District.fieldRelation,
                with: 'district',
            },
        ];

        definition.table = [
            ...definition.table,
            {
                def: 'district',
                row: {
                    display: true,
                    cell: (element: Town) => super.safeValue(element.district, District.fieldRelation),
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
                    cell: (element: Town) => element.name,
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
                    cell: (element: Town) => element.variant,
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
        ];

        return definition;
    }
}
