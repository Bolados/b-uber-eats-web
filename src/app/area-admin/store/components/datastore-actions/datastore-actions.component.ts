import {Component, Input, OnInit} from '@angular/core';

export interface DatastoreActionsInputData {
    component: any;
    data?: any;
}

export interface DatastoreActionsInputCallback {
    add?: (callbackComponent, data) => void;
    edit?: (callbackComponent, data) => void;
    delete?: (callbackComponent, data) => void;
    details?: (callbackComponent, data) => void;
}

export interface DatastoreActionsInputDisplay {
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
    details?: boolean;
    all?: boolean;
}

export interface DatastoreActionsInputDisabled {
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
    details?: boolean;
    all?: boolean;
}

export function DatastoreActionInputDataConverter(component: any, data: any): DatastoreActionsInputData {
    return {component, data};
}

@Component({
    selector: 'app-datastore-actions',
    templateUrl: './datastore-actions.component.html',
    styleUrls: ['./datastore-actions.component.scss']
})
export class DatastoreActionsComponent implements OnInit {


    @Input() display: DatastoreActionsInputDisplay;
    @Input() callback: DatastoreActionsInputCallback;
    @Input() data: DatastoreActionsInputData;
    @Input() disabled: DatastoreActionsInputDisabled;

    constructor() {
    }

    ngOnInit() {
        this.validateInputs();
    }

    validateInputs() {
        const errorMessagePrefix = 'Datastore actions component input validation error: ';
        const errorNoConfigPrefix = 'Configuration Error: ';
        if ((this.display.add || this.display.all) && (!this.callback.add || !this.data || !this.data.component)) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback and component\' parameter must be defined for Add');
        }

        if (
            (this.display.edit || this.display.all)
            && (!this.callback.edit || !this.data || (!this.data.component && !this.data.component))
        ) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback or data\' parameter must be defined for Edit');
        }

        if (
            (this.display.delete || this.display.all)
            && (!this.callback.details || !this.data || (!this.data.component && !this.data.component))
        ) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback\' parameter must be defined for Delete');
        }

        if (
            (this.display.details || this.display.all)
            && (!this.callback.details || !this.data || (!this.data.component && !this.data.component))
        ) {
            throw Error(errorMessagePrefix
                + errorNoConfigPrefix
                + '\'callback\' parameter must be defined for Details');
        }
    }

}
