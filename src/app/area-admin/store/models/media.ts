import { TableDefinition } from './table-definition.model';
import { MetaEntity } from './entitiy.meta';

export class Media extends MetaEntity<Media> {


    src: string = null;
    mineType: string = null;
    menu: any = null;

    adapter(item: any): Media {
        const entity = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Media> {
        throw new Error('Method not implemented.');
    }


}
