import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AddressModel, ProvinceModel, DistrictModel } from '../../../models/address.model';

import { CartService } from '../../../services/shared/cart.service';
import { CheckoutService } from '../../../services/shared/checkout.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { TranslateService } from '../../../services/shared/translate.service';
import { AddressService } from '../../../services/api/address.service';
import { AuthenService } from '../../../services/api/authen.service';

@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.css'],
    host: { 'class': 'checkout-body' }
})
export class DeliveryComponent implements OnInit {
    loading: boolean;
    selectedAddress: AddressModel;
    email: string;
    password: string;
    deliveryOption: number = 1;

    form: FormGroup;

    data = {
        name: null,
        address: null,
        postcode: null,
        telephone: null,
        province: null,
        district: null,
        default: null,
        saveAddress: true
    };

    addresses: AddressModel[] = [];
    provinces: ProvinceModel[] = [];
    districts: DistrictModel[] = [];

    get name() { return this.form.get('name'); }
    set name(value: any) { this.form.get('name').setValue(value); }

    get address() { return this.form.get('address'); }
    set address(value: any) { this.form.get('address').setValue(value); }

    get postcode() { return this.form.get('postcode'); }
    set postcode(value: any) { this.form.get('postcode').setValue(value); }

    get telephone() { return this.form.get('telephone'); }
    set telephone(value: any) { this.form.get('telephone').setValue(value); }

    get province() { return this.form.get('province'); }
    set province(value: any) { this.form.get('province').setValue(value); }

    get district() { return this.form.get('district'); }
    set district(value: any) { this.form.get('district').setValue(value); }

    get saveAddress() { return this.form.get('saveAddress'); }
    set saveAddress(value: any) { this.form.get('saveAddress').setValue(value); }

    constructor(private router: Router, public cart: CartService, public checkout: CheckoutService, private translate: TranslateService, private dialog: DialogService, public authenService: AuthenService, private addressService: AddressService) { }

    ngOnInit() {
        this.checkout.set(2);
        this.fetch();

        this.form = new FormGroup({
            'name': new FormControl(this.data.name, [
                Validators.required
            ]),
            'address': new FormControl(this.data.address, [
                Validators.required
            ]),
            'postcode': new FormControl(this.data.postcode, [
                Validators.required
            ]),
            'telephone': new FormControl(this.data.telephone, [
                Validators.required
            ]),
            'province': new FormControl(this.data.province, [
                Validators.required
            ]),
            'district': new FormControl(this.data.district, [
                Validators.required
            ]),
            'saveAddress': new FormControl(this.data.saveAddress)
        });

        this.saveAddress(true);
    }

    onProvinceChange(province: ProvinceModel): void {
        this.addressService.findDistricts(province.id)
            .then(data => {
                this.districts = data;
            });
    }

    fetch(): void {
        this.loading = true;
        this.addressService.findProvinces()
            .then(provinces => {
                this.loading = false;
                this.provinces = provinces;

                if (this.authenService.user) {
                    this.addressService.find()
                        .then(data => {
                            this.addresses = data;

                            if (this.addresses.length > 0) {
                                this.selectedAddress = this.addresses[0];
                            }
                        });
                }
            });
    }

    compareId(o1: any, o2: any): boolean {
        if (o1 && o2) {
            return o1.id == o2.id;
        }
        return false;
    }

    isFieldValid(key: string) {
        let field = this.form.get(key);
        return (field.invalid && (field.touched)) || (field.untouched && this.checkout.submitted);
    }

    select(addr: AddressModel): void {
        this.addresses.map(o => o.default = false);
        addr.default = true;

        this.selectedAddress = addr;
    }

    logIn(): void {
        this.loading = true;
        this.authenService.logIn(this.email, this.password)
            .then((data: any) => {
                this.loading = false;
                if (!data.error) {
                    this.fetch();
                }
                else {
                    this.dialog.alert(data.error.message);
                }
            })
            .catch(() => {
                this.loading = false;
                this.dialog.alert(this.translate.instant('msg_internal_error'));
            });
    }

    prev(): void {
        this.checkout.set(1);
        this.router.navigate(['/checkout']);
    }

    next(): void {
        if (this.deliveryOption == 1) {
            if (this.selectedAddress && this.selectedAddress.default) {
                this.checkout.order.delivery_address = {
                    id: this.selectedAddress.id,
                    name: this.selectedAddress.name,
                    address: this.selectedAddress.address,
                    postcode: this.selectedAddress.postcode,
                    province: this.selectedAddress.province,
                    district: this.selectedAddress.district,
                    telephone: this.selectedAddress.telephone
                };

                this.checkout.set(3);
                this.router.navigate(['/checkout/payment']);
            }
            else {
                this.dialog.alert(this.translate.instant('please_select_address'));
            }
        }
        else if (this.deliveryOption == 2) {
            if (this.form.valid) {
                this.checkout.order.delivery_address = {
                    name: this.name.value,
                    address: this.address.value,
                    postcode: this.postcode.value,
                    province: this.province.value,
                    district: this.district.value,
                    telephone: this.telephone.value
                };

                if (this.saveAddress.value) {    
                    this.loading = true;
                    this.addressService.insertAddress(this.checkout.order.delivery_address)
                        .then(() => {
                            this.loading = false;
    
                            this.checkout.set(3);
                            this.router.navigate(['/checkout/payment']);
                        });                    
                }
                else {
                    this.checkout.set(3);
                    this.router.navigate(['/checkout/payment']);
                }
            }
        }
    }
}
