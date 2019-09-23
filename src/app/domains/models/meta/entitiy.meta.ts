import {Resource} from '@lagoshny/ngx-hal-client';
import {Entity} from './entity';
import {ErrorElementType, TableDefinition} from './table-definition.model';
import {FormControl} from '@angular/forms';

function idFromHref(href: string) {
    if (href) {
        const splitter: string[] = href.split('/');
        return splitter[splitter.length - 1];
    }
    return null;
}

function setExtentionFieldsTo(entity) {
    let v = 'selected';
    entity[v] = false;
    v = 'highlighted';
    entity[v] = false;
    v = 'hovered';
    entity[v] = false;
}

export abstract class MetaEntity<T> extends Resource implements Entity<T> {
    public static idDef = 'id';
    public static HasFileFieldDef = 'hasFileField';
    public static UrlDef = 'url';
    localId: string = null;
    selected: boolean;
    highlighted: boolean;
    hovered: boolean;

    // hasFileField: any;
    // url: any;

    constructor() {
        super();
    }

    get id() {
        if (
            (this.localId == null)
            && (this._links && this._links.self && this._links.self)
        ) {
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

    get errors(): ErrorElementType {
        return {
            required: 'required',
            minlength: 'least than required',
            maxlength: 'greater than required',
            pattern: 'pattern error'
        };
    }

    safeValue(object: object, fields: Array<string>) {
        const result = [];
        if (object && fields) {
            fields.forEach(field => {
                const splitter = field.split('.');
                let res = object;
                splitter.forEach(v => {
                    if (res && res[v]) {
                        res = res[v];
                    } else {
                        res = null;
                    }
                });
                result.push(res);
            });
        }
        return result.join(' ');
    }


    adapter(item: any): T {
        const links = '_links';
        const self = 'self';
        const href = 'href';
        const id = 'id';
        console.log('dto', item);
        const entity: T = item;
        if (entity[links] && entity[links][self]) {
            entity[id] = idFromHref(entity[links][self][href]);
            setExtentionFieldsTo(entity);
        }
        console.log('entity', entity);
        return entity;
    }

    table_definition(): TableDefinition<T> {
        return {
            file: false,
            related: false,
            table: [
                {
                    def: MetaEntity.idDef,
                    row: {
                        display: true,
                        cell: (element: T) => element[MetaEntity.idDef],
                    },
                    el: {
                        add: {
                            type: 'input',
                            value: {
                                input: false,
                                validators: false,
                            }
                        },
                        update: {
                            type: 'input',
                            value: {
                                input: true,
                                validators: false,
                            }
                        },
                        details: {
                            type: 'input',
                            value: {
                                input: true,
                                validators: false,
                            }
                        },
                        control: (value, validators, disabled = true) => new FormControl(
                            {value, disabled},
                            validators ? validators : [],
                        ),
                        error: {
                            required: 'required',
                        }
                    }
                }
            ]
        };
    }

}
