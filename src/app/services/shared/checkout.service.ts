import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CartService } from './cart.service';
import { AddressService } from '../api/address.service';

import { OrderModel } from '../../models/order.model';
import { AddressModel } from '../../models/address.model';

declare var $: any;

@Injectable()
export class CheckoutService {
    step: number = 1;
    finished: boolean = false;
    order: OrderModel = null;

    submitted: boolean;
    timestamp: number = new Date().getTime();
    addresses: AddressModel[] = [];
    loading: boolean;

    constructor(private cart: CartService, private addressService: AddressService) { }

    complete(finished: boolean): void {
        this.finished = finished;

        if (finished) {
            this.cart.clear();
        }
    }

    clear(): void {
        this.order = null;
        this.finished = false;
        this.step = 1;
    }

    set(step: number): void {
        this.step = step;
    }

    newAddress(): void {
        // let dialog: any = $('#dialog_' + this.timestamp);
        // dialog.modal('show');
        // dialog.on('hidden.bs.modal', () => {
        //     this.form.reset();
        //     this.submitted = false;
        // });
    }

    saveAddress(data: any): void {
        this.loading = true;
        this.addressService.insertAddress(data)
            .then(() => {
                return this.addressService.find();
            })
            .then((data) => {
                this.loading = false;
                let dialog: any = $('#dialog_' + this.timestamp);
                dialog.modal('hide');
                
                this.addresses = data;
            });
    }
}