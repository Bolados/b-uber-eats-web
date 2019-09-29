import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SidemenuService} from '../../services/sidemenu';
import {SidebarService} from '../../services/sidebar';
import {AuthenticationService} from '../../../authentication/services';
import {RoleName} from '../../../authentication/models';

@Component({
    selector: 'app-sidemenu-item',
    templateUrl: './sidemenu-item.component.html',
    styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit, AfterViewInit {

    @ViewChildren('submenuitem') submenusComponents: QueryList<SidemenuItemComponent>;

    @Input() parent = null;
    @Input() menu;
    @Input() iconOnly: boolean;

    constructor(
        private el: ElementRef,
        private sidemenuService: SidemenuService,
        private sidebarService: SidebarService,
        private authenticationService: AuthenticationService,
    ) {
    }


    ngAfterViewInit() {
        // console.log(this.submenusComponents);
    }

    ngOnInit() {
    }

    openLink() {
    }

    link(url: string): string {
        let link = '/';
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            link += currentUser.user.application.name.toLowerCase() + '/';

            if (currentUser.user.role.name.toString().toLowerCase() !== RoleName.USER.toString().toLowerCase()) {
                link += currentUser.user.role.name.toString().toLowerCase() + '/';
            }
        }
        return link + url.toLowerCase();
    }

    openMenu() {
        this.menu.open = !this.menu.open;
        if (this.checkForChildMenu() && this.iconOnly ) {
            console.log('toogle');
            this.sidebarService.toggleSidebarKind();
        }
    }

    getBoundary() {
        return this.el.nativeElement.getBoundingClientRect();
    }

    hoverMenuItem() {
        this.sidemenuService.hoverItem(this);
    }

    checkForChildMenu() {
        return (this.menu && this.menu.sub) ? true : false;
    }


}
