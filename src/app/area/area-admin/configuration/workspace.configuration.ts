import {Search, SidebarConfig, SidebarKind, Toolbar, ToolbarConfig, ToolbarDisplay, ToolbarMode} from 'src/app/core/domains';
import {ToolbarComponent} from 'src/app/core';

export class WorkspaceConfiguration {

    public static get SidebarWithFixedToolbarInside(): SidebarConfig {
        const sidebarConfig = new SidebarConfig();
        sidebarConfig.mode = 'side';
        sidebarConfig.opened = SidebarKind.SIDENAV;
        sidebarConfig.fixed = true;
        sidebarConfig.fullscreen = true;
        sidebarConfig.toolbars.kind = ToolbarMode.INSIDE;
        sidebarConfig.toolbars.fixed = true;
        sidebarConfig.toolbars.search = new Search(false);
        sidebarConfig.toolbars.components = new Array<Toolbar>();

        return sidebarConfig;
    }

    public static get SidebarWithToolbarInside(): SidebarConfig {
        const sidebarConfig = new SidebarConfig();
        sidebarConfig.mode = 'side';
        sidebarConfig.opened = SidebarKind.SIDENAV;
        sidebarConfig.fixed = true;
        sidebarConfig.fullscreen = true;
        sidebarConfig.toolbars.kind = ToolbarMode.INSIDE;
        sidebarConfig.toolbars.fixed = false;
        sidebarConfig.toolbars.search = new Search(false);
        sidebarConfig.toolbars.components = new Array<Toolbar>();
        return sidebarConfig;
    }

    public static get Toolbar(): ToolbarConfig {
        const toolbarConfig = new ToolbarConfig();
        toolbarConfig.display = ToolbarDisplay.DEFAULT;
        toolbarConfig.fixed = false;
        toolbarConfig.sidenav = SidebarKind.SIDENAV;
        toolbarConfig.fullscreen = true;
        toolbarConfig.search = new Search(true);
        return toolbarConfig;
    }

    static SidebarWithToolbarOutside(toolbarComponent: ToolbarComponent, toolbarConfig: ToolbarConfig): SidebarConfig {
        const outsideToolbar = new Toolbar(toolbarComponent, toolbarConfig);
        const sidebarConfig = new SidebarConfig();
        sidebarConfig.mode = 'side';
        sidebarConfig.opened = SidebarKind.SIDENAV;
        sidebarConfig.fixed = true;
        sidebarConfig.fullscreen = true;
        sidebarConfig.toolbars.kind = ToolbarMode.OUTSIDE;
        sidebarConfig.toolbars.fixed = toolbarConfig.fixed;
        sidebarConfig.toolbars.components = new Array<Toolbar>(outsideToolbar);
        return sidebarConfig;
    }

}
