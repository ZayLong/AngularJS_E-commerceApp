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
	selector: 'page-blocked',
	templateUrl: 'blocked.html',
})

export class BlockedPage {

	// Customer/Cart
	public logged: boolean;
	public cart: CartModel;
	public customerId: string;
	public retrievedCustomerId: boolean = false;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
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
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart != null && this.cart.customer.id){
			this.logged = true;
			this.customerId = this.cart.customer.get_custom_attribute('aectoken').value;
		} else {
			this.logged = false;
		}

		this.retrievedCustomerId = true;
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_blocked',
			item_name: 'Blocked Page',
			item_category: 'page'
		});
	}

	/**
	 * @public
	 * @method ionViewCanLeave (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { boolean }
	 */
	public ionViewCanLeave(): boolean {
		// Check if we ignore the guard check, mostly from user attempting to log out
		console.warn('BlockedPage - ionViewCanLeave() - Attempting to leave!');
		
		if(sessionStorage.getItem('appIgnoreBlock') !== 'yes'){
			if(this.cart.customer.id != undefined){
				let blocked = this.cart.customer.isUserBlocked(['1']);
				return !blocked;
			}
		} else {
			// Remove the ignore block
			console.log('BlockedPage - ionViewCanLeave() - Bypassing Guard');
			sessionStorage.removeItem('appIgnoreBlock');
		}

		return true;
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

				event.complete();
			}, err => {
				console.error('BlockedPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
