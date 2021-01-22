import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactusPage } from './contactus';

import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ContactusPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ContactusPage),
	],
})

export class ContactusPageModule {}
