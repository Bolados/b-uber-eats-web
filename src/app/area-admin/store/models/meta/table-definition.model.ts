import {FormControl, ValidatorFn} from '@angular/forms';
import {Resource} from '@lagoshny/ngx-hal-client';


export interface TableDefinition<T> {
    table: FieldDefinition<T>[];
    related?: Array<RelatedFieldDefinition> | false;
    file: {
        fileFieldNameDef: string;
        resourcesUrl: string;
    } | false;
}

export interface RelatedFieldDefinition {
    name: string;
    fields: Array<string>;
    with: string; // fieldName in relation
}

export interface FieldDefinition<T> {
    def: string;
    row: RowElementDefinition<T>;
    el: FieldElementDefinition;
}

export interface RowElementDefinition<T> {
    display: boolean;
    cell: (element: T) => string | Blob;
}

export enum FieldElementDefinitionType {
    add = 'add',
    update = 'update',
    details = 'details',
}

export interface FieldElementDefinition {
    add: FieldTypeDefinition;
    update: FieldTypeDefinition;
    details: FieldTypeDefinition;
    control: (start: string | Blob, validators: Array<ValidatorFn> | false, disabled?: boolean) => FormControl;
    error: ErrorElementType | object;
}

export enum FieldTypeDefinitionEnum {
    INPUT = 'input',
    AREA = 'area',
    CHECK = 'check',
    SELECT = 'select',
    FILE = 'file'
}

export interface FieldTypeDefinition {
    type: FieldTypeDefinitionEnum | string;
    value: Input | Area | Check | Select | FileFile;
}

export interface Input {
    input: boolean;
    type?: string;
    validators: Array<ValidatorFn> | false;
}

export interface Area {
    area: boolean;
    type?: string;
    validators: Array<ValidatorFn> | false;
}

export interface Check {
    check: boolean;
    type?: string;
    validators: Array<ValidatorFn> | false;
}

export interface Select {
    select: boolean;
    type?: string;
    validators: Array<ValidatorFn> | false;
}

export interface FileFile {
    file: boolean;
    type?: string;
    validators: Array<ValidatorFn> | false;
    fieldName: string;
}

export interface ErrorElementType {
    required?: string;
    minlength?: string;
    maxlength?: string;
    pattern?: string;
}

export abstract class TableExtension extends Resource {
    selected = false;
    highlighted = false;
    hovered = false;
}

export function setTableExtentionFields(entity: any) {
    entity.selected = false;
    entity.highlighted = false;
    entity.hovered = false;
}

export function validatorsOf(type: FieldElementDefinitionType, field: FieldElementDefinition) {
    const def = 'validators';
    let validators: Array<ValidatorFn> = [];
    if (type && (type === FieldElementDefinitionType.add) && field.add && field.add.value.validators) {
        validators = field.add.value.validators;
    }
    if (type && (type === FieldElementDefinitionType.add) && field.update && field.update.value.validators) {
        validators = field.update.value.validators;
    }
    if (type && (type === FieldElementDefinitionType.add) && field.details && field.details.value.validators) {
        validators = field.details.value.validators;
    }
    return validators;
}

