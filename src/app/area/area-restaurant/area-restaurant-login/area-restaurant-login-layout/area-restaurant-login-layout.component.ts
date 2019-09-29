import {Component, OnInit} from '@angular/core';
import {Application, Role} from '../../../../authentication/models';
import {Router} from '@angular/router';
import {LOGIN_PATH} from '../../../../authentication/_config/config';

@Component({
    selector: 'app-area-restaurant-login-layout',
    templateUrl: './area-restaurant-login-layout.component.html',
    styleUrls: ['./area-restaurant-login-layout.component.scss']
})
export class AreaRestaurantLoginLayoutComponent implements OnInit {

    application: Application = {
        name: 'eater',
        type: 'app'
    };
    role: Role = null;
    home = null;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.role = Role.FromLoginUrl(this.router.url, LOGIN_PATH);
    }
}
