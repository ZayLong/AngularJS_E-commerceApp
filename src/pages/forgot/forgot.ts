import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// Providers
import { CommonProvider } from '../../providers/ionic/common';
import { CustomerProvider } from '../../providers/magento/customer';

@IonicPage()
@Component({
	selector: 'page-forgot',
	templateUrl: 'forgot.html',
})

export class ForgotPage {

	// Forms
	public forgotForm: FormGroup;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { FormBuilder } formBuilder
	 * @param { CommonProvider } commonProvider
	 * @param { CustomerProvider } customerProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public formBuilder: FormBuilder,
		public commonProvider: CommonProvider,
		public customerProvider: CustomerProvider) {

		// Construct the form
		this.forgotForm = this.formBuilder.group({
			email: ['', Validators.compose([
				Validators.required, // required
				Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') // email pattern
			])]
		});
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad(){}

	/**
	 * @public
	 * @method publicForgotAttempt
	 * @description Attempt to get password reset token from form submission
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public publicforgotAttempt(): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		if(this.forgotForm.valid){
			let values = this.forgotForm.value;

			this.customerProvider.sendResetToken(values.email).subscribe(data => {
				console.info('ForgotPage - forgotAttempt() - sendResetToken()', data);
				loading.dismiss();

				this.navCtrl.setRoot('ResetPage', {
					email: values.email,
					resetToken: data.toString()
				});

				//let toast = this.commonProvider.toast('Reset request sent, please check your email.');
				//toast.present();
			}, err => {
				loading.dismiss();
				// Might want to come with a better error system
				console.error('ForgotPage - forgotAttempt() - sendResetToken()', err);

				let toast = this.commonProvider.toast(err);
				toast.present();
			});
		} else {
			loading.dismiss();

			let toast = this.commonProvider.toast('Invalid forgot password attempt');
			toast.present();
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
}
