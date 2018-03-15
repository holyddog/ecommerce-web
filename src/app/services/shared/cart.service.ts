import { Injectable } from '@angular/core';

import { ProductModel } from '../../models/product.model';
import { OrderProductModel } from '../../models/order-product.model';

import { StorageService } from './storage.service';

@Injectable()
export class CartService {
    totalQty: number = 0;
    totalPrice: number = 0;
    orders: OrderProductModel[] = [];

    constructor(private storage: StorageService) { }

    private save(): void {        
        this.storage.set('cart', {
            totalQty: this.totalQty,
            totalPrice: this.totalPrice,
            orders: this.orders
        });
    }
    
    calc(): void {
        this.totalQty = 0;
        this.totalPrice = 0;

        for (let i of this.orders) {
            this.totalPrice += i.item.price * i.qty;
            this.totalQty += i.qty;
        }
    }
    
    load(): void {
        let cart: any = this.storage.get('cart');
        if (cart) {
            this.totalQty = cart.totalQty;
            this.totalPrice = cart.totalPrice;
            this.orders = cart.orders;
        }
    }

    clear(): void {
        this.totalQty = 0;
        this.totalPrice = 0;
        this.orders = [];

        this.storage.remove('cart');
    }

    add(cartProduct: OrderProductModel): void {        
        let index: number = this.orders.findIndex((elm) => {
            return elm.item.id == cartProduct.item.id;
        });

        if (index > -1) {
            let i = this.orders[index];
            i.qty += cartProduct.qty;
            this.orders.splice(index, 1, i);
        }
        else {
            this.orders.push(cartProduct);
        }

        this.calc();
        this.save();
    }
    
    update(cartProduct: OrderProductModel): void {
        let index: number = this.orders.findIndex((elm) => {
            return elm.item.id == cartProduct.item.id;
        });
        this.orders.splice(index, 1, cartProduct);

        this.calc();
        this.save();
    }
    
    remove(cartProduct: OrderProductModel): void {
        let index: number = this.orders.findIndex((elm) => {
            return elm.item.id == cartProduct.item.id;
        });
        this.orders.splice(index, 1);

        this.calc();   
        this.save();
    }
}
