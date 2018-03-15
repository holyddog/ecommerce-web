import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';

import { CheckoutService } from './checkout.service';

@Injectable()
export class CheckoutGuardService implements CanActivate {
    constructor(private checkout: CheckoutService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        if (location.search && location.search.startsWith('?')) {
            var search = location.search.substring(1);
            let result = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            if (result.status != undefined) {
                return true;
            }
        }

        return this.checkStep();
    }

    checkStep(): boolean {
        if (this.checkout.step > 1 && !this.checkout.finished) { 
            return true; 
        }

        this.checkout.clear();
        this.router.navigate(['/checkout']);
        return false;
    }
}