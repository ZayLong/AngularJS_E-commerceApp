import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingAddressModal } from './shipping-address';

// Providers
import { StoreProvider } from '../../../providers/magento/store';

@NgModule({
	declarations: [
		ShippingAddressModal,
	],

	imports: [
		IonicPageModule.forChild(ShippingAddressModal),
	],

	providers: [
		StoreProvider
	]
})

export class ShippingAddressModalModule {}