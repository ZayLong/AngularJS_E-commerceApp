import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';

// Models
import { CartModel } from '../../../models/magento/cart/cart';
import { ClassModel } from '../../../models/ionic/page/classes';

// Natives
import { Calendar } from '@ionic-native/calendar';

// Providers
import { CartProvider } from '../../../providers/magento/cart';
import { CommonProvider } from '../../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'modal-class-detail',
	templateUrl: 'class-detail.html',
})

export class ClassDetailModal {

	// Customer/Cart
	public logged: boolean;
	public cart: CartModel;

	// Class
	public class: ClassModel;
	public calendars: any;

	// Page Flags
	public disableCalendarButton: boolean = true;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { Platform } platform
	 * @param { AlertController } alertCtrl
	 * @param { Calendar } calendar
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public calendar: Calendar,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider) {

		this.class = this.navParams.get('class');
		this.cart = this.navParams.get('cart');
		this.logged = this.navParams.get('logged');
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.2
	 */
	public ionViewDidLoad() {
		this.calendarPermissions();
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'class_' + this.class.product.sku,
			item_name: this.class.name,
			item_category: 'Class'
		});
	}

	/**
	 * @private
	 * @method calendarPermissions
	 * @description Ask the user if they want the app to have permissions to use calendar features
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 */
	private calendarPermissions(): void{
		console.log('ClassDetailModal - calendarPermissions()');
		// Check if user's device has permission to write an entry to a calendar
		this.calendar.hasWritePermission().then( data => {
			if(data){
				console.log('ClassDetailModal - calendarPermissions() - hasWritePermission()');
				this.disableCalendarButton = false;
			} else {
				console.warn('ClassDetailModal - calendarPermissions() - hasWritePermission()');
				// Lets throw in request permission to enable permission
				this.calendar.requestWritePermission().then(data => {
					console.info('ClassDetailModal - ionViewDidLoad() - requestWritePermission()', data);

					if(data){
						this.disableCalendarButton = false;
					}

					this.calendarPermissions(); // Rerun the method
				}).catch(onrejected => console.error('ClassDetailModal - ionViewDidLoad() - requestWritePermission()', onrejected));
			}
		}).catch(onrejected => console.error('ClassDetailModal - ionViewDidLoad() - hasWritePermission()', onrejected));
	}

	/**
	 * @public
	 * @method addToCalendar (click)
	 * @description Add class to your calendar
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @uses Calendar (Android, iOS)
	 * @param { ClassModel } item
	 */
	public addToCalendar(item: ClassModel): void{
		/*
		this.calendar.listCalendars().then(data => {
			console.log('ClassDetailModal - addToCalendar() - listCalendars()', JSON.stringify(data));
		});
		*/

		//console.log('ClassDetailModal - addToCalendar() - getCalendarOptions()', JSON.stringify(this.calendar.getCalendarOptions()) );

		let alert = this.alertCtrl.create();
		alert.setTitle('Select Calendar');

		alert.addButton('Cancel');

		alert.addButton({
			text: 'Select',
			handler: data => {
				if(this.platform.is('android')){
					// Google Calendar can handle HTML, so put the description into the event.
					this.calendar.createEventWithOptions(
						item.name,
						'',
						item.product.get_custom_attribute('description').value,
						item.startDateTime,
						item.endDateTime,
						{
							calendarId: data
						}
					).then(data => {
						let toast = this.commonProvider.toast('Class added to your calendar');

						toast.present();
					}).catch(onrjected => console.error('ClassDetailModal - addToCalendar() - createEvent()', onrjected));
				} else if(this.platform.is('ios')){
					// iCalendar does not interpret HTML, so remove the description from the event.
					this.calendar.createEventWithOptions(
						item.name,
						'',
						item.name,
						item.startDateTime,
						item.endDateTime,
						{
							calendarId: data
						}
					).then(data => {
						let toast = this.commonProvider.toast('Class added to your calendar');

						toast.present();
					}).catch(onrjected => console.error('ClassDetailModal - addToCalendar() - createEvent()', onrjected));
				}
				
			}
		});

		this.calendar.listCalendars().then(data => {
			
			for(let calendar of data){

				if(this.platform.is('android')){
					alert.addInput({
						type: 'radio',
						label: calendar.displayname,
						value: calendar.id,
						checked: calendar.isPrimary
					});
				} else if(this.platform.is('ios')){
					alert.addInput({
						type: 'radio',
						label: calendar.name,
						value: calendar.id,
						checked: false
					});
				}
			}

			alert.present();
		}, err => console.error('ClassDetailModal - addToCalendar() - listCalendars()', err))
	}

	/**
	 * @public
	 * @method dismiss (click)
	 * @description Dismiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss(null);
	}
}
