import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileQuickPage } from './profile-quick';

// Modules
import { ComponentsModule } from '../../components/components.module';

// Providers
import { CatalogProvider } from '../../providers/magento/catalog';

@NgModule({
	declarations: [
		ProfileQuickPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ProfileQuickPage),
	],

	providers: [
		CatalogProvider
	]
})

export class ProfileQuickPageModule {}