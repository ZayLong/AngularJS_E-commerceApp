import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		LoginPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(LoginPage),
	],

	exports: [
		LoginPage
	]
})

export class LoginPageModule {}