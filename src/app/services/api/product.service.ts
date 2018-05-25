import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Config } from '../../../environments/environment';

import { StorageService } from '../shared/storage.service';

import { ProductModel } from '../../models/product.model';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    find(q: string = null, cat: string = null, page: number = 0): Promise<any> {
        var params = {};
        if (page > 0) {
            Object.assign(params, {
                page: page,
                size: 100
            });
        }
        if (q && q.trim().length > 0) {
            Object.assign(params, {
                q: q.trim()
            });
        }
        if (cat) {
            Object.assign(params, {
                cat: cat
            });
        }

        let httpParams: HttpParams = new HttpParams();
        for (let i in params) {
            httpParams = httpParams.set(i, params[i]);
        }
        return this.http.get(Config.ServiceUrl + '/products', { params: httpParams })
            .toPromise();
    }
    
    findSliders(): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/sliders')
            .toPromise();
    }

    findById(id: number): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/products/' + id)
            .toPromise();
    }
}
