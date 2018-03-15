
import { OrderProductModel } from './order-product.model';
import { AddressModel } from './address.model';

export class PaymentModel {
    id?: number;
    name?: string;
}

export class OrderStatusModel {
    paid?: boolean;
    fin?: boolean;
    del?: boolean;
}

export class OrderModel {
    id?: string;
    order_no?: string;
    order_by?: number;

    create_date?: Date;

    total_qty?: number;
    total_price?: number;
    payment?: PaymentModel;
    delivery_address?: AddressModel;
    status?: OrderStatusModel;

    items?: OrderProductModel[];
}