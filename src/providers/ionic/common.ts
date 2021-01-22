import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

// Natives
import { CallNumber } from '@ionic-native/call-number';
import { Firebase } from '@ionic-native/firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@Injectable()
export class CommonProvider {

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { AlertController } alertCtrl
	 * @param { LoadingController } loadingCtrl
	 * @param { ToastController } toastController
	 * @param { CallNumber } callNumber
	 * @param { Firebase } firebase
	 * @param { Geolocation } geolocation
	 * @param { NativeGeocoder } geocoder
	 */
	public constructor( 
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController, 
		private toastController: ToastController,
		private call: CallNumber,
		private firebase: Firebase,
		private geolocation: Geolocation,
		private geocoder: NativeGeocoder) {
	}

	/**
	 * @public
	 * @method pageLoading
	 * @description Predefined loading controller with settings
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { LoadingController }
	 */
	public pageLoading(): any{
		return this.loadingCtrl.create({
			spinner: 'bubbles',
			content: 'Loading...'
		});
	}

	/**
	 * @public
	 * @method toast
	 * @description Predefined toast controller for showing a message and a closing button
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { any } msg
	 * @return { ToastController }
	 */
	public toast(msg: any): any{
		let message;

		if(msg instanceof HttpErrorResponse){
			message = this.apiErrorMessage(msg);
		} else if(msg == 'cordova_not_availabile') {
			message = 'Some phone functions not available.';
		} else {
			message = msg;
		}

		return this.toastController.create({
			duration: 5000, // 5 seconds
			message: message,
			showCloseButton: true, //show close button
			closeButtonText: 'Ok'
		});
	}

	/**
	 * @public
	 * @method alert
	 * @description Predefined alert controller for showing a message and a closing button
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } title
	 * @param { string } msg
	 * @return { AlertController }
	 */
	public alert(title: string, msg: string){
		return this.alertCtrl.create({
			title: title,
			message: msg,
			buttons: ['Close']
		});
	}

	/**
	 * @public
	 * @method geoAddress
	 * @description Bring up an alert to ask the user to look up their current location
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Need to find a way to close alert box w/o errors
	 * @uses Geolocation (native)
	 * @uses NativeGeocoder (native)
	 * @return { Promise<NativeGeocoderReverseResult> }
	 */
	public geoAddress(){
		console.log('CommonProvider - geoAddress()');
		
		let loading = this.pageLoading();

		let alert = this.alertCtrl.create({
			title: 'Let Us Locate You',
			message: 'Would you like for us to locate you, and easily enter some of your data into your address? We will not use your location for anything else, besides shipping.',
			buttons: [{
				text: 'No',
				role: 'cancel',
				handler: () => {
					console.log('FINE! Just type! :P');
				}
			}, {
				text: 'Sure',
				handler: () => {
					
					loading.present();

					this.geolocation.getCurrentPosition().then(geoloc => {
						console.info('CommonProvider - geoAddress() - getCurrentPosition()', geoloc);

						let x: number = geoloc.coords.latitude;
						let y: number = geoloc.coords.longitude;

						this.geocoder.reverseGeocode(x, y).then(address => {
							console.info('CommonProvider - geoAddress() - reverseGeocode()', address);

							/*
							administrativeArea:"Michigan"
							countryCode:"US"
							countryName:"United States"
							locality:"Lyon Charter Township"
							postalCode:"48165"
							subAdministrativeArea:"Oakland County"
							subThoroughfare:"29683"
							thoroughfare:"William K Smith Drive"
							*/

							alert.dismiss(address).then(() => {
								loading.dismiss();
							})
						}).catch(onrejected => {
							console.error('CommonProvider - geoAddress() - getCurrentPosition()', onrejected);
							loading.dismiss();

							let toast = this.toast('Unable to use your location');
							toast.present();
						});
					}).catch(onrejected => {
						console.error('CommonProvider - geoAddress() - getCurrentPosition()', onrejected);
						loading.dismiss();

						let toast = this.toast('Unable to retrieve your location');
						toast.present();
					});
				}
			}]
		});

		return alert;
	}

	/**
	 * @public
	 * @method callNumber
	 * @description Call a number using the phone app
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses CallNumber (native)
	 * @param { string } phone
	 */
	public callNumber(phone: string): void{
		if(this.call.isCallSupported()){
			this.call.callNumber(phone, true);
		}
	}

	/**
	 * @public
	 * @method analyticsLogEvent
	 * @description Log an event for analytics
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Firebase (native)
	 * @param { string } event
	 * @param { any } param
	 */
	public analyticsLogEvent(event: string, param: any): void{
		this.firebase.logEvent(event, param)
		.then(data => console.info('CommonProvider - analyticsLogEvent()', data))
		.catch(onrejected => console.error('CommonProvider - analyticsLogEvent()', onrejected));
	}

	/**
	 * @private
	 * @method apiErrorMessage
	 * @description Translate an error object to a string message
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpErrorResponse } error
	 * @return { string }
	 */
	private apiErrorMessage(error: HttpErrorResponse): string{
		let message = error.error.message;
		let placeholders = error.error.parameters;

		for(let ph in placeholders){
			message = message.replace('%' + ph, placeholders[ph]); // Replace the placeholder substring with the value
		}
		
		return message;
	}
}
