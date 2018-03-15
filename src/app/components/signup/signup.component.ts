import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenService } from '../../services/api/authen.service';
import { DialogService } from '../../services/shared/dialog.service';
import { TranslateService } from '../../services/shared/translate.service';
import { UtilService } from '../../services/shared/util.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    submitted: boolean;
    form: FormGroup;
    data = {
        name: null,
        email: null,
        password: null,
        confirmPassword: null
    };
    get name() { return this.form.get('name'); }
    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }
    get confirmPassword() { return this.form.get('confirmPassword'); }

    constructor(private router: Router, private authenService: AuthenService, private dialog: DialogService, private translate: TranslateService, private util: UtilService) { }

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl(this.data.name, [
                Validators.required
            ]),
            'email': new FormControl(this.data.email, [
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
            ]),
            'password': new FormControl(this.data.password, [
                Validators.required,
                Validators.minLength(6)
            ]),
            'confirmPassword': new FormControl(this.data.confirmPassword, [
                Validators.required
            ])
        }, { validators: PasswordValidation.matchPassword });
    }

    isFieldValid(key: string) {
        let field = this.form.get(key);
        return (field.invalid && (field.touched)) || (field.invalid && field.untouched && this.submitted);
    }

    signUp(): void {
        this.submitted = true;
        
        if (this.form.valid) {
            this.util.showLoading();
            this.authenService.signUp({
                name: this.name.value,
                email: this.email.value,
                password: this.password.value
            })
                .then(data => {
                    this.util.hideLoading();
                    if (!data.error) {
                        this.dialog.alert(this.translate.instant('msg_signup_complete'), this.translate.instant('title_signup_complete'))
                            .then(() => {
                                this.router.navigate(["/login"]);
                            });
                    }
                    else {
                        this.dialog.alert(data.error.message);
                    }
                })
                .catch(() => {
                    this.util.hideLoading();
                    this.dialog.alert(this.translate.instant('msg_internal_error'));
                });
        }
    }
}

export class PasswordValidation {
    static matchPassword(ac: AbstractControl) {
        let password = ac.get('password').value;
        let confirmPassword = ac.get('confirmPassword').value;
        if (password != confirmPassword) {
            ac.get('confirmPassword').setErrors({ matchPassword: true })
        } else {
            return null
        }
    }
}