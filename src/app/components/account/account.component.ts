import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenService } from '../../services/api/authen.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    menu: string;

    constructor(private router: Router, public authenService: AuthenService) { }

    ngOnInit() {
        this.menu = this.router.url;
    }

    selectMenu(e): void {
        if (e == 'logout') {
            this.logOut();
        }
        else {
            this.router.navigate([e]);
        }
    }

    logOut(): void {
        this.authenService.logOut();
        this.router.navigate(['/']);
    }
}
