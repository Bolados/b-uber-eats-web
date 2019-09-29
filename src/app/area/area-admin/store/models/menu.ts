import {MetaEntity} from '../../../../domains/models/meta/entitiy.meta';
import {Order} from './order';
import {TableDefinition} from '../../../../domains/models/meta/table-definition.model';
import {Town} from './town';
import {Media} from './media';
import {RestaurantMenu} from './restaurant-menu';

export class Menu extends MetaEntity<Menu> {

    static entity = 'menu';
    static relation = 'menu';

    static fieldRelation = [
        'code',
        'name',
    ];

    code: string = null;
    name: string = null;
    price: number = null;
    description: string = null;

    localMedia: Media = null;

    orders: Array<Order> = [];
    restaurants: Array<RestaurantMenu> = [];


    get media(): Media {
        if (this.localMedia === null) {
            this.getRelation(Media, Media.relation).subscribe(
                (data: Media) => {
                    this.localMedia = data;
                },
                (err) => console.log('error on load town ', err)
            );
        }

        return this.localMedia;
    }

    set media(media: Media) {
        this.localMedia = media;
    }


    adapter(item: any): Menu {
        const entity: Menu = super.adapter(item);
        return entity;
    }

    table_definition(): TableDefinition<Menu> {
        const definition = super.table_definition();

        definition.related = [
            {
                name: Town.relation,
                fields: Town.fieldRelation,
                with: 'town',
            },
        ];

        definition.table = [
            ...definition.table,
        ];
        return definition;
    }

}
