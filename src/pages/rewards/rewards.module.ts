import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsPage } from './rewards';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		RewardsPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(RewardsPage),
	],
})

export class RewardsPageModule {}
