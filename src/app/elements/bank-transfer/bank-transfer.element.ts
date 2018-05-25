import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-confirm-payment',
    templateUrl: './bank-transfer.element.html',
    styleUrls: ['./bank-transfer.element.css']
})
export class BankTransferElement implements OnInit {
    @ViewChild('paymentDialog') paymentDialog: ElementRef;

    submitted: boolean;
    
    form: FormGroup;
    data = {
        orderNo: null,
        name: null,
        telephone: null,
        amount: null,
        tDate: null,
        tTime: null,
        attach: null
    };

    get orderNo() { return this.form.get('orderNo'); }
    set orderNo(value: any) { this.form.get('orderNo').setValue(value); }

    get name() { return this.form.get('name'); }
    set name(value: any) { this.form.get('name').setValue(value); }

    get telephone() { return this.form.get('telephone'); }
    set telephone(value: any) { this.form.get('telephone').setValue(value); }

    get amount() { return this.form.get('amount'); }
    set amount(value: any) { this.form.get('amount').setValue(value); }

    get tDate() { return this.form.get('tDate'); }
    set tDate(value: any) { this.form.get('tDate').setValue(value); }

    get tTime() { return this.form.get('tTime'); }
    set tTime(value: any) { this.form.get('tTime').setValue(value); }

    get attach() { return this.form.get('attach'); }
    set attach(value: any) { this.form.get('attach').setValue(value); }

    constructor() { }

    ngOnInit() {
        this.form = new FormGroup({
            'orderNo': new FormControl(this.data.orderNo, [
                Validators.required
            ]),
            'name': new FormControl(this.data.name, [
                Validators.required
            ]),
            'telephone': new FormControl(this.data.telephone, [
                Validators.required
            ]),
            'amount': new FormControl(this.data.amount, [
                Validators.required
            ]),
            'tDate': new FormControl(this.data.tDate, [
                Validators.required
            ]),
            'tTime': new FormControl(this.data.tDate, [
                Validators.required
            ]),
            'attach': new FormControl(this.data.tDate, [
                Validators.required
            ])
        });
    }

    isFieldValid(key: string) {
        let field = this.form.get(key);
        return (field.invalid && (field.touched)) || (field.invalid && field.untouched && this.submitted);
    }

    show(): void {
        var dialog = $(this.paymentDialog.nativeElement);
        dialog.modal('show');
    }
    
    confirm(): void {
        alert('cofirm');
    }

}
