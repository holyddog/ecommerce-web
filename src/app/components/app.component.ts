import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Config } from '../../environments/environment';

import { AuthenService } from '../services/api/authen.service';
import { CartService } from '../services/shared/cart.service';
import { StorageService } from '../services/shared/storage.service';
import { CategoryService } from '../services/api/category.service';
import { TranslateService } from '../services/shared/translate.service';
import { DialogService } from '../services/shared/dialog.service';

import { CategoryModel } from '../models/category.model';
import { UtilService } from '../services/shared/util.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    config: any = Config;
    year = new Date().getFullYear();
    q: string;

    @ViewChild('header') header: ElementRef;
    @ViewChild('main') main: ElementRef;
    sticky: number;

    constructor(
        meta: Meta, title: Title,
        private route: ActivatedRoute,
        public router: Router,
        public authenService: AuthenService,
        public dialog: DialogService,
        public util: UtilService,
        private translate: TranslateService,
        public cart: CartService,
        public categoryService: CategoryService,
        private storage: StorageService) {
        title.setTitle(Config.AppName);
        meta.addTags([
            {
                name: 'author', content: this.translate.instant('thailand_post_full_name')
            },
            {
                name: 'description', content: ""
            },
            {
                property: 'og:type', content: "website"
            }
        ]);
    }

    ngOnInit(): void {
        this.categoryService.load();

        this.translate.use('th');

        this.cart.load();
        this.authenService.load();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.sticky = this.header.nativeElement.offsetTop;
        }, 0);
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        if (window.pageYOffset > this.sticky) {
            this.main.nativeElement.style.paddingTop = this.header.nativeElement.offsetHeight + 'px';
            this.header.nativeElement.classList.add("sticky");

        } else {
            this.main.nativeElement.style.paddingTop = '0px';
            this.header.nativeElement.classList.remove("sticky");
        }
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

@Component({
    template: `
        <div class="fill-dock">
            <div class="d-flex v-center h-center h-100">Page Not Found</div>
        </div>
    `
})
export class PageNotFoundComponent {
}
