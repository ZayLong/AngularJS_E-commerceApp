import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Models
import { CartModel } from '../models/magento/cart/cart';
import { PageModel } from '../models/ionic/app';

// Natives
import { AppRate } from '@ionic-native/app-rate';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Providers
import { AlgoliaProvider } from '../providers/api/algolia';
import { AuthenticateProvider } from '../providers/magento/authenticate';
import { CartProvider } from '../providers/magento/cart';
import { CommonProvider } from '../providers/ionic/common';
import { WishlistProvider } from '../providers/magento/wishlist';
import { YotpoProvider } from '../providers/api/yotpo';

@Component({
	templateUrl: 'app.html'
})

export class MyApp {
	@ViewChild(Nav) nav: Nav;

	// User/Cart
	public logged: boolean;
	public cart: CartModel;

	public rootPage: string = 'SplashPage';

	// Slide Menu
	public staticPages;
	public pages: Array<PageModel> = [];
	public menuSegment: string = 'menu'; // Menu page segment navigation
	public wishlistCount: number = 0;
	public rewardPoints: number = 0;
	
	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
 	 * @param { Platform } platform
	 * @param { Events } events
	 * @param { Storage } storage
	 * @param { AppRate } apprate
	 * @param { SplashScreen } splashScreen
	 * @param { StatusBar } statusBar
	 * @param { AlgoliaProvider } algoliaProvider
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { WishlistProvider } wishlistProvider
	 * @param { YotpoProvider } yotpoProvider
	 */
	public constructor(
		public platform: Platform,
		public events: Events,
		public storage: Storage,
		public apprate: AppRate,
		public splashScreen: SplashScreen,
		public statusBar: StatusBar, 
		public algoliaProvider: AlgoliaProvider,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public wishlistProvider: WishlistProvider,
		public yotpoProvider: YotpoProvider) {
		// Get cart and user information from an event
		this.events.subscribe('app:changeAccountMenu', logged => {
			this.logged = logged;
		});

		this.events.subscribe('app:getWishlist', () => {
			this.getWishlistCount();
		});

		this.events.subscribe('app:getRewardPoints', points => {
			this.rewardPoints = points;
		});

		this.platform.ready().then(() => {
			console.log('PLATFORM IS READY!');

			// Start at splash screen
			if(this.platform.is('core') || this.platform.is('mobileweb')){
				console.log('This might be Ionic Serve');
				this.gotoPage('SplashPage');
			}

			// Okay, so the platform is ready and our plugins are available.
    		// Here you can do any higher level native things you might need.
    		this.statusBar.styleDefault();
    		this.splashScreen.hide();

			// Get initial wishlist item count
			this.getWishlistCount();

			// Set the Yotpo Token
			this.yotpoProvider.setAuthentication().subscribe(data => {
				console.info('App - constructor() - setAuthentication()', data);
			}, err => console.error('App - constructor() - setAuthentication()', err));

			// Rate the app
			this.rateApp();
		});
	}

	/**
	 * @private
	 * @method getWishlistCount
	 * @description Get the wishlist item count for the slide menu
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private getWishlistCount(): void{
		this.wishlistProvider.readWishlist().subscribe(data => {
			this.wishlistCount = data.items.length;
		}, err => console.error('App - constructor() - readWishlist()', err));
	}

	/**
	 * @public
	 * @method gotoPage (click)
	 * @description Go to page or perform an action
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.3.0
	 * @param { string } page
	 */
	public gotoPage(page: string): void {
		if(page){
			this.nav.push(page);
		}
	}

	/**
	 * @public
	 * @method gotoStaticPage (click)
	 * @description Go to page or perform an action
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { number } pageId
	 */
	public gotoStaticPage(pageId: number): void{
		if(pageId){
			this.nav.push('StaticPage', {
				id: pageId
			});	
		}
	}

	/**
	 * @public
	 * @method gotoCategory (click)
	 * @description Go to feeds page based on category search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } categoryId
	 * @version 1.5.0
	 */
	public gotoCategory(categoryId: number): void{
		this.algoliaProvider.clearSearch();

		// To match the website; best sellers (desc) sorting by default for categories.
		sessionStorage.setItem('searchOrderDirection', 'DESC');
		sessionStorage.setItem('searchOrderField', 'bestSeller');

		this.nav.push('FeedsPage', {
			category: categoryId,
			flag: 'category'
		});
	}

	/**
	 * @public
	 * @method signOut (click)
	 * @description Sign out the user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.5.0
	 * @todo It is not calling the checkLogin unless the signout button is pressed twice
	 */
	public signOut(): void{
		this.cartProvider.createGuestCart().subscribe(data => {
			// Unset the customer token to both provider and storage without worrying about async
			this.authProvider.setCustomerToken('');

			// Do set the guest token to the provider and storage separately to await async for cart provider
			this.authProvider.setGuestTokenProvider(data);
			this.authProvider.setGuestTokenStorage(data).then(() => {
				this.cartProvider.cart(false).subscribe(data => {
					// Store to the auth provider
					this.authProvider.setCurrentCartProvider(data);

					// Tell BlockPage to ignore the guard
					sessionStorage.setItem('appIgnoreBlock', 'yes');

					// Guest should not be blocked
					sessionStorage.removeItem('appBlocked');

					// Change the account menu
					this.logged = false;
					
					this.nav.setRoot('LoginPage');
				}, err => console.error('App - signOut() - cart(false)', err));
			}).catch(onrejected => console.error('App - signOut() - setGuestTokenStorage()', onrejected));
		}, err => console.error('App - signOut() - createGuestCart()', err));
	}

	/**
	 * @private
	 * @method rateApp
	 * @description Allow users to rate the app
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses AppRate (native)
	 */
	private rateApp(): void{
		// You need to have the complete preference parameters to make the plugin work
		this.apprate.preferences = {
			displayAppName: 'The Industry Source',
			usesUntilPrompt: 5,
			promptAgainForEachNewVersion: true,
			inAppReview: false,
		
			storeAppURL: {
				ios: 'id1061143719',
				android: 'market://details?id=com.tngworldwide.theindustrysource&hl=en',
				windows: '',
				blackberry: '',
				windows8: ''
			},
			
			customLocale: {
				title: "Would you mind rating our app?",
				message: "It won’t take more than a minute and helps to promote our app. Thanks for your support!",
				cancelButtonLabel: "No, Thanks",
				laterButtonLabel: "Remind Me Later",
				rateButtonLabel: "Rate It Now",
				yesButtonLabel: "Yes!",
				noButtonLabel: "Not really",
				appRatePromptTitle: 'Do you like using our app?',
				feedbackPromptTitle: 'Mind giving us some feedback?',
			},
		
			callbacks: {
				handleNegativeFeedback: function(){
					window.open('mailto:sales@theindustrysource.com', '_system');
				},

				onRateDialogShow: function(callback){
					//callback(1);
				},

				onButtonClicked: function(buttonIndex){}
			}
		};

		this.apprate.promptForRating(false);
	}
}