import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Config } from '../../../environments/environment';
import { ProductService } from '../../services/api/product.service';

const PRODUCTS_SEARCH_KEY = makeStateKey('products_search');

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    config: any = Config;
    data: any;
    q: string;

    constructor(private route: ActivatedRoute, private state: TransferState, public productService: ProductService) { }

    ngOnInit() {
        this.route.queryParams.forEach((params: Params) => {
            this.q = params['q'];
            this.productService.find(this.q)
                .then(data => {
                    this.data = data;
                });
        });
    }
}
