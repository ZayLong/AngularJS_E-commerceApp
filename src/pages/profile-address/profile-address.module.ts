import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAddressPage } from './profile-address';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { CustomerProvider } from '../../providers/magento/customer';

@NgModule({
	declarations: [
		ProfileAddressPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ProfileAddressPage),
	],

	providers: [
		CustomerProvider
	]
})

export class ProfileAddressPageModule {}
