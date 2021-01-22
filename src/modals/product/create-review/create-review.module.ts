import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateReviewModal } from './create-review';

@NgModule({
	declarations: [
		CreateReviewModal,
	],

	imports: [
		IonicPageModule.forChild(CreateReviewModal),
	],
})

export class CreateReviewModalModule {}
