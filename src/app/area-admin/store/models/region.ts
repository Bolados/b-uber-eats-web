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
        return {
            table: [
                {
                    def: 'id',
                    cell: (element: Region) => `${element.id}`,
                    el: {
                        add: false,
                        update: {
                            input: true,
                        },
                        details: {
                            input: true,
                        },
                        control: (start, disabled = true) => new FormControl(
                            {value: start, disabled},
                            [
                                // Validators.required
                            ]
                        ),
                        error: {
                            required: 'required'
                        }
                    }
                },
                {
                    def: 'code',
                    cell: (element: Region) => `${element.code}`,
                    el: {
                        add: {
                            input: true,
                        },
                        update: {
                            input: true,
                        },
                        details: {
                            input: true,
                        },
                        control: (start, disabled = false) => new FormControl(
                            {value: start, disabled},
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(2)
                            ]
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
                    cell: (element: Region) => `${element.name}`,
                    el: {
                        add: {
                            input: true,
                        },
                        update: {
                            input: true,
                        },
                        details: {
                            input: true,
                        },
                        control: (start, disabled = false) => new FormControl(
                            {value: start, disabled},
                            [
                                Validators.required,
                            ]
                        ),
                        error: {
                            required: 'required',
                        }
                    }
                },
            ]
        };
    }
}
