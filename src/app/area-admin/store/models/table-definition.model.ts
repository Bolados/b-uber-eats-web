import {FormControl, ValidatorFn} from '@angular/forms';
import { Resource } from '@lagoshny/ngx-hal-client';


export interface TableDefinition<T> {
    table: FieldDefinition<T>[];
}

export interface RelatedFieldDefinition {
    name: string;
    field: string;
}

export interface FieldDefinition<T> {
    def: string;
    related?: RelatedFieldDefinition;
    row: RowElementDefinition<T>;
    el: FieldElementDefinition;
}

export interface RowElementDefinition<T> {
    display: boolean;
    cell: (element: T) => string;
}

export enum FieldElementDefinitionType {
    add = 'add',
    update = 'update',
    details = 'details',
}

export interface FieldElementDefinition {
    add: {
        type: string ,
        value: Input | Area | Check | Select
    };
    update: {
        type: string ,
        value: Input | Area | Check | Select
    };
    details: {
        type: string ,
        value: Input | Area | Check | Select
    };
    control: (start: string, validators: Array<ValidatorFn> | false, disabled?: boolean) => FormControl;
    error: ErrorElementType | object;
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

