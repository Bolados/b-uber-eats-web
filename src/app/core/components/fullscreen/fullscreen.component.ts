import {Component, OnInit} from '@angular/core';
import {Screenfull} from 'screenfull';
import {FullscreenService} from '../../services/fullscreen';

declare const screenfull: Screenfull;

@Component({
    selector: 'app-fullscreen',
    templateUrl: './fullscreen.component.html',
    styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {

    isFullscreen: boolean;

    constructor(private fullscreenService: FullscreenService, ) {
    }

    ngOnInit() {
        this.fullscreenService.fullscreenEmitter.subscribe(status => {
            this.isFullscreen = status;
        });
        this.isFullscreen = this.fullscreenService.isFullscreen();
    }

    toggleFullscreen() {
        this.fullscreenService.toggleFullscreen(!this.isFullscreen);
    }


}
