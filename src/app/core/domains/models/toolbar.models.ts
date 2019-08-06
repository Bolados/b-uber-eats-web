import {SidebarKind, ToolbarDisplay, ToolbarMode} from '../enums';
import {Search} from './search.models';
import {ToolbarTools} from '../../tools';
// import {ToolbarComponent} from '../../components/toolbar';


export class ToolbarConfig {

    static DEFAULTTOOLBARCONFIG = new ToolbarConfig();

    display: ToolbarDisplay;
    fixed: boolean;
    sidenav: SidebarKind;
    fullscreen: boolean;
    search: Search;


    constructor(display: ToolbarDisplay = ToolbarDisplay.UNDEFINED, fixed: boolean = true,
                sidenav: SidebarKind = SidebarKind.UNDEFINED, search: Search = new Search(),
                fullscreen: boolean = null) {
        this.display = display;
        this.fixed = fixed;
        this.sidenav = sidenav;
        this.search = search;
        this.fullscreen = fullscreen;
    }

    shown(sidenav: SidebarKind) {
        return ToolbarTools.isSame(this.sidenav, sidenav);
    }

    isKind(kind: ToolbarDisplay) {
        return ToolbarTools.isSame(this.display, kind);
    }

    getKindStyleClasse() {
        return 'app-toolbar-' + this.display + ' ';
    }

    getFixedStyleClasse() {
        return 'fixed ';
    }

    getFullscreenStyleClasse() {
        return 'fullscreen ';
    }

    getSidenavStyleClasse() {
        return this.sidenav + ' ';
    }


}

export class Toolbar {

    component: any; // ToolbarComponent;
    config: ToolbarConfig;

    constructor(component: any = null, config: ToolbarConfig = new ToolbarConfig()) {
        this.component = component;
        this.config = config;
    }


}


export class Toolbars {

    kind: ToolbarMode;
    fixed: boolean;
    search: Search;
    components: Array<Toolbar>;

    constructor(
        kind: ToolbarMode = ToolbarMode.DISABLE,
        fixed: boolean = null,
        search: Search = new Search(false),
        components: Array<Toolbar> = new Array<Toolbar>()) {
        this.kind = kind;
        this.fixed = fixed;
        this.search = search;
        this.components = components;
    }

    getToolbar(kind: ToolbarMode, display: ToolbarDisplay): Toolbar {
        let toolbar = new Toolbar();
        if (ToolbarTools.isSame(this.kind, kind)) {
            this.components.forEach((value: Toolbar) => {
                if (ToolbarTools.isSame(value.config.display, display)) {
                    toolbar = value;
                }
                if (ToolbarTools.isSame(ToolbarDisplay.ANY, display)
                    && ToolbarTools.have(value) && ToolbarTools.have(value.component)) {
                    toolbar = value;
                }
            });
        }

        return toolbar;
    }

    setToolbar(kind: ToolbarMode, display: ToolbarDisplay, toolbar: any) {
        if (ToolbarTools.isSame(this.kind, kind)) {
            this.components.forEach((value: Toolbar) => {
                if (ToolbarTools.isSame(value.config.display, display)) {
                    value.component = toolbar;
                }
            });
        }
    }

    haveToolbar(kind: ToolbarMode, display: ToolbarDisplay): boolean {
        const toolbar = this.getToolbar(kind, display);
        return ToolbarTools.have(toolbar) && ToolbarTools.have(toolbar.component);
    }

}


