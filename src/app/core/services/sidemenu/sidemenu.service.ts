import {EventEmitter, Injectable, Output} from '@angular/core';
import {SidemenuItemComponent} from '../../components';
import {Menu} from '../../domains';
import {menus} from '../../components/sidemenu/menu-element';

@Injectable({
    providedIn: 'root'
})
export class SidemenuService {

    @Output() hoverItemEmitter: EventEmitter<SidemenuItemComponent> = new EventEmitter();
    @Output() menuEmitter: EventEmitter<Menu> = new EventEmitter();
    private menu = menus;

    constructor() {
    };

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
