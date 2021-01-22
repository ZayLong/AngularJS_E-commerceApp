import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { OrderModel } from '../../models/magento/sales/order';

// Providers
import { CommonProvider } from '../../providers/ionic/common';
import { SalesProvider } from '../../providers/magento/sales';

@IonicPage()
@Component({
	selector: 'page-success',
	templateUrl: 'success.html',
})

export class SuccessPage {

	public logged: CartModel;

	// Order
	public orderId: string;
	public order: OrderModel;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl 
	 * @param { NavParams } navParams
	 * @param { CommonProvider } commonProvider
	 * @param { SalesProvider } salesProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public commonProvider: CommonProvider,
		public salesProvider: SalesProvider) {}

	/**
	 * @public
	 * @method ionViewDidLoad
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {
		this.getOrder();
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_success',
			item_name: 'Success Page',
			item_category: 'Page'
		});
	}

	/**
	 * @private
	 * @method getOrder
	 * @description Get the order id
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	private getOrder(): void{
		this.orderId = this.navParams.get('orderId');

		if(this.orderId){
			this.salesProvider.readOrder(parseInt(this.orderId)).subscribe(data => {
				this.order = data;

				this.commonProvider.analyticsLogEvent('view_item', {
					item_id: 'order_' + this.order.entity_id,
					item_name: this.order.increment_id,
					item_category: 'Order'
				});
			}, err => {
				console.error('SuccessPage - ionViewDidLoad() - readOrder()', err);
			});
		} else {
			// Just go back to the home page
			if(this.logged){
				this.gotoPage('ProfileDashboardPage');
			} else {
				this.gotoPage('HomePage');
			}
		}
	}

	/**
	 * @public
	 * @method userLogged
	 * @description Retrieve the event emitter data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartModel } cart
	 */
	public userLogged(cart: CartModel): void{
		if(cart != undefined){
			this.logged = cart;
		} else {
			this.navCtrl.setRoot('LoginPage').then(() => {
				let toast = this.commonProvider.toast('You need to be logged in to access your profile.');
				toast.present();
			});
		}
	}

	/**
	 * @public
	 * @method gotoPage
	 * @description Go to a page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } page
	 */
	public gotoPage(page: string): void{
		if(page){
			this.navCtrl.push(page);
		}
	}

	/**
	 * @public
	 * @method refresh (refresher)
	 * @description Perform a refresh
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { any } event
	 */
	public refresh(event: any): void{
		setTimeout(() => {
			this.getOrder();
			event.complete();
		}, 2000); // Delay for two seconds
	}
}
