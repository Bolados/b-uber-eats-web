import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SidebarConfig, ToolbarConfig} from '../../../core/domains/models';
import {Theme, ToolbarDisplay, ToolbarMode} from '../../../core/domains/enums';
import {ToolbarComponent} from '../../../core/components/toolbar';
import {SidebarComponent} from '../../../core/components/sidebar';
import {menu, WorkspaceConfiguration} from '../../area-admin/configuration';
import {ThemeService} from '../../../core/services/theme';
import {FullscreenService} from '../../../core/services/fullscreen';
import {MediaMatcher} from '@angular/cdk/layout';
import {SidemenuService} from '../../../core/services/sidemenu';
import {Title} from '@angular/platform-browser';
import {OverlayContainer} from '@angular/cdk/overlay';


@Component({
    selector: 'app-area-template',
    templateUrl: './area-template.component.html',
    styleUrls: ['./area-template.component.scss']
})
export class AreaTemplateComponent implements OnInit, AfterViewInit {

    @Input() title;

    sidebarConfig: SidebarConfig = new SidebarConfig();
    toolbarConfig: ToolbarConfig = new ToolbarConfig();
    theme: Theme = Theme.BLUR_MINT;
    themeClass: string;
    fullscreen = null;
    toolbarMode = ToolbarMode.OUTSIDE;
    toolbarFixed = true;
    sideNavFixed = true;
    displayOutToolbar: ToolbarDisplay = ToolbarDisplay.DEFAULT;
    fixedOutToolbar = false;
    @ViewChild('toolbarOutside', {static: false}) toolbarOutside?: ToolbarComponent = null;
    @ViewChild('sidebar', {static: false}) sidebar?: SidebarComponent = null;
    private sidebarMenuElements = menu();
    private mobileQuery: MediaQueryList;
    private mobileQueryListener: () => void;

    constructor(
        private themeService: ThemeService,
        private fullscreenService: FullscreenService,
        private overlayContainer: OverlayContainer,
        private media: MediaMatcher,
        private changeDetectorRef: ChangeDetectorRef,
        private sidemenuService: SidemenuService,
        private titleService: Title,
    ) {
    }


    ngAfterViewInit() {
        this.titleService.setTitle(this.title);
        this.sidemenuService.changeMenu(this.sidebarMenuElements);
        this.sidebarConfig = WorkspaceConfiguration.SidebarWithFixedToolbarInside;
        this.initWorkspaceConfig();
    }

    initWorkspaceConfig() {
        this.sidebarConfig = WorkspaceConfiguration.SidebarWithFixedToolbarInside;

        // this.toolbarConfig = WorkspaceConfiguration.Toolbar;
        // this.sidebarConfig = WorkspaceConfiguration.SidebarWithToolbarOutside(this.toolbarOutside, this.toolbarConfig);

    }

    initialize() {

    }

    ngOnInit() {
        this.initialize();
        this.themeService.themeChanged.subscribe(theme => {
            this.themeService.updateTheme(this.overlayContainer);
            this.themeClass = this.themeService.getThemeFull();
            this.theme = theme;
        });
        this.theme = this.themeService.run(this.theme).getThemeShort();
        this.themeClass = this.themeService.getThemeFull();
        this.fullscreenService.fullscreenEmitter.subscribe(status => {
            this.fullscreen = status;
        });
        this.fullscreen = this.fullscreenService.isFullscreen();

        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

}
