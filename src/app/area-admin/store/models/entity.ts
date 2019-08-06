import { TableDefinition } from './table-definition.model';

export interface Entity<T> {
    id: string;
    localId: string;

    selected: boolean;
    highlighted: boolean;
    hovered: boolean;

    adapter(item: any ): T;

    table_definition(): TableDefinition<T>;

}
