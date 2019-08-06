import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from '@angular/material';
import {SidebarTools, ToolbarTools} from '../../tools';
import {Search, ToolbarConfig} from '../../domains/models';
import {SidebarService} from '../../services/sidebar';
import {ToolbarService, ToolbarState} from '../../services/toolbar';
import {FullscreenService} from '../../services/fullscreen';
import {SidebarKind, ToolbarDisplay} from '../../domains/enums';
import {LogoComponent} from '../logo';
import {FullscreenComponent} from '../fullscreen';
import {ToolbarHelpers} from './toolbar.helpers';


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewChecked {

    // view
    tools = SidebarTools;
    displays = ToolbarDisplay;
    sidebars = SidebarKind;
    toolbarState: ToolbarState = null;
    toolbarHelpers = ToolbarHelpers;
    @Input() config: ToolbarConfig = null;
    private lastExcecution = new Date();
    @ViewChild(MatToolbar, {static: false}) private matToolbar: MatToolbar;
    @ViewChild(LogoComponent, {static: false}) private logoComponent?: LogoComponent;
    @ViewChild(FullscreenComponent, {static: false}) private fullscreenComponent?: FullscreenComponent;
    @Input() private display: ToolbarDisplay = null; // = ToolbarDisplay.DEFAULT;
    @Input() private fixed: boolean = null; // = true;
    @Input() private sidenav: SidebarKind = null; // SidebarKind.SIDENAV;
    @Input() private fullscreen: boolean = null;
    @Input() private search: Search = new Search(false);

    constructor(private el: ElementRef,
                private fullscreenService: FullscreenService,
                private toolbarService: ToolbarService,
                private sidebarService: SidebarService,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    initialize() {
        if (!ToolbarTools.have(this.config)) {
            this.config = new ToolbarConfig(this.display, this.fixed, this.sidenav, this.search, this.fullscreen);
        }

    }


    getBoundary() {
        return this.matToolbar._elementRef.nativeElement.getBoundingClientRect();
    }


    getClasses(fixed: boolean = true, fullscreen: boolean = false, ) {
        let classes = this.config.getKindStyleClasse();

        classes += this.config.getSidenavStyleClasse();

        if (this.config.fixed) {
            classes += this.config.getFixedStyleClasse();
        }

        if (this.config.fullscreen) {
            classes += this.config.getFullscreenStyleClasse();
        }

        if (ToolbarTools.have(this.toolbarState)) {
            classes += this.toolbarState;
        }

        return classes;

    }

    ngOnInit() {
        this.validateInputs();
        this.initialize();
        this.initializeServices();
    }

    ngAfterViewChecked(): void {
        this.lastExcecution = new Date();
        this.changeDetectorRef.detectChanges();
    }


    initializeServices() {
        this.toolbarState = this.toolbarService.getState();
        this.toolbarService.toolbarStateEmitter.subscribe(state => {
            this.toolbarState = state;
            // this.changeDetectorRef.detectChanges();
        });
        this.sidebarService.sidebarKindEmitter.subscribe(kind => {
            this.config.sidenav = kind;
            // this.changeDetectorRef.detectChanges();
        });
        this.sidebarService.sidebarModeEmitter.subscribe(mode => {
        });
        this.fullscreenService.fullscreenEmitter.subscribe(status => {
            this.config.fullscreen = status;
            // this.changeDetectorRef.detectChanges();
        });
        this.config.fullscreen = this.fullscreenService.isFullscreen();
    }

    toggleSideBar() {
        this.sidebarService.toggleSidebarKind();
    }

    validateInputs() {
        const errorMessagePrefix = 'Toolbar component input validation error: ';
        const errorNoConfigPrefix = 'Configuration Error: ';
        if (!ToolbarTools.have(this.config)) {
            if (!ToolbarTools.have(this.display)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'display\' parameter must be defined');
            }
            if (!ToolbarTools.have(this.fixed)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'fixed\' parameter must be defined');
            }
            if (!ToolbarTools.have(this.sidenav)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'sidenav\' parameter must be defined');
            }

        } else {
            if (ToolbarTools.have(this.display)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'display\' parameter must be removed');
            }
            if (ToolbarTools.have(this.fixed)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'fixed\' parameter must be removed');
            }
            if (ToolbarTools.have(this.sidenav)) {
                throw Error(errorMessagePrefix
                    + errorNoConfigPrefix
                    + '\'sidenav\' parameter must be removed');
            }
        }
    }


}
