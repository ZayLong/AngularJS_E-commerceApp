import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

// Modals
import { ImageModal } from '../../modals/general/image/image';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { RewardPointMinimum, RewardCouponValue } from '../../models/magento/customer/customer';
import { RewardBrandModel } from '../../models/ionic/page/rewards';

// Providers
import { AlgoliaProvider } from '../../providers/api/algolia';
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';

// RXJS
import { forkJoin } from 'rxjs/observable/forkJoin';

@IonicPage()
@Component({
	selector: 'page-rewards',
	templateUrl: 'rewards.html',
})

export class RewardsPage {

	// Customer
	public cart: CartModel;
	public logged: boolean = false;
	public loadedLogged: boolean = false;

	// Segment
	public mode: string = 'info';

	// Points Brands
	public doublePoints: Array<RewardBrandModel> = [];
	public triplePoints: Array<RewardBrandModel> = [];
	public firstRandomDoubleBrand: RewardBrandModel;
	public secondRandomDoubleBrand: RewardBrandModel;

	// Enums
	public rewardPointMinimum = RewardPointMinimum;
	public rewardCouponValue = RewardCouponValue;

	// Coupons
	// If false then coupon is not available
	public checkedRewardCoupon: boolean = false;
	public checkedWeMissYouCoupon: boolean = false;
	// If false then it is no longer checking coupons
	public checkedLoading: boolean = false;
	public checkedLoadingButton: boolean = true;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.1
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { ModalController } modalCtrl
	 * @param { AlgoliaProvider } algoliaProvider
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		public modalCtrl: ModalController,
		public algoliaProvider: AlgoliaProvider,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider) {

		let beautyMaskWorks: RewardBrandModel = new RewardBrandModel('Beauty Mask Works', 'Beauty Mask Works' , '', 'beautymaskworks.jpg');

		let forProBasics: RewardBrandModel = new RewardBrandModel('ForPro Basics Collection', 'ForPro', 'ForPro Basics Collection', 'forprobasics.jpg');

		let gingerLilyBotanticals: RewardBrandModel = new RewardBrandModel('Ginger Lily Farms Botanicals', 'Ginger Lily Farms Botanicals', '', 'gingerlilyfarmsbotanicals.jpg');

		let pureEssentialOil: RewardBrandModel = new RewardBrandModel('Pure Essential Oil Works', 'Pure Essential Oil Works', '', 'pureessentialoilworks.jpg');

		let pureHimalayanSalt: RewardBrandModel = new RewardBrandModel('Pure Himalayan Salt Works', 'Pure Himalayan Salt Works', '', 'purehimalayansaltworks.jpg');

		let xhiProfessional: RewardBrandModel = new RewardBrandModel('XHI Professional Works', 'XHI Professional Works', '', 'xhiprofessionalworks.jpg');

		this.doublePoints = [beautyMaskWorks, forProBasics, gingerLilyBotanticals, pureEssentialOil, pureHimalayanSalt, xhiProfessional];

		let emma: RewardBrandModel = new RewardBrandModel('EMMA', 'EMMA', '', 'emma.jpg');

		let forProProfessional: RewardBrandModel = new RewardBrandModel('ForPro Professional Collection', 'ForPro', '', 'forproprofessional.jpg');

		this.triplePoints = [emma, forProProfessional];
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.1
	 */
	public ionViewDidLoad() {
		this.load();
	}

	/**
	 * @private
	 * @method load
	 * @description Load page data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 */
	private load(): void{
		this.loadedLogged = false;

		this.cart = this.authProvider.getCurrentCartProvider();

		console.info('RewardsPage - ionViewDidLoad() - this.cart', this.cart.customer);

		if(this.cart != null && this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		this.loadedLogged = true;
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_reward',
			item_name: 'Reward Page',
			item_category: 'Page'
		});
	}

	// Reward Methods

	/**
	 * @public
	 * @method endOfQuarter
	 * @description Get the current end of quarter
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public endOfQuarter(){
		let today = new Date();
		let year = today.getFullYear();

		//(Jan 1, Apr 1, July 1, Oct 1) are the start dates, so 12/31, 3/31, 6/30 and 9/30

		// Preset the starting quarter dates
		let startSecond = new Date(year, 4, 1, 0, 0, 0, 0); // January 1st to March 31st
		let startThird = new Date(year, 7, 1, 0, 0, 0, 0); // April 1st to June 30th
		let startFourth = new Date(year, 10, 1, 0, 0, 0, 0); // July 1st to September 30th
		let startFirst = new Date(year + 1, 1, 1, 0, 0, 0, 0); // October 1st to December 31st

		if(today < startSecond){
			return 'March 31st, ' + year;
		} else if(today < startThird){
			return 'June 30th, ' + year;
		} else if(today < startFourth){
			return 'September 30th, ' + year;
		} else if(today < startFirst){
			return 'December 31st, ' + year;
		}
	}

	/**
	 * @public
	 * @method banner
	 * @description Retrieve a banner based on user reward level
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { string }
	 */
	public banner(): string{
		switch(this.cart.customer.rewardLevel()){
			case 'Basic':
				return 'assets/img/rewards/banner-basic.jpg';
			// end case Basic

			case 'Bronze':
				return 'assets/img/rewards/banner-bronze.jpg';
			// end case Bronze

			case 'Silver':
				return 'assets/img/rewards/banner-silver.jpg';
			// end case silver

			case 'Gold':
				return 'assets/img/rewards/banner-gold.jpg';
			// end case gold

			case 'Platinum':
				return 'assets/img/rewards/banner-platinum.jpg';
			// end case platinum

			case 'Black':
				return 'assets/img/rewards/banner-black.jpg';
			// end case Black
		}
	}

	// Coupon Check Methods

	/**
	 * @public
	 * @method checkCoupons (click)
	 * @description Check if customer has any valid coupons they can use based on current reward level and wemissyou as well.
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 */
	public checkCoupons(): void{
		this.checkedLoading = true;
		this.checkedLoadingButton = false;

		// Force it being true with logged parameter
		this.cartProvider.addCoupon(this.cart.customer.rewardLevel().toUpperCase(), true).subscribe(data => {
			console.info('RewardsPage - checkCoupons() - addCoupon(RewardsLevel)', data);

			// Coupon was added successfully
			this.checkedRewardCoupon = true;

			this.cartProvider.removeCoupon(true).subscribe(data => {
				console.info('RewardsPage - checkCoupons() - removeCoupon(RewardsLevel)', data);

				// After removing reward level coupon, start checking the wemissyou coupon.
				this.checkWeMissYouCoupon();
			}, err => {
				console.error('RewardsPage - checkCoupons() - removeCoupon(RewardsLevel)', err);

				this.checkCouponErrorHandling(err, 'Rewards');
			});

		}, err => {
			console.error('RewardsPage - checkCoupons() - addCoupon(RewardsLevel)', err);

			this.checkCouponErrorHandling(err, 'Rewards');

			this.checkWeMissYouCoupon();
		});
	}

	/**
	 * @private
	 * @method checkWeMissYouCoupon
	 * @description Check the WEMISSYOU coupon
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 */
	private checkWeMissYouCoupon(): void{
		// Force it being true with logged parameter
		this.cartProvider.addCoupon('WEMISSYOU', true).subscribe(data => {
			console.info('RewardsPage - checkWeMissYouCoupon() - addCoupon(WeMissYou)', data);

			this.checkedWeMissYouCoupon = true;

			this.cartProvider.removeCoupon(true).subscribe(data => {
				console.info('RewardsPage - checkWeMissYouCoupon() - removeCoupon(WeMissYou)', data);

				this.checkedLoading = false;
			}, err => {
				console.error('RewardsPage - checkWeMissYouCoupon() - removeCoupon(WeMissYou)', err);

				this.checkedLoading = false;

				this.checkCouponErrorHandling(err, 'WeMissYou');
			});
		}, err => {
			console.error('RewardsPage - checkWeMissYouCoupon() - addCoupon(WeMissYou)', err);

			this.checkedLoading = false;

			this.checkCouponErrorHandling(err, 'WeMissYou');
		});
	}

	/**
	 * @private
	 * @method checkCouponErrorHandling
	 * @description A simple method for error handling with coupon checking
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 * @param { any } error
	 * @param { string } couponType
	 */
	private checkCouponErrorHandling(error: any, couponType: string): void{
		switch(error.status){
			case 400:
				console.log('400');
				console.log('Bad Request, ' + error.error.message);
				console.log('=========================================');

				if(couponType == 'Rewards'){
					this.checkedRewardCoupon = false;
				} else if(couponType == 'WeMissYou'){
					this.checkedWeMissYouCoupon = false;
				}

				break;
			// end case 400

			// 401 (Unauthorized), 404 (api path not found), 500 (server wonky), 503 (connection severed)
		}
	}

	// Gesture Methods

	/**
	 * @public
	 * @method swipe
	 * @description Interactions with swipe gestures
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } mode
	 */
	public swipe(mode: string): void{
		this.mode = mode;
	}

	// Modal Methods

	/**
	 * @public
	 * @method imageModal
	 * @description Show an enlarged image on a modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses ModalController
	 * @param { string } image
	 * @param { string } title
	 */
	public imageModal(image: string, title: string): void{
		let modal = this.modalCtrl.create(ImageModal, {
			image: image,
			title: title
		});

		modal.present();
	}

	// Goto Methods

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
	 * @method gotoBrand
	 * @description Go to the feed page with a manufacturer search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 * @param { RewardBrandModel } brand
	 */
	public gotoBrand(brand: RewardBrandModel): void{
		this.algoliaProvider.clearSearch();
		
		if(brand.brand){
			sessionStorage.setItem('searchManufacturer', brand.brand);	
		}
		
		if(brand.query){
			sessionStorage.setItem('searchQuery', brand.query);	
		}

		this.navCtrl.push('FeedsPage', {
			flag: 'text',
			search: ''
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

				// Reset the check coupon
				this.checkedLoadingButton = true;
				this.checkedLoading = false;
				this.checkedRewardCoupon = false;
				this.checkedWeMissYouCoupon = false;

				this.load();

				event.complete();
			}, err => {
				console.error('RewardsPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}