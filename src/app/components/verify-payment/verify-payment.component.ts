import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-verify-payment',
    templateUrl: './verify-payment.component.html',
    styleUrls: ['./verify-payment.component.css']
})
export class VerifyPaymentComponent implements OnInit {
    text: string = "Verifying payment...";

    data: any =  {
        "id": "5a8bac292847c6208cd65441",
        "order_no": "180220000014",
        "total_qty": 15,
        "total_price": 250,
        "payment": {
            "id": 2,
            "name": "เก็บเงินปลายทาง",
            "complete": true
        },
        "delivery_address": {
            "id": 25,
            "name": "asdf",
            "address": "asdf",
            "postcode": "12345",
            "province": {
                "id": 214,
                "name": "อ่างทอง"
            },
            "district": {
                "id": 86,
                "name": "เมืองอ่างทอง"
            },
            "telephone": "123123"
        },
        "create_date": "2018-02-20T05:03:37.737Z",
        "items": [
            {
                "product_item": {
                    "id": 283,
                    "name": "444",
                    "picture": "/image/product/733c85c1-aac0-410b-aa55-4c63ce714a58.jpeg",
                    "price": 4
                },
                "tracking": [
                    {
                        "barcode": "EP987151213TH",
                        "status_name": "เตรียมการฝากส่ง",
                        "status_code": "000"
                    },
                    {
                        "barcode": "EP983900375TH",
                        "status_name": "รับฝาก",
                        "status_code": "001",
                        "description": "",
                        "date_time": "2018-02-15T11:45:00.203+07:00",
                        "postcode": "10210"
                    }
                ],
                "qty": 10
            },
            {
                "product_item": {
                    "id": 275,
                    "name": "ยาอมกำกิก",
                    "picture": "/image/product/09414767-795c-42b6-8573-c4786792eaf3.jpeg",
                    "price": 42
                },
                "qty": 5
            }
        ]
    };

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        // this.route.queryParams.forEach((params: Params) => {
            
        // });
    }
}
