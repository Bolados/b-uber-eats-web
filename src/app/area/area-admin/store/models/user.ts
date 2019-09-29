import {MetaEntity} from '../../../../domains/models/meta/entitiy.meta';
import {Phone} from './phone';
import {Address} from './address';
import {Order} from './order';
import {Role} from './role';
import {TableDefinition} from '../../../../domains/models/meta/table-definition.model';
import {FormControl, Validators} from '@angular/forms';

export class User extends MetaEntity<User> {

    static entity = 'user';
    static relation = 'user';

    static fieldRelation = [
        'login',
        'email',
        'phone.number'
    ];

    email: string = null;
    login: string = null;
    password: string = null;
    name: string = null;

    localPhone: Phone = null;
    localResidenceAddress: Address = null;
    localLocationAddress: Address = null;
    localDelivery: Address = null;

    orders: Array<Order> = [];
    savedAddresses: Array<Address> = [];
    roles: Array<Role> = [];

    get phone(): Phone {
        if (this.localPhone === null) {
            this.getRelation(Phone, Phone.relation).subscribe(
                (data: Phone) => {
                    this.localPhone = data;
                },
                (err) => console.log('error on load town ', err)
            );
        }

        return this.localPhone;
    }

    set phone(phone: Phone) {
        this.localPhone = phone;
    }


    get residence(): Address {
        // if (this.residence === null) {
        //     this.getRelation(Address, Address.relation).subscribe(
        //         (data: Address) => {
        //             this.localResidenceAddress = data;
        //         },
        //         (err) => console.log('error on load town ', err)
        //     );
        // }

        return this.localResidenceAddress;
    }

    set residence(address: Address) {
        this.localResidenceAddress = address;
    }

    get location(): Address {
        // if (this.residence === null) {
        //     this.getRelation(Address, Address.relation).subscribe(
        //         (data: Address) => {
        //             this.localLocationAddress = data;
        //         },
        //         (err) => console.log('error on load town ', err)
        //     );
        // }

        return this.localLocationAddress;
    }

    set location(address: Address) {
        this.localLocationAddress = address;
    }

    get delivery(): Address {
        // if (this.residence === null) {
        //     this.getRelation(Address, Address.relation).subscribe(
        //         (data: Address) => {
        //             this.localDelivery = data;
        //         },
        //         (err) => console.log('error on load town ', err)
        //     );
        // }

        return this.localDelivery;
    }

    set delivery(address: Address) {
        this.localDelivery = address;
    }


    adapter(item: any): User {
        const entity: User = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<User> {
        const definition = super.table_definition();

        definition.related = [
            {
                name: Address.relation,
                fields: Address.fieldRelation,
                with: 'residence',
            },
            {
                name: Address.relation,
                fields: Address.fieldRelation,
                with: 'location',
            },
            {
                name: Address.relation,
                fields: Address.fieldRelation,
                with: 'delivery',
            },
            {
                name: Phone.relation,
                fields: Phone.fieldRelation,
                with: 'phone',
            },
        ];

        definition.table = [
            ...definition.table,
            {
                def: 'email',
                row: {
                    display: true,
                    cell: (element: User) => element.email,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            type: 'email',
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            type: 'email',
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    details: {
                        type: 'input',
                        value: {
                            input: true,
                            type: 'email',
                            validators: false
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
                def: 'login',
                row: {
                    display: true,
                    cell: (element: User) => element.login,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    details: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: false
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
                def: 'password',
                row: {
                    display: false,
                    cell: (element: User) => element.password,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            type: 'password',
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            type: 'password',
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    details: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: false
                        }
                    },
                    control: (start, validators, disabled = false) => new FormControl(
                        {value: null, disabled},
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
                    cell: (element: User) => element.name,
                },
                el: {
                    add: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    update: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: [
                                Validators.required
                            ]
                        }
                    },
                    details: {
                        type: 'input',
                        value: {
                            input: true,
                            validators: false
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
                def: 'phone',
                row: {
                    display: true,
                    cell: (element: User) => super.safeValue(element.phone, Phone.fieldRelation),
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
                def: 'residence',
                row: {
                    display: true,
                    cell: (element: User) => super.safeValue(element.residence, Address.fieldRelation),
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
            // {
            //     def: 'delivery',
            //     row: {
            //         display: false,
            //         cell: (element: User) => super.safeValue(element.delivery, Address.fieldRelation),
            //     },
            //     el: {
            //         add: {
            //             type: 'select',
            //             value: {
            //                 select: true,
            //                 validators: [
            //                     // Validators.required,
            //                 ],
            //             }
            //         },
            //         update: {
            //             type: 'select',
            //             value: {
            //                 select: true,
            //                 validators: [
            //                     // Validators.required,
            //                 ],
            //             },
            //         },
            //         details: {
            //             type: 'select',
            //             value: {
            //                 select: true,
            //                 validators: false,
            //             }
            //         },
            //         control: (start, validators, disabled = false) => new FormControl(
            //             {value: start, disabled},
            //             validators ? validators : [],
            //         ),
            //         error: {
            //             required: 'required',
            //         }
            //     }
            // },
            // {
            //     def: 'location',
            //     row: {
            //         display: false,
            //         cell: (element: User) => super.safeValue(element.location, Address.fieldRelation),
            //     },
            //     el: {
            //         add: {
            //             type: 'select',
            //             value: {
            //                 select: true,
            //                 validators: [
            //                     // Validators.required,
            //                 ],
            //             }
            //         },
            //         update: {
            //             type: 'select',
            //             value: {
            //                 select: true,
            //                 validators: [
            //                     // Validators.required,
            //                 ],
            //             },
            //         },
            //         details: {
            //             type: 'select',
            //             value: {
            //                 select: true,
            //                 validators: false,
            //             }
            //         },
            //         control: (start, validators, disabled = false) => new FormControl(
            //             {value: start, disabled},
            //             validators ? validators : [],
            //         ),
            //         error: {
            //             required: 'required',
            //         }
            //     }
            // },
        ];
        return definition;
    }
}
