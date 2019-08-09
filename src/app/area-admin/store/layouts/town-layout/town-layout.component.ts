import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {District} from '../../models/district';
import {TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_DISTRICT, API_RESOURCES_TOWN} from '../../../configuration';
import {Town} from '../../models/town';

@Component({
    selector: 'app-town-layout',
    templateUrl: './town-layout.component.html',
    styleUrls: ['./town-layout.component.scss']
})
export class TownLayoutComponent implements OnInit {

    areaTitle = 'Towns';

    storeTitle = 'Town';
    datastore: DatastoreService<Town> | null;
    entity = Town;
    adapter: (item: any) => Town = new Town().adapter;
    tableDefinition: TableDefinition<Town> = new Town().table_definition();
    dataSource: MatTableDataSource<Town> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [
            {
                name: District.relation,
                datastore: new DatastoreService<District>(
                    District,
                    API_RESOURCES_DISTRICT,
                    this.injector
                ).setAdpter(new District().adapter),
                tableDefinition: new District().table_definition(),
                entity: District
            }
        ];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Town>(
            Town,
            API_RESOURCES_TOWN,
            this.injector
        ).setAdpter(new Town().adapter);

    }
}
