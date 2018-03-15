import { PLATFORM_ID, Inject, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

import { Config } from '../../../environments/environment';
import { ProductModel } from '../../models/product.model';

import { CartService } from '../../services/shared/cart.service';
import { TranslateService } from '../../services/shared/translate.service';
import { DialogService } from '../../services/shared/dialog.service';
import { ProductService } from '../../services/api/product.service';

const PRODUCT_KEY = makeStateKey('product');

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    config: any = Config;
    product: ProductModel = null;
    qty: number = 1;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private meta: Meta, private title: Title, private router: Router, private route: ActivatedRoute, private state: TransferState,
        public cart: CartService, public translate: TranslateService, public dialog: DialogService, private productService: ProductService) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];
            this.productService.findById(id)
                .then(data => {
                    if (!data.error) {
                        if (data.description) {
                            data.description = data.description.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
                        }

                        this.product = data;
                        this.state.set(PRODUCT_KEY, data as any);

                        let title: string = this.product.name + " | " + this.translate.instant('thailand_post_full_name');
                        this.title.setTitle(title);
                        this.meta.addTags([
                            {
                                property: 'og:url', content: this.config.HostUrl + "/item/" + this.product.url + "/" + this.product.id
                            },
                            {
                                property: 'og:title', content: title
                            },
                            {
                                property: 'og:type', content: "product"
                            },
                            {
                                property: 'og:image', content: this.config.FileUrl + this.product.picture
                            },
                            {
                                property: 'og:site_name', content: this.config.HostUrl
                            }
                        ]);
                    }
                });
        });

        // this.product = this.state.get(PRODUCT_KEY, null as any);

        // if (!this.product) {

        // }

        // if (!this.product) {
        //     this.route.params.forEach((params: Params) => {
        //         let id: number = +params['id'];
        //         this.productService.findById(id)
        //             .then(data => {
        //                 if (data.description) {
        //                     data.description = data.description.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
        //                 }

        //                 this.product = data;

        //                 if (isPlatformServer(this.platformId)) {
        //                     this.state.set(PRODUCT_KEY, data as any);
        //                 }
        //             });
        //     });
        // }
        // else {
        //     this.state.remove(PRODUCT_KEY);
        // }
    }

    checkNumber(qty: any): void {
        if (!isNaN(qty)) {
            this.qty = Math.min(9999, Math.max(1, Math.round(qty)));
        }
        else {
            this.qty = 1;
        }
    }

    addCart(): void {
        this.cart.add({
            qty: this.qty,
            item: {
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                picture: this.product.picture,
                shop_id: this.product.shop_id
            }
        });
        this.dialog.message(this.translate.instant('msg_item_add_to_cart').format(this.qty));
    }

    buyNow(): void {
        this.addCart();
        this.router.navigate(['/checkout'])
    }

    selectPicture(subPicture: string): void {
        this.product.picture = subPicture;
    }
}
