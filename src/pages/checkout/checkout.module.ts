import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';

// Modules
import { ComponentsModule } from '../../components/components.module';

// Providers
import { CheckoutProvider } from '../../providers/magento/checkout';
import { CustomerProvider } from '../../providers/magento/customer';
import { InsyncRealTimePricingProvider } from '../../providers/magento/insync/realtimepricing';
import { PaymetricProvider } from '../../providers/magento/tng/paymetric';
import { PaypalProvider } from '../../providers/api/paypal';

@NgModule({
	declarations: [
		CheckoutPage,
	],
	
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(CheckoutPage),
	],

	providers: [
		CheckoutProvider,
		CustomerProvider,
		InsyncRealTimePricingProvider,
		PaymetricProvider,
		PaypalProvider
	]
})

export class CheckoutPageModule {}