import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, Config } from '../../../environments/environment';

import { StorageService } from '../shared/storage.service';

import { OrderModel } from '../../models/order.model';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    private authorizationHeader(): any {
        let token: string = this.storage.get('access_token');
        return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
    }

    find(): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/orders', this.authorizationHeader())
            .toPromise();
    }

    findByNumber(no: string): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/orders/' + no, this.authorizationHeader())
            .toPromise();
    }

    insertOrder(order: OrderModel): Promise<any> {
        return this.http.post(Config.ServiceUrl + '/orders', order, this.authorizationHeader())
            .toPromise();
    }

    submitOrderPayment(no: string): Promise<any> {
        return this.http.put(Config.ServiceUrl + '/orders/' + no + '/payment', null, this.authorizationHeader())
            .toPromise();
    }
}
