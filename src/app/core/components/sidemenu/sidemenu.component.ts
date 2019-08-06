import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SidemenuTools} from '../../tools';
import {SidemenuService} from '../../services/sidemenu';
import {FullscreenService} from '../../services/fullscreen';
import {SidemenuItemComponent} from '../sidemenu-item';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, AfterViewInit {


    @ViewChildren('menuitem') menusComponents: QueryList<SidemenuItemComponent>;

    public menus = this.sidemenuService.getMenu();

    @Input() iconOnly = false;
    @Input() fullscreen: boolean = null;
    private hoverItem: SidemenuItemComponent = null;

    constructor(
        private el: ElementRef,
        private fullscreenService: FullscreenService,
        private sidemenuService: SidemenuService,
    ) {
    }

    getBoundary() {
        return this.el.nativeElement.getBoundingClientRect();
    }

    getHoverItemTop() {
        if (SidemenuTools.have(this.hoverItem)) {
            const boundaryItem = this.hoverItem.getBoundary();
            const boundarySideMenu = this.getBoundary();
            if (SidemenuTools.have(boundaryItem) && SidemenuTools.have(boundarySideMenu)) {
                return boundaryItem.top - boundarySideMenu.top;
            }
        }
        return -150;
    }

    hoverStyle() {
        const boundary = this.getBoundary();
        const margin = 4;
        const vTop = this.getHoverItemTop();
        const px = 'px';

        let vLeft = -15;
        let style = {};
        if (SidemenuTools.have(boundary)) {
            vLeft = boundary.width - margin;
        }

        style = {
            top: vTop + px,
            left: vLeft + px
        };
        return style;

    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.initServices();
    }


    initServices() {
        this.fullscreenService.fullscreenEmitter.subscribe(status => {
            this.fullscreen = status;
        });
        this.fullscreen = this.fullscreenService.isFullscreen();
        this.sidemenuService.hoverItemEmitter.subscribe(item => {
            this.hoverItem = item;
        });
        this.sidemenuService.menuEmitter.subscribe(menu => {
            this.menus = menu;
        });
    }

    disableHoverItem() {
        this.sidemenuService.hoverItem();
    }

}
