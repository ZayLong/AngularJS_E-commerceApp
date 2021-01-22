import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Slides, ViewController, AlertController } from 'ionic-angular';

// Models
import { CustomerModel } from '../../../models/magento/customer/customer';
import { CustomerAddressModel } from '../../../models/magento/customer/address';
import { CountryModel, CountryAvailableRegionModel } from '../../../models/magento/store/country';

// Providers
import { CommonProvider } from '../../../providers/ionic/common';
import { StoreProvider } from '../../../providers/magento/store';

@IonicPage()
@Component({
	selector: 'modal-add-address',
	templateUrl: 'add-address.html',
})

export class AddAddressModal {

	customer: CustomerModel;

	// Slides
	@ViewChild('formSlider') formSlider: Slides;
	currentSlide: number = 1;
	currentSlideName: string = 'Info (1 out of 2)';
	progress: number = 50;

	// Forms
	infoForm: FormGroup; // Slide 1
	addressForm: FormGroup; // Slide 2

	// Select options
	stateOptions: Array<CountryAvailableRegionModel>;

	// Flags
	geoBother: boolean = true; // Bother the user if they want to quickly fill in address

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { AlertController } alertCtrl
	 * @param { FormBuilder } formBuilder
	 * @param { CommonProvider } commonProvider
	 * @param { StoreProvider } storeProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		private commonProvider: CommonProvider,
		private storeProvider: StoreProvider) {

		let loading = this.commonProvider.pageLoading();
		loading.present();

		this.customer = this.navParams.get('customer');

		// Get country data
		this.storeProvider.readCountries().subscribe(data => {
			let country: CountryModel = data[0]; // Assuming the first (and only) selection is the US

			this.stateOptions = country.available_regions;
			loading.dismiss();
		}, err => {
			console.error('ProfileAddAddressModal - ionViewDidLoad() - readCountries()', err);
		});

		// Form Elements
		this.infoForm = formBuilder.group({
			firstName: [this.customer.firstname, Validators.compose([
				Validators.required,
				Validators.pattern('[a-zA-Z ]*') // alpha-only pattern
			])],
			lastName: [this.customer.lastname, Validators.compose([
				Validators.required,
				Validators.pattern('[a-zA-Z ]*') // alpha-only pattern
			])],
			company: [''],
			phone: ['', Validators.compose([
				Validators.required
			])],
			fax: ['']
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
	 * @method dismiss
	 * @description Dimiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public dismiss(){
		this.viewCtrl.dismiss(null);
	}

	/**
	 * @public
	 * @method slideChanged
	 * @description Form slide changed
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Slider
	 */
	public slideChanged(): void{
		this.currentSlide = this.formSlider.getActiveIndex() + 1;
		//console.info(this.currentSlide);

		this.progress = this.currentSlide * 50;

		switch(this.currentSlide){
			case 1:
				this.currentSlideName = 'Info (1 out of 2)';
				break;
			case 2:
				if(this.geoBother){
					// this.geoLocation();
					this.geoBother = false;	// Do not bother the user anymore
				}
				
				this.currentSlideName = 'Address (2 out of 2)';
				break;
			default:
				this.currentSlideName = 'Unknown (? out of 2)';
				break;
		}
	}

	/**
	 * @public
	 * @method nextSlide
	 * @description Move to the next slide
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Slider
	 */
	public nextSlide(): void{
		this.formSlider.slideNext();
	}

	/**
	 * @public
	 * @method prevSlide
	 * @description Move to the previous slide
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Slider
	 */
	public prevSlide(): void{
		this.formSlider.slidePrev();
	}

	/**
	 * @public
	 * @method addressAttempt
	 * @description Attempt to register new account
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public addressAttempt(): void{
		let valid: boolean = true;

		//Check if individual forms are valid. If not, then take user back to that slide
		if(valid && !this.infoForm.valid){
			valid = false;
			this.touchForms();
			this.formSlider.slideTo(0);
		}

		if(valid && !this.addressForm.valid){
			valid = false;
			this.touchForms();
			this.formSlider.slideTo(1);
		}

		if(valid){
			this.addressProcess();
		}
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

		Object.keys(this.addressForm.controls).forEach(field => {
			let control = this.addressForm.get(field);
			control.markAsTouched({ onlySelf:true }); //mark field as touched
		});

		this.formSlider.update(); // update the slider
	}

	/**
	 * @public
	 * @method addressProcess
	 * @description Process the address data to either save or use shipping address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public addressProcess(): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		let address = new CustomerAddressModel();
		address.region_id = this.addressForm.value.region;
		address.country_id = 'US'; // Default to US for now

		let street: Array<string> = [];
		street.push(this.addressForm.value.street);
		street.push(this.addressForm.value.suite);
		address.street = street;

		address.company = this.infoForm.value.company;
		address.telephone = this.infoForm.value.phone;
		address.fax = this.infoForm.value.fax;
		address.postcode = this.addressForm.value.postal;
		address.city = this.addressForm.value.city;
		address.firstname = this.infoForm.value.firstName;
		address.lastname = this.infoForm.value.lastName;

		loading.dismiss();
		this.viewCtrl.dismiss({
			address: address
		});
	}
}
