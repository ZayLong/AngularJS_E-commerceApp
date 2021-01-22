import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentMethodModal } from './payment-method';

@NgModule({
	declarations: [
		PaymentMethodModal,
	],

	imports: [
		IonicPageModule.forChild(PaymentMethodModal),
	],
})

export class PaymentMethodModalModule {}