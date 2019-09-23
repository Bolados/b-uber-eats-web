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
    @Input() home: null;


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
            this.router.navigate([this.home]);
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || this.home || this.application.name;

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
