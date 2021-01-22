import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';

// Modules
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { AmastyGroupcatProvider } from '../../providers/magento/amasty/groupcat';
import { CatalogProvider } from '../../providers/magento/catalog';

@NgModule({
	declarations: [
		ProductPage,
	],

	imports: [
		ComponentsModule,
		PipesModule,
		IonicPageModule.forChild(ProductPage),
	],

	exports: [
		ProductPage
	],

	providers: [
		AmastyGroupcatProvider,
		CatalogProvider
	]
})

export class ProductModule {}