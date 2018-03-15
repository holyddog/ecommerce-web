import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Config } from '../../../../environments/environment';

import { CartService } from '../../../services/shared/cart.service';
import { CheckoutService } from '../../../services/shared/checkout.service';

import { OrderModel } from '../../../models/order.model';
import { OrderProductModel } from '../../../models/order-product.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    host: { 'class': 'checkout-body' }
})
export class CartComponent implements OnInit {
    config: any = Config;

    constructor(public cart: CartService, private checkout: CheckoutService, private router: Router) { }

    ngOnInit() {
        this.checkout.clear();
    }

    onQtyChange(o: OrderProductModel): void {        
        if (!isNaN(o.qty)) {
            o.qty = Math.min(9999, Math.max(1, Math.round(o.qty)));
        }
        else {
            o.qty = 1;
        }

        this.cart.update(o);
    }

    next() {
        this.checkout.order = {
            total_qty: this.cart.totalQty,
            total_price: this.cart.totalPrice,
            items: this.cart.orders
        };

        this.checkout.set(2);
        this.router.navigate(['/checkout/delivery']);
    }
}
