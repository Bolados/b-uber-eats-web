import {MetaEntity} from './entitiy.meta';
import {TableDefinition} from './table-definition.model';
import {FormControl, Validators} from '@angular/forms';
import {Department} from './department';
import {Town} from './town';

export class District extends MetaEntity<District> {

    static entity = 'district';
    static relation = 'district';

    static fieldRelation = 'name';

    name: string = null;
    variant: string = null;
    code: string = null;
    localDepartment: Department = null;
    towns: Array<Town> = [];


    get department() {
        if (this.localDepartment === null) {
            this.getRelation(Department, Department.relation).subscribe(
                (data: Department) => {
                    this.localDepartment = data;
                },
                (err) => console.log('error on load region ', err)
            );
        }

        return this.localDepartment;
    }

    set department(department: Department) {
        this.localDepartment = department;
    }


    adapter(item: any): District {
        const entity: District = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<District> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,
            {
                def: 'department',
                related: {
                    name: Department.relation,
                    field: Department.fieldRelation
                },
                row: {
                    display: true,
                    cell: (element: District) => super.safeValue(element.department, Department.fieldRelation),
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
                    cell: (element: District) => element.name,
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
                    cell: (element: District) => element.variant,
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
                    cell: (element: District) => element.code,
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
