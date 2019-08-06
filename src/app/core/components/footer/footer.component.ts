import {Component, OnInit} from '@angular/core';
import {Theme} from '../../domains/enums';
import {ThemeService} from '../../services/theme';
import {FullscreenService} from '../../services/fullscreen';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    isDarkTheme = false;
    fullscreen = this.fullscreenService.isFullscreen();


    constructor(
        private themeService: ThemeService,
        private  fullscreenService: FullscreenService,
    ) {
    }

    ngOnInit() {
        this.fullscreenService.fullscreenEmitter.subscribe((state: boolean) => {
            this.fullscreen = state;
        });
    }

    changeTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        if (this.isDarkTheme) {
            this.themeService.run(Theme.BLUR_MINT_DARK);
        } else {
            this.themeService.run(Theme.BLUR_MINT);
        }
        console.log(this.isDarkTheme);
    }

}
