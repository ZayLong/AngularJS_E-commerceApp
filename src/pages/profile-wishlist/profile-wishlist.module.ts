import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileWishlistPage } from './profile-wishlist';

// Modules
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		ProfileWishlistPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(ProfileWishlistPage),
	],
})

export class ProfileWishlistPageModule {}