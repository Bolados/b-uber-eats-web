import {Component, OnInit} from '@angular/core';
import {Application, Role} from '../../../../authentication/models';
import {Router} from '@angular/router';
import {LOGIN_PATH} from '../../../../_routes/path.routes';

@Component({
    selector: 'app-area-driver-login-layout',
    templateUrl: './area-driver-login-layout.component.html',
    styleUrls: ['./area-driver-login-layout.component.scss']
})
export class AreaDriverLoginLayoutComponent implements OnInit {

    application: Application = {
        name: 'driver',
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
