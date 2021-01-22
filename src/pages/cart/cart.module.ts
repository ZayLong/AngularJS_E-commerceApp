import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';

import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		CartPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(CartPage),
	],

	exports: [
		CartPage
	]
})

export class CartPageModule {}