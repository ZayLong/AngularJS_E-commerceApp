import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 3rd Party
// https://www.npmjs.com/package/ngx-credit-cards
import { CreditCardValidator } from 'ngx-credit-cards';

// Models
import { PaymentMethodModel } from '../../../models/magento/checkout/payment-method';
import { PaymetricCardModel } from '../../../models/magento/tng/paymetric';

// Providers
import { CommonProvider } from '../../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'modal-payment-method',
	templateUrl: 'payment-method.html',
})

export class PaymentMethodModal {

	// Payment Methods
	public methods: Array<PaymentMethodModel> = [];
	public selectedMethod: PaymentMethodModel;
	public segment: string;

	// Saved Cards
	public cards: Array<PaymetricCardModel> = [];
	public selectedCard: PaymetricCardModel;

	// Flags
	public newCard: boolean = false;

	// Forms
	public ccForm: FormGroup;
	public ccExistForm: FormGroup;
	public paypalForm: FormGroup;
	public invoiceForm: FormGroup;

	// CC
	public expMonths: Array<{ key: string, value: string }> = [];
	public expYears: Array<{ key: string, value: string }> = [];
	public cardTypes: Array<{ key: string, value: string }> = [];

	// Select Options
	public optionMethods: any;
	public optionTypes: any;
	public optionMonths: any;
	public optionYears: any;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { FormBuilder } formBuilder
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public commonProvider: CommonProvider) {

		// Select Options
		this.optionMethods = {
			title: 'Select Payment Method'
		};

		this.optionTypes = {
			title: 'Select Credit Card Brand'
		};

		this.optionMonths = {
			title: 'Select CC Expiration Month'
		};

		this.optionYears = {
			title: 'Select CC Expiration Year'
		};

		this.methods = this.navParams.get('method').selection;
		this.selectedMethod = this.navParams.get('method').selected;

		this.segment = this.selectedMethod.code;

		this.cards = this.navParams.get('card').selection;
		this.selectedCard = this.navParams.get('card').selected;

		if(this.cards.length <= 0){
			this.newCard = true;
		}

		// Credit Card Forms
		this.cardTypes = [
			{ key: 'Visa', value: 'VI'},
			{ key: 'Mastercard', value: 'MC'},
			{ key: 'Discover', value: 'DI'},
			{ key: 'American Express', value: 'AE'}
		];

		this.expMonths = [
			{ key: '01 - January' , value: '01'},
			{ key: '02 - February' , value: '02'},
			{ key: '03 - March' , value: '03'},
			{ key: '04 - April' , value: '04'},
			{ key: '05 - May' , value: '05'},
			{ key: '06 - June' , value: '06'},
			{ key: '07 - July' , value: '07'},
			{ key: '08 - August' , value: '08'},
			{ key: '09 - September' , value: '09'},
			{ key: '10 - October' , value: '10'},
			{ key: '11 - November' , value: '11'},
			{ key: '12 - December' , value: '12'},
		];

		let currentDate = new Date();
		let currentYear: number = currentDate.getFullYear();
		//let currentAbbrYear: string = currentYear.toString().substr(-2);

		this.expYears.push({ key: currentYear.toString(), value: currentYear.toString() });

		for(let x = 0; x < 14; x++){
			currentYear = currentYear + 1;
			this.expYears.push({ key: currentYear.toString(), value: currentYear.toString() });
		}

		this.ccForm = formBuilder.group({
			cardNumber: ['', Validators.compose([
				Validators.required,
				CreditCardValidator.validateCardNumber
			])],
			cardType: ['', Validators.compose([
				Validators.required
			])],/*
			cardExp: ['', Validators.compose([
				Validators.required,
				CreditCardValidator.validateCardExpiry
			])],*/
			cardExpMonth: ['', Validators.compose([
				Validators.required
			])],
			cardExpYear: ['', Validators.compose([
				Validators.required
			])],
			cardCvv: ['', Validators.compose([
				Validators.required,
				CreditCardValidator.validateCardCvc
			])],
			purchaseOrderNumber: ['', Validators.compose([
			])],
			savePayment: [false, Validators.compose([
			])]
		});

		this.ccExistForm = formBuilder.group({
			cardIndex: ['', Validators.compose([
				Validators.required
			])],
			cardCvv: ['', Validators.compose([
				Validators.required,
				CreditCardValidator.validateCardCvc
			])],
			purchaseOrderNumber: ['', Validators.compose([
			])]
		});

		this.invoiceForm = formBuilder.group({
			purchaseOrderNumber: ['', Validators.compose([
			])]
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
	 * @description Process the credit card selection
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 */
	public save(): void{
		// Change the selected payment method
		for(let method of this.methods){
			if(this.segment == method.code){
				this.selectedMethod = method;
			}
		}

		switch(this.segment){
			case 'tng_paymetric':
				if(this.newCard){
					// new card
					if(this.ccForm.valid){
						this.viewCtrl.dismiss({
							method: this.selectedMethod,
							cardNew: true,
							cardNumber: this.ccForm.value.cardNumber.replace(/ /g, ''),
							cardType: this.ccForm.value.cardType,
							cardExpMonth: this.ccForm.value.cardExpMonth,
							cardExpYear: this.ccForm.value.cardExpYear,
							cardCvv: this.ccForm.value.cardCvv,
							purchaseOrderNumber: this.ccForm.value.purchaseOrderNumber,
							savePayment: this.ccForm.value.savePayment
						}, 'tng_paymetric')
					} else {
						// Invalid form
						Object.keys(this.ccForm.controls).forEach(field => {
							let control = this.ccForm.get(field);
							control.markAsTouched({ onlySelf:true }); //mark field as touched
						});
					}
				} else {
					// existing card
					if(this.ccExistForm.valid){
						this.viewCtrl.dismiss({
							method: this.selectedMethod,
							cardNew: false,
							existing: this.cards[this.ccExistForm.value.cardIndex],
							cardCvv: this.ccExistForm.value.cardCvv,
							purchaseOrderNumber: this.ccExistForm.value.purchaseOrderNumber,
							savePayment: false
						}, 'tng_paymetric');
					} else {
						// Invalid form
						Object.keys(this.ccExistForm.controls).forEach(field => {
							let control = this.ccExistForm.get(field);
							control.markAsTouched({ onlySelf:true }); //mark field as touched
						});
					}
				}

				break;
			// end case tng_paymetric
			case 'paypal_express':
				this.viewCtrl.dismiss({
					method: this.selectedMethod
				}, 'paypal_express');
				break;
			// end case paypal_express
			case 'purchaseorder':
				this.viewCtrl.dismiss({
					method: this.selectedMethod,
					purchaseOrderNumber: this.invoiceForm.value.purchaseOrderNumber
				}, 'purchaseorder');
				break;
			// end case purchaseorder
		}
	}

	// MODAL METHODS

	/**
	 * @public
	 * @method toggleNewCard (click)
	 * @description Toggle if new or exisitng card
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 */
	public toggleNewCard(): void{
		this.newCard = !this.newCard;
	}

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
