import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CheckoutModule } from './checkout.module';
import { AccountModule } from './account.module';
import { SharedModule } from './shared.module';

import { AppComponent, PageNotFoundComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OpenShopComponent } from './components/open-shop/open-shop.component';
import { SearchComponent } from './components/search/search.component';

import { AuthenService } from './services/api/authen.service';
import { AuthenGuardService } from './services/api/authen-guard.service';
import { CategoryService } from './services/api/category.service';
import { ProductService } from './services/api/product.service';
import { AddressService } from './services/api/address.service';
import { ShopService } from './services/api/shop.service';
import { OrderService } from './services/api/order.service';
import { PaymentService } from './services/api/payment.service';

import { StorageService } from './services/shared/storage.service';
import { CartService } from './services/shared/cart.service';
import { DialogService } from './services/shared/dialog.service';
import { TranslateService } from './services/shared/translate.service';
import { UtilService } from './services/shared/util.service';

import { TreeMenuElement } from './elements/tree-menu/tree-menu.element';
import { SliderElement } from './elements/slider/slider.element';
import { PaginationElement } from './elements/pagination/pagination.element';

import { ScrollerDirective } from './directives/scroller.directive';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HomeComponent,
        CategoryComponent,
        ProductComponent,
        LoginComponent,
        SignupComponent,
        OpenShopComponent,
        SearchComponent,

        TreeMenuElement,
        SliderElement,
        PaginationElement,

        ScrollerDirective
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ecommerce-market' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserTransferStateModule,
        SharedModule,
        AccountModule,
        CheckoutModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'open-shop',
                component: OpenShopComponent
            },
            {
                path: 'category/:id',
                component: CategoryComponent
            },
            {
                path: 'item/:id',
                component: ProductComponent
            },
            {
                path: 'item/:url/:id',
                component: ProductComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            },
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ])
    ],
    providers: [
        AuthenService,
        AuthenGuardService,
        StorageService,
        CartService,
        ProductService,
        CategoryService,
        AddressService,
        PaymentService,
        ShopService,
        OrderService,
        TranslateService,
        DialogService,
        UtilService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }