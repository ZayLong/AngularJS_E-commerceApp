import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

// Models
import { CartModel } from '../../../models/magento/cart/cart';
import { ProductModel } from '../../../models/magento/catalog/product';
import { GroupcatProductActionModel } from '../../../models/magento/amasty/groupcat';

// Providers
import { CartProvider } from '../../../providers/magento/cart';
import { CommonProvider } from '../../../providers/ionic/common';

@Component({
	selector: 'product-addtocart',
	templateUrl: 'product-addtocart.html'
})

export class ProductAddtocartComponent {

	@Output() quantityChange: EventEmitter<number> = new EventEmitter();

	@Input('action') action: GroupcatProductActionModel;
	@Input('cart') cart: CartModel;
	@Input('product') product: ProductModel;

	// Quantity
	public quantity: number = 1;
	public minQuantity: number = 1;

	public status: string = '';
	public logged: boolean = false;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider
	) {}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the component
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.1
	 */
	private process(): void{
		if(this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		if(this.action.call_to_order){
			// Product is call to order only
			this.status = 'calltoorder';
		} else {
			if(this.product.isBackOrdered()){
				// Product is in backordered, and now use the logged status checker
				this.status = this.loggedStatus(this.logged);
			} else {
				// If not backordered, then check if any quantity
				if(this.product.isInStock()){
					// Now use the logged status checker
					this.status = this.loggedStatus(this.logged);
				} else {
					this.status = 'outofstock';
				}
				
			}
		}
	}

	/**
	 * @private
	 * @method loggedStatus
	 * @description Get the add to cart status based on the user's logged status
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { boolean } logged
	 * @return { string }
	 */
	private loggedStatus(logged: boolean): string{
		let loggedStatus = '';

		if(this.product.canAddToCart(this.action, logged)){
			// We can add to cart
			loggedStatus = 'addtocart';
		} else {
			if(this.action.hide_from_region){
				loggedStatus = 'region';
			} else if(this.action.change_price_text && this.action.hide_from_region == false && logged == false) {
				loggedStatus = 'login';
			}
		}

		return loggedStatus;
	}

	/**
	 * @public
	 * @method gotoPage (click)
	 * @description Go to a page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } page
	 */
	public gotoPage(page: string): void{
		if(page){
			this.navCtrl.push(page);
		}
	}
}
