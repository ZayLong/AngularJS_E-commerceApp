import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppusagePage } from './appusage';

import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		AppusagePage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(AppusagePage),
	],
})

export class AppusagePageModule {}