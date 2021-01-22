import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Slides, Events, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Models

import { CartModel } from '../../models/magento/cart/cart';
import { CountryModel, CountryAvailableRegionModel } from '../../models/magento/store/country';
import { CustomAttributeParamModel } from '../../models/magento/general/custom-attribute';
import { CustomerModel, CustomerAttributeModel } from '../../models/magento/customer/customer';
import { CustomerAddressModel } from '../../models/magento/customer/address';

// Natives
import { Geolocation } from '@ionic-native/geolocation';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';
import { CustomerProvider } from '../../providers/magento/customer';
import { GoogleProvider } from '../../providers/api/google';
import { StoreProvider } from '../../providers/magento/store';

// Validators
import { PasswordValidator } from '../../validators/password';


@IonicPage()
@Component({
 	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	// User/Cart (guest more likely)
	public cart: CartModel;
	public logged: boolean;

	// Slides
	@ViewChild('formSlider') formSlider: Slides;
	public sliderOptions: any;
	public currentSlide: number = 1;
	public currentSlideName: string = 'Info (1 out of 4)';
	public progress: number = 20;

	// Forms
	public infoForm: FormGroup; // Slide 1
	public accountForm: FormGroup; // Slide 2
	public addressForm: FormGroup; // Slide 3
	public licenseForm: FormGroup; // Slide 4
	public errorMessage: string = ''; // Error message

	// Select options
	public stateOptions: Array<CountryAvailableRegionModel>;
	public licenseTypeOptions: CustomerAttributeModel;
	public licenseStateOptions: CustomerAttributeModel;

	// Flags
	public geoBother: boolean = true; // Bother the user if they want to quickly fill in address

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { NavController } navCtrl 
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { FormBuilder } formBuilder
	 * @param { Platform } platform
	 * @param { AlertController } alertCtrl
	 * @param { Storage } storage
	 * @param { Geolocation } geoloc
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { CustomerProvider } customerProvider
	 * @param { GoogleProvider } googleProvider
	 * @param { StoreProvider } storeProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public events: Events,
		public formBuilder: FormBuilder,
		public platform: Platform,
		public alertCtrl: AlertController,
		public storage: Storage,
		public geoloc: Geolocation,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public customerProvider: CustomerProvider,
		public googleProvider: GoogleProvider,
		public storeProvider: StoreProvider) {

		// Get cart information
		this.cart = this.authProvider.getCurrentCartProvider();

		console.info('RegisterPage - constructor() - getCurrentCartProvider()', this.cart);

		if(this.cart != null && this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		// Get store country data
		this.storeProvider.readCountries().subscribe(data => {
			let country: CountryModel = data[0]; // Assuming the first (and only) selection is the US
			this.stateOptions = country.available_regions;
		}, err => {
			console.error('ProfileAddAddressModal - ionViewDidLoad() - readCountries()', err);
		});

		// Get license type data
		this.customerProvider.readCustomerMetadataAttribute('license_type').subscribe(data => {
			this.licenseTypeOptions = data;
			this.licenseTypeOptions = this.removeBlankOptions(this.licenseTypeOptions);
		}, err => console.error('RegisterPage - ionViewDidLoad() - readCustomerMetadataAttribute()', err));

		// Get license state data
		this.customerProvider.readCustomerMetadataAttribute('license_state').subscribe(data => {
			this.licenseStateOptions = data;
			this.licenseStateOptions = this.removeBlankOptions(this.licenseStateOptions);
		}, err => console.error('RegisterPage - ionViewDidLoad() - readCustomerMetadataAttribute()', err));

		// Form Elements
		this.infoForm = formBuilder.group({
			firstName: ['', Validators.compose([
				Validators.required,
				Validators.pattern('[a-zA-Z ]*') // alpha-only pattern
			])],
			lastName: ['', Validators.compose([
				Validators.required,
				Validators.pattern('[a-zA-Z ]*') // alpha-only pattern
			])],
			company: [''],
			phone: ['', Validators.compose([
				Validators.required
			])]
		});

		this.accountForm = formBuilder.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') // email pattern
			])],

			//leading and trailing spaces ignored (trim)
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				PasswordValidator.strengthCheck
			])],
			confirm: ['',  Validators.compose([
				Validators.required,
				Validators.minLength(8),
				PasswordValidator.equalConfirm
			])]
		});

		this.addressForm = formBuilder.group({
			street: ['', Validators.compose([
				Validators.required
			])],
			suite: [''],
			city: ['', Validators.compose([
				Validators.required
			])],
			region: ['', Validators.compose([
				Validators.required
			])],
			postal: ['', Validators.compose([
				Validators.required,
				Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
			])]
		});

		this.licenseForm = formBuilder.group({
			licenseType: ['', Validators.compose([
				Validators.required
			])],
			licenseNumber: ['', Validators.compose([
				Validators.required
			])],
			businessName: [''],
			licenseState: ['', Validators.compose([
				Validators.required
			])],
		});
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {
		this.formSlider.autoHeight = true;
		this.formSlider.zoom = false;
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_register',
			item_name: 'Register Page',
			item_category: 'Page'
		});
	}

	/**
	 * @public
	 * @method removeBlankOptions
	 * @description Remove blank options from some of the attributes
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CustomerAttributeModel } attribute
	 * @return { CustomerAttributeModel }
	 */
	public removeBlankOptions(attribute: CustomerAttributeModel): CustomerAttributeModel{
		let options = attribute.options;
		attribute.options = [];

		for(let option of options){
			if(option.value != ''){
				attribute.set_option(option);
			}
		}

		return attribute;
	}

	/**
	 * @public
	 * @method slideChanged
	 * @description Form slide changed
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Slides
	 */
	public slideChanged(): void{
		this.currentSlide = this.formSlider.getActiveIndex() + 1;
		//console.info(this.currentSlide);

		this.progress = this.currentSlide * 25;

		switch(this.currentSlide){
			case 1:
				this.currentSlideName = 'Info (1 out of 4)';
				break;
			case 2:
				this.currentSlideName = 'Account (2 out of 4)';
				break;
			case 3:
				if(this.geoBother){
					this.geoLocation();
					this.geoBother = false;	// Do not bother the user anymore
				}
				
				this.currentSlideName = 'Address (3 out of 4)';
				break;
			case 4:
				this.currentSlideName = 'License (4 out of 4)';
				break;
			default:
				this.currentSlideName = 'Unknown (? out of 4)';
				break;
		}
	}

	/**
	 * @public
	 * @method nextSlide
	 * @description Move to the next slide
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Slides
	 */
	public nextSlide(): void{
		this.formSlider.slideNext();
	}

	/**
	 * @public
	 * @method prevSlide
	 * @description Move to the previous slide
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Slides
	 */
	public prevSlide(): void{
		this.formSlider.slidePrev();
	}

	/**
	 * @public
	 * @method geoLocation
	 * @description Quickly fill in some data for user based on geo location
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @deprecated
	 * @uses Geolocation (native)
	 * @todo Figure out what it means CountryData is null
	 */
	public geoLocation(): void{
		/*
		let alert = this.alertCtrl.create({
			title: 'Let us locate you',
			message: 'Would you like for us to locate you, and easily enter some of your data into your address? We will not use your location for anything else, besides shipping.',
			buttons: [{
				text: 'No',
				role: 'cancel',
				handler: () => {
					console.log('FINE! Just type! :P');
				}
			}, {
				text: 'Sure',
				handler: () => {
					let loading = this.commonProvider.pageLoading();
					loading.present();

					this.geoloc.getCurrentPosition().then(data => {
						console.info('RegisterPage - geoLocation() - getCurrentPosition()', data);

						this.googleProvider.gMapsGeocodingByCoords(data.coords.latitude, data.coords.longitude).subscribe(data => {
							console.info('RegisterPage - geoLocation() - gMapsGeocodingByCoords()', data);

							let geoAddress = this.googleProvider.convertGMapResult(data);
							let region: CountryAvailableRegionModel = this.storeProvider.findRegionByAbbr(geoAddress.getRegionAbbr());

							this.addressForm.controls['street'].setValue(geoAddress.streetAddress());
							this.addressForm.controls['city'].setValue(geoAddress.getCity());
							this.addressForm.controls['region'].setValue(region.id);
							this.addressForm.controls['postal'].setValue(geoAddress.getPostal());

							loading.dismiss();
						}, err => {
							console.error('RegisterPage - geoLocation() - gMapsGeocodingByCoords()', err);
							let toast = this.commonProvider.toast('Unable to retrieve your location');
							toast.present();
						})

						// may have to use another api to get data from the coordinates
					}).catch((error) => {
						console.error('RegisterPage - geoLocation() - getCurrentPosition()', error);
						let toast = this.commonProvider.toast('Unable to retrieve your location');
						toast.present();
					});
				}
			}]
		});
		*/

		//alert.present(); // Uncomment to reenable
	}

	/**
	 * @public
	 * @method touchForms
	 * @description Touch all form fields
	 * @desc Useful for showing all error messages after (failed) submission
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public touchForms(): void{
		Object.keys(this.infoForm.controls).forEach(field => {
			let control = this.infoForm.get(field);
			control.markAsTouched({ onlySelf:true }); //mark field as touched
		});

		Object.keys(this.accountForm.controls).forEach(field => {
			let control = this.accountForm.get(field);
			control.markAsTouched({ onlySelf:true }); //mark field as touched
		});

		Object.keys(this.addressForm.controls).forEach(field => {
			let control = this.addressForm.get(field);
			control.markAsTouched({ onlySelf:true }); //mark field as touched
		});

		Object.keys(this.licenseForm.controls).forEach(field => {
			let control = this.licenseForm.get(field);
			control.markAsTouched({ onlySelf:true }); //mark field as touched
		});

		this.formSlider.update(); // update the slider
	}

	/**
	 * @public
	 * @method registerAttempt
	 * @description Attempt to register new account
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public registerAttempt(): void{
		let valid: boolean = true;

		//Check if individual forms and the flag are valid. If not, then take user back to that slide
		if(valid && !this.infoForm.valid){
			this.touchForms();
			valid = false;
			this.formSlider.slideTo(0);
		}

		if(valid && !this.accountForm.valid){
			this.touchForms();
			valid = false;
			this.formSlider.slideTo(1);
		}

		if(valid && !this.addressForm.valid){
			this.touchForms();
			valid = false;
			this.formSlider.slideTo(2);
		}

		if(valid && !this.licenseForm.valid){
			this.touchForms();
			valid = false;
			this.formSlider.slideTo(3);
		}

		// If still valid then process the data
		if(valid){
			this.registerProcess();
		} else {
			let toast = this.commonProvider.toast('Please try again');
			toast.present();
		}
	}

	/**
	 * @public
	 * @method registerProcess
	 * @description Process the register data to create new account
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo May want to use some RXJS methods with the processing to stop making a pyrmaid
	 * @todo Make a "emailAvailable" check
	 */
	public registerProcess(): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		// Tokens
		let guestToken: string = this.authProvider.getGuestTokenProvider();
		let customerToken: string = this.authProvider.getCustomerTokenProvider();

		//Do stuff for customer
		let customer = new CustomerModel();
		let address = new CustomerAddressModel(); // Used for both shipping and billing
		//let businessName = new CustomAttributeModel();
		//let licenseNumber = new CustomAttributeModel();
		//let licenseState = new CustomAttributeModel();
		//let licenseType = new CustomAttributeModel();
		let businessName = new CustomAttributeParamModel();
		let licenseNumber = new CustomAttributeParamModel();
		let licenseState = new CustomAttributeParamModel();
		let licenseType = new CustomAttributeParamModel();

		// Customer
		customer.firstname = this.infoForm.value.firstName;
		customer.lastname = this.infoForm.value.lastName;
		customer.email = this.accountForm.value.email;

		licenseNumber.attribute_code = 'license_number';
		licenseNumber.value = this.licenseForm.value.licenseNumber;
		licenseType.attribute_code = 'license_type';
		licenseType.value = this.licenseForm.value.licenseType;
		licenseState.attribute_code = 'license_state';
		licenseState.value = this.licenseForm.value.licenseState;
		businessName.attribute_code = 'business_name';
		businessName.value = this.licenseForm.value.businessName;

		customer.set_custom_attributes([licenseNumber, licenseState, licenseType, businessName]);
		//Does not fill in default sold immeditately, but eventually it does
		//Does not fill in aectoken immeditately, but eventually it does

		// Address
		address.firstname = this.infoForm.value.firstName;
		address.lastname = this.infoForm.value.lastName;
		address.company = this.infoForm.value.company;
		address.telephone = this.infoForm.value.phone;
		address.city = this.addressForm.value.city;
		address.postcode = this.addressForm.value.postal;
		address.region_id = this.addressForm.value.region;
		address.set_street(this.addressForm.value.street);
		address.set_street(this.addressForm.value.suite);
		address.default_billing = true;
		address.default_shipping = true;
		address.country_id = 'US'; //Set US as default
		// Does not fill in sap token immeditately, but eventually it does.

		customer.set_address(address);

		this.customerProvider.createCustomerAccount(customer, this.accountForm.value.password).subscribe(data => {
			console.info('RegisterPage - registerProcess() - createCustomerAccount()', data);

			// Get user token
			this.authProvider.attemptLogin(customer.email, this.accountForm.value.password).subscribe(data => {
				// Set the new customer token to the provider
				customerToken = data;

				// Store the customer token in the provider and then storage to allow providers (cart specifically) access to token
				this.authProvider.setCustomerToken(customerToken); // set to provider, local, and session storage (will also do storage, but it will not be sync'd)
				this.authProvider.setCustomerTokenStorage(customerToken).then(onfulfilled => {

					this.cartProvider.createCart().subscribe(data => {
						let cartId: number = parseInt(data);

						this.cartProvider.convertGuestToCustomer(cartId, guestToken).subscribe(data => {

							if(data){
								// Go ahead and store it in provider
								this.authProvider.setCurrentCartProvider(data);

								// Unset the guest token in both provider and storage without worrying about async
								guestToken = '';
								this.authProvider.setGuestToken(guestToken);

								// Throw a firebase event
								this.commonProvider.analyticsLogEvent('sign_up', {
									method: 'form'
								});

								// Revise the slide menu
								this.events.publish('app:changeAccountMenu', true); 

								loading.dismiss();
									
								// Instead of pushing a page, just set the root
								this.navCtrl.setRoot('ProfileDashboardPage');
							} else {
								console.error('RegisterPage - registerProcess() - convertGuestToCustomer()', false);
								loading.dismiss();

								let toast = this.commonProvider.toast('Invalid register attempt');
								toast.present();
							}
						}, err => {
							console.error('RegisterPage - registerProcess() - convertGuestToCustomer()', err);
							loading.dismiss();

							let toast = this.commonProvider.toast('Invalid register attempt');
							toast.present();
						});
						
					}, err => {
						console.error('RegisterPage - registerProcess() - createCart()', err);
					});
				}).catch(onrejected => {
					console.error('RegisterPage - registerProcess() - setCustomerTokenStorage()', onrejected);
					loading.dismiss();

					let toast = this.commonProvider.toast('Something happened with the register process');
					toast.present();
				});
			});
		}, err => {
			console.error('Register Page - registerProcess() - createCustomerAccount()', err);

			loading.dismiss();

			let toast = this.commonProvider.toast(err);
			toast.present();
		});	
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

				event.complete();
			}, err => {
				console.error('RegisterPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
