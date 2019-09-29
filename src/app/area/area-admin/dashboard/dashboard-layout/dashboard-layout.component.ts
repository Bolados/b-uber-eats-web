import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

    title = ' Dashboard ';

    constructor(private router: Router) {

    };

    ngOnInit() {
        console.log(this.router.config);
    }


}
