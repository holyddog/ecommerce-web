import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Config } from '../../../../environments/environment';

import { OrderModel } from '../../../models/order.model';

import { OrderService } from '../../../services/api/order.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    config: any = Config;
    order: OrderModel;

    constructor(private route: ActivatedRoute, private orderService: OrderService) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let no: string = params['no'];
            this.orderService.findByNumber(no)
                .then(data => this.order = data);
        });
    }

}
