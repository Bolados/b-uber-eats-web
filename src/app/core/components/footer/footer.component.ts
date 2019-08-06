import {Component, OnInit} from '@angular/core';
import {Theme, SidebarKind} from '../../domains/enums';
import {ThemeService} from '../../services/theme';
import {FullscreenService} from '../../services/fullscreen';
import { SidebarService } from '../../services';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    isDarkTheme = false;
    fullscreen = this.fullscreenService.isFullscreen();
    sidebar: SidebarKind = SidebarKind.SIDENAV;


    constructor(
        private themeService: ThemeService,
        private  fullscreenService: FullscreenService,
        private  sidebarService: SidebarService,
    ) {
    }

    getClass() {
        let style = ' ';
        if (this.sidebar !== SidebarKind.UNDEFINED) {
            style += this.sidebar;
        }
        if (this.fullscreen) {
            style += ' fullscreen ';
        }

        return style;
    }

    ngOnInit() {
        this.fullscreenService.fullscreenEmitter.subscribe((state: boolean) => {
            this.fullscreen = state;
        });
        this.sidebarService.sidebarKindEmitter.subscribe((sidebar: SidebarKind) => {
            this.sidebar = sidebar;
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
