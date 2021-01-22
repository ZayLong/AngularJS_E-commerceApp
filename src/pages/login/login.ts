import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// Natives
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CommonProvider } from '../../providers/ionic/common';
import { CartProvider } from '../../providers/magento/cart';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class LoginPage {

	// Forms
	public loginForm: FormGroup;

	// Flags
	public showFingerprint: boolean = false;

	// Password Field
	public passwordShow: boolean = false;
	public passwordStatus: string = 'password';
	public passwordIcon: string = 'eye';

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { Platform } platform
	 * @param { FormBuilder } formBuilder
	 * @param { Storage } storage
	 * @param { FingerprintAIO } faio
	 * @param { AuthenticateProvider } authProvider
	 * @param { CommonProvider } commonProvider
	 * @param { CartProvider } cartProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		public platform: Platform,
		public formBuilder: FormBuilder,
		public storage: Storage,
		public faio: FingerprintAIO,
		public authProvider: AuthenticateProvider,
		public commonProvider: CommonProvider,
		public cartProvider: CartProvider) {

		// Construct the form
		this.loginForm = this.formBuilder.group({
			email: ['',  Validators.compose([ // multiple validators needed
				Validators.required, // required
				Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') // email pattern
			])],
			password: ['', Validators.required]
		});

		if(this.platform.is('mobile') && this.faio.isAvailable()){
			this.showFingerprint = false; // Switch this back to true
		}
	}

	/**
	 * @public
	 * @method ionViewDidLoad (native)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_login',
			item_name: 'Login Page',
			item_category: 'Page'
		});
	}

	/**
	 * @public
	 * @method loginAttempt
	 * @description Attempt to login from form submission
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.4.3
	 */
	public loginAttempt(): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		let guestToken: string = this.authProvider.getGuestTokenProvider();
		let customerToken: string = this.authProvider.getCustomerTokenProvider();

		if(this.loginForm.valid){ // Check if valid response
			let values = this.loginForm.value;

			// create the customer auth token
			this.authProvider.attemptLogin(values.email, values.password).subscribe(data => {
				// Set the new customer token to the provider
				customerToken = data;

				// Store the customer token in the provider and then storage to allow providers (cart specifically) access to token
				this.authProvider.setCustomerToken(customerToken); // set to provider, local, and session storage (will also do storage, but it will not be sync'd)
				this.authProvider.setCustomerTokenStorage(customerToken).then(onfulfilled => {
					this.cartProvider.createCart().subscribe(data => {
						let cartId: number = parseInt(data);

						this.cartProvider.convertGuestToCustomer(cartId, guestToken).subscribe(data => {
							console.info('LoginPage - loginAttempt() - convertGuestToCustomer()', data);
							
							if(data){
								// Go ahead and store it in provider
								this.authProvider.setCurrentCartProvider(data);

								this.events.publish('app:getWishlist');
								this.events.publish('app:getRewardPoints', data.customer.rewardPoints());
								
								// Unset the guest token in both provider and storage without worrying about async
								guestToken = '';
								this.authProvider.setGuestToken(guestToken);

								// Throw a firebase event
								this.commonProvider.analyticsLogEvent('login', {
									method: 'form'
								});

								// Revise the slide menu
								this.events.publish('app:changeAccountMenu', true);

								loading.dismiss();

								// Instead of pushing a page, just set the root
								this.navCtrl.setRoot('ProfileDashboardPage');
							} else {
								console.error('LoginPage - loginAttempt() - convertGuestToCustomer()', false);
								loading.dismiss();

								let toast = this.commonProvider.toast('Invalid login attempt');
								toast.present();
							}
						}, err => {
							console.error('LoginPage - loginAttempt() - convertGuestToCustomer()', err);

							loading.dismiss();

							let toast = this.commonProvider.toast('Invalid login attempt');
							toast.present();
						});
					}, err => {
						console.error('LoginPage - loginAttempt() - createCart()', err);
						console.warn('LoginPage - loginAttempt() - getCustomerTokenProvider()', this.authProvider.getCustomerTokenProvider());

						loading.dismiss();

						let toast = this.commonProvider.toast(err);
						toast.present();
					});
				}).catch(onrejected => {
					console.error('LoginPage - loginAttempt() - setCustomerTokenStorage()', onrejected);
					loading.dismiss();

					let toast = this.commonProvider.toast('Something happened with the login process');
					toast.present();
				});
			}, err => {
				console.error('LoginPage - loginAttempt() - setCustomerToken()', err);
				loading.dismiss();

				let toast = this.commonProvider.toast(err);
				toast.present();
			});
		} else {
			loading.dismiss();

			let toast = this.commonProvider.toast('Invalid login attempt');
			toast.present();
		}
	}

	/**
	 * @public
	 * @method fingerprint
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses FingerprintAIO (native)
	 * @todo Get it to work!
	 * @todo (1) Add the Firebase event where appropriate
	 */
	public fingerprint(){
		let toast = this.commonProvider.toast('Blah!');
		toast.present();

		let opts = {
			clientId: 'tis-fingerprint',
			clientSecret: 'jerpderp',
			disableBackup: true,
			localizedFallbackTitle: 'Use Pin',
			localizedReason: 'Please authenticate'
		};

		/* Add somewhere @todo (1)
		this.commonProvider.analyticsLogEvent('login', {
			method: 'fingerprint'
		});
		*/

		this.faio.show(opts).then((result) => {
			console.info('AuthenticateProvider - fingerprint() - show()', result);
		}).catch((error) => {
			console.error('AuthenticateProvider - fingerprint() - show()', error);
		});
	}

	/**
	 * @public
	 * @method togglePassword (click)
	 * @description Toggle password field from text to password
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public togglePassword(): void{
		this.passwordShow = !this.passwordShow;

		if(this.passwordShow){
			this.passwordStatus = 'text';
			this.passwordIcon = 'eye-off';
		} else {
			this.passwordStatus = 'password';
			this.passwordIcon = 'eye';
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
			event.complete();
		}, 2000); // Delay for two seconds
	}
}
