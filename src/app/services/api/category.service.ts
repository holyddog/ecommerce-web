import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Config } from '../../../environments/environment';

import { StorageService } from '../shared/storage.service';

import { CategoryModel } from '../../models/category.model';

const CATEGORIES_KEY = makeStateKey('categories');

@Injectable()
export class CategoryService {
    data: CategoryModel = null;

    constructor(private http: HttpClient, private state: TransferState) { }

    load(): void {
        this.data = this.state.get(CATEGORIES_KEY, null as any);

        if (!this.data) {
            this.http.get(Config.ServiceUrl + '/categories')
                .toPromise()
                .then((data: CategoryModel) => {
                    this.data = data;
                    this.state.set(CATEGORIES_KEY, data as any);
                });
        }
    }

    findById(id: string): Promise < any > {
        return this.http.get(Config.ServiceUrl + '/categories/' + id)
            .toPromise()
            .then((data: CategoryModel) => {
                return data;
            });
    }
}
