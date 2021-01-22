import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileOrdersPage } from './profile-orders';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { SalesProvider } from '../../providers/magento/sales';

@NgModule({
	declarations: [
		ProfileOrdersPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ProfileOrdersPage),
	],

	providers: [
		SalesProvider
	]
})

export class ProfileOrdersPageModule {}
