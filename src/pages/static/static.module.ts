import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaticPage } from './static';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { StoreProvider } from '../../providers/magento/store';

@NgModule({
	declarations: [
		StaticPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(StaticPage),
	],

	providers: [
		StoreProvider
	]
})

export class StaticPageModule {}