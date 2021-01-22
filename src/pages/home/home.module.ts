import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { AmastyGroupcatProvider } from '../../providers/magento/amasty/groupcat';
import { CatalogProvider } from '../../providers/magento/catalog';
import { MagefanBlogProvider } from '../../providers/magento/magefan/blog';
import { TisProvider } from '../../providers/tng/tis';

@NgModule({
	declarations: [
		HomePage,
	],
	
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(HomePage),
	],

	providers: [
		// Providers
		AmastyGroupcatProvider,
		CatalogProvider,
		MagefanBlogProvider,
		TisProvider
	]
})

export class HomePageModule {}