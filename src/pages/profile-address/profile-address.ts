import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, AlertController, Events } from 'ionic-angular';

// Modals
import { AddAddressModal } from '../../modals/profile/add-address/add-address';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { CustomerAddressModel } from '../../models/magento/customer/address';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';
import { CustomerProvider } from '../../providers/magento/customer';

@IonicPage()
@Component({
	selector: 'page-profile-address',
	templateUrl: 'profile-address.html',
})

export class ProfileAddressPage {

	@ViewChild('additionalAddressSlide') additionalAddressSlide: Slides;
	public loading = this.commonProvider.pageLoading();

	// Customer
	public cart: CartModel;
	public logged: boolean;
	public additionalAddresses: Array<CustomerAddressModel>;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.2
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ModalController } modalCtrl
	 * @param { AlertController } alertCtrl
	 * @param { Events } events
	 * @param { CallNumber } callNumber
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { CustomerProvider } customerProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public alertCtrl: AlertController,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public customerProvider: CustomerProvider) {}

	/**
	 * @public
	 * @method ionViewCanEnter (lifecycle)
	 * @description Check if user is allowed to enter
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.2
	 * @return { Promise<any> }
	 */
	public ionViewCanEnter(): Promise<any>{
		return new Promise((resolve, reject) => {
			this.cart = this.authProvider.getCurrentCartProvider();

			if(this.cart != null && this.cart.customer.id){
				this.logged = true;
				resolve(true);
			} else {
				this.logged = false;
				reject(false);
			}
		}).catch(() => {
			this.kickedOut();
		});
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {
		this.additionalAddresses = this.cart.customer.additionalAddresses();
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_profile_address',
			item_name: 'Profile Address Page',
			item_category: 'Page'
		});

		this.commonProvider.analyticsLogEvent('view_item_list', {
			item_category: 'Address'
		});
	}

	/**
	 * @public
	 * @method helpToken
	 * @description Bring up a help alert to tell customer how to use AES token
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public helpToken(): void{
		let alert = this.alertCtrl.create({
			title: 'Address Token',
			message: 'When talking to customer service about switching default addresses, please refer to this number.',
			buttons: ['Thanks!']
		});

		alert.present();
	}

	/**
	 * @public
	 * @method addAddressModal
	 * @description Show add address modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses ModalController
	 */
	public addAddressModal(): void{
		let modal = this.modalCtrl.create(AddAddressModal, {
			customer: this.cart.customer
		});

		modal.present();

		modal.onDidDismiss(data => {
			if(data){
				this.cart.customer.set_address(data.address);

				this.customerProvider.updateCustomer(this.cart.customer).subscribe(data => {
					let toast = this.commonProvider.toast('Address added to your account');
					toast.present();
				}, err => {
					console.error('ProfileAddressPage - addAddressModal() - updateCustomer()', err);
					
					let toast = this.commonProvider.toast(err);
					toast.present();
				});
			}
		});
	}

	/**
	 * @private
	 * @method kickedOut
	 * @description Kick out the user if not logged
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 */
	private kickedOut(): void{
		let toast = this.commonProvider.toast('You need to be logged in to access your profile.');
		toast.present();

		// Setting the root so no back button on the top left
		this.navCtrl.setRoot('LoginPage');
	}

	/**
	 * @public
	 * @method refresh (refresher)
	 * @description Perform a refresh
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.5.2
	 * @param { any } event
	 */
	public refresh(event: any): void{
		setTimeout(() => {
			this.cartProvider.getCart().subscribe(data => {
				this.logged = data.logged;
				this.cart = data.cart;
				this.authProvider.setCurrentCartProvider(data.cart);

				if(!data.logged){
					// Kick the user of the page
					this.kickedOut();
				}

				event.complete();
			}, err => {
				console.error('ProfileAddressPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
