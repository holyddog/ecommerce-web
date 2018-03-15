import 'rxjs/add/operator/toPromise';

import { Observable, Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, Config } from '../../../environments/environment';

import { StorageService } from '../shared/storage.service';
import { CartService } from '../shared/cart.service';

import { UserModel } from '../../models/user.model';

@Injectable()
export class AuthenService {
    user: UserModel = null;
    url: string = null;

    constructor(private http: HttpClient, private storage: StorageService, private cart: CartService) { }

    private authorizationHeader(): any {
        let token: string = this.storage.get('access_token');
        return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
    }

    load(): void {
        this.user = this.storage.get('user');
    }

    me(): Promise<any> {
        return this.http.get(Config.ServiceUrl + '/me', this.authorizationHeader())
            .toPromise()
            .then((data: any) => {
                this.user = data;
                this.storage.set('user', data);
                return data;
            });
    }
    
    updateInfo(name: string): Promise<any> {
        return this.http.put(Config.ServiceUrl + '/me/info', { name: name }, this.authorizationHeader())
            .toPromise()
            .then((data: any) => {
                if (data.success) {
                    this.user.name = name;
                    this.storage.set('user', this.user);
                }
                return data;
            });
    }
    
    updatePassword(currentPassword: string, newPassword: string): Promise<any> {
        return this.http.put(Config.ServiceUrl + '/me/password', { 
            current_password: currentPassword,
            new_password: newPassword
        }, this.authorizationHeader())
            .toPromise();
    }

    logIn(email: string, password: string): Promise<any> {
        let body: any = {
            email: email,
            password: password
        };
        let params: URLSearchParams = new URLSearchParams();
        params.set('client_id', environment.client_id);
        params.set('client_secret', environment.client_secret);
        
        return this.http.post(Config.ServiceUrl + '/login?' + params.toString(), body)
            .toPromise()
            .then((data: any) => {
                if (data.error) {
                    throw data;
                }
                else {
                    this.storage.set('access_token', data.access_token);
                    return this.me();
                }
            })
            .catch((data: any) => {
                return data;
            });
    }
    
    signUp(data: any): Promise<any> {
        return this.http.post(Config.ServiceUrl + '/signup', data)
            .toPromise();
    }
    
    logOut(): void {
        this.user = null;
        this.cart.clear();

        this.storage.remove('user');
        this.storage.remove('cart');
        this.storage.remove('access_token');
    }
}
