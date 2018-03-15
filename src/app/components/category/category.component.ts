import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Config } from '../../../environments/environment';
import { ProductModel } from '../../models/product.model';
import { CategoryModel, CategoryFilterModel } from '../../models/category.model';

import { CategoryService } from '../../services/api/category.service';
import { ProductService } from '../../services/api/product.service';

const PRODUCTS_CATEGORY_KEY = makeStateKey('products_category');

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    config: any = Config;
    data: any;

    products: ProductModel[] = [];
    totalProduct: number = 0;
    currentPage: number = 1;

    child: string = 'sub_categories';

    category: CategoryModel = null;
    categoryFilters: any[] = [];
    // categoryFilters: CategoryFilterModel[] = [{
    //     name: "GAME TYPE",
    //     filters: [{
    //         name: "Accumsan aliquid"
    //     }, {
    //         name: "Sodales hac"
    //     }, {
    //         name: "Felis malesuada"
    //     }, {
    //         name: "Blanditiis egestas"
    //     }, {
    //         name: "Tristique"
    //     }]
    // }, {
    //     name: "INTEREST",
    //     filters: [{
    //         name: "Quo recusandae"
    //     }, {
    //         name: "Hymenaeos sodales"
    //     }]
    // }];

    constructor(private router: Router, private state: TransferState, private route: ActivatedRoute,
        public categoryService: CategoryService, public productService: ProductService) { }

    ngOnInit() {
        this.route.queryParams.forEach((params: Params) => {
            if (params['page']) {
                this.currentPage = +params['page'];
            }

            this.route.params.forEach((params: Params) => {
                let id: string = params['id'];
    
                this.data = this.state.get(PRODUCTS_CATEGORY_KEY, null as any);
                if (!this.data) {
                    let datas: any = {};
                    this.categoryService.findById(id)
                        .then(data => {
                            datas.category = data;
                            let params: any = { category: id };
                            return this.productService.find(params, this.currentPage);
                        })
                        .then(data => {
                            datas.products = data.data;
                            datas.totalProduct = data.total;
                            return datas;
                        })
                        .then(data => {
                            this.category = datas.category;
                            this.products = datas.products;
                            this.totalProduct = datas.totalProduct;
    
                            this.state.set(PRODUCTS_CATEGORY_KEY, datas as any);
                        });
                }
                else {
                    this.category = this.data.category;
                    this.products = this.data.products;
                    this.totalProduct = this.data.totalProduct;
                }
            });
        });
    }
}
