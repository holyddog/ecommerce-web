import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared.module';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/checkout/cart/cart.component';
import { DeliveryComponent } from './components/checkout/delivery/delivery.component';
import { PaymentComponent } from './components/checkout/payment/payment.component';
import { CompleteComponent } from './components/checkout/complete/complete.component';
import { VerifyPaymentComponent } from './components/verify-payment/verify-payment.component';

import { CheckoutService } from './services/shared/checkout.service';
import { CheckoutGuardService } from './services/shared/checkout-guard.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: 'checkout',
                component: CheckoutComponent,
                children: [
                    {
                        path: '',
                        component: CartComponent
                    },
                    {
                        path: 'delivery',
                        component: DeliveryComponent,
                        canActivate: [CheckoutGuardService]
                    },
                    {
                        path: 'payment',
                        component: PaymentComponent,
                        canActivate: [CheckoutGuardService]
                    },
                    {
                        path: 'complete',
                        component: CompleteComponent,
                        canActivate: [CheckoutGuardService]
                    }
                ]
            },
            {
                path: 'verify-payment',
                component: VerifyPaymentComponent
            }
        ])
    ],
    declarations: [
        CheckoutComponent, 
        CartComponent, 
        DeliveryComponent, 
        PaymentComponent, 
        CompleteComponent,
        VerifyPaymentComponent
    ],
    providers: [
        CheckoutService,
        CheckoutGuardService
    ]
})
export class CheckoutModule { }
