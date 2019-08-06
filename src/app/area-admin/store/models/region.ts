import { Resource } from '@lagoshny/ngx-hal-client';
import { FormControl, Validators } from '@angular/forms';

export interface TableExtenxion {
    selected?: boolean;
    highlighted?: boolean;
    hovered?: boolean;

    start();
}


export class Region extends Resource implements TableExtenxion  {

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

    public static get TABLE_DEFINITION() {
        return [
            {
                columnDef: 'id',
                cell: (element: Region) => `${element.id}`,
                field: {
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
                        required: 'required',
                    }
                }
            },
            {
                columnDef: 'code',
                cell: (element: Region) => `${element.code}`,
                field: {
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
                columnDef: 'name',
                cell: (element: Region) => `${element.name}`,
                field: {
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
        ];
    }
}
