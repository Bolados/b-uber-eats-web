import {EventEmitter, Injectable, Output} from '@angular/core';
import {SidemenuItemComponent} from '../../components';
import {menus} from '../../components/sidemenu/menu-element';
import { MenuItem } from '../../domains';

@Injectable({
    providedIn: 'root'
})
export class SidemenuService {

    @Output() hoverItemEmitter: EventEmitter<SidemenuItemComponent> = new EventEmitter();
    @Output() menuEmitter: EventEmitter<Array<MenuItem>> = new EventEmitter();
    private menu = menus;

    constructor() {
    }

    hoverItem(item: SidemenuItemComponent = null) {
        this.hoverItemEmitter.emit(item);
    }

    changeMenu(menu) {
        this.menu = menu;
        this.menuEmitter.emit(menu);
    }

    getMenu() {
        return this.menu;
    }

}
