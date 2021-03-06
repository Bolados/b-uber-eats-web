import {MetaEntity} from '../../../../domains/models/meta/entitiy.meta';
import {TableDefinition} from '../../../../domains/models/meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';
import {Region} from './region';
import {Department} from './department';

export class Country extends MetaEntity<Country> {

    static entity = 'country';
    static relation = 'country';

    static fieldRelation = ['name', 'region.name'];

    name: string = null;
    variant: string = null;
    code2: string = null;
    code3: string = null;
    phoneCode: string = null;
    domain: string = null;
    population: string = '0';
    density: string = '0';
    localRegion: Region = null;
    departments: Array<Department> = [];


    get region() {
        if (this.localRegion === null) {
            this.getRelation(Region, Region.relation).subscribe(
                (data: Region) => {
                    this.localRegion = data;
                },
                (err) => console.log('error on load region ', err)
            );
        }

        return this.localRegion;
    }

    set region(region: Region) {
        console.log('set region');
        this.localRegion = region;
    }


    adapter(item: any): Country {
        const entity: Country = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Country> {
        const definition = super.table_definition();

        definition.related = [
            {
                name: Region.relation,
                fields: Region.fieldRelation,
                with: 'region',
            }
        ];


        definition.table = [
            ...definition.table,
            {
                def: 'region',
                row: {
                    display: true,
                    cell: (element: Country) => super.safeValue(element.region, Region.fieldRelation),
                },
                el: {
                    add: {
                        type: 'select',
                        value: {
                            select: true,
                            validators: [
                                Validators.required,
                            ],
                        }
                    },
                    update: {
                        type: 'select',
                        value: {
                            select: true,
                            validators: [
                                Validators.required,
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
                    }
                }
            },
            {
                def: 'name',
                row: {
                    display: true,
                    cell: (element: Country) => element.name,
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
                    display: false,
                    cell: (element: Country) => element.variant,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
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
                def: 'code2',
                row: {
                    display: true,
                    cell: (element: Country) => element.code2,
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
            {
                def: 'code3',
                row: {
                    display: false,
                    cell: (element: Country) => element.code3,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(3)
                            ],
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                // Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(3)
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
                        minlength: 'least than 1',
                        maxlength: 'greater than 3'
                    }
                }
            },
            {
                def: 'phoneCode',
                row: {
                    display: true,
                    cell: (element: Country) => element.phoneCode,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                                Validators.minLength(1),
                                Validators.maxLength(3)
                            ],
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                // Validators.required,
                                Validators.minLength(1),
                                Validators.maxLength(3)
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
                        minlength: 'least than 1',
                        maxlength: 'greater than 3'
                    }
                }
            },
            {
                def: 'domain',
                row: {
                    display: false,
                    cell: (element: Country) => element.domain,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(5)
                            ],
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                // Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(5)
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
                        maxlength: 'greater than 5'
                    }
                }
            },
            {
                def: 'population',
                row: {
                    display: false,
                    cell: (element: Country) => element.population,
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
                def: 'density',
                row: {
                    display: false,
                    cell: (element: Country) => element.density,
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
