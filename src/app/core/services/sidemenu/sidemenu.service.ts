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

    private menu: MenuItem[] = [];

    constructor() {
    }

    hoverItem(item: SidemenuItemComponent = null) {
        this.hoverItemEmitter.emit(item);
    }

    changeMenu(menu: MenuItem[]) {
        this.menu = menu;
        this.sortMenu();
        this.menuEmitter.emit(menu);
    }

    getMenu() {
        return this.menu;
    }

    closeSubMenu() {
        this.menu.forEach(menuItem => {
            menuItem.open = false;
        });
    }

    sortMenu() {
        this.menu.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.menu.forEach(submenu => {
            if (submenu.sub) {
                submenu.sub.sort((a, b) => (a.name > b.name) ? 1 : -1);
                const chip = submenu.chip;
                const value = 'value';
                chip[value] = submenu.sub.length;
                submenu.chip =  chip;
            }
        });
    }

}
