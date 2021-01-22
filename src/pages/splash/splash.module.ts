import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplashPage } from './splash';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Natives
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		SplashPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(SplashPage),
	],

	providers: [
		// Natives
		SplashScreen
	]
})

export class SplashPageModule {}