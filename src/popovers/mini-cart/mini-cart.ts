import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Events, App } from 'ionic-angular';

// Models
import { CartItemModel, DetailItemModel } from '../../models/magento/cart/cart';
import { CartTotalModel } from '../../models/magento/cart/total';

// Providers
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'popover-mini-cart',
	templateUrl: 'mini-cart.html',
})

export class MiniCartPopover {

	// Login
	public logged: boolean;

	// Cart
	public total: CartTotalModel;
	public items: Array<DetailItemModel>;

	public subtotal: number = 0.00;
	public qty: number = 0;

	// Page
	public currentPage;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { App } app
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { AlertController } alertCtrl
	 * @param { Events } events
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public app: App,
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public events: Events,
		private cartProvider: CartProvider,
		private commonProvider: CommonProvider) {

		this.logged = this.navParams.get('logged');
		this.items = this.navParams.get('items');
		this.currentPage = this.app.getActiveNav().getActive().name;

		console.info('MiniCartPopover - constructor', this.logged, this.items, this.currentPage);
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {
		this.cartProvider.cartTotal(this.logged).subscribe(data => {
			this.total = data;
			this.subtotal = this.total.subtotal;
			this.qty = this.total.items_qty;
		}, err => {
			console.error('MiniCartPopover - ionViewDidLoad() - cartTotal()', err);
		});
	}

	// Popover Actions

	/**
	 * @public
	 * @method gotoPage
	 * @description Goto page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } page
	 */
	public gotoPage(page: string): void{
		if(page){
			this.dismiss();
			// Since this popover is not part of the root app, you have to explicitly
			//     call on the app root to set the root.
			this.app.getRootNav().setRoot(page);	
		}
	}

	/**
	 * @public
	 * @method gotoProduct
	 * @description Goto product page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 */
	public gotoProduct(item: CartItemModel): void{
		this.commonProvider.analyticsLogEvent('select_content', {
			content_type: 'Product',
			item_id: 'product_' + item.sku
		});

		if(item){
			this.dismiss();
			this.app.getRootNav().setRoot('ProductPage', {
				product: item.sku
			});
		}
	}

	/**
	 * @public
	 * @method helpAlert
	 * @description Show help alert to instruct user how to use mini-cart popover
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses AlertController
	 */
	public helpAlert(): void{
		let alert = this.alertCtrl.create({
			title: 'Mini-Cart Help',
			message: '<p>Slide the cart items left or right to show options.</p><p>To remove: slide the item to the right to show the remove button.</p><p>To change quantity: slide to the left, change quantity with add and subtract buttons, and click the cart button.</p>',
			buttons: ['Thanks!']
		});

		alert.present()
	}

	// Item Actions

	/**
	 * @public
	 * @method removeItem
	 * @description Remove an item from cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 */
	public removeItem(item: DetailItemModel): void{
		let alert = this.alertCtrl.create({
			title: 'Remove Item',
			message: 'Are you sure you want to remove ' + item.cart_item.name + '?',
			buttons: [{
				text: 'No',
				role: 'Cancel',
				handler: () => {
					console.log('Your item is happy you still want to keep it. :)');
				}
			}, {
				text: 'Yes',
				handler: () => {
					let loading = this.commonProvider.pageLoading();
					loading.present();

					this.cartProvider.removeFromCart(item.cart_item, this.logged).subscribe(data => {
						loading.dismiss();

						let toast = this.commonProvider.toast('Item removed from cart successfully');
						toast.present();

						this.commonProvider.analyticsLogEvent('remove_from_cart', {
							'quantity': item.cart_item.qty,
							'item_category': 'Product',
							'item_name': item.cart_item.name,
							'item_id': 'product_' + item.cart_item.sku,
							'price': item.cart_item.price,
							'currency': 'USD',
						});

						// If page is either product, cart, or checkout then publish an event
						if(this.currentPage == 'CartPage' || this.currentPage == 'CheckoutPage' || this.currentPage == 'ProductPage'){
							this.events.publish('minicart:refreshPage');
						}

						this.dismiss();
						
						this.events.publish('header:updateMiniCart', this.logged);
					}, err => {
						console.error('HeaderCheckoutPopover - removeItem() - removeFromCart()', err);
						loading.dismiss();

						let toast = this.commonProvider.toast(err);
						toast.present();

						this.dismiss();
					});
				}
			}]
		});

		alert.present();
	}

	/**
	 * @public
	 * @method updateItem
	 * @description Update an item from the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.1
	 * @param { CartItemModel } item
	 */
	public updateItem(item: DetailItemModel): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		this.cartProvider.addToCart(item.cart_item, this.logged).subscribe(data => {
			loading.dismiss();

			let toast = this.commonProvider.toast('Item update from cart successfully');
			toast.present();

			// If page is either product, cart, or checkout then publish an event
			if(this.currentPage == 'CartPage' || this.currentPage == 'CheckoutPage' || this.currentPage == 'ProductPage'){
				this.events.publish('minicart:refreshPage');
			}
			
			// Update the header and this will process the cart
			this.events.publish('header:updateMiniCart', this.logged);

			this.dismiss();
		}, err => {
			console.error('HeaderCheckoutPopover - updateItem() - addToCart()', item);
			loading.dismiss();

			let toast = this.commonProvider.toast(err);
			toast.present();

			this.dismiss();
		});
	}

	/**
	 * @public
	 * @method addQty
	 * @description Add one to quantity
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 */
	public addQty(item: DetailItemModel): void{
		item.cart_item.qty = item.cart_item.qty + 1;
	}

	/**
	 * @public
	 * @method subQty
	 * @description Subtract one from quantity
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 */
	public subQty(item: DetailItemModel): void{
		if(item.cart_item.qty > 1){
			item.cart_item.qty = item.cart_item.qty - 1;
		}
	}

	/**
	 * @public
	 * @method dismiss
	 * @description Dismiss the popover
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss();
	}
}