import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Config, environment } from '../../../../environments/environment';

import { CartService } from '../../../services/shared/cart.service';
import { CheckoutService } from '../../../services/shared/checkout.service';
import { OrderService } from '../../../services/api/order.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { TranslateService } from '../../../services/shared/translate.service';

import { PaymentModel } from '../../../models/order.model';

declare var CryptoJS: any;

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css'],
    host: { 'class': 'checkout-body' }
})
export class PaymentComponent implements OnInit {
    @ViewChild('paymentForm') paymentForm: ElementRef;

    loading: boolean = false;
    loadingText: string;
    config: any = Config;
    env: any = environment.payment;
    redirect: boolean = false;
    orderNo: string;

    payments: any[] = [{
        id: 1,
        icon: "credit_card",
        name: this.translate.instant('credit_or_debit_card')
    }, {
        id: 2,
        icon: "directions_walk",
        name: this.translate.instant('cash_on_delivery')
    }, {
        id: 3,
        icon: "account_balance",
        name: this.translate.instant('bank_transfer')
    }];
    payment: number = 1;

    constructor(private route: ActivatedRoute, private router: Router, public cart: CartService, private checkout: CheckoutService, private orderService: OrderService, private dialog: DialogService, private translate: TranslateService) { }

    ngOnInit() {
        this.checkout.set(3);

        this.route.queryParams.forEach((params: Params) => {
            this.orderNo = params['order_no'];
            if (this.orderNo) {
                this.loading = true;
                this.loadingText = this.translate.instant('loading');
                this.orderService.findByNumber(this.orderNo)
                    .then(data => {
                        this.loading = false;

                        if (!data.error) {
                            delete data['create_date'];
                            delete data['payment'];
                            delete data['order_no'];

                            this.checkout.order = data;

                            let status: any = params['status'];
                            if (status == '002') {
                                this.orderNo = null;
                                this.dialog.alert(this.translate.instant('msg_credit_card_rejected'));
                            }
                        }
                        else {
                            this.orderNo = null;
                        }
                    });
            }
        });
    }

    prev(): void {
        this.checkout.set(2);
        this.router.navigate(['/checkout/delivery']);
    }

    amount(): string {
        return ('000000000000' + (this.cart.totalPrice * 100)).slice(-12);
    }

    submitPaymentForm(orderNo: string): void {
        var params = `${this.env.version}${this.env.merchant_id}${orderNo}${this.env.currency}${this.amount()}${this.env.payment_option}`;
        var hashValue = CryptoJS.HmacSHA1(params, this.env.secret_key).toString().toUpperCase();

        this.paymentForm.nativeElement.order_id.value = orderNo;
        this.paymentForm.nativeElement.hash_value.value = hashValue;

        this.paymentForm.nativeElement.submit();
    }

    complete(): void {
        let p = this.payments.find(o => o.id == this.payment);

        if (!p) {
            this.dialog.alert(this.translate.instant('please_select_payment_option'));
            return;
        }

        this.checkout.order.payment = {
            id: p.id,
            name: p.name
        };

        if (this.orderNo && this.checkout.order.payment.id == 1) {
            this.submitPaymentForm(this.orderNo);
        }
        else {
            this.loading = true;
            this.redirect = true;
            this.orderService.insertOrder(this.checkout.order)
                .then(data => {
                    this.loading = false;
    
                    let orderNo: string = data.order_no;
                    if (p.id == 1) {
                        this.submitPaymentForm(orderNo);
                    }
                    else {
                        this.checkout.set(4);
                        this.router.navigate(['/checkout/complete'], { queryParams: { order_no: orderNo } });
                    }
                });
        }
    }
}
