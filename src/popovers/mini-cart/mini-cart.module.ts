import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiniCartPopover } from './mini-cart';

@NgModule({
	declarations: [
		MiniCartPopover,
	],

	imports: [
		IonicPageModule.forChild(MiniCartPopover),
	],
})

export class MiniCartPopoverModule {}
