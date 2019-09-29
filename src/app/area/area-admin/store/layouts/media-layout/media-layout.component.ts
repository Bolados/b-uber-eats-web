import {Component, Injector, OnInit} from '@angular/core';
import {DatastoreService} from '../../services';
import {Media, TableDefinition} from '../../models';
import {MatTableDataSource} from '@angular/material';
import {API_RESOURCES_MEDIA} from 'src/app/area/area-admin/configuration';

@Component({
  selector: 'app-media-layout',
  templateUrl: './media-layout.component.html',
  styleUrls: ['./media-layout.component.scss']
})
export class MediaLayoutComponent implements OnInit {

    areaTitle = 'Medias';

    storeTitle = 'Medias';
    datastore: DatastoreService<Media> | null;
    entity = Media;
    adapter: (item: any) => Media = new Media().adapter;
    tableDefinition: TableDefinition<Media> = new Media().table_definition();
    dataSource: MatTableDataSource<Media> | null ;

    constructor(
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.datastore = new DatastoreService<Media>(
            Media,
            API_RESOURCES_MEDIA,
            this.injector
        );
    }

}
