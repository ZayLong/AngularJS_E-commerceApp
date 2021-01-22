import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController, Events } from 'ionic-angular';

// Modals
import { ImageModal } from '../../modals/general/image/image';

// Models
import { 
	CartModel, 
	CartItemModel,
	DetailItemModel
} from '../../models/magento/cart/cart';

import { ProductModel } from '../../models/magento/catalog/product';
import { CartTotalModel } from '../../models/magento/cart/total';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';

// RXJS
import { forkJoin } from 'rxjs/observable/forkJoin';

@IonicPage()
@Component({
	selector: 'page-cart',
	templateUrl: 'cart.html',
})

export class CartPage {
	// Components
	public loading = this.commonProvider.pageLoading();

	// Customer/Cart
	public logged: boolean;
	public cart: CartModel;
	public cartTotal: CartTotalModel;

	// Tax Exempt
	public taxExemptOptions: Array<{ key: string, value: string }>;
	public taxExemptAttributes: any;
	
	// Products
	public items: Array<DetailItemModel> = [];
	public showLoading: boolean = true; // Show the loading component
	public showItemsLoading: boolean = false;
	public showBackorderMessage: boolean = false; // Show back order message

	// Coupon
	public coupon: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { ActionSheetController } actionSheetCtrl
	 * @param { AlertController } alertCtrl
	 * @param { ModalController } modalCtrl
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public actionSheetCtrl: ActionSheetController,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider) {

		this.taxExemptOptions = [
			{ key: 'Tax Exempt', value: '2' },
			{ key: 'Taxable', value: '1' }
		];

		this.taxExemptAttributes = {
			title: 'Tax Exempt'
		}
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.3
	 */
	public ionViewDidLoad() {
		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		this.processCart();

		// If any changes made from minicart, then refresh the cart page
		this.events.subscribe('minicart:refreshPage', () => {
			this.processCart();
		});
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_cart',
			item_name: 'Cart Page',
			item_category: 'Page'
		});
	}

	/**
	 * @private
	 * @method processCart
	 * @description Reset the cart and totals with an option to reload the product listing
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { boolean } reloadProducts (defaults to true)
	 */
	private processCart(reloadProducts: boolean = true): void{
		let response = [];
		this.showBackorderMessage = false;

		// If we are showing the main loading component, no need to show the cart loader
		if(this.showLoading == false){
			this.showItemsLoading = true;	
		}

		response.push(this.cartProvider.cart(this.logged));
		response.push(this.cartProvider.cartTotal(this.logged));

		forkJoin(response).subscribe(data => {
			this.cart = data[0] as CartModel;
			this.authProvider.setCurrentCartProvider(this.cart); // Refresh the cart provider data

			// Instead of just clearing the whole array everytime,
			// just clear it when there are no cart items
			if(this.cart.items.length <= 0){
				this.items = [];
			}

			if(reloadProducts){
				// This will allow to get more details of the product than what you can find from just the cart item

				// ex. product image
				this.cartProvider.detailItem(this.logged).subscribe(data => {
					this.items = this.taxExempting(data);

					// Loop through the items
					for(let item of this.items){
						console.info('CartPage - processCart() - item', item);
						// Check if an item is back ordered
						if(this.showBackorderMessage == false && item.stock_item.qty <= 0){
							console.log('Item backordered');
							this.showBackorderMessage = true;
						}
					}

					// console.info('CartPage - processCart() - detailItem()', this.items);

					this.showItemsLoading = false;
				}, err => console.error('CartPage - processCart() - detailItem()', err));
			}

			this.showLoading = false;
		}, err => {
			console.error('CartPage - processCart() - forkJoin()', err);
			this.showLoading = false;
		});
	}

	/**
	 * @private
	 * @method taxExempting
	 * @description Change the taxable flags per cart item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Array<DetailItemModel> } items
	 * @return { Array<DetailItemModel> }
	 */
	private taxExempting(items: Array<DetailItemModel>): Array<DetailItemModel>{
		// Split the CSV into an array of strings
		if(sessionStorage.getItem('cartTaxExempt')){
			let taxExempts: Array<string> = sessionStorage.getItem('cartTaxExempt').split(',');

			if(taxExempts.length > 0){
				// There has to be a better way to do this.
				for(let item of items){
					for(let tax of taxExempts){
						if(tax === item.cart_item.item_id.toString()){
							item.taxable = '2';
						}
					}
				}
			}
		} else {
			for(let item of items){
				item.taxable = '1';
			}
		}
		
		return items;
	}

	// DISCOUNT CODES

	/**
	 * @public
	 * @method applyDiscountCode
	 * @description Attempt to apply discount code
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Might want to figure out a firebase event for this
	 */
	public applyDiscountCode(): void{
		if(this.coupon){
			let loading = this.commonProvider.pageLoading();
			loading.present();

			this.coupon.toUpperCase();
			this.cartProvider.addCoupon(this.coupon, this.logged).subscribe(data => {
				loading.dismiss();
				this.processCart();
			}, err => {
				console.error('CartPage - applyDiscountCode() - addCoupon()', err);
				loading.dismiss();
				
				let toast = this.commonProvider.toast(err);
				toast.present();
			});
		}
	}

	/**
	 * @public
	 * @method removeDiscountCode
	 * @description Remove coupon code from cart with an alert
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses AlertController
	 * @todo Might want to figure out a firebase event for this
	 */
	public removeDiscountCode(): void{
		if(this.cartTotal.coupon_code){
			let alert = this.alertCtrl.create({
				title: 'Remove Coupon Code',
				message: 'Are you sure you want to remove "' + this.cartTotal.coupon_code.toUpperCase() + '" coupon from the cart?',
				buttons:[{
					text: 'No',
					role: 'cancel',
					handler: () => {
						console.log('Yay, coupon code is here to stay!');
					}
				}, {
					text: 'Yes',
					handler: () => {
						let loading = this.commonProvider.pageLoading();
						loading.present();

						this.cartProvider.removeCoupon(this.logged).subscribe(data => {
							loading.dismiss();
							this.processCart();
						}, err => {
							console.error('CartPage - removeDiscountCode() - removeCoupon()', err);
							loading.dismiss();
							
							let toast = this.commonProvider.toast(err);
							toast.present();
						});
					}
				}]
			});

			alert.present();
		}
	}

	// INDIVIDUAL CART ITEM METHODS

	/**
	 * @public
	 * @method updateItem (click)
	 * @description Update item from cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 * @param { CartItemModel } item
	 */
	public updateItem(item: CartItemModel): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		this.cartProvider.addToCart(item, this.logged).subscribe(data => {
			loading.dismiss();

			let toast = this.commonProvider.toast('Item update from cart successfully');
			toast.present();

			this.events.publish('header:updateMiniCart', this.logged); // Update the header

			this.processCart();
		}, err => {
			console.error('HeaderCheckoutPopover - updateItem() - addToCart()', item);
			loading.dismiss();

			let toast = this.commonProvider.toast(err);
			toast.present();
		})
	}

	/**
	 * @public
	 * @method removeItem (click)
	 * @description Remove item from cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo (1) Figure out a way without having to refresh the page
	 * @uses AlertController
	 * @param { CartItemModel } items
	 */
	public removeItem(item: CartItemModel): void{
		let confirm = this.alertCtrl.create({
			title: 'Remove item',
			message: 'Are you sure you want to remove ' + item.name + ' from the cart?',
			buttons:[{
				text: 'No',
				handler: () => {
					console.log('Your item is happy you still want to keep it. :)');
				}	
			}, {
				text: 'Yes',
				handler: () => {
					this.loading = this.commonProvider.pageLoading();
					this.loading.present();

					this.cartProvider.removeFromCart(item, this.logged).subscribe(data => {
						this.loading.dismiss();

						let toast = this.commonProvider.toast('Item removed from cart successfully');
						toast.present();

						this.commonProvider.analyticsLogEvent('remove_from_cart', {
							'quantity': item.qty,
							'item_category': 'Product',
							'item_name': item.name,
							'item_id': 'product_' + item.sku,
							'price': item.price,
							'currency': 'USD',
						});
						
						this.events.publish('header:updateMiniCart', this.logged); // Update the header

						this.processCart();
					}, err => {
						console.error('Cart Page - removeItem() - removeFromCart()', err);
						this.loading.dismiss();
						
						let toast = this.commonProvider.toast(err);
						toast.present();
					})
				}
			}]
		});

		confirm.present();
	}

	/**
	 * @public
	 * @method gotoProduct (click)
	 * @description Go to product page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 */
	public gotoProduct(item: CartItemModel): void{
		this.navCtrl.push('ProductPage', {
			product: item.sku
		});
	}

	/**
	 * @public
	 * @method imageModal (click)
	 * @description Show an enlarged image on a modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses ModalController
	 * @param { ProductModel } product
	 */
	public imageModal(product: ProductModel): void{
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'image_' + product.sku,
			item_name: 'Image of ' + product.name,
			item_category: 'Image'
		});

		let modal = this.modalCtrl.create(ImageModal, {
			image: product.imagePath(),
			title: product.name
		});

		modal.present();
	}

	// ACTION SHEET METHODS

	/**
	 * @public
	 * @method cartActions
	 * @description Present the action sheet to show cart actions
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses ActionSheetController
	 */
	public cartActions(): void{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Cart Actions',
			buttons: [{
				text: 'Checkout',
				handler: () => {
					this.gotoPage('CheckoutPage');
				}
			}, {
				text: 'Clear Cart',
				handler: () => {
					this.clearCart()
				}
			}, {
				text: 'Continue Shopping',
				handler: () => {
					this.gotoPage('HomePage');
				}
			}, {
				text: 'Update Cart',
				handler: () => {
					this.updateCart();
				}
			}]
		});

		actionSheet.present();
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
	 * @method clearCart
	 * @description Clear the cart of items
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public clearCart(): void{
		let confirm = this.alertCtrl.create({
			title: 'Remove items',
			message: 'Are you sure you want to remove all items from the cart?',
			buttons:[{
				text: 'No',
				handler: () => {
					console.log('Your cart is happy you still want to keep it. :)');
				}	
			}, {
				text: 'Yes',
				handler: () => {

					this.loading = this.commonProvider.pageLoading();

					let items: Array<CartItemModel> = [];

					for(let item of this.items){
						items.push(item.cart_item);
					}

					this.cartProvider.clearFromCart(items, this.logged).subscribe(data => {
						//this.items = []; // This will clear the items from the cart
						this.loading.dismiss();

						// Send individual events to Firebase per item
						for(let item of items){
							this.commonProvider.analyticsLogEvent('remove_from_cart', {
								'quantity': item.qty,
								'item_category': 'Product',
								'item_name': item.name,
								'item_id': 'product_' + item.sku,
								'price': item.price,
								'currency': 'USD',
							});
						}

						if(data){
							let toast = this.commonProvider.toast('Items removed from the cart successfully');
							toast.present();

							this.items = []; // Clear the items from cart
						} else {
							let toast = this.commonProvider.toast('Some items were removed from the cart');
							toast.present();
						}

						this.events.publish('header:updateMiniCart', this.logged); // Update the header
						this.processCart();
					}, err => {
						console.error('Cart Page - clearCart() - clearFromCart()', err);
						this.loading.dismiss();
						
						let toast = this.commonProvider.toast('Unable to remove items from the cart');
						toast.present();
					});
				}
			}]
		});

		confirm.present();
	}

	/**
	 * @public
	 * @method updateCart
	 * @description Update the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 */
	public updateCart(): void{
		/*
			Instead of sending the entire cart item model, we need to send just the item id and quantity. Magento has an issue distinquishing an array of models. It can do simple types like strings and ints, but not an array of interfaces which is lame.
		*/
		let cartItemsId: Array<number> = [];
		let cartItemsQty: Array<number> = [];
		
		// An array of strings to show if a backordered item can not be updated
		let backorderMessageList: Array<string> = [];

		// Local solution to store any cart items that will be tax exempted
		let storeExempts: Array<string> = [];
		sessionStorage.removeItem('cartTaxExempt'); // Need to clear the current tax exempt items off the storage

		let loading = this.commonProvider.pageLoading();
		loading.present();

		for(let item of this.items){
			// Check if a backordered item matches minimum quantity criteria
			if(item.stock_item.qty == 0){ // Need to insert the quantity through the method
				let minQuantity: number = Math.ceil(50.00 / item.product_item.storePrice()['price']);

				// Revert back to the minimum quantity to the item
				if(minQuantity > item.cart_item.qty){
					item.cart_item.qty = minQuantity;
					backorderMessageList.push(item.cart_item.name + ' (' + minQuantity + ' qty.)');
				}
			}

			// Check if quantity is 0 or below then revert back to one
			if(item.cart_item.qty <= 0){
				item.cart_item.qty = 1;
			}

			// Since we can not store or flag cart items which are going to be tax exempt, we will need to store this locally until a better solution comes up like using extension attributes.
			if(item.taxable === '2'){
				storeExempts.push(item.cart_item.item_id.toString());
			} else {
				// taxable, leave alone
			}

			// Send the item id and qty to the two arrays
			cartItemsId.push(item.cart_item.item_id);
			cartItemsQty.push(item.cart_item.qty);
		}

		// Set the tax exempt items
		if(storeExempts.length > 0){
			sessionStorage.setItem('cartTaxExempt', storeExempts.join()); // Comma-separated values
		}

		// Check if the array has any item ids
		if(cartItemsId.length > 0){
			this.cartProvider.addsToCart(cartItemsId, cartItemsQty, this.logged).subscribe(data => {
				loading.dismiss();

				// Check if any back order items had to be reverted back to the original quantity
				if(backorderMessageList.length > 0){
					let message: string = '<p>Unable to change the following back order items:</p>';

					// Build up the back order alert message
					message = message + '<ul>';
					for(let backorderItem of backorderMessageList){
						message = message + '<li>' + backorderItem + '</li>';
					}
					message = message + '</ul>';

					// Show the alert message
					let alert = this.alertCtrl.create({
						title: 'Backorder Items Update',
						message: message,
						cssClass: 'alert-backorder',
						buttons: ['Ok']
					});

					alert.present();
				}

				let toast = this.commonProvider.toast('Items updated from the cart successfully');
				toast.present();

				this.showLoading = true;
				this.processCart(); // Update the cart

				this.events.publish('header:updateMiniCart', this.logged); // Update the header
			}, err => {
				console.error('CartPage - updateCart() - addsToCartArray()', err);
				loading.dismiss();

				let toast = this.commonProvider.toast('Unable to update items from the cart');
				toast.present();
			});
		} else {
			loading.dismiss();

			let toast = this.commonProvider.toast('Unable to update items from the cart');
			toast.present();
		}
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

				this.processCart();

				event.complete();
			}, err => {
				console.error('CartPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}