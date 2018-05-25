import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Config } from '../../../../environments/environment';

import { CartService } from '../../../services/shared/cart.service';
import { CheckoutService } from '../../../services/shared/checkout.service';
import { OrderService } from '../../../services/api/order.service';
import { PaymentService } from '../../../services/api/payment.service';

import { OrderModel } from '../../../models/order.model';
import { BankAccountModel } from '../../../models/bank.model';

declare var $: any;

@Component({
    selector: 'app-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.css'],
    host: { 'class': 'checkout-body' }
})
export class CompleteComponent implements OnInit {
    config: any = Config;
    loading: boolean = false;
    order: OrderModel;
    bankAccs: BankAccountModel[] = [];

    constructor(private route: ActivatedRoute, public cart: CartService, private checkout: CheckoutService, private orderService: OrderService, private paymentService: PaymentService) { }

    ngOnInit() {
        this.loading = true;
        this.route.queryParams.forEach((params: Params) => {
            this.orderService.findByNumber(params['order_no'])
                .then(data => {
                    if (!data.error) {
                        this.order = data;                        
                        this.checkout.complete(true);

                        if (this.order.payment.id == 3) {
                            this.paymentService.findBankAccounts()
                                .then(data => {
                                    this.loading = false;
                                    this.bankAccs = data;
                                });
                        }
                        else {
                            this.loading = false;
                        }
                    }
                    else {
                        this.loading = false;                        
                    }
                });
        });
    }

    showBank(): void {
        var dialog = $('#dialog_order_complete');
        dialog.modal('show');
    }
}
