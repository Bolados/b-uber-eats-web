import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Avatar} from '../../domains/models';
import {AuthenticationService} from '../../../authentication/services';
import {AuthenticationUser} from '../../../authentication/models/authentication-user';
import {menu} from './user-menu-elements';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

    isOpen: boolean = false;

    loading = false;

    currentUser: AuthenticationUser = null;
    currentUserPicture: any = null;

    items = menu;

    constructor(
        private elementRef: ElementRef,
        private authenticationService: AuthenticationService,
        private sanitizer: DomSanitizer,
    ) {
    }

    link(item: string): string {
        let link = '/';
        if (this.currentUser) {
            link += this.currentUser.user.application.name.toLowerCase()
                + '/'
                + this.currentUser.user.role.name.toString().toLowerCase()
                + '/';
        }
        return link + item.toLowerCase();
    }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        const reader = new FileReader();
        reader.readAsDataURL(Avatar.Blob(this.currentUser.user.details.avatar));
        reader.onload = () => {
            this.currentUserPicture = this.sanitizer.bypassSecurityTrustUrl(`${reader.result}`);
        };
    }

    @HostListener('document:click', ['$event', '$event.target'])
    onClick(event: MouseEvent, targetElement: HTMLElement) {
        if (!targetElement) {
            return;
        }

        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.isOpen = false;
        }
    }


    logout() {
        this.authenticationService.logout();
    }

}
