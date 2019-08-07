import { TableDefinition } from './table-definition.model';
import { MetaEntity } from './entitiy.meta';
import { Validators, FormControl } from '@angular/forms';

export class Media extends MetaEntity<Media> {


    src: string = null;
    mineType: string = null;
    menu: any = null;

    adapter(item: any): Media {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Media> {
        const definition = super.table_definition();

        definition.table = [
            ...definition.table,

            {
                def: 'src',
                cell: (element: Media) => element.src,
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
            {
                def: 'name',
                cell: (element: Media) => element.mineType,
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
        ];
        return definition;
    }


}
