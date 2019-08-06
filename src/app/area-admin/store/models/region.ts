import {Resource} from '@lagoshny/ngx-hal-client';
import {FormControl, Validators} from '@angular/forms';
import {TableDefinition, TableExtension, setTableExtentionFields} from './table-definition.model';
import { idFromHref } from '../helpers/store.helpers';


export class Region extends Resource {

    selected = false;
    highlighted = false;
    hovered = false;

    localId: string = null;
    code: string = null;
    name: string = null;
    countries: Array<any> = [];

    constructor() {
        super();
    }

    get id() {
        if ( this._links && this._links.self) {
            const id = idFromHref(this._links.self.href);
            if (id) {
                this.localId = id;
            }
        }
        return this.localId;
    }

    set id(id: string) {
        this.localId = id;
    }

    public static adapter(item: any ) {
        console.log('dto', item);
        const entity: Region = item;
        if ( item && item._links && item._links.self) {
            entity.id = idFromHref(item._links.self.href);
        }
        setTableExtentionFields(entity);
        console.log('entity', entity);
        return entity;

    }

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
