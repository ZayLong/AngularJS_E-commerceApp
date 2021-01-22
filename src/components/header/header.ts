import { Component } from '@angular/core';
import { NavController, Events, PopoverController } from 'ionic-angular';

// Models
import { CartModel, DetailItemModel } from '../../models/magento/cart/cart';

// Popovers
import { MiniCartPopover } from '../../popovers/mini-cart/mini-cart';

// Providers
import { AlgoliaProvider } from '../../providers/api/algolia';
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';

@Component({
	selector: 'tis-header',
	templateUrl: 'header.html'
})

export class HeaderComponent {

	// Cart
	public cart: CartModel;
	public items: Array<DetailItemModel> = [];
	public logged: boolean;
	public reloadCart: boolean = true;

	// Search
	public search: string;
	public voiceEnabled: boolean = true;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.5
	 * @param { NavController } navCtrl
	 * @param { PopoverController } popoverCtrl
	 * @param { Events } events
	 * @param { AlgoliaProvider } algoliaProvider
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public popoverCtrl: PopoverController,
		public events: Events,
		public algoliaProvider: AlgoliaProvider,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider ){

		this.events.subscribe('header:updateMiniCart', (logged) => {
			console.info('Refreshing the MiniCart', logged);
			this.reloadCart = true;
			this.logged = logged;

			// Get the latest cart data
			this.cartProvider.cart(this.logged).subscribe(data => {
				// Then set it to the auth current cart provider
				this.authProvider.setCurrentCartProvider(data);

				this.refreshMiniCart();
			}, err => console.error('HeaderComponent - constructor() - cart()', err));
		})
	}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.4
	 * @version 1.5.0
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the header
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private process(): void{
		this.refreshMiniCart();
	}

	/**
	 * @private
	 * @method refreshMiniCart
	 * @description Refresh the mini cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.5
	 */
	private refreshMiniCart(): void{
		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart !== null){
			if(this.cart.customer.id === undefined){
				this.logged = false;
			} else {
				this.logged = true;
			}

			this.cartProvider.detailItem(this.logged).subscribe(data => {
				this.reloadCart = false;
				this.items = data;
			}, err => console.error('HeaderComponent - refreshMiniCart() - detailItem()' , err));
		}
	}

	/**
	 * @public
	 * @method searchQuery
	 * @description Perform a text search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public searchQuery(): void{
		this.algoliaProvider.clearSearch();

		this.commonProvider.analyticsLogEvent('search', {
			search_term: this.search
		});
		
		this.navCtrl.push('FeedsPage', {
			search: this.search,
			flag: 'text'
		});
	}

	/**
	 * @public
	 * @method minicartPopover
	 * @description Open up a mini-cart popover
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public minicartPopover(): void{
		//this.navCtrl.setRoot('CartPage');
		let popover = this.popoverCtrl.create(MiniCartPopover, {
			items: this.items,
			logged: this.logged
		});

		popover.present();
	}

	/**
	 * @public
	 * @method gotoHome
	 * @description Go to home page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public gotoHome(): void{
		this.navCtrl.setRoot('HomePage');
	}
}
