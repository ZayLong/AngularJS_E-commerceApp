import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';
import { CustomerProvider } from '../../providers/magento/customer';

// Validators
import { PasswordValidator } from '../../validators/password';

// Models
import { CartModel } from '../../models/magento/cart/cart';

@IonicPage()
@Component({
	selector: 'page-profile-account',
	templateUrl: 'profile-account.html',
})

export class ProfileAccountPage {
	public loading = this.commonProvider.pageLoading();

	// User/Cart
	public cart: CartModel;
	public logged: boolean;

	// Forms
	public passwordForm: FormGroup;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.2
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ToastController } taostCtrl
	 * @param { FormBuilder } formBuilder
	 * @param { Events } events
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { CustomerProvider } customerProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public taostCtrl: ToastController,
		public formBuilder: FormBuilder,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public customerProvider: CustomerProvider) {

		this.passwordForm = formBuilder.group({
			current: ['', Validators.compose([
				Validators.minLength(8)
			])],
			password: ['', Validators.compose([
				Validators.minLength(8),
				PasswordValidator.strengthCheck
			])],
			confirm: ['',  Validators.compose([
				Validators.minLength(8),
				PasswordValidator.equalConfirm
			])]
		});
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
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_profile_account',
			item_name: 'Profile Account Page',
			item_category: 'Page'
		});
	}

	/**
	 * @public
	 * @method passwordAttempt
	 * @description Attempt a password change
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public passwordAttempt(): void{
		let valid: boolean = true;
		if(!this.passwordForm.valid){
			valid = false;
		}

		if(valid){
			this.passwordProcess();
		} else {
			console.error('ProfileAccountPage - passwordAttempt()', this.passwordForm);
		}
	}

	/**
	 * @private
	 * @method passwordProcess
	 * @description Process the name change update
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private passwordProcess(): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		this.customerProvider.updatePassword(this.passwordForm.value.current, this.passwordForm.value.password).subscribe(data => {
			console.info('ProfileAccountPage - passwordProcess() - updatePassword()', data);
			loading.dismiss();

			let toast = this.commonProvider.toast('Password updated!');
			toast.present();

			this.gotoPage('ProfileDashboardPage');
		}, err => {
			console.error('ProfileAccountPage - passwordProcess() - updatePassword()', err);
			loading.dismiss();

			let toast = this.commonProvider.toast(err);
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
				}

				event.complete();
			}, err => {
				console.error('ProfileAccountPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
