import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeautybookPage } from './beautybook';

import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		BeautybookPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(BeautybookPage),
	],
})

export class BeautybookPageModule {}