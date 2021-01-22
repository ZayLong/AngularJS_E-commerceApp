import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedFilterModal } from './feed-filter';

@NgModule({
	declarations: [
		FeedFilterModal,
	],

	imports: [
		IonicPageModule.forChild(FeedFilterModal),
	],
})

export class FeedFilterModalModule {}
