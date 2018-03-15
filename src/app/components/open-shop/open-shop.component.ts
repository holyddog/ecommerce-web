import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShopService } from '../../services/api/shop.service';

import { ShopModel } from '../../models/shop.model';

@Component({
    selector: 'app-open-shop',
    templateUrl: './open-shop.component.html',
    styleUrls: ['./open-shop.component.css']
})
export class OpenShopComponent implements OnInit {
    name: string;
    url: string;
    description: string;

    constructor(private router: Router, private shopService: ShopService) { }

    ngOnInit() {
    }

    create(): void {
        let shop: ShopModel = {
            name: this.name,
            url: this.url,
            description: this.description
        };
        this.shopService.createShop(shop)
            .then(() => {
                this.router.navigate(["/account"]);      
            });
    }
}
