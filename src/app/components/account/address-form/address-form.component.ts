import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AddressService } from '../../../services/api/address.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { TranslateService } from '../../../services/shared/translate.service';

import { AddressModel, ProvinceModel, DistrictModel } from '../../../models/address.model';

@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
    provinces: ProvinceModel[] = [];
    districts: DistrictModel[] = [];

    id: number;
    loading: boolean;

    submitted: boolean;
    form: FormGroup;
    data = {
        name: null,
        address: null,
        postcode: null,
        telephone: null,
        province: null,
        district: null,
        default: null
    };

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

    get default() { return this.form.get('default'); }
    set default(value: any) { this.form.get('default').setValue(value); }

    constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService, private dialog: DialogService, private addressService: AddressService) { }

    ngOnInit() {
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
            'default': new FormControl(this.data.default)
        });

        this.loading = true;
        this.addressService.findProvinces()
            .then(provinces => {
                this.provinces = provinces;

                this.route.params.forEach((params: Params) => {
                    let id: any = params['id'];

                    if (id == 'new') { 
                        this.loading = false;
                    }
                    else {
                        this.id = +id;
                        this.addressService.findById(this.id)
                            .then((data: AddressModel) => {
                                this.name = data.name;
                                this.address = data.address;
                                this.province = data.province;
                                this.district = data.district;
                                this.postcode = data.postcode;
                                this.telephone = data.telephone;
                                this.default = data.default;

                                return this.addressService.findDistricts(this.province.value.id);
                            })
                            .then((data => {
                                this.districts = data;  
                                this.loading = false;
                            }));
                    }
                });
            });
    }

    compareId(o1: any, o2: any): boolean {
        if (o1 && o2) {
            return o1.id == o2.id;
        }
        return false;
    }

    onProvinceChange(province: ProvinceModel): void {
        this.addressService.findDistricts(province.id)
            .then(data => {
                this.districts = data;
            });
    }
    
    isFieldValid(key: string) {
        let field = this.form.get(key);
        return (field.invalid && (field.touched)) || (field.invalid && field.untouched && this.submitted);
    }    

    save(): void {
        this.submitted = true;
        
        if (this.form.valid) {    
            let addr: AddressModel = {
                address: this.address.value,
                name: this.name.value,
                postcode: this.postcode.value,
                province: this.province.value,
                district: this.district.value,
                telephone: this.telephone.value,
                default: this.default.value
            };

            this.loading = true;
            if (this.id) {
                this.addressService.updateAddress(this.id, addr)
                    .then(() => {
                        this.loading = false;
                        this.dialog.success(this.translate.instant('msg_update_success'));
                        this.router.navigate(["/account/address"]);
                    });
            }
            else {
                this.addressService.insertAddress(addr)
                    .then(() => {
                        this.loading = false;
                        this.dialog.success(this.translate.instant('msg_save_success'));
                        this.router.navigate(["/account/address"]);
                    });
            }
        }
    }
}