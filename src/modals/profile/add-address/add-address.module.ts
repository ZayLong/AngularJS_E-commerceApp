import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAddressModal } from './add-address';

// Modules
import { ComponentsModule } from '../../../components/components.module';

// Providers
import { GoogleProvider } from '../../../providers/api/google';
import { StoreProvider } from '../../../providers/magento/store';

@NgModule({
	declarations: [
		AddAddressModal,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(AddAddressModal),
	],

	providers: [
		GoogleProvider,
		StoreProvider
	]
})

export class AddAddressModalModule {}
