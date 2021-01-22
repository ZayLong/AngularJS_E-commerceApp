import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedsPage } from './feeds';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { AmastyGroupcatProvider } from '../../providers/magento/amasty/groupcat';
import { CatalogProvider } from '../../providers/magento/catalog';

@NgModule({
	declarations: [
		FeedsPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(FeedsPage),
	],

	providers: [
		AmastyGroupcatProvider,
		CatalogProvider
	]
})

export class FeedsPageModule {}