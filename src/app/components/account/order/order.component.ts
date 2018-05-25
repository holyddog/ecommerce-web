import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { OrderService } from '../../../services/api/order.service';
import { TranslateService } from '../../../services/shared/translate.service';

import { OrderModel } from '../../../models/order.model';

import { Config } from '../../../../environments/environment';
import { BankTransferElement } from '../../../elements/bank-transfer/bank-transfer.element';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    @ViewChild('bankTransfer') bankTransfer: BankTransferElement;

    loading: boolean = false;
    config: any = Config;
    orders: OrderModel[] = [];

    constructor(private orderService: OrderService, private translate: TranslateService) { }

    ngOnInit() {
        this.orderService.find()
            .then(data => {
                this.orders = data;
            });
    }

    getStatusName(order: OrderModel): string {
        if (order.status && order.status.paid) {
            return this.translate.instant('paid');
        }
        return this.translate.instant('unpaid');
    }

    showPayment(): void {
        this.bankTransfer.show();
    }
}
