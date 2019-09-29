import {Component, OnInit} from '@angular/core';
import {API_NAME} from '../../../../_config/api.configuration';
import {Application, Role} from '../../../../authentication/models';
import {Router} from '@angular/router';
import {LOGIN_PATH} from '../../../../authentication/_config/config';

@Component({
    selector: 'app-login-layout',
    templateUrl: './login-layout.component.html',
    styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {


    application: Application = {
        name: API_NAME,
        type: 'API'
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
