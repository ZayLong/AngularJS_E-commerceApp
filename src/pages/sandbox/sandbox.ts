import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

// Models
import { CartModel } from '../../models/magento/cart/cart';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';

// Testing Stuff
import { YotpoProvider } from '../../providers/api/yotpo';

@IonicPage()
@Component({
	selector: 'page-sandbox',
	templateUrl: 'sandbox.html',
})

export class SandboxPage {
	// Customer, Cart
	public logged: boolean;
	public cart: CartModel;

	/**
 	 * @public
 	 * @constructor
 	 * @author J. Trpka <jtrpka@tngworldwide.com>
 	 * @since 0.0.0
	 * @version 1.5.2
 	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		// stuff here
		public yotpoProvider: YotpoProvider
	) {}

	/**
 	 * @public
 	 * @method ionViewDidLoad (lifecycle)
 	 * @author J. Trpka <jtrpka@tngworldwide.com>
 	 * @since 0.0.0
	 * @version 1.4.0
	 */
	public ionViewDidLoad() {
		this.doStuffHere();
	}

	/**
	 * @private
	 * @method doStuffHere
	 * @description Do stuff here
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private doStuffHere(): void{
		this.yotpoProvider.getProductReviews(22537).subscribe(data => {
			console.info('SandboxPage - doStuffHere() - getProductReviews()', data);
		}, err => console.error('SandboxPage - doStuffHere() - getProductReviews()', err));
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

				this.doStuffHere();

				event.complete();
			}, err => {
				console.error('SandboxPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}