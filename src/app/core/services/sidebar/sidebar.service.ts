import {EventEmitter, Injectable, Output} from '@angular/core';
import {SidebarTools} from '../../tools';
import {SidebarKind} from '../../domains/enums';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    kind: SidebarKind = SidebarKind.SIDENAV;
    mode = 'side';
    sideNavOpened = true;
    matDrawerOpened = false;
    sideNavMode = 'side';

    @Output() sidebarKindEmitter: EventEmitter<SidebarKind> = new EventEmitter();
    @Output() sidebarModeEmitter: EventEmitter<string> = new EventEmitter();

    toggleSidebarKind() {
        let kind: SidebarKind = SidebarKind.UNDEFINED;
        if (SidebarTools.isSame(SidebarKind.SIDENAV, this.kind)) {
            kind = SidebarKind.DRAWER;
        }
        if (SidebarTools.isSame(SidebarKind.DRAWER, this.kind)) {
            kind = SidebarKind.SIDENAV;
        }
        this.kind = kind;
        this.sidebarKindEmitter.emit(this.kind);
    }

    toggleSideBarMode(mode: string) {
        this.mode = mode;
        this.sidebarModeEmitter.emit(this.mode);
    }


}
