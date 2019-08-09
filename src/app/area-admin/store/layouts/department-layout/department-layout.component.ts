import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Country, Region, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {RelatedStore} from '../../components/datastore';
import {API_RESOURCES_COUNTRY, API_RESOURCES_DEPARTMENT, API_RESOURCES_REGION} from '../../../configuration';
import {Department} from '../../models/department';

@Component({
    selector: 'app-department-layout',
    templateUrl: './department-layout.component.html',
    styleUrls: ['./department-layout.component.scss']
})
export class DepartmentLayoutComponent implements OnInit {


    areaTitle = 'Departments';

    storeTitle = 'Department';
    datastore: DatastoreService<Department> | null;
    entity = Department;
    adapter: (item: any) => Department = new Department().adapter;
    tableDefinition: TableDefinition<Department> = new Department().table_definition();
    dataSource: MatTableDataSource<Department> | null;

    constructor(
        private injector: Injector,
    ) {
    }

    get relatedStores(): Array<RelatedStore<any>> {
        return [
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
        ];
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Department>(
            Department,
            API_RESOURCES_DEPARTMENT,
            this.injector
        ).setAdpter(new Department().adapter);

    }

}
