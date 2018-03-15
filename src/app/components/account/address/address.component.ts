import { Component, OnInit } from '@angular/core';

import { AddressModel } from '../../../models/address.model';

import { AddressService } from '../../../services/api/address.service';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
    loading: boolean;
    addresses: AddressModel[] = [];

    constructor(private addressService: AddressService) { }

    ngOnInit() {
        this.loading = true;
        this.fetch();
    }

    fetch(): void {
        this.addressService.find()
            .then(data => {
                this.loading = false;
                this.addresses = data;
            });
    }

    delete(id: number): void {
        this.addresses.splice(this.addresses.findIndex(o => o.id == id), 1);
        this.addressService.deleteAddress(id);
    }
}
