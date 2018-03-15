import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../../environments/environment';

import { StorageService } from '../shared/storage.service';
import { AuthenService } from './authen.service';

import { ShopModel } from '../../models/shop.model';
import { UserModel } from '../../models/user.model';

@Injectable()
export class ShopService {

    constructor(private http: HttpClient, private storage: StorageService, private authenService: AuthenService) { }

    private authorizationHeader(): any {
        let token: string = this.storage.get('access_token');
        return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
    }

    createShop(shop: ShopModel): Promise<any> {
        return this.http.post(Config.ServiceUrl + '/shop/create', shop, this.authorizationHeader())
            .toPromise()
            .then((data: any) => {
                if (data.shop_id) {
                    let user: UserModel = this.storage.get('user');
                    user.shop = {
                        id: data.shop_id,
                        name: shop.name
                    };
                    this.storage.set('user', user);

                    this.authenService.user.shop = shop;
                }
                return Promise.resolve();
            });
    }
}
