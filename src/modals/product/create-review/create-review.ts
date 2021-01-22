import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// Models
import { ProductModel } from '../../../models/magento/catalog/product';
import { CustomerModel } from '../../../models/magento/customer/customer';
import { YotpoProductModel } from '../../../models/api/yotpo';

// Providers
import { YotpoProvider } from '../../../providers/api/yotpo';

@IonicPage()
@Component({
	selector: 'modal-create-review',
	templateUrl: 'create-review.html',
})

export class CreateReviewModal {

	public product: ProductModel;
	public yotpoProduct: YotpoProductModel;
	public customer: CustomerModel;

	// Form
	public reviewForm: FormGroup;
	public starOne: string = 'star-outline';
	public starTwo: string = 'star-outline';
	public starThree: string = 'star-outline';
	public starFour: string = 'star-outline';
	public starFive: string = 'star-outline';

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.1
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { YotpoProvider } yotpoProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public yotpoProvider: YotpoProvider) {

		this.product = this.navParams.get('product');
		this.yotpoProduct = this.navParams.get('yotpoProduct');
		this.customer = this.navParams.get('customer');

		let customerName: string = '';

		console.info('CreateReviewModal - constructor() - navParams', this.product, this.yotpoProduct, this.customer);

		if(this.customer.fullName() == undefined){
			customerName = this.customer.fullName();
		}

		this.reviewForm = formBuilder.group({
			star: [0, Validators.compose([
				Validators.required,
				Validators.pattern('[1-5]')
			])],

			name: [customerName, Validators.compose([
				Validators.required
			])],

			email: [this.customer.email, Validators.compose([
				Validators.required,
				Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') // email pattern
			])],

			title: ['', Validators.compose([
				Validators.required
			])],

			review: ['', Validators.compose([
				Validators.required
			])]
		});
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public ionViewDidEnter() {
	}

	/**
	 * @public
	 * @method submit (click)
	 * @description Submit review of a product
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public submit(): void{
		console.info('CreateReviewModal - submit() - reviewForm', this.reviewForm);
		console.info(this.reviewForm.valid);

		if(this.reviewForm.valid){
			this.yotpoProvider.postReview(
				this.product, 
				this.customer, 
				this.reviewForm.value.star, 
				this.reviewForm.value.title, 
				this.reviewForm.value.review, 
				this.reviewForm.value.name, 
				this.reviewForm.value.email
			).subscribe(data => {
				console.info('CreateReviewModal - submit() - postReview()', data);
			}, err => console.error('CreateReviewModal - submit() - postReview()', err));
		} else {
			// Do some error message
			Object.keys(this.reviewForm.controls).forEach(field => {
				let control = this.reviewForm.get(field);
				control.markAsTouched({ onlySelf:true }); //mark field as touched
			});
		}
	}

	/**
	 * @public
	 * @method starRating (click)
	 * @description Change the star rating value and icon
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 * @param { number } star
	 */
	public starRating(star: number): void{
	 	// Reset all stars to outline
	 	this.starOne = 'star-outline';
	 	this.starTwo = 'star-outline';
	 	this.starThree = 'star-outline';
	 	this.starFour = 'star-outline';
	 	this.starFive = 'star-outline';

	 	// Then set the correct number of stars as filled
	 	switch(star){
	 		case 1:
	 			console.log(1);
	 			this.starOne = 'star';
	 			break;
	 		// end case 1
	 		case 2:
	 			console.log(2);
	 			this.starOne = 'star';
	 			this.starTwo = 'star';
	 			break;
	 		// end case 2
	 		case 3:
	 			console.log(3);
	 			this.starOne = 'star';
	 			this.starTwo = 'star';
	 			this.starThree = 'star';
	 			break;
	 		// end case 3
	 		case 4:
	 			console.log(4);
	 			this.starOne = 'star';
	 			this.starTwo = 'star';
	 			this.starThree = 'star';
	 			this.starFour = 'star';
	 			break;
	 		// end case 4
	 		case 5:
	 			console.log(5);
	 			this.starOne = 'star';
	 			this.starTwo = 'star';
	 			this.starThree = 'star';
	 			this.starFour = 'star';
	 			this.starFive = 'star';
	 			break;
	 		// end case 5
	 	}

	 	// Then set the form star rating
		this.reviewForm.controls['star'].setValue(star);
	 }

	/**
	 * @public
	 * @method dismiss (click)
	 * @description Dismiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss(null);
	}
}
