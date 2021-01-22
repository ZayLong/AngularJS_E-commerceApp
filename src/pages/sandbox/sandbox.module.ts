import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SandboxPage } from './sandbox';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Testing
import { SalesProvider } from '../../providers/magento/sales';

@NgModule({
	declarations: [
		SandboxPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(SandboxPage),
	],

	providers: [
		// Testing
		SalesProvider
	]
})

export class SandboxPageModule {}