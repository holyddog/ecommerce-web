import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Config } from '../../../environments/environment';
import { ProductService } from '../../services/api/product.service';
import { CategoryService } from '../../services/api/category.service';

import { CategoryModel, CategoryFilterModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';

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

    categories: CategoryModel[] = [];
    products: ProductModel[] = [];
    totalProduct: number = 0;
    currentPage: number = 1;

    constructor(private route: ActivatedRoute, private state: TransferState, public productService: ProductService, private categoryService: CategoryService) { }

    ngOnInit() {
        this.route.queryParams.forEach((params: Params) => {
            if (params['page']) {
                this.currentPage = +params['page'];
            }
            this.q = params['q'];

            if (this.q && this.q.trim().length) {
                this.data = this.state.get(PRODUCTS_SEARCH_KEY, null as any);
                if (!this.data) {
                    this.productService.find({ q: this.q }, this.currentPage)
                        .then(data => {
                            this.data = data;

                            this.products = data.data;
                            this.totalProduct = data.total;
                            this.categories = [];

                            this.state.set(PRODUCTS_SEARCH_KEY, this.data as any);
                        })
                }
                else {
                    // this.categories = this.data.categories;
                    this.products = this.data.data;
                    this.totalProduct = this.data.total;
                }
            }
        });
    }

    trackQuery(event) {
        if (event.keyCode == 13) {
            this.search();
        }
    }

    search(): void {
        if (this.q.trim().length > 0) {
            window.location.href = '/search?q=' + this.q;
        }
    }
}
