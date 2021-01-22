import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAccountPage } from './profile-account';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { CustomerProvider } from '../../providers/magento/customer';

@NgModule({
	declarations: [
		ProfileAccountPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ProfileAccountPage),
	],

	providers: [
		CustomerProvider
	]
})

export class ProfileAccountPageModule {}
