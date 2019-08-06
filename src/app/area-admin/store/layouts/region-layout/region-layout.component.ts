import { Component, OnInit, Injector } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { Region } from '../../models/region';
import { MatTableDataSource } from '@angular/material';
import { API_RESOURCES_REGION } from 'src/app/area-admin/configuration/api.configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-layout',
  templateUrl: './region-layout.component.html',
  styleUrls: ['./region-layout.component.scss']
})
export class RegionLayoutComponent implements OnInit {

    areaTitle = 'Regions';

    storeTitle = 'Region';
    datastore: DatastoreService<Region> | null;
    entity = Region;
    tableDefinition = Region.TABLE_DEFINITION;
    dataSource: MatTableDataSource<Region> | null ;

    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Region>(
            Region,
            API_RESOURCES_REGION,
            this.injector
        );
    }
}
