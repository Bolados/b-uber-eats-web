import {Resource} from '@lagoshny/ngx-hal-client';
import {FormControl, Validators} from '@angular/forms';
import {TableDefinition, TableExtension} from './table-definition.model';


export class Region extends Resource implements TableExtension {

    code: string;
    name: string;
    countries: Array<any>;

    constructor() {
        super();
    }

    get id() {
        if (this._links) {
            const link = this._links.self.href;
            const splitter: string[] = link.split('/');
            return splitter[splitter.length - 1];
        }
        return null;
    }

    start() {}

    public static get TABLE_DEFINITION(): TableDefinition<Region> {
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
