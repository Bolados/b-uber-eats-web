import {EventEmitter, Injectable, Output} from '@angular/core';

export enum ToolbarState {
    SCROLLED = 'scrolled',
}

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {

    @Output() toolbarStateEmitter: EventEmitter<ToolbarState> = new EventEmitter();
    private state: ToolbarState = null;
    private boundary: ClientRect = null;

    constructor() {
    }

    getState() {
        return this.state;
    }

    toggleToolbarState(state) {
        if (this.state !== state) {
            this.state = state;
            this.toolbarStateEmitter.emit(this.state);
        }
        return this;
    }
}
