import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    FooterComponent,
    FullscreenComponent,
    GoTopButtonComponent,
    LogoComponent,
    SearchBarComponent,
    SidebarComponent,
    SidemenuComponent,
    SidemenuItemComponent,
    ToolbarComponent,
    UserMenuComponent,
    WorkspaceComponent,
} from './components';
import {SharedModule} from '../shared';
import {SidebarService} from './services/sidebar';
import {ThemeService} from './services/theme';
import {FullscreenService} from './services/fullscreen';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ToolbarService} from './services/toolbar';
import { LanguageComponent } from './components/language/language.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        ToolbarComponent,
        FooterComponent,
        UserMenuComponent,
        SearchBarComponent,
        SidebarComponent,
        SidemenuComponent,
        SidemenuItemComponent,
        FullscreenComponent,
        LogoComponent,
        WorkspaceComponent,
        GoTopButtonComponent,
        LanguageComponent,
    ],
    imports: [
        CommonModule,
        PerfectScrollbarModule,
        SharedModule,
    ],
    exports: [
        ToolbarComponent,
        FooterComponent,
        SidebarComponent,
        PerfectScrollbarModule,
        WorkspaceComponent,
    ],
    providers: [
        SidebarService,
        ToolbarService,
        ThemeService,
        FullscreenService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
    ]
})
export class CoreModule {
}
