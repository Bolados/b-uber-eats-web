import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Department} from '../../models/department';
import {Country, Region, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_COUNTRY, API_RESOURCES_DEPARTMENT, API_RESOURCES_DISTRICT, API_RESOURCES_REGION} from '../../../configuration';
import {District} from '../../models/district';

@Component({
    selector: 'app-district-layout',
    templateUrl: './district-layout.component.html',
    styleUrls: ['./district-layout.component.scss']
})
export class DistrictLayoutComponent implements OnInit {

    areaTitle = 'Districts';

    storeTitle = 'District';
    datastore: DatastoreService<District> | null;
    entity = District;
    adapter: (item: any) => District = new District().adapter;
    tableDefinition: TableDefinition<District> = new District().table_definition();
    dataSource: MatTableDataSource<District> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [
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
        ];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<District>(
            District,
            API_RESOURCES_DISTRICT,
            this.injector
        ).setAdpter(new District().adapter);

    }
}
