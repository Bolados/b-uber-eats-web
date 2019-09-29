import {Component, OnInit} from '@angular/core';
import {Application, Role} from '../../../../authentication/models';
import {Router} from '@angular/router';
import {LOGIN_PATH} from '../../../../authentication/_config/config';

@Component({
    selector: 'app-area-eater-login-layout',
    templateUrl: './area-eater-login-layout.component.html',
    styleUrls: ['./area-eater-login-layout.component.scss']
})
export class AreaEaterLoginLayoutComponent implements OnInit {

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
