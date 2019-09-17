import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {first} from 'rxjs/operators';
import {User} from '../../models';
import {AuthenticationUser} from '../../models/authentication-user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    currentUser: AuthenticationUser;

    loading = false;
    users: User[];

    constructor(
        private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
