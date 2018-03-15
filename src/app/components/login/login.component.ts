import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Config } from '../../../environments/environment';

import { AuthenService } from '../../services/api/authen.service';
import { DialogService } from '../../services/shared/dialog.service';
import { UtilService } from '../../services/shared/util.service';
import { TranslateService } from '../../services/shared/translate.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    appName = Config.AppName;
    blocked: boolean = true;

    submitted: boolean;
    form: FormGroup;
    data = {
        email: null,
        password: null
    };
    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }

    constructor( @Inject(PLATFORM_ID) private platformId: Object, private router: Router, private authenService: AuthenService, private dialog: DialogService, private util: UtilService, private translate: TranslateService) { }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(this.data.email),
            'password': new FormControl(this.data.password)
        });

        if (isPlatformBrowser(this.platformId)) {
            this.blocked = false;
        }
    }

    isFieldValid(key: string) {
        let field = this.form.get(key);
        return (field.invalid && (field.touched)) || (field.invalid && field.untouched && this.submitted);
    }

    logIn() {
        this.submitted = true;

        if (this.form.valid) {
            this.util.showLoading(this.translate.instant('loading_logging_in'));
            this.authenService.logIn(this.email.value, this.password.value)
                .then((data: any) => {
                    this.util.hideLoading();
                    if (!data.error) {
                        let redirect = this.authenService.url ? this.authenService.url : '/';
                        this.router.navigate([redirect]);   
                    }
                    else {
                        this.submitted = false;
                        this.dialog.alert(data.error.message);
                    }
                })
                .catch(() => {
                    this.submitted = false;
                    this.util.hideLoading();
                    this.dialog.alert(this.translate.instant('msg_internal_error'));
                });
        }
    }
}
