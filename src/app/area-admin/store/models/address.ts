import {MetaEntity} from './meta/entitiy.meta';
import {TableDefinition} from './meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';
import {Town} from './town';
import {User} from './user';
import {Restaurant} from './restaurant';

export class Address extends MetaEntity<Address> {

    static entity = 'address';
    static relation = 'address';

    static relationResidents = 'residents';
    static relationLocation = 'locatedUsers';
    static relationDeliveries = 'delyveryUsers';
    static relationRestaurant = 'restaurants';

    static fieldRelation = [
        'name',
        'town.name',
        'town.district.name',
        'town.district.department.name',
        'town.district.department.country.name',
        'town.district.department.country.region.name'
    ];

    street: string = null;
    building: string = null;
    room: string = null;
    longitude: string = null;
    latitude: string = null;
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
                fields: Town.fieldRelation,
                with: 'town',
            },
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
            {
                def: 'longitude',
                row: {
                    display: true,
                    cell: (element: Address) => element.longitude,
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
                def: 'latitude',
                row: {
                    display: true,
                    cell: (element: Address) => element.latitude,
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
