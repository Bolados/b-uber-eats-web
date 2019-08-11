import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {District} from '../../models/district';
import {Country, Region, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {
    API_RESOURCES_COUNTRY,
    API_RESOURCES_DEPARTMENT,
    API_RESOURCES_DISTRICT,
    API_RESOURCES_REGION,
    API_RESOURCES_TOWN
} from '../../../configuration';
import {Town} from '../../models/town';
import {Department} from '../../models/department';

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
                entity: District,
                subRelatedStore: [
                    {
                        name: Department.relation,
                        datastore: new DatastoreService<Department>(
                            Department,
                            API_RESOURCES_DEPARTMENT,
                            this.injector
                        ).setAdpter(new Department().adapter),
                        tableDefinition: new Department().table_definition(),
                        entity: Department,
                        subRelatedStore: [
                            {
                                name: Country.relation,
                                datastore: new DatastoreService<Country>(
                                    Country,
                                    API_RESOURCES_COUNTRY,
                                    this.injector
                                ).setAdpter(new Country().adapter),
                                tableDefinition: new Country().table_definition(),
                                entity: Country,
                                subRelatedStore: [
                                    {
                                        name: Region.relation,
                                        datastore: new DatastoreService<Region>(
                                            Region,
                                            API_RESOURCES_REGION,
                                            this.injector
                                        ).setAdpter(new Region().adapter),
                                        tableDefinition: new Region().table_definition(),
                                        entity: Region
                                    }
                                ]
                            }
                        ]
                    }
                ]
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
