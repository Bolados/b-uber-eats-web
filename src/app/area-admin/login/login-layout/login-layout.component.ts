import {Component, OnInit} from '@angular/core';
import {API_NAME} from '../../../_config/api.configuration';
import {Application, Role} from '../../../authentication/models';

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
    home = API_NAME + '/admin';

    constructor() {
    }

    ngOnInit() {
    }

}
