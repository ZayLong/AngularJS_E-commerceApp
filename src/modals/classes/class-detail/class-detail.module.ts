import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassDetailModal } from './class-detail';

@NgModule({
	declarations: [
		ClassDetailModal,
	],
	
	imports: [
		IonicPageModule.forChild(ClassDetailModal),
	],
})

export class ClassDetailModalModule {}
