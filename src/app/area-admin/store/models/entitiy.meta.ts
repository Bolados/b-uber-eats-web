import { Resource } from '@lagoshny/ngx-hal-client';
import { Entity } from './entity';
import { TableDefinition } from './table-definition.model';
import { FormControl } from '@angular/forms';

function idFromHref(href: string) {
    if (href) {
        const splitter: string[] = href.split('/');
        return splitter[splitter.length - 1];
    }
    return null;
}

function setExtentionFieldsTo(entity) {
    entity['selected'] = false;
    entity['highlighted'] = false;
    entity['hovered'] = false;
}

export abstract class MetaEntity<T> extends Resource implements Entity<T> {
    localId: string = null;
    selected: boolean;
    highlighted: boolean;
    hovered: boolean;

    constructor() {
        super();
    }

    get id() {
        if ( this._links && this._links.self && this._links.self) {
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


    adapter(item: any): T {
        console.log('dto', item);
        const entity: T = item;
        if ( entity['_links'] && entity['_links']['self']) {
            entity['id'] = idFromHref(entity['_links']['self']['href']);
            setExtentionFieldsTo(entity);
        }
        console.log('entity', entity);
        return entity;
    }

    table_definition(): TableDefinition<T> {

        const idDef = 'id';

        return {
            table: [
                {
                    def: idDef,
                    cell: (element: T) => element[idDef],
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
                }
            ]
        };
    }



}
