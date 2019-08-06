import {FormControl} from '@angular/forms';
import { Resource } from '@lagoshny/ngx-hal-client';


export interface TableDefinition<T> {
    table: FieldDefinition<T>[];
}

export interface FieldDefinition<T> {
    def: string;
    cell: (element: T) => string;
    el: FieldElementDefinition;
}

export interface FieldElementDefinition {
    add: FieldElementType | false;
    update: FieldElementType | false;
    details: FieldElementType | false;
    control: (start, disabled?) => FormControl;
    error: ErrorElementType | object;
}

export interface FieldElementType {
    input?: boolean;
    area?: boolean;
    check?: boolean;
    select?: boolean;
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
