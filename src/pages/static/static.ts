import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { CmsPageModel } from '../../models/magento/store/cms';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';
import { StoreProvider } from '../../providers/magento/store';

@IonicPage()
@Component({
	selector: 'page-static',
	templateUrl: 'static.html',
})

export class StaticPage {

	// User/Cart
	public cart: CartModel;
	public logged: boolean;

	public page: CmsPageModel;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Storage } storage
	 * @param { Events } events
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { StoreProvider } storeProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public storage: Storage,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public storeProvider: StoreProvider) {

		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart != null && this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {
		this.getPageId();
	}

	/**
	 * @private
	 * @method getPageId
	 * @description Get the page id by page transition or history
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	private getPageId(): void{
		let pageId: number; // Initalized

		if(this.navParams.get('id')){
			pageId = this.navParams.get('id');
			this.storage.set('appLastPage', pageId);

			this.loadPage(pageId);
		} else {
			this.storage.get('appLastPage').then(data => {
				pageId = data;

				this.loadPage(pageId);
			}).catch(onrejected => console.error('ProductPage - ionViewDidLoad() - get(product)', onrejected));
		}
	}

	/**
	 * @private
	 * @method loadPage
	 * @description Load the page data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @todo May want to add retries
	 * @param { number } pageId
	 */
	private loadPage(pageId: number): void{
		this.storeProvider.readCmsPage(pageId).subscribe(data => {
			console.info('StaticPage - loadPage() - readCmsPage()', data);
			this.page = data;

			this.commonProvider.analyticsLogEvent('view_item', {
				item_id: 'page_static_' + this.page.title.toLowerCase(),
				item_name: this.page.title + ' Page',
				item_category: 'Page'
			});
		}, err => {
			console.error('StaticPage - loadPage() - readCmsPage()', err);
		});
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

				this.getPageId();

				event.complete();
			}, err => {
				console.error('StaticPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
