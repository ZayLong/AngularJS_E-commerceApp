import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationsPage } from './locations';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { TisProvider } from '../../providers/tng/tis';

@NgModule({
	declarations: [
		LocationsPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(LocationsPage),
	],

	providers: [
		TisProvider
	]
})

export class LocationsPageModule {}