import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassesPage } from './classes';

// Modules
import { ComponentsModule } from '../../components/components.module';

// Providers
import { CatalogProvider } from '../../providers/magento/catalog';

@NgModule({
	declarations: [
		ClassesPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ClassesPage),
	],

	providers: [
		CatalogProvider
	]
})

export class ClassesPageModule {}