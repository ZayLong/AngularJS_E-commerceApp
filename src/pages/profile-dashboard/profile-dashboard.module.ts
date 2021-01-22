import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileDashboardPage } from './profile-dashboard';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { SalesProvider } from '../../providers/magento/sales';
import { StoreProvider } from '../../providers/magento/store';

@NgModule({
	declarations: [
		ProfileDashboardPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ProfileDashboardPage),
	],

	providers: [
		SalesProvider,
		StoreProvider
	]
})

export class ProfileDashboardPageModule {}