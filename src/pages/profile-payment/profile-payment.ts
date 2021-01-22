import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

// Models
import { CartModel } from '../../models/magento/cart/cart';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'page-profile-payment',
	templateUrl: 'profile-payment.html',
})

export class ProfilePaymentPage {
	public cart: CartModel;
	public logged: boolean;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.2
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider) {}

	/**
	 * @public
	 * @method ionViewCanEnter (lifecycle)
	 * @description Check if user is allowed to enter
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.2
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

			this.navCtrl.setRoot('LoginPage');
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
				console.error('ProfilePaymentPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
