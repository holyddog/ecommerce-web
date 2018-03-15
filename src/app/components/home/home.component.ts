import { PLATFORM_ID, Inject, Component, OnInit, ViewChild } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

import { Config } from '../../../environments/environment';

import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';

import { SliderElement } from '../../elements/slider/slider.element';

import { CategoryService } from '../../services/api/category.service';
import { ProductService } from '../../services/api/product.service';

const HOME_PRODUCT_KEY = makeStateKey('home_product');

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    config: any = Config;

    @ViewChild(SliderElement)
    private slider: SliderElement;

    sliders: any[] = [];

    newProducts: ProductModel[] = [];
    bestProducts: ProductModel[] = [];
    data: any;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private state: TransferState, public categoryService: CategoryService, private productService: ProductService) { }

    ngOnInit() {
        this.productService.find()
            .then(data => {
                this.data = data;
            });

        // this.data = this.state.get(HOME_PRODUCT_KEY, null as any);

        // if (this.data) {
        //     this.bestProducts = this.data.best;
        //     this.newProducts = this.data.new;
        //     this.state.remove(HOME_PRODUCT_KEY);
        // }
        // else {
        //     this.productService.find({ type: 'home' })
        //         .then(data => {
        //             this.data = data;

        //             this.bestProducts = this.data.best;
        //             this.newProducts = this.data.new;

        //             if (isPlatformServer(this.platformId)) {
        //                 this.state.set(HOME_PRODUCT_KEY, data as any);
        //             }
        //         });
        // }

        if (isPlatformBrowser(this.platformId)) {
            this.productService.findSliders()  
                .then(data => {
                    this.sliders = data;
                    this.slider.exec();
                });
        }
    }
}
