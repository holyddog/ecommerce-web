import { ShopModel } from './shop.model';

export class UserModel {
    id?: number;
    email?: string;
    name?: string;
    shop?: ShopModel;
}