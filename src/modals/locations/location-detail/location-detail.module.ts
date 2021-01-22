import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationDetailModal } from './location-detail';

import { ComponentsModule } from '../../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		LocationDetailModal,
	],
	
	imports: [
		ComponentsModule,
		IonicPageModule.forChild(LocationDetailModal)
	],
})

export class LocationDetailModalModule {}