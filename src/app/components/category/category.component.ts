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
    categories: CategoryModel[] = [];
    products: ProductModel[] = [];

    constructor(private router: Router, private state: TransferState, private route: ActivatedRoute,
        public categoryService: CategoryService, public productService: ProductService) { }

    ngOnInit() {
        // this.productService.find()
        //     .then(data => {
        //         this.data = data;
        //     });

        // this.route.params.forEach((params: Params) => {
        //     let id: string = params['id'];
            
        //     this.categoryService.findById(id)
        //         .then(data => {
        //             let params: any = { category: id };
        //             return this.productService.find(params, 1);
        //         })
        //         .then(data => {
        //             datas.products = data.data;
        //             datas.totalProduct = data.total;
        //             return datas;
        //         })
        //         .then(data => {
        //             this.category = datas.category;
        //             this.products = datas.products;
        //             this.totalProduct = datas.totalProduct;
        //         });
        // });
    }
}
