import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

// Native
import { AppRate } from '@ionic-native/app-rate';
import { Calendar } from '@ionic-native/calendar';
import { CallNumber } from '@ionic-native/call-number';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Firebase } from '@ionic-native/firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Providers
import { AlgoliaProvider } from '../providers/api/algolia';
import { AuthenticateProvider } from '../providers/magento/authenticate';
import { CartProvider } from '../providers/magento/cart';
import { CommonProvider } from '../providers/ionic/common';
import { WishlistProvider } from '../providers/magento/wishlist';
import { YotpoProvider } from '../providers/api/yotpo';

@NgModule({
	declarations: [
		MyApp
	],

	imports: [
		BrowserModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp, {
			preloadModules: true,
			backButtonText: '',
			platforms: {
				ios: {
					scrollAssist: false, 
					autoFocusAssist: false,
					statusbarPadding: true,
				},
			
				android: {}
			}
		})
	],

	bootstrap: [IonicApp],

	entryComponents: [
		MyApp
	],

	providers: [
		// Natives
		AppRate,
		Calendar,
		CallNumber,
		FingerprintAIO,
		Firebase,
		Geolocation,
		LaunchNavigator,
		NativeGeocoder,
		SocialSharing,
		SplashScreen,
		StatusBar,
		// Something
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		// Providers
		AlgoliaProvider,
		AuthenticateProvider,
		CartProvider,
		CommonProvider,
		WishlistProvider,
		YotpoProvider
	]
})

export class AppModule { }
