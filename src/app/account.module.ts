import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared.module';

import { AccountComponent } from './components/account/account.component';
import { OrderComponent } from './components/account/order/order.component';
import { AddressComponent } from './components/account/address/address.component';
import { SettingComponent } from './components/account/setting/setting.component';
import { OrderDetailComponent } from './components/account/order-detail/order-detail.component';
import { AddressFormComponent } from './components/account/address-form/address-form.component';

import { BankTransferElement } from './elements/bank-transfer/bank-transfer.element';

import { AuthenGuardService } from './services/api/authen-guard.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: 'account',
                component: AccountComponent,
                canActivate: [AuthenGuardService],
                children: [
                    {
                        path: '',
                        component: OrderComponent
                    },
                    {
                        path: 'order/:no',
                        component: OrderDetailComponent
                    },
                    {
                        path: 'address',
                        component: AddressComponent
                    },
                    {
                        path: 'address/:id',
                        component: AddressFormComponent
                    },
                    {
                        path: 'setting',
                        component: SettingComponent
                    }
                ]
            }
        ])
    ],
    declarations: [
        AccountComponent, 
        OrderComponent, 
        AddressComponent, 
        SettingComponent, 
        OrderDetailComponent, 
        AddressFormComponent, 
        
        BankTransferElement
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AuthenGuardService]
})
export class AccountModule { }
