import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

// Modals
import { ShippingAddressModal } from '../../modals/checkout/shipping-address/shipping-address';
import { PaymentMethodModal } from '../../modals/checkout/payment-method/payment-method';

// Models
import { CartModel, CartAddressModel, DetailItemModel } from '../../models/magento/cart/cart';
import { CartTotalModel } from '../../models/magento/cart/total';
import { CustomerAddressModel, CustomerAddressRegionModel } from '../../models/magento/customer/address';
import { PaymentMethodModel } from '../../models/magento/checkout/payment-method';
import { PaymetricInfoModel, PaymetricAdditionalDataModel, PurchaseOrderInfoModel, PayPalInfoModel } from '../../models/magento/checkout/payment-method/payment-info';
import { PaymetricCardModel } from '../../models/magento/tng/paymetric';
import { ShippingMethodModel } from '../../models/magento/checkout/shipping-method';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CheckoutProvider } from '../../providers/magento/checkout';
import { CommonProvider } from '../../providers/ionic/common';
import { CustomerProvider } from '../../providers/magento/customer';
import { InsyncRealTimePricingProvider } from '../../providers/magento/insync/realtimepricing';
import { PaymetricProvider } from '../../providers/magento/tng/paymetric';
import { PaypalProvider } from '../../providers/api/paypal';

// RXJS
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
	selector: 'page-checkout',
	templateUrl: 'checkout.html',
})

export class CheckoutPage {

	// User / Cart
	public logged: boolean = false;
	public cart: CartModel;
	public cartTotal: CartTotalModel;

	// Compontent
	public loading: any;

	// Flags
	public processOrderInvalid: boolean = true;
	public changeShippingInvalid: boolean = true;
	public changePaymentInvalid: boolean = true;

	// Items
	public items: Array<DetailItemModel> = [];
	public hasItems: boolean = true;

	// Addresses
	public shippingAddress: CustomerAddressModel;
	public billingAddress: CustomerAddressModel;

	// Payment Methods
	public paymentMethods: Array<PaymentMethodModel> = [];
	public selectedPaymentMethod: PaymentMethodModel;

	// Payment Methods Info
	public paymetricInfo: PaymetricInfoModel;
	public purchaseOrderInfo: PurchaseOrderInfoModel;
	public paypalInfo: PayPalInfoModel;
	public comment: string;

	// Paymetric
	public statusPaymetricCard: string = null;

	// Saved Paymetric Cards
	public savedPaymetricCards: Array<PaymetricCardModel> = [];
	public selectedPaymetricCard: PaymetricCardModel;
	
	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { ModalController } modalCtrl
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CheckoutProvider } checkoutProvider
	 * @param { CommonProvider } commonProvider
	 * @param { CustomerProvider } customerProvider
	 * @param { InsyncRealTimePricingProvider } insyncRTP
	 * @param { PaymetricProvider } paymetricProvider
	 * @param { PaypalProvider } paypalProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public events: Events,
		public modalCtrl: ModalController,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public checkoutProvider: CheckoutProvider,
		public commonProvider: CommonProvider,
		public customerProvider: CustomerProvider,
		public insyncRTP: InsyncRealTimePricingProvider,
		public paymetricProvider: PaymetricProvider,
		public paypalProvider: PaypalProvider) {

		// Set Paypal Token
		/*
		this.paypalProvider.checkAccessToken().subscribe(data => {
			console.info('App - constructor() - checkAccessToken()', data);
		}, err => {
			console.error('App - constructor() - checkAccessToken()', err);
		});
		*/
	}

	// LIFECYCLE METHODS

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		// If any changes made from minicart, then refresh the cart page
		this.events.subscribe('minicart:refreshPage', () => {
			// Fetch the new changes to the cart
			this.cartProvider.cart(this.logged).subscribe(data => {
				this.cart = data;
				this.authProvider.setCurrentCartProvider(data);

				this.process();
			}, err => console.error('CheckoutPage - ionViewDidLoad() - cart()', err));
		});
	}

	/**
	 * @public
	 * @method ionViewCanEnter (lifecycle)
	 * @description Check if user is allowed to enter
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @return { Promise<any> }
	 */
	public ionViewCanEnter(): Promise<any>{
		return new Promise((resolve, reject) => {
			this.cart = this.authProvider.getCurrentCartProvider();

			if(this.cart != null && this.cart.customer.id){
				this.logged = true;

				// Then lets process the cart items to detail items to get product and stock information. This is necessary to find any back ordered items.
				this.productDetails().subscribe(data => {
					// If we are rejecting, then set letsBegin to false
					let letsBegin: boolean = true;

					// Then we check if any item is backordered and match the minimum qty
					for(let item of this.items){

						// Since the product model will not have a stock item attribute, we will need to inject the stock item information into the method. Stupid, I know, it's Magento after all. :P
						if(item.product_item.isBackOrdered(item.stock_item)){

							let minQuantity = item.product_item.backOrderQtyMinimum();

							if(minQuantity > item.cart_item.qty){
								letsBegin = false;

								reject({
									message: 'You have cart items that are backordered and below the 50.00 requirement.',
									redirect: 'CartPage'
								});
								break; // Leave the for loop
							}
						}
					}

					if(letsBegin){
						resolve(true);
						this.begin(this.cart);	
					}
				}, err => {
					console.error('CheckoutPage - ionViewCanEnter() - productDetails()', err);
					reject({
						message: 'Unable to retrieve cart item information.',
						redirect: 'CartPage'
					});
				});
			} else {
				this.logged = false;
				this.clearNewCustomerAddress();
				reject({
					message: 'You need to be logged in to checkout.',
					redirect: 'LoginPage'
				});
			}
		}).catch(onrejected => {
			console.error('CheckoutPage - ionViewCanEnter() - onrejected', onrejected);

			this.kickedOut(onrejected);
		});
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_checkout',
			item_name: 'Checkout Page',
			item_category: 'Page'
		});

		// Just leave blank as cart values can/will be inaccurate
		this.commonProvider.analyticsLogEvent('begin_checkout', {});
	}

	// PROCESS CHECKOUT METHODS

	/**
	 * @public
	 * @method begin
	 * @description Do all of the processing when entering the page
	 * @desc May not be able to rely on ionViewDidEnter due to Promises
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 * @param { CartModel } cart
	 */
	private begin(cart: CartModel): void{
		console.info('CheckoutPage - begin() - this.cart', this.cart);
		// Get the cart items
		// this.productDetails();

		// Initially set the value of the customer address
		// Check if a new shipping checkout address is being used
		if(sessionStorage.getItem('checkoutNewAddress') === '1'){
			this.shippingAddress = this.getNewCustomerAddress();
		} else {
			this.shippingAddress = cart.customer.defaultShippingAddress();
		}

		this.billingAddress = cart.customer.defaultBillingAddress();

		// Enable the change shipping address button
		this.changeShippingInvalid = false;

		// Check if shipping address exists to prevent errors popping up
		if(this.shippingAddress != null){
			// Convert customer addresses to cart addresses for further checkout processes
			let cartShippingAddress: CartAddressModel = new CartAddressModel();
			let cartBillingAddress: CartAddressModel = new CartAddressModel();
			cartShippingAddress.fromCustomerAddress(this.shippingAddress);
			cartBillingAddress.fromCustomerAddress(this.billingAddress);

			// Check if address is new
			if(sessionStorage.getItem('checkoutNewAddress') === '1'){
				if(sessionStorage.getItem('checkoutNewAddressSave') === '1'){
					cartShippingAddress.save_in_address_book = 1;
				} else {
					cartShippingAddress.save_in_address_book = 0;
				}
			}

			// Get the shipping methods from the selected shipping address
			this.checkoutProvider.estimateShippingMethods(cartShippingAddress).subscribe(data => {
				console.info('CheckoutPage - begin() - estimateShippingMethods()', data);

				if(data.length > 0){
					// Right now there is just one shipping method
					let selectedShippingMethod: ShippingMethodModel = data[0];

					// Validate any exclusive products
					this.insyncRTP.validateExclusiveProducts(this.cart.id, cartShippingAddress).subscribe(data => {
						console.info('CheckoutPage - begin() - validateExclusiveProducts()', data);

						if(data === 200){
							// Get the payment methods available and cart totals
							this.checkoutProvider.setShippingInformation(selectedShippingMethod, cartShippingAddress, cartBillingAddress).subscribe(data => {

								// Pre-select the first method option
								this.paymentMethods = this.filterPaymentMethods(data.payment_methods);
								this.selectedPaymentMethod = this.paymentMethods[0];

								// Check if first payment method is paymetric (cards)
								if(this.selectedPaymentMethod.code == 'tng_paymetric'){
									// Retrieve all saved payment methods
									this.savedPaymentMethods();
								}

								// Update the cart and totals with real time pricing
								this.realTimeUpdating(this.selectedPaymentMethod);
								this.changePaymentInvalid = false;
							}, err => console.error('CheckoutPage - begin() - setShippingInformation()', err));
						} else {
							console.error('CheckoutPage - begin() - validateExclusiveProducts() - SKU', data);

							let toast = this.commonProvider.toast('Cart Error - Product Excluded: ' + data);

							toast.present();

							this.gotoPage('CartPage');
						}
					}, err => console.error('CheckoutPage - begin() - validateExclusiveProducts()', err));
				} else {
					console.error('CheckoutPage - begin() - estimateShippingMethods() - data', data);
				}
				
				
			}, err => console.error('CheckoutPage - begin() - estimateShippingMethods', err));
		}
	}

	/**
	 * @private
	 * @method process
	 * @description Do all of the process when making changes
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 */
	private process(): void{
		this.cart = this.authProvider.getCurrentCartProvider();
		console.info('CheckoutPage - process() - this.cart', this.cart);

		if(this.cart.items_count > 0){
			let loading = this.commonProvider.pageLoading();
			loading.present();

			// Get the cart items, now as an Observable
			this.productDetails().subscribe(data => {
				// Convert customer addresses to cart addresses for further checkout processes
				let cartShippingAddress: CartAddressModel = new CartAddressModel();
				let cartBillingAddress: CartAddressModel = new CartAddressModel();
				cartShippingAddress.fromCustomerAddress(this.shippingAddress);
				cartBillingAddress.fromCustomerAddress(this.billingAddress);

				// Check if address is new
				if(sessionStorage.getItem('checkoutNewAddress') === '1'){
					if(sessionStorage.getItem('checkoutNewAddressSave') === '1'){
						cartShippingAddress.save_in_address_book = 1;
					} else {
						cartShippingAddress.save_in_address_book = 0;
					}
				}

				this.checkoutProvider.estimateShippingMethods(cartShippingAddress).subscribe(data => {
					console.info('CheckoutPage - process() - estimateShippingMethods()', data);
					// Right now there is just one shipping method
					let selectedShippingMethod: ShippingMethodModel = data[0];

					// Validate any exclusive products
					this.insyncRTP.validateExclusiveProducts(this.cart.id, cartShippingAddress).subscribe(data => {
						if(data === 200){
							// Get the payment methods available and cart totals
							this.checkoutProvider.setShippingInformation(selectedShippingMethod, cartShippingAddress, cartBillingAddress).subscribe(data => {
								
								// Update the cart and totals with real time pricing
								this.realTimeUpdating(this.selectedPaymentMethod);

								loading.dismiss();

							}, err => {
								console.error('CheckoutPage - process() - setShippingInformation()', err);	
								loading.dismiss();
							});
						} else {
							console.error('CheckoutPage - process() - validateExclusiveProducts() - SKU', data);
							loading.dismiss();

							let toast = this.commonProvider.toast('Cart Error - Product Excluded: ' + data);
							toast.present();
						}
					}, err => {
						console.error('CheckoutPage - process() - validateExclusiveProducts()', err);
						loading.dismiss();	
					});
				}, err => {
					console.error('CheckoutPage - process() - estimateShippingByAddressId', err);
					loading.dismiss();
				});
			}, err => {
				console.error('CheckoutPage - process() - productDetails', err);
				loading.dismiss();
			});
		} else {
			this.hasItems = false;
		}
	}

	// SUB-PROCESS METHODS

	/**
	 * @private
	 * @method getNewCustomerAddress
	 * @description Retrieve the new customer address from storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 * @return { CustomerAddressModel }
	 */
	private getNewCustomerAddress(): CustomerAddressModel{
		let address: CustomerAddressModel = new CustomerAddressModel();
		let region: CustomerAddressRegionModel = new CustomerAddressRegionModel();

		address.street[0] = sessionStorage.getItem('checkoutNewAddressStreet');
		address.street[1] = sessionStorage.getItem('checkoutNewAddressSuite');
		address.city = sessionStorage.getItem('checkoutNewAddressCity');

		region.region = sessionStorage.getItem('checkoutNewAddressRegion');
		region.region_code = sessionStorage.getItem('checkoutNewAddressRegionCode');
		region.region_id = parseInt(sessionStorage.getItem('checkoutNewAddressRegionId'));

		address.region_id = parseInt(sessionStorage.getItem('checkoutNewAddressRegionId'));
		address.region = region;
		
		address.postcode = sessionStorage.getItem('checkoutNewAddressPostCode');
		address.country_id = sessionStorage.getItem('checkoutNewAddressCountryId');

		address.firstname = sessionStorage.getItem('checkoutNewAddressFirstName');
		address.lastname = sessionStorage.getItem('checkoutNewAddressLastName');
		address.company = sessionStorage.getItem('checkoutNewAddressCompany');
		address.telephone = sessionStorage.getItem('checkoutNewAddressTelephone');

		return address;
	}

	/**
	 * @private
	 * @method clearNewCustomerAddress
	 * @description Remove the new customer data from storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private clearNewCustomerAddress(): void{
		sessionStorage.removeItem('checkoutNewAddress');
		sessionStorage.removeItem('checkoutNewAddressSave');
		sessionStorage.removeItem('checkoutNewAddressStreet');
		sessionStorage.removeItem('checkoutNewAddressSuite');
		sessionStorage.removeItem('checkoutNewAddressCity');
		sessionStorage.removeItem('checkoutNewAddressRegion');
		sessionStorage.removeItem('checkoutNewAddressRegionCode');
		sessionStorage.removeItem('checkoutNewAddressRegionId');
		sessionStorage.removeItem('checkoutNewAddressPostCode');
		sessionStorage.removeItem('checkoutNewAddressCountryId');
		sessionStorage.removeItem('checkoutNewAddressFirstName');
		sessionStorage.removeItem('checkoutNewAddressLastName');
		sessionStorage.removeItem('checkoutNewAddressCompany');
		sessionStorage.removeItem('checkoutNewAddressTelephone');
	}

	/**
	 * @private
	 * @method productDetails
	 * @description Get the product details for each cart item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 */
	private productDetails(): Observable<boolean>{
		// This needs to be converted as an observer for the ionViewCanEnter method
		return Observable.create(observer => {
			this.cartProvider.detailItem(this.logged).subscribe(data => {
				console.info('CheckoutPage - productDetails() - detailItem()', data);

				this.items = data;

				// Checks if the cart has items
				if(this.items.length > 0){
					this.hasItems = true;
				} else {
					this.hasItems = false;
				}

				observer.next(true);
			}, err => {
				console.error('CheckoutPage - productDetails() - detailItem()', err)

				let toast = this.commonProvider.toast('Unable to retrieve your stored credit cards');
				toast.present();

				observer.error(err);
			});
		}, err => console.error('CheckoutPage - productDetails() - observable', err));
	}

	/**
	 * @private
	 * @method savedPaymentMethods
	 * @description Retrieve saved payment methods
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 */
	private savedPaymentMethods(): void{
		this.paymetricProvider.readCreditCards().subscribe(data => {
			this.savedPaymetricCards = data;
			this.savedPaymetricCards.shift(); // Necessary to work with Magento code with the extra blank item

			this.statusPaymetricCard = 'none';

			console.info('CheckoutPage - savedPaymentMethods() - readCreditCards()', this.savedPaymetricCards);

		}, err => console.error('CheckoutPage - savedPaymentMethods() - readCreditCards()', err));
	}

	/**
	 * @private
	 * @method filterPaymentMethods
	 * @description Filter out certain payment methods
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { Array<PaymentMethodModel> } array
	 * @return { Array<PaymentMethodModel> }
	 */
	private filterPaymentMethods(array: Array<PaymentMethodModel>){
		let filter: Array<PaymentMethodModel> = [];

		for(let i = 0; i < array.length; i++){
			if(array[i].code === 'purchaseorder'){ // code for the invoice option
				// Check if customer is a term customer
				if(this.cart.customer.isTermCustomer()){
					// If so, add invoice option to filter array
					filter.push(array[i])
				}
			} else if(array[i].code === 'paypal_express'){
			} else if (array[i].code !== 'paypal_express'){
				// Otherwise add option to filter array
				filter.push(array[i]);
			}
		}

		return filter;
	}

	/**
	 * @private
	 * @method realTimeUpdating
	 * @description A method to hold all processing of real time pricing
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { PaymentMethodModel } paymentMethod
	 */
	private realTimeUpdating(paymentMethod: PaymentMethodModel): void{
		let storeExempts: Array<string> = [];

		if(sessionStorage.getItem('cartTaxExempt')){
			storeExempts = sessionStorage.getItem('cartTaxExempt').split(',');	
		} else {
			storeExempts = [];
		}

		// Set the item taxes
		this.insyncRTP.taxExemptUpdate(storeExempts).subscribe(data => {
			if(data){
				this.insyncRTP.refreshRealTimePricing(paymentMethod.code).subscribe(data => {
					if(data == '200'){ // Valid
						
						// Force to retrieve customer cart and totals
						let request = [];
						request.push( this.cartProvider.cart(this.logged) );
						request.push( this.cartProvider.cartTotal(this.logged) );

						// Refresh the cart
						forkJoin(request).subscribe(data => {
							console.info('CheckoutPage - realTimeUpdating() - cart/total', data);
							this.cart = data[0] as CartModel;
							this.cartTotal = data[1] as CartTotalModel;

							// Check if the process order button should be enabled
							if(this.selectedPaymentMethod.code == 'tng_paymetric'){
								if(this.selectedPaymetricCard != undefined || this.paymetricInfo != undefined){
									this.processOrderInvalid = false;
								}
							} else {
								this.processOrderInvalid = false;	
							}
							
						}, err => {
							console.error('CheckoutPage - realTimeUpdating() - forkJoin()', err);

							let toast = this.commonProvider.toast('Unable to retrieve totals');
							toast.present();
						});						
					}
				}, err => {
					console.error('CheckoutPage - realTimeUpdating() - refreshRealTimePricing()', err);

					let toast = this.commonProvider.toast('Unable to process totals');
					toast.present();
				});
			} else {
				//this.loading.dismiss();
				console.error('CheckoutPage - realTimeUpdating() - taxExemptUpdate()', data);

				let toast = this.commonProvider.toast('Unable to retrieve taxes and totals');
				toast.present();
			}
		}, err => {
			console.error('CheckoutPage - realTimeUpdating() - taxExemptUpdate()', err);

			let toast = this.commonProvider.toast('Unable to process taxes and totals');
			toast.present();
		});
	}

	// MODAL METHODS

	/**
	 * @public
	 * @method modalShippingAddress (click)
	 * @description Bring up modal to change shipping address or create a new one
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 * @uses ModalController
	 */
	public modalShippingAddress(): void{
		this.commonProvider.analyticsLogEvent('checkout_progress', {
			checkout_step: 'Change Shipping Address',
			checkout_option: this.shippingAddress.get_custom_attribute('sap_address_token')
		});

		let modal = this.modalCtrl.create(ShippingAddressModal, {
			cart: this.cart,
			selectedAddress: this.shippingAddress
		});

		modal.present();

		modal.onDidDismiss((data, role) => {
			switch(role){
				case 'new':
					// Save the new address to session storage and set it as a customer shipping address
					let newCartAddress = data.address;

					sessionStorage.setItem('checkoutNewAddress', '1');
					sessionStorage.setItem('checkoutNewAddressSave', newCartAddress.save_in_address_book.toString());
					sessionStorage.setItem('checkoutNewAddressStreet' , newCartAddress.street[0]);
					sessionStorage.setItem('checkoutNewAddressSuite' , newCartAddress.street[1]);
					sessionStorage.setItem('checkoutNewAddressCity', newCartAddress.city);
					sessionStorage.setItem('checkoutNewAddressRegion', newCartAddress.region);
					sessionStorage.setItem('checkoutNewAddressRegionCode', newCartAddress.region_code);
					sessionStorage.setItem('checkoutNewAddressRegionId', newCartAddress.region_id);
					sessionStorage.setItem('checkoutNewAddressPostCode', newCartAddress.postcode);
					sessionStorage.setItem('checkoutNewAddressCountryId', newCartAddress.country_id);

					sessionStorage.setItem('checkoutNewAddressFirstName', newCartAddress.firstname);
					sessionStorage.setItem('checkoutNewAddressLastName', newCartAddress.lastname);

					sessionStorage.setItem('checkoutNewAddressCompany', newCartAddress.company);
					sessionStorage.setItem('checkoutNewAddressTelephone', newCartAddress.telephone);

					this.shippingAddress = this.getNewCustomerAddress();

					this.commonProvider.analyticsLogEvent('set_checkout_option', {
						checkout_step: 'Change Shipping Address',
						checkout_option: 'New Address'
					});

					break;
				case 'existing':
					// Change shipping address from existing address list
					this.shippingAddress = data.address;

					// Disable the checkoutNewAddress, but do not get rid of values from storage
					//this.clearNewCustomerAddress();
					sessionStorage.setItem('checkoutNewAddress', '0');

					this.commonProvider.analyticsLogEvent('set_checkout_option', {
						checkout_step: 'Change Shipping Address',
						checkout_option: this.shippingAddress.get_custom_attribute('sap_address_token')
					});

					break;
				// end case existing
				case 'cancel':
					console.warn('Cancel shipping address');
					break;
				// end case cancel
			}

			// Reprocess the checkout data
			this.process();
		});
	}

	/**
	 * @public
	 * @method modalPaymentMethod (click)
	 * @description Bring up modal to change payment method and information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 * @uses ModalController
	 */
	public modalPaymentMethod(): void{
		this.commonProvider.analyticsLogEvent('checkout_progress', {
			checkout_step: 'Change Payment Method',
			checkout_option: this.selectedPaymentMethod.title
		});

		let modal = this.modalCtrl.create(PaymentMethodModal, {
			method: {
				selection: this.paymentMethods,
				selected: this.selectedPaymentMethod
			},
			card: {
				selection: this.savedPaymetricCards,
				selected: this.selectedPaymetricCard
			}
		});

		modal.present();

		modal.onDidDismiss((data, role) => {
			switch(role){
				case 'tng_paymetric':
					if(data.cardNew){
						// New card
						this.paymetricInfo = new PaymetricInfoModel;
						this.paymetricInfo.method = 'tng_paymetric';
						this.paymetricInfo.po_number = data.purchaseOrderNumber;

						let additionalData: PaymetricAdditionalDataModel = new PaymetricAdditionalDataModel;
						additionalData.set_cc_number(data.cardNumber);
						additionalData.set_cc_type(data.cardType);
						additionalData.set_cc_exp_month(data.cardExpMonth);
						additionalData.set_cc_exp_year(data.cardExpYear);
						additionalData.set_cc_cid(data.cardCvv);
						additionalData.set_savePayment(data.savePayment);
						additionalData.set_extOrderId(data.purchaseOrderNumber);

						this.paymetricInfo.set_additional_data(additionalData);

						// Then flag the display status as new card
						this.statusPaymetricCard = 'new';
					} else {
						// Existing card
						this.selectedPaymetricCard = data.existing;

						this.paymetricInfo = new PaymetricInfoModel;
						this.paymetricInfo.method = 'tng_paymetric';
						this.paymetricInfo.po_number = data.purchaseOrderNumber;

						let additionalData: PaymetricAdditionalDataModel = new PaymetricAdditionalDataModel;
						additionalData.convertSavedToInfo(data.existing);
						additionalData.set_savePayment(data.savePayment);
						additionalData.set_extOrderId(data.purchaseOrderNumber);

						this.paymetricInfo.set_additional_data(additionalData);

						// Then flag the display status as existing card
						this.statusPaymetricCard = 'existing';
					}

					break;
				// end case tng_paymetric
				case 'paypal_express':
					console.warn('Paypal Express Stuff');
					break;
				// end case paypal_express
				case 'purchaseorder':
					this.purchaseOrderInfo = new PurchaseOrderInfoModel;
					this.purchaseOrderInfo.method = 'purchaseorder';
					this.purchaseOrderInfo.po_number = data.purchaseOrderNumber;

					break;
				// end case purchaseorder
				case 'cancel':
					console.warn('Cancel payment method');
					break;
				// end case cancel
			}

			if(role != 'cancel'){
				this.selectedPaymentMethod = data.method;

				this.commonProvider.analyticsLogEvent('set_checkout_option', {
					checkout_step: 'Change Payment Method',
					checkout_option: this.selectedPaymentMethod.title
				});	
			}

			// Reprocess the checkout data
			this.process();
		});
	}

	// PROCESS ORDER METHODS

	/**
	 * @public
	 * @method processOrder (click)
	 * @description Attempt to process an order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	public processOrder(): void{
		this.loading = this.commonProvider.pageLoading();
		this.loading.present();

		console.info('CheckoutPage - processOrder() - selectedPaymentMethod', this.selectedPaymentMethod.title);

		switch(this.selectedPaymentMethod.code){
			case 'tng_paymetric':
				this.processTngPaymetric();
				break;
			// end case tng_paymetric
			case 'purchaseorder':
				this.processPurchaseOrder();
				break;
			// end case purchaseorder
		}
	}

	/**
	 * @private
	 * @method processTngPaymetric
	 * @description Attempt to process a Paymetric order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	public processTngPaymetric(): void{
		this.insyncRTP.validateCart(this.cart.id, this.paymetricInfo).subscribe(data => {
			if(data === 401){
				let billingAddress: CartAddressModel = new CartAddressModel();
				billingAddress.fromCustomerAddress(this.billingAddress);

				this.checkoutProvider.setPaymentInformationAndOrder(this.paymetricInfo, billingAddress, this.comment).subscribe(data => {
					
					// Translate the response
					let response = data;

					response = response.replace(/[\n\r]+/g, ''); // trim off any cartridge returns and line feeds
					response = response.trim(); // remove any other white spaces

					let array: Array<string> = response.split(',');
					let transactionId: string = array[1].replace('"', ''); // Remove the quotes

					// If successful then complete the order
					if(array[0] === '100'){
						this.completeOrder(transactionId);
					} else {
						// Error
						let toast = this.commonProvider.toast(transactionId);
						toast.present();
					}
				}, err => {
					console.error('CheckoutPage - processTngPaymetric() - setPaymentInformationAndOrder()', err);
					this.loading.dismiss();

					let toast = this.commonProvider.toast('Order incomplete, please check your order information.');
					toast.present();
				});
			} else {
				console.error('CheckoutPage - processTngPaymetric() - validateCart() - data', data);
				this.loading.dismiss();

				let toast = this.commonProvider.toast('Order incomplete, please check your order information');
				toast.present();
			}
		}, err => {
			console.error('CheckoutPage - processTngPaymetric() - validateCart()', err);
			this.loading.dismiss();

			let toast = this.commonProvider.toast('Order incomplete, please check your order information');
			toast.present();
		});
	}

	/**
	 * @private
	 * @method processPurchaseOrder
	 * @description Attempt to process a Purchase order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	public processPurchaseOrder(): void{
		let billingAddress: CartAddressModel = new CartAddressModel();
		billingAddress.fromCustomerAddress(this.billingAddress);

		this.checkoutProvider.setPaymentInformationAndOrder(this.purchaseOrderInfo, billingAddress, this.comment).subscribe(data => {

			let transactionId = data.replace('"', ''); // Remove the quotes

			this.completeOrder(transactionId);
		}, err => {
			console.error('CheckoutPage - processPurchaseOrder() - setPaymentInformationAndOrder()', err);
			this.loading.dismiss();

			let toast = this.commonProvider.toast('Order incomplete, please check your order information.');
			toast.present();
		});
	}

	/**
	 * @private
	 * @method completeOrder
	 * @description Complete the order, and go to success page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.5.2
	 * @param { string } transactionId
	 */
	public completeOrder(transactionId: string): void{
		this.loading.dismiss();

		// Clear out the customer address
		this.clearNewCustomerAddress();

		// Send Firebase event for ecommerce purchase
		this.commonProvider.analyticsLogEvent('ecommerce_purchase', {
			value: this.cartTotal.base_grand_total,
			currency: this.cartTotal.base_currency_code,
			transaction_id: transactionId,
			tax: this.cartTotal.base_tax_amount,
			shipping: this.cartTotal.base_shipping_amount,
			coupon: this.cartTotal.base_discount_amount
		});

		/**
		 * @summary A new cart will have to be made
		 * @todo
		 * Wish there was a way to just let getCart take care of everything,
		 * but the issue is when it can not find the cart (404) it does not
		 * restart the getCart() method, and it hangs the entire process.
		 * 
		 * More testing will be done once staging is fixed.
		 */
		this.cartProvider.createCart().subscribe(data => {
			console.info('CheckoutPage - completeOrder - createCart()', data);

			console.log('Going to retrieve the new cart');
			this.cartProvider.getCart().subscribe(data => {
				console.log('Retrieved new cart');
				this.cart = data.cart;
				this.logged = data.logged;
				this.authProvider.setCurrentCartProvider(data.cart);

				// Update the header
				this.events.publish('header:updateMiniCart', this.logged);

				// Go to success page
				this.navCtrl.setRoot('SuccessPage', {
					orderId: transactionId
				});
			}, err => console.error('CheckoutPage - completeOrder() - getCart()', err));
		}, err => console.error('CheckoutPage - completeOrder - createCart()', err));
	}

	// OTHER METHODS

	/**
	 * @public
	 * @method gotoPage (click)
	 * @description Go to a page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { string } page
	 */
	public gotoPage(page: string): void{
		if(page){
			this.navCtrl.push(page);
		}
	}

	/**
	 * @private
	 * @method kickedOut
	 * @description Kick out the user if not logged
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 * @param { any } onrejected
	 */
	private kickedOut(onrejected: any): void{
		let toast = this.commonProvider.toast(onrejected.message);
		toast.present();

		this.navCtrl.setRoot(onrejected.redirect);
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
					this.kickedOut({
						message: 'You need to be logged in to checkout.',
						redirect: 'LoginPage'
					});
				} else {
					this.process();
				}

				event.complete();
			}, err => {
				console.error('CheckoutPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}