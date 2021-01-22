import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, AlertController } from 'ionic-angular';

// Modals
import { ImageModal } from '../../modals/general/image/image';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { WishlistModel, WishlistItemModel } from '../../models/magento/wishlist/wishlist';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';
import { WishlistProvider } from '../../providers/magento/wishlist';

@IonicPage()
@Component({
	selector: 'page-profile-wishlist',
	templateUrl: 'profile-wishlist.html',
})

export class ProfileWishlistPage {

	// User/Cart
	public cart: CartModel;
	public logged: boolean;

	// Wishlist
	public wishlist: WishlistModel;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.2
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { ModalController } modalCtrl
	 * @param { AlertController } alertCtrl
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { WishlistProvider } wishlistProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		public modalCtrl: ModalController,
		public alertCtrl: AlertController,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public wishlistProvider: WishlistProvider) {}

	/**
	 * @public
	 * @method ionViewCanEnter (lifecycle)
	 * @description Check if user is allowed to enter
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
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
	 * @since 1.2.0
	 * @version 1.2.0
	 */
	public ionViewDidLoad() {
		this.processWishlist();
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_profile_wishlist',
			item_name: 'Profile Wishlist Page',
			item_category: 'Page'
		});
	}

	/**
	 * @private
	 * @method processWishlist
	 * @description Reset the wishlist data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 */
	private processWishlist(): void{
		this.wishlistProvider.readWishlist().subscribe(data => {
			this.wishlist = data;

		}, err => console.error('ProfileWishlistPage - processWishlist() - readWishlist()', err));
	}

	/**
	 * @public
	 * @method updateWishlist (click)
	 * @description Update all wishlist items (quantity changes)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 */
	public updateWishlist(): void{
		let items: Array<number> = [];
		let qty: Array<number> = [];

		for(let item of this.wishlist.items){
			items.push(item.wishlist_item_id);
			qty.push(item.qty);
		}

		this.wishlistProvider.updateWishlist(items, qty).subscribe(data => {
			let toast = this.commonProvider.toast('Wishlist was updated.');
			toast.present();

			this.processWishlist();
		}, err => {
			console.error('ProfileWishlistPage - updateWishlist() - updateWishlist()', err);

			let toast = this.commonProvider.toast('Wishlist was unable to be updated.');
			toast.present();
		});
	}

	// WISHLIST ITEM METHODS

	/**
	 * @public
	 * @method gotoProduct (click)
	 * @description Go to product page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { WishlistItemModel } item
	 */
	public gotoProduct(item: WishlistItemModel): void{
		this.commonProvider.analyticsLogEvent('select_content', {
			content_type: 'Product',
			item_id: 'product_' + item.product.sku
		});

		this.navCtrl.push('ProductPage', {
			product: item.product.sku
		});
	}

	/**
	 * @public
	 * @method imageModal (click)
	 * @description Show an enlarged image on a modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @uses ModalController
	 * @param { WishlistItemModel } item
	 */
	public imageModal(item: WishlistItemModel): void{
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'image_' + item.product.sku,
			item_name: 'Image of ' + item.product.name,
			item_category: 'Image'
		});

		let modal = this.modalCtrl.create(ImageModal, {
			image: item.product.imagePath(),
			title: item.product.name
		});

		modal.present();
	}

	/**
	 * @public
	 * @method removeItem (click)
	 * @description Delete a wishlist item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @uses AlertController
	 * @param { WishlistItemModel } item
	 */
	public removeItem(item: WishlistItemModel): void{
	 	let loading = this.commonProvider.pageLoading();
	 	

	 	let alert = this.alertCtrl.create({
	 		title: 'Removing from Wishlist',
	 		message: 'Are you sure you want to remove ' + item.product.name + ' from your wishlist?',
	 		buttons: [
	 			{
	 				text: 'No',
	 				handler: () => {
	 					console.log('Yay, it stays hopeful to be purchased!');
	 				}
	 			}, {
	 				text: 'Yes',
	 				handler: () => {
	 					loading.present();

	 					this.wishlistProvider.deleteItem(item.wishlist_item_id).subscribe(data => {
	 						loading.dismiss();

	 						let toast = this.commonProvider.toast('Wishlist item was removed.');
							toast.present();

							this.events.publish('app:getWishlist');

	 						this.processWishlist();
	 					}, err => console.error('ProfileWishlistPage - removeItem() - deleteItem()', err));
	 				}
	 			}
	 		]
	 	});

	 	alert.present();
	}

	/**
	 * @public
	 * @method transferItemToCart (click)
	 * @description Transfer a wishlist item to the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { WishlistItemModel } item
	 */
	public transferItemToCart(item: WishlistItemModel): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		this.wishlistProvider.transferItemToCart(item).subscribe(data => {
			loading.dismiss();

			this.commonProvider.analyticsLogEvent('add_to_cart', {
				item_id: 'product_' + item.product.sku,
				item_name: item.product.name,
				item_category: 'Product',
				quantity: item.qty,
				price: item.product.price,
				value: item.product.price * item.qty,
				currency: 'USD'
			});

			let toast = this.commonProvider.toast('Item transferred to cart');
			toast.present();

			this.events.publish('app:getUser'); //update the header
			this.processWishlist();			
		}, err => {
			console.error('ProfileWishlistPage - transferItemToCart() - transferItemToCart()', err);

			loading.dismiss();

			let toast = this.commonProvider.toast('Unable to transfer item to cart.');
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
					this.processWishlist();
				}

				event.complete();
			}, err => {
				console.error('ProfileWishlistPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
