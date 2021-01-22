import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPage } from './forgot';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { CustomerProvider } from '../../providers/magento/customer';

@NgModule({
	declarations: [
		ForgotPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ForgotPage),
	],

	providers: [
		CustomerProvider
	]
})

export class ForgotPageModule {}