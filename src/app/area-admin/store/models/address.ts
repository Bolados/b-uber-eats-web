import {MetaEntity} from './meta/entitiy.meta';
import {District} from './district';
import {TableDefinition} from './meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';
import {Town} from './town';
import {User} from './user';
import {Restaurant} from './restaurant';
import {Department} from './department';
import {Country} from './country';
import {Region} from './region';

export class Address extends MetaEntity<Address> {

    static entity = 'address';
    static relation = 'address';

    static fieldRelation = null;

    street: string = null;
    building: string = null;
    room: string = null;
    localTown: Town = null;

    residents: Array<User> = [];
    locatedUsers: Array<User> = [];
    deliveryUsers: Array<User> = [];
    restaurants: Array<Restaurant> = [];
    addressSavedBy: Array<User> = [];


    get town(): Town {
        if (this.localTown === null) {
            this.getRelation(Town, Town.relation).subscribe(
                (data: Town) => {
                    this.localTown = data;
                },
                (err) => console.log('error on load town ', err)
            );
        }

        return this.localTown;
    }

    set town(town: Town) {
        this.localTown = town;
    }


    adapter(item: any): Address {
        const entity: Address = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Address> {
        const definition = super.table_definition();

        definition.related = [
            {
                name: Town.relation,
                field: Town.fieldRelation,
                with: 'town',
            },
            {
                name: District.relation,
                field: District.fieldRelation,
                with: 'district',
                dataAccess: 'town.district'
            },
            {
                name: Department.relation,
                field: Department.fieldRelation,
                with: 'department',
                dataAccess: 'town.district.department.country'
            },
            {
                name: Country.relation,
                field: Country.fieldRelation,
                with: 'country',
                dataAccess: 'town.district.department.country'

            },
            {
                name: Region.relation,
                field: Region.fieldRelation,
                with: 'region',
                dataAccess: 'town.district.department.country.region',
            }
        ];

        definition.table = [
            ...definition.table,
            {
                def: 'town',
                row: {
                    display: true,
                    cell: (element: Address) => super.safeValue(element.town, Town.fieldRelation),
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
                def: 'district',
                row: {
                    display: true,
                    cell: (element: Address) => super.safeValue(element.town.district, District.fieldRelation),
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
                def: 'department',
                row: {
                    display: true,
                    cell: (element: Address) => super.safeValue(element.town.district.department, Department.fieldRelation),
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
                def: 'country',
                row: {
                    display: true,
                    cell: (element: Address) => super.safeValue(element.town.district.department.country, Country.fieldRelation),
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
                def: 'region',
                row: {
                    display: true,
                    cell: (element: Address) => super.safeValue(element.town.district.department.country.region, Region.fieldRelation),
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
                def: 'street',
                row: {
                    display: true,
                    cell: (element: Address) => element.street,
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
                    }
                }
            },
            {
                def: 'building',
                row: {
                    display: true,
                    cell: (element: Address) => element.building,
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
                    }
                }
            },
            {
                def: 'room',
                row: {
                    display: true,
                    cell: (element: Address) => element.room,
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
                    }
                }
            },
        ];

        return definition;
    }

}
