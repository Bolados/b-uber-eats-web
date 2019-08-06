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
    add: Input | Area | Check | Select | false;
    update: Input | Area | Check | Select | false;
    details: Input | Area | Check | Select | false;
    control: (start, disabled?) => FormControl;
    error: ErrorElementType | object;
}

export interface Input {
    input: boolean;
}

export interface Area {
    area: boolean;
}

export interface Check {
    check: boolean;
}

export interface Select {
    select: boolean;
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
