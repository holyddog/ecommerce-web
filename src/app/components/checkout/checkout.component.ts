import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CheckoutService } from '../../services/shared/checkout.service';
import { AddressService } from '../../services/api/address.service';
import { AddressModel, ProvinceModel, DistrictModel } from '../../models/address.model';

declare var $: any;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {  

    constructor(public checkout: CheckoutService) { }

    ngOnInit() {
        
    }

    inactive(step: number): string {
        return (this.checkout.step < step)? "inactive": "";
    }
}
