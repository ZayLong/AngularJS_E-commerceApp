import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { CustomerProvider } from '../../providers/magento/customer';
import { GoogleProvider } from '../../providers/api/google';
import { StoreProvider } from '../../providers/magento/store';

@NgModule({
	declarations: [
		RegisterPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(RegisterPage),
	],

	exports: [
		RegisterPage
	],

	providers: [
		CustomerProvider,
		GoogleProvider,
		StoreProvider
	]
})

export class RegisterPageModule {}