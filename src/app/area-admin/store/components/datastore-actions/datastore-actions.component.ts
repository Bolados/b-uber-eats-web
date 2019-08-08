import {Component, Input, OnInit} from '@angular/core';

export interface DatastoreActionCallback {
    add?: () => void;
    edit?: (data) => void;
    delete?: (data) => void;
    details?: (data) => void;
}

export interface DatastoreActionInput {
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
    details?: boolean;
    all?: boolean;
}

@Component({
    selector: 'app-datastore-actions',
    templateUrl: './datastore-actions.component.html',
    styleUrls: ['./datastore-actions.component.scss']
})
export class DatastoreActionsComponent implements OnInit {

    @Input() input: DatastoreActionInput;
    @Input() callback: DatastoreActionCallback;
    @Input() data: any;

    constructor() {
    }

    ngOnInit() {
        this.validateInputs();
    }

    validateInputs() {
        const errorMessagePrefix = 'Datastore actions component input validation error: ';
        const errorNoConfigPrefix = 'Configuration Error: ';
        if ((this.input.add || this.input.all) && !this.callback.add) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback\' parameter must be defined for add');
        }
        if ((this.input.edit || this.input.all) && (!this.callback.edit || !this.data)) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback or data\' parameter must be defined for edit');
        }

        if ((this.input.delete || this.input.all) && (!this.callback.details || !this.data)) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback\' parameter must be defined for delete');
        }

        if ((this.input.details || this.input.all) && (!this.callback.details || !this.data)) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback\' parameter must be defined for details');
        }
    }

}
