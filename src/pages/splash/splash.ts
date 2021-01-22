import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

// Models
import { CartModel } from '../../models/magento/cart/cart';

// Natives
import { SplashScreen } from '@ionic-native/splash-screen';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';

// RXJS
import { Observable } from 'rxjs';

@IonicPage()
@Component({
	selector: 'page-splash',
	templateUrl: 'splash.html',
})

export class SplashPage {

	public message: string = 'Life needs Manis and Pedis';

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { SplashScreen } splashScreen
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public events: Events,
		public splashScreen: SplashScreen,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider) {

		// Retrieve cart tokens, either guest or customer
    	this.fetchTokens();
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
	}

	/**
	 * @private
	 * @method fetchTokens
	 * @description Check if app has any customer or guest tokens stored then store initial cart data to provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 */
	private fetchTokens(): void{
		this.fetchFromStorage().subscribe(data => {
			console.info('SplashPage - fetchTokens() - fetchFromStorage()', data);

			// Check if customer or guest token exists
			if(data){
				// This will set the cart data to the provider
				this.message = 'Getting ready to shop...';
				
				this.cartProvider.getCart().subscribe(data => {
					console.info('SplashPage - fetchTokens() - fetchCart()', data);
					this.message = 'Almost done...';

					// Set the new cart to the provider
					this.authProvider.setCurrentCartProvider(data.cart);
					
					// Check if cart belongs to customer or guest
					if(data.logged){
						this.events.publish('app:changeAccountMenu', true);
						this.authProvider.setGuestToken(''); // Customer logged in.

						// Then check if logged customer is blocked
						if(data.cart.customer.isUserBlocked(['1'])){
							// User is blocked, go to blocked page
							console.log('APP - LOGGED - BLOCKED');

							let redirect: string = sessionStorage.getItem('appBlocked');

							if(redirect == undefined){
								sessionStorage.setItem('appBlocked', 'yes');
								this.gotoPage('BlockedPage');
							}
						} else {
							// User is not blocked, go to home page
							console.log('APP - LOGGED - NOT BLOCKED');
							this.gotoPage('HomePage');
						}
					} else {
						console.log('APP - NOT LOGGED');
						this.events.publish('app:changeAccountMenu', false);
						this.authProvider.setCustomerToken(''); // Customer not logged in.

						this.gotoPage('HomePage');
					}
				}, err => {
					console.error('SplashPage - fetchTokens() - fetchCart()', err);
					this.fetchTokens(); // Retry
				});
			} else { // Both customer and guest tokens do not exist
				console.warn('No tokens were stored, we\'ll make one!');
				this.message = 'Making a new cart just for you';

				// We'll be making a guest token so the user will not be logged
				this.events.publish('app:changeAccountMenu', false);

				this.cartProvider.createGuestCart().subscribe(data => {
					this.message = 'New cart made';

					this.authProvider.setGuestToken(data);

					this.fetchCart().subscribe(data => {
						console.info('SplashPage - fetchTokens() - fetchCart()', data);

						this.message = 'Almost done...';

						this.gotoPage('HomePage');
					}, err => {
						console.error('SplashPage - fetchTokens() - fetchCart()', err);
						this.fetchTokens(); // Retry
					});
				}, err => {
					console.error('SplashPage - fetchTokens() - createGuestCart()', err);
					this.fetchTokens(); // Retry
				});
			}
		}, err => console.error('SplashPage - fetchTokens() - fetchFromStorage()', err));
	}

	/**
	 * @private
	 * @method fetchFromStorage
	 * @description Retrieve tokens from storage to provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { Observable<boolean> }
	 */
	public fetchFromStorage(): Observable<boolean>{
		return Observable.create(observer => {
			// Retrieve customer token from storage
			this.authProvider.getCustomerTokenStorage().then(onfulfilled => {
				console.info('SplashPage - fetchFromStorage() - getCustomerTokenStorage()', onfulfilled);

				// Check if customer token was stored
				if(onfulfilled){
					console.log('Customer token found!');

					// This will set the token to the provider and "again" in storage
					this.authProvider.setCustomerToken(onfulfilled);
					observer.next(true);
				} else {
					console.warn('Customer token not found! Lets get guest token instead');

					// Retrieve guest token from storage
					this.authProvider.getGuestTokenStorage().then(onfulfilled => {
						console.info('SplashPage - fetchFromStorage() - getGuestTokenStorage()', onfulfilled);

						// Check if guest token was stored
						if(onfulfilled){
							console.log('Guest token found!');

							// This will set the token to the provider and again in storage
							this.authProvider.setGuestToken(onfulfilled);
							observer.next(true);
						} else {
							console.warn('Guest token not found! Awkward!');

							// Both are empty
							observer.next(false);
						}
					}).catch(onrejected => {
						console.error('SplashPage - fetchFromStorage() - get(guestToken)', onrejected);

						observer.error(onrejected);		
					});
				}
			}).catch(onrejected => {
				console.error('SplashPage - fetchFromStorage() - get(customerToken)', onrejected);

				observer.error(onrejected);
			});
		}, err => console.error('SplashPage - fetchFromStorage() - Observable.create()'));
	}

	/**
	 * @private
	 * @method fetchCart
	 * @description Fetch the cart based on logged information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @deprecated 1.5.0
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { Observable<CartModel> }
	 */
	private fetchCart(): Observable<CartModel>{
		return Observable.create(observer => {
			this.cartProvider.cart(true).subscribe(data => {
				console.info('SplashPage - fetchCart() - cart(true)', data);

				// We are using a customer cart, remove the current guest token from provider and storage
				this.authProvider.setGuestToken('');

				// Stash the current cart to the provider
				this.authProvider.setCurrentCartProvider(data);

				observer.next(data);
			}, err => {
				console.warn('SplashPage - fetchCart() - cart(true)', err);

				switch(err.status){
					case 401:
						console.log('401');
						console.log('Unauthorized, customer key is now invalid');
						console.log('=========================================');

						let existing = this.authProvider.getCustomerTokenProvider();

						if(existing){
							console.log('Customer Token Expired!');
							let toast = this.commonProvider.toast('Login Expired');
							toast.present();
						} else {
							console.log('Customer Token Never Existed');
						}

						// Current customer token is no longer valid, remove it from provider and storage
						this.authProvider.setCustomerToken('');

						// Check if guest token is found (which it should)
						this.cartProvider.cart(false).subscribe(data => {
							console.info('SplashPage - fetchCart() - cart(false)', data);

							// Set the guest cart to the provider
							this.authProvider.setCurrentCartProvider(data);

							observer.next(data);
						}, err => {
							console.error('SplashPage - fetchCart() - cart(false)', err);

							observer.error(err);
						});

						break;
					case 404: 
						console.log('404');
						console.log('Not found, no customer cart was found');
						console.log('============================');
						this.cartProvider.createCart().subscribe(() => {
							this.fetchCart();
						});

						break;
					case 500:
						console.log('500');
						console.log('Something happened to the server');
						console.log('================================');

						break;
					case 503:
						console.log('503');
						console.log('Connection to server severed');
						console.log('============================');

						break;
				}
			})
		});
	}

	/**
	 * @public
	 * @method gotoPage (click)
	 * @description Go to a page (and set root)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } page
	 */
	public gotoPage(page: string): void{
		if(page){
			// console.log('You would go to home page from here :)');
			this.navCtrl.setRoot(page);
		}
	}

}
