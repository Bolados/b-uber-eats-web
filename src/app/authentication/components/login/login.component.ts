import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services';
import {first} from 'rxjs/operators';
import {Application, AuthenticationRequest, Role, RoleName} from '../../models';

const errors = {
    required: 'required',
    minlength: 'least than required',
    maxlength: 'greater than required',
    pattern: 'pattern error'
};

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Input() application: Application;
    @Input() as: Role = null;
    @Input() home: string = null;


    loginForm: FormGroup;
    submitted = false;
    loading = false;
    error: string = null;
    returnUrl: string = null;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    getErrorMessage(el) {
        for (const key in errors) {
            if (errors.hasOwnProperty(key) && this.loginForm.get(el).hasError(key)) {
                return errors[key];
            }
        }
        return null;
    }

    ngOnInit() {

        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate([this.authenticationService.userHomeUrl]);
        }

        this.loginForm = this.formBuilder.group({
            username: ['admin', Validators.required],
            password: ['admin', Validators.required],
            rememberMe: false,
        });
    }

    async authenticateAs(roleName: RoleName): Promise<any> {
        const authRequest: AuthenticationRequest = new AuthenticationRequest(
            this.f.username.value,
            this.f.password.value,
            this.application.name,
            roleName.toString()
        );
        return this.authenticationService.login(authRequest)
            .pipe(first())
            .toPromise();
    }

    redirect() {
        // get return url from route parameters or default to '/'
        const user = this.authenticationService.currentUserValue.user;
        let url: string = this.route.snapshot.queryParams.returnUrl as string;
        if (url && user.role.name.toLowerCase() === RoleName.ADMIN.toString().toLowerCase()) {
            if (url.startsWith('/')) {
                url = url.slice(1);
            }
            let seg = url.split('/');
            if (seg.length > 1 && user.role.name !== seg[1]) {
                seg = seg.slice(1);
                url = user.application.name.toLowerCase() + '/' +
                    user.role.name.toString().toLowerCase() + '/' +
                    seg.join('/');
                console.log(url);
            }
        }
        this.returnUrl = url
            || this.home
            || this.authenticationService.userHomeUrl;
        this.router.navigate([this.returnUrl]);
    }

    async authenticateAsAny() {
        await this.authenticateAs(RoleName.ADMIN).then(
            () => this.redirect(),
            error => {
                this.error = error;
                this.authenticateAs(RoleName.ADMIN).then(
                    () => this.redirect(),
                    error1 => {
                        this.error = error1;
                        this.loading = false;
                    }
                );
            }
        );
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.as === null || this.as.name === null) {
            this.authenticateAsAny();
        } else {
            this.authenticateAs(this.as.name).then(
                () => this.redirect(),
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
        }
    }

}
