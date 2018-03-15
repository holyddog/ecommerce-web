import { Injectable } from '@angular/core';

import { TranslateService } from './translate.service';

declare var $: any;

@Injectable()
export class DialogService {
    dialogs: any[] = [];

    constructor(private translate: TranslateService) {}

    confirm(message: string, title: string = this.translate.instant('confirm')): Promise<any> {
        return new Promise((resolve, reject) => {
            let dialog: any;
            let id: string = this.getObjectId();
            this.dialogs.push({
                id: id,
                title: title,
                size: '',
                body: message,
                buttons: [{
                    text: this.translate.instant('ok'),
                    cls: 'blue',
                    handler: () => {
                        dialog.data('res', true);
                        dialog.modal('hide');
                    }
                }, {
                    text: this.translate.instant('cancel'),
                    cls: 'red',
                    handler: () => {
                        dialog.data('res', false);
                        dialog.modal('hide');
                    }
                }]
            });

            setTimeout(() => {
                dialog = $('#' + id);
                dialog.modal('show');
                dialog.on('hidden.bs.modal', () => {
                    this.dialogs.pop();
                    resolve(dialog.data('res') == true);
                });
            }, 0);
        });
    }

    alert(message: string, title: string = this.translate.instant('alert'), buttons: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            let dialog: any;
            let id: string = this.getObjectId();
            this.dialogs.push({
                id: id,
                size: '',
                title: title,
                body: message,
                buttons: [{
                    text: this.translate.instant('ok'),
                    cls: 'button-link',
                    handler: () => {
                        dialog.data('res', true);
                        dialog.modal('hide');
                    }
                }]
            });

            setTimeout(() => {
                dialog = $('#' + id);
                dialog.modal('show');
                dialog.on('hidden.bs.modal', () => {
                    this.dialogs.pop();
                    resolve(dialog.data('res') == true);
                });
            }, 0);
        });
    }
    
    message(message: string): void {
        this.toast(message, '', 'info');
    }

    success(message: string, title: string = null): void {
        if (!title) {
            title = this.translate.instant('success');
        }
        this.toast(message, title, 'success');
    }

    info(message: string, title: string = null): void {
        if (!title) {
            title = this.translate.instant('information');
        }
        this.toast(message, title, 'info');
    }

    error(message: string, title: string = null): void {
        if (!title) {
            title = this.translate.instant('error');
        }
        this.toast(message, title, 'error');
    }

    private getObjectId(): string {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

    private toast(message: string, title: string = null, icon: string = null): void {
        let opt: any = {
            position: 'top-center',
            stack: false,
            loader: false,
            allowToastClose: false
        };

        if (title) {
            opt.heading = title;
        }
        if (message) {
            opt.text = message;
        }
        if (icon) {
            opt.icon = icon;
        }

        $.toast(opt);
    }
}