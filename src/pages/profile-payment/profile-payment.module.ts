import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePaymentPage } from './profile-payment';

import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ProfilePaymentPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ProfilePaymentPage),
	],
})

export class ProfilePaymentPageModule {}