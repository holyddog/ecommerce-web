import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthenService } from '../../../services/api/authen.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { TranslateService } from '../../../services/shared/translate.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {    
    email: string;

    submittedInfo: boolean;
    loadingInfo: boolean;
    formInfo: FormGroup;
    dataInfo = {
        name: null
    };
    get name() { return this.formInfo.get('name'); }
    set name(value: any) { this.formInfo.get('name').setValue(value); }

    submittedPwd: boolean;
    loadingPwd: boolean;
    formPwd: FormGroup;
    dataPwd = {
        oldPassword: null,
        password: null,
        confirmPassword: null
    };
    get oldPassword() { return this.formPwd.get('oldPassword'); }
    get password() { return this.formPwd.get('password'); }
    get confirmPassword() { return this.formPwd.get('confirmPassword'); }

    constructor(private dialog: DialogService, private translate: TranslateService, private authenService: AuthenService) { }

    ngOnInit() {
        this.formInfo = new FormGroup({
            'name': new FormControl(this.dataInfo.name, [
                Validators.required
            ])
        });

        this.formPwd = new FormGroup({
            'oldPassword': new FormControl(this.dataPwd.oldPassword, [
                Validators.required
            ]),
            'password': new FormControl(this.dataPwd.password, [
                Validators.required,
                Validators.minLength(6)
            ]),
            'confirmPassword': new FormControl(this.dataPwd.confirmPassword, [
                Validators.required
            ])
        }, { validators: PasswordValidation.matchPassword });

        this.name = this.authenService.user.name;
        this.email = this.authenService.user.email;
    }
    
    isInfoFieldValid(key: string) {
        let field = this.formInfo.get(key);
        return (field.invalid && (field.touched)) || (field.invalid && field.untouched && this.submittedInfo);
    }
    
    isPwdFieldValid(key: string) {
        let field = this.formPwd.get(key);
        return (field.invalid && (field.touched)) || (field.invalid && field.untouched && this.submittedPwd);
    }

    updateInfo(): void {
        this.submittedInfo = true;
        
        if (this.formInfo.valid) {
            this.loadingInfo = true;
            this.authenService.updateInfo(this.name.value)
                .then(() => {
                    this.submittedInfo = false;
                    this.loadingInfo = false;
                    this.dialog.success(this.translate.instant('msg_update_success'));
                });
        }
    }
    
    updatePassword(): void {        
        this.submittedPwd = true;

        if (this.formPwd.valid) {
            this.loadingPwd = true;
            this.authenService.updatePassword(this.oldPassword.value, this.password.value)
                .then(data => {
                    this.loadingPwd = false;
                    this.submittedPwd = false;
                    this.formPwd.reset();

                    if (data.error) {
                        this.dialog.alert(data.error.message);
                    }
                    else {
                        this.dialog.success(this.translate.instant('msg_update_success'));
                    }
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