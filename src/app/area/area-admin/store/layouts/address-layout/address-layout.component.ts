import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Town} from '../../models/town';
import {Country, Region, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {District} from '../../models/district';
import {
    API_RESOURCES_ADDRESS,
    API_RESOURCES_COUNTRY,
    API_RESOURCES_DEPARTMENT,
    API_RESOURCES_DISTRICT,
    API_RESOURCES_REGION,
    API_RESOURCES_TOWN
} from '../../../configuration';
import {Department} from '../../models/department';
import {Address} from '../../models/address';

@Component({
    selector: 'app-address-layout',
    templateUrl: './address-layout.component.html',
    styleUrls: ['./address-layout.component.scss']
})
export class AddressLayoutComponent implements OnInit {

    areaTitle = 'Addresses';

    storeTitle = 'Address';
    datastore: DatastoreService<Address> | null;
    entity = Town;
    adapter: (item: any) => Address = new Address().adapter;
    tableDefinition: TableDefinition<Address> = new Address().table_definition();
    dataSource: MatTableDataSource<Address> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [
            {
                name: Town.relation,
                datastore: new DatastoreService<Town>(
                    Town,
                    API_RESOURCES_TOWN,
                    this.injector
                ).setAdapter(new Town().adapter),
                tableDefinition: new Town().table_definition(),
                entity: Town,
                subRelatedStore: [
                    {
                        name: District.relation,
                        datastore: new DatastoreService<District>(
                            District,
                            API_RESOURCES_DISTRICT,
                            this.injector
                        ).setAdapter(new District().adapter),
                        tableDefinition: new District().table_definition(),
                        entity: District,
                        subRelatedStore: [
                            {
                                name: Department.relation,
                                datastore: new DatastoreService<Department>(
                                    Department,
                                    API_RESOURCES_DEPARTMENT,
                                    this.injector
                                ).setAdapter(new Department().adapter),
                                tableDefinition: new Department().table_definition(),
                                entity: Department,
                                subRelatedStore: [
                                    {
                                        name: Country.relation,
                                        datastore: new DatastoreService<Country>(
                                            Country,
                                            API_RESOURCES_COUNTRY,
                                            this.injector
                                        ).setAdapter(new Country().adapter),
                                        tableDefinition: new Country().table_definition(),
                                        entity: Country,
                                        subRelatedStore: [
                                            {
                                                name: Region.relation,
                                                datastore: new DatastoreService<Region>(
                                                    Region,
                                                    API_RESOURCES_REGION,
                                                    this.injector
                                                ).setAdapter(new Region().adapter),
                                                tableDefinition: new Region().table_definition(),
                                                entity: Region
                                            }
                                        ]
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
        this.datastore = new DatastoreService<Address>(
            Address,
            API_RESOURCES_ADDRESS,
            this.injector
        ).setAdapter(new Address().adapter);

    }

}
