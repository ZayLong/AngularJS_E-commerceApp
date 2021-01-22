import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

// Modals
import { OrderDetailModal } from '../../modals/profile/order-detail/order-detail';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { OrderModel } from '../../models/magento/sales/order';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';
import { SalesProvider } from '../../providers/magento/sales';

@IonicPage()
@Component({
	selector: 'page-profile-orders',
	templateUrl: 'profile-orders.html',
})

export class ProfileOrdersPage {

	// User/Cart
	public cart: CartModel;
	public logged: boolean;

	// Orders
	public orders: Array<OrderModel> = [];
	public loadingOrders: boolean = true;

	// Paging
	public currentPage: number = 1;
	public noItems: number = 10;
	public totalPages: number = 1;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.2
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ModalController } modalCtrl
	 * @param { Events } events
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { SalesProvider } salesProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public salesProvider: SalesProvider) {
	}

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
		this.getOrders(this.currentPage, this.noItems);
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_profile_orders',
			item_name: 'Profile Orders Page',
			item_category: 'Page'
		});

		this.commonProvider.analyticsLogEvent('view_item_list', {
			item_category: 'Order'
		});
	}

	/**
	 * @private
	 * @method getOrders
	 * @description Get orders by page number
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.5.0
	 * @param { number } page
	 * @param { number } noItems
	 */
	private getOrders(page: number, noItems: number): void{
		this.loadingOrders = true;

		this.salesProvider.readOrdersByPage(this.cart.customer, noItems, page).subscribe(data => {
			console.info(data.items);
			
			// Get total pages
			this.totalPages = Math.ceil(data.total_count / noItems);

			// We are done loading the orders
			this.loadingOrders = false;

			// Set the orders
			this.orders = data.items;
		}, err => {
			console.error('ProfileOrdersPage - fetchLogged() - readOrdersByPage()', err);
			this.loadingOrders = false;
		});
	}

	/**
	 * @public
	 * @method orderPage
	 * @description Page through orders
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @uses PagingComponent
	 * @param { number } pageNo
	 */
	public orderPage(pageNo: number): void{
		this.currentPage = pageNo;
		this.getOrders(this.currentPage, this.noItems);
	}

	/**
	 * @public
	 * @method reorder (click)
	 * @description Put items from order to cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.2
	 * @param { OrderModel } order
	 */
	public reorder(order: OrderModel): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		for(let item of order.items){
			this.commonProvider.analyticsLogEvent('add_to_cart', {
				item_id: 'product_' + item.sku,
				item_name: item.name,
				item_category: 'Product',
				quantity: item.qty_ordered,
				price: item.price,
				value: item.price * item.qty_ordered,
				currency: 'USD'
			});
		}

		this.salesProvider.reorder(order).subscribe(data => {
			loading.dismiss();
			if(data){
				this.cartProvider.getCart().subscribe(data => {
					this.authProvider.setCurrentCartProvider(data.cart);
					this.events.publish('header:updateMiniCart', data.logged);

					this.navCtrl.push('CartPage');	
				}, err => console.error('ProfileOrdersPage - reorder() - reorder()', err));
			} else {
				let toast = this.commonProvider.toast('Unable to retrieve previous order to cart');

				toast.present();
			}
		}, err => {
			console.error('ProfileOrdersPage - reorder() - reorder()', err);
			loading.dismiss();
			
			let toast = this.commonProvider.toast('Unable to retrieve previous order to cart');

			toast.present();
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

	// MODAL METHODS

	/**
	 * @public
	 * @method viewOrderModal (click)
	 * @description View order in detail from modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { OrderModel } order
	 */
	public viewOrderModal(order: OrderModel): void{
		this.commonProvider.analyticsLogEvent('select_content', {
			content_type: 'Order',
			item_id: 'order_' + order.entity_id
		});
		
		let modal = this.modalCtrl.create(OrderDetailModal, {
			order: order
		});

		modal.present();
	}

	// REFRESH METHOD

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
				} else {
					this.getOrders(this.currentPage, this.noItems);
				}

				event.complete();
			}, err => {
				console.error('ProfileOrdersPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}