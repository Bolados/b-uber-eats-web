import {TableDefinition} from './table-definition.model';
import {MetaEntity} from './entitiy.meta';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {API_RESOURCES_MEDIA} from '../../configuration';

const VALID_EXTENXION = ['.png', '.jpg', '.jpeg', '.ico'];

function pictureValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value))) {
        const file = control.value as File;
        const extenxion = file.name.slice(file.name.lastIndexOf('.'));
        console.log('validators', file.name, extenxion);
        if (extenxion && !VALID_EXTENXION.includes(extenxion)) {
            return {required: true};
        }
    }
    return null;
}

export class Media extends MetaEntity<Media> {

    name: string = null;
    picture: Blob = null;

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
                def: 'name',
                row: {
                    display: true,
                    cell: (element: Media) => element.name,
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
                def: 'picture',
                row: {
                    display: false,
                    cell: (element: Media) => element.picture,
                },
                el: {
                    add: {
                        type: 'file',
                        value: {
                            file: true,
                            fieldName: 'name',
                            validators: [
                                Validators.required,
                                pictureValidator
                            ],
                        }
                    },
                    update: {
                        type: 'file',
                        value: {
                            file: true,
                            fieldName: 'name',
                            validators: [
                                Validators.required,
                                pictureValidator
                            ],
                        },
                    },
                    details: {
                        type: 'file',
                        value: {
                            file: true,
                            fieldName: 'name',
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

        definition.file = {
            fileFieldNameDef: 'picture',
            resourcesUrl: API_RESOURCES_MEDIA,
        };
        return definition;
    }


}
