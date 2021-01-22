import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageModal } from './image';

@NgModule({
	declarations: [
		ImageModal,
	],

	imports: [
		IonicPageModule.forChild(ImageModal),
	],
})

export class ImageModalModule {}