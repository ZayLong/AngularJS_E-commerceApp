import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

// Models
import { CartModel, CartAddressModel } from '../../../models/magento/cart/cart';
import { CountryModel, CountryAvailableRegionModel } from '../../../models/magento/store/country';

// Natives
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

// Providers
import { StoreProvider } from '../../../providers/magento/store';

@IonicPage()
@Component({
	selector: 'modal-shipping-address',
	templateUrl: 'shipping-address.html',
})

export class ShippingAddressModal {

	// User / Cart
	public cart: CartModel;
	public selectedAddress: CartAddressModel;

	// Segment
	public menu: string = 'existing';

	// Form
	public addressForm: FormGroup;
	public stateOptions: Array<CountryAvailableRegionModel>;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { AlertController } alertCtrl
	 * @param { FormBuilder } formBuilder
	 * @param { Geolocation } geolocation
	 * @param { NativeGeocoder } geocoder
	 * @param { StoreProvider } storeProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public geolocation: Geolocation,
		public geocoder: NativeGeocoder,
		public storeProvider: StoreProvider) {

		this.cart = this.navParams.get('cart');
		this.selectedAddress = this.navParams.get('selectedAddress');

		// Get the states (regions) of the USA
		this.storeProvider.readCountries().subscribe(data => {
			let country: CountryModel = data[0];
			this.stateOptions = country.available_regions;
		}, err => console.error('Checkout - ShippingAddressModal - constructor()', err));

		this.addressForm = formBuilder.group({
			firstName: [sessionStorage.getItem('checkoutNewAddressFirstName'), Validators.compose([
				Validators.required,
				Validators.pattern('[a-zA-Z ]*') // alpha-only pattern
			])],
			lastName: [sessionStorage.getItem('checkoutNewAddressLastName'), Validators.compose([
				Validators.required,
				Validators.pattern('[a-zA-Z ]*') // alpha-only pattern
			])],
			company: [sessionStorage.getItem('checkoutNewAddressCompany')],
			phone: [sessionStorage.getItem('checkoutNewAddressTelephone'), Validators.compose([
				Validators.required
			])],
			street: [sessionStorage.getItem('checkoutNewAddressStreet'), Validators.compose([
				Validators.required
			])],
			suite: [sessionStorage.getItem('checkoutNewAddressSuite')],
			city: [sessionStorage.getItem('checkoutNewAddressCity'), Validators.compose([
				Validators.required
			])],
			region: [sessionStorage.getItem('checkoutNewAddressRegionId'), Validators.compose([
				Validators.required
			])],
			postal: [sessionStorage.getItem('checkoutNewAddressPostCode'), Validators.compose([
				Validators.required,
				Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
			])],
			save: [false]
		});
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 */
	public ionViewDidLoad() {}

	/**
	 * @public
	 * @method save (click)
	 * @description Save either an existing or new address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	public save(): void{
		if(this.menu === 'existing'){
			this.selectExistingAddress(this.selectedAddress);
		} else if (this.menu === 'new'){
			this.attemptNewAddress();
		}
	}

	/**
	 * @private
	 * @method selectExistingAddress
	 * @description Select an existing address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @param { CartAddressModel } address
	 */
	private selectExistingAddress(address: CartAddressModel): void{
		this.viewCtrl.dismiss({
			address: address
		}, 'existing');
	}

	// NEW ADDRESS METHODS

	/**
	 * @public
	 * @method attemptNewAddress
	 * @description Attempt to register new address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 */
	public attemptNewAddress(): void{
		if(!this.addressForm.valid){
			// Go through all input fields then "touch" them
			Object.keys(this.addressForm.controls).forEach(field => {
				let control = this.addressForm.get(field);
				control.markAsTouched({ onlySelf:true }); //mark field as touched
			});
		} else {
			this.processNewAddress();
		}
	}

	/**
	 * @private
	 * @method processNewAddress
	 * @description Process the data to either save or temporarily used as shipping address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 * @todo Figure out a way to call Magento to call SAP to quickly update the address to have a SAP token
	 */
	private processNewAddress(): void{
		let address: CartAddressModel = new CartAddressModel();

		// find the region to fill in more data
		this.storeProvider.findRegion(this.addressForm.value.region, 'id').subscribe(data => {
			// Checking optional fields if null. If left unchecked then it will fill value with the string "null".
			if(this.addressForm.value.suite === null){
				this.addressForm.value.suite = '';
			}

			if(this.addressForm.value.company === null){
				this.addressForm.value.company = '';
			}

			let region = data;

			address.region = region.name;
			address.region_code = region.code;
			address.region_id = this.addressForm.value.region;
			address.country_id = 'US'; // Default to US for now

			let street: Array<string> = [];
			street.push(this.addressForm.value.street);
			street.push(this.addressForm.value.suite);
			address.street = street;

			address.company = this.addressForm.value.company;
			address.telephone = this.addressForm.value.phone;
			address.postcode = this.addressForm.value.postal;
			address.city = this.addressForm.value.city;
			address.firstname = this.addressForm.value.firstName;
			address.lastname = this.addressForm.value.lastName;

			if(this.addressForm.value.save){
				address.save_in_address_book = 1;
			} else {
				address.save_in_address_book = 0;
			}

			this.viewCtrl.dismiss({
				address: address
			}, 'new');
		})
	}

	// NEW ADDRESS GEOLOCATION METHODS

	/**
	 * @public
	 * @method attemptGeolocation (click)
	 * @description Allow the user to fill in address form with current location
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @uses AlertController
	 */
	public attemptGeolocation(): void{
		let alert = this.alertCtrl.create({
			title: 'Quick Address Fill',
			message: 'Would you like to fill in the form quickly with your current location? We will only use the data for this purpose.',
			buttons: [{
				text: 'No',
				handler: () => {
					console.log('FINE! Just type your address!')
				}
			}, {
				text: 'Yes',
				handler: () => {
					this.processGeolocation();
				}
			}]
		});

		alert.present();
	}

	/**
	 * @private
	 * @method processGeolocation
	 * @description Process a geolocation fill-in
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @uses Geolocation
	 */
	public processGeolocation(): void{
		this.geolocation.getCurrentPosition().then(onfulfilled => {
			let x: number = onfulfilled.coords.latitude;
			let y: number = onfulfilled.coords.longitude;

			this.geocoder.reverseGeocode(x, y).then(onfulfilled => {
				this.addressForm.controls['street'].setValue(onfulfilled[0].subThoroughfare + ' ' + onfulfilled[0].thoroughfare);
				this.addressForm.controls['city'].setValue(onfulfilled[0].locality);
				this.addressForm.controls['region'].setValue(onfulfilled[0].administrativeArea);
				this.addressForm.controls['postal'].setValue(onfulfilled[0].postalCode);
			}, onrejected => console.error('Checkout - ShippingAddressModal - constructor()', onrejected));
		}, onrejected => console.error('Checkout - ShippingAddressModal - constructor()', onrejected));
	}

	// MODAL METHODS

	/**
	 * @public
	 * @method dismiss (click)
	 * @description Dismiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss(null, 'cancel');
	}
}