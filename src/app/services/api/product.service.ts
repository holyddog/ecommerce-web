import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Config } from '../../../environments/environment';

import { StorageService } from '../shared/storage.service';

import { ProductModel } from '../../models/product.model';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    find(params: any = {}, page: number = 0): Promise<any> {
        if (page > 0) {
            params.page = page;
            params.size = Config.PageSize;
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
