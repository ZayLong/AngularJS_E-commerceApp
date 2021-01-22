import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessPage } from './success';

// Modules
import { ComponentsModule } from '../../components/components.module';
//import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { SalesProvider } from '../../providers/magento/sales';

@NgModule({
	declarations: [
		SuccessPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(SuccessPage),
	],

	providers: [
		SalesProvider
	]
})

export class SuccessPageModule {}