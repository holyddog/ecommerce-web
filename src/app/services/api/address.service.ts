import 'rxjs/add/operator/toPromise';

import { Observable, Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, Config } from '../../../environments/environment';

import { StorageService } from '../shared/storage.service';

import { AddressModel } from '../../models/address.model';

@Injectable()
export class AddressService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    private authorizationHeader(): any {
        let token: string = this.storage.get('access_token');
        return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
    }
    
    findProvinces(): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/provinces')
            .toPromise();
    }
    
    findDistricts(provinceId: number): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/districts/' + provinceId)
            .toPromise();
    }

    find(): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/addresses', this.authorizationHeader())
            .toPromise();
    }

    findById(id: number): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/addresses/' + id, this.authorizationHeader())
            .toPromise();
    }

    insertAddress(address: AddressModel): Promise<any> {
        return this.http.post(Config.ServiceUrl + '/addresses', address, this.authorizationHeader())
            .toPromise();
    }
    
    updateAddress(id: number, address: AddressModel): Promise<any> {
        return this.http.put(Config.ServiceUrl + '/addresses/' + id, address, this.authorizationHeader())
            .toPromise();
    }
    
    deleteAddress(id: number): Promise<any> {
        return this.http.delete(Config.ServiceUrl + '/addresses/' + id, this.authorizationHeader())
            .toPromise();
    }
}
