import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPage } from './reset';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { CustomerProvider } from '../../providers/magento/customer';

@NgModule({
	declarations: [
		ResetPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ResetPage),
	],

	providers: [
		CustomerProvider
	]
})

export class ResetPageModule {}
