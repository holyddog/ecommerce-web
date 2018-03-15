import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CartService } from '../../../services/shared/cart.service';
import { CheckoutService } from '../../../services/shared/checkout.service';
import { OrderService } from '../../../services/api/order.service';

import { OrderModel } from '../../../models/order.model';

@Component({
    selector: 'app-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.css'],
    host: { 'class': 'checkout-body' }
})
export class CompleteComponent implements OnInit {
    loading: boolean = false;
    order: OrderModel;

    constructor(private route: ActivatedRoute, public cart: CartService, private checkout: CheckoutService, private orderService: OrderService) { }

    ngOnInit() {
        this.loading = true;
        this.route.queryParams.forEach((params: Params) => {
            this.orderService.findByNumber(params['order_no'])
                .then(data => {
                    this.loading = false;

                    if (!data.error) {
                        this.order = data;                        
                        this.checkout.complete(true);
                    }
                    else {
                        
                    }
                });
        });
    }

}
