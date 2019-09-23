import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        const loginUrl = this.authenticationService.userLoginUrl;
        this.authenticationService.logout();
        // not logged in so redirect to login page with the return url
        this.router.navigate([loginUrl], {replaceUrl: true});
    }

    ngOnInit() {

    }

}
