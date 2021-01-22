import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

// Models
import { CartModel } from '../../models/magento/cart/cart';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CatalogProvider } from '../../providers/magento/catalog';
import { CommonProvider } from '../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'page-profile-quick',
	templateUrl: 'profile-quick.html',
})

export class ProfileQuickPage {

	// User/Cart
	public cart: CartModel;
	public logged: boolean;

	public skuForm: FormGroup;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { FormBuilder } formBuilder
	 * @param { Events } events
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CatalogProvider } catalogProvider
	 * @param { CommonProvider } commonProvider
	 */
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public formBuilder: FormBuilder,
		public events: Events,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public catalogProvider: CatalogProvider,
		public commonProvider: CommonProvider) {
		
		this.skuForm = this.formBuilder.group({
			quick: this.formBuilder.array([
				this.skuField()
			])
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
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_profile_quick',
			item_name: 'Profile Quick Order Page',
			item_category: 'Page'
		});
	}

	/**
	 * @public
	 * @method skuFields
	 * @description Create dynamic SKU Field(s)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { FormGroup }
	 */
	public skuField(): FormGroup{
		return this.formBuilder.group({
			sku: ['', Validators.required],
			qty: ['', Validators.required]
		});
	}

	/**
	 * @public
	 * @method addField
	 * @description Add a SKU/QTY field to the form
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public addField(): void{
		const control = <FormArray>this.skuForm.controls.quick;
		control.push(this.skuField());
		//Add one for the quantity fields
	}

	/**
	 * @public
	 * @method removeField
	 * @description Remove a SKU/QTY field from the form
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } i(ndex)
	 */
	public removeField(i: number): void{
		const control = <FormArray>this.skuForm.controls.quick;
		control.removeAt(i);
	}

	/**
	 * @public
	 * @method attemptQuickOrder
	 * @description Attempt to process the quick order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 */
	public attemptQuickOrder(data: any): void{
		if(data.status === "VALID"){
			this.processQuickOrder(data.value.quick);
		} else {
			// do something
		}
	}

	/**
	 * @private
	 * @method processQuickOrder
	 * @description Process the quick order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Array< { sku: string, qty: number } > } items
	 */
	private processQuickOrder(items: Array<{ sku: string, qty: number }>): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		// One call method
		this.cartProvider.quickOrder(items, true).subscribe(data => {
			loading.dismiss();

			this.navCtrl.push('CartPage');
		}, err => {
			console.error('ProfileQuickPage - processQuickOrder() - quickOrder()', err);

			loading.dismiss();

			let toast = this.commonProvider.toast(err.error.message);
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
				}

				event.complete();
			}, err => {
				console.error('ProfileQuickPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
