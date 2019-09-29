import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Country, Department, District, Phone, Region, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {
    API_RESOURCES_ADDRESS,
    API_RESOURCES_COUNTRY,
    API_RESOURCES_DEPARTMENT,
    API_RESOURCES_DISTRICT,
    API_RESOURCES_PHONE,
    API_RESOURCES_REGION,
    API_RESOURCES_TOWN,
    API_RESOURCES_USER
} from '../../../configuration';
import {User} from '../../models/user';
import {Address} from '../../models/address';
import {Town} from '../../models/town';

@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {


    areaTitle = 'Users';

    storeTitle = 'User';
    datastore: DatastoreService<User> | null;
    entity = User;
    adapter: (item: any) => User = new User().adapter;
    tableDefinition: TableDefinition<User> = new User().table_definition();
    dataSource: MatTableDataSource<User> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [
            {
                name: Address.relation,
                entity: Address,
                adapter: new Address().adapter,
                tableDefinition: new Address().table_definition(),
                datastore: new DatastoreService<Address>(
                    Address,
                    API_RESOURCES_ADDRESS,
                    this.injector
                ).setAdapter(new Address().adapter),
                subRelatedStore: [
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
                ]
            },
            {
                name: Phone.relation,
                entity: Phone,
                adapter: new Phone().adapter,
                tableDefinition: new Phone().table_definition(),
                datastore: new DatastoreService<Phone>(
                    Phone,
                    API_RESOURCES_PHONE,
                    this.injector
                )
            }
        ];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<User>(
            User,
            API_RESOURCES_USER,
            this.injector
        ).setAdapter(new User().adapter);

    }

}
