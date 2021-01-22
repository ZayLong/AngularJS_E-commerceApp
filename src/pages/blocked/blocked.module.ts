import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockedPage } from './blocked';

import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		BlockedPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(BlockedPage),
	],
})

export class BlockedPageModule {}