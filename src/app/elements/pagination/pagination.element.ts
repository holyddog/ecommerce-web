import { Component, OnInit, Input } from '@angular/core';

import { Config } from '../../../environments/environment';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.element.html',
    styleUrls: ['./pagination.element.css'],
    host: { 'class': 'm-center mt-3 d-flex' }
})
export class PaginationElement implements OnInit {
    @Input('current-page')
    currentPage: number = 1;

    @Input()
    total: number = 0;

    @Input()
    href: string;

    paging: any[] = [];
    lastPage: number;

    constructor() {}

    ngOnInit(): void {
        this.lastPage = Math.ceil(this.total / Config.PageSize);
        let start: number = Math.max(1, this.currentPage - 1);
        let end: number = Math.max(3, Math.min(this.lastPage, this.currentPage + 1));

        if (end - start < 2) {
            start -= 1;
        }

        if (end > this.lastPage) {
            end = this.lastPage;
        }

        for (let i = start; i <= end; i++) {
            this.paging.push(i);
        }
    }
}