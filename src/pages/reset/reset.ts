import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// Providers
import { CommonProvider } from '../../providers/ionic/common';
import { CustomerProvider } from '../../providers/magento/customer';

// Validators
import { PasswordValidator } from '../../validators/password';

@IonicPage()
@Component({
	selector: 'page-reset',
	templateUrl: 'reset.html',
})

export class ResetPage {

	public resetToken: string;
	public email: string;

	public resetForm: FormGroup;

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
		this.resetToken = this.navParams.get('resetToken');
		this.email = this.navParams.get('email');

		this.resetForm = this.formBuilder.group({
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				PasswordValidator.strengthCheck
			])],
			confirm: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				PasswordValidator.equalConfirm
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
	 * @method ionViewCanEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { boolean }
	 */
	public ionViewCanEnter(): boolean{
		//900decff5c2918c854a824e65b8e341b
		console.info('ResetPage - ionViewCanEnter() - resetToken', this.resetToken);

		if(this.resetToken){
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @public
	 * @method resetAttempt
	 * @description Attempt to reset password
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public resetAttempt(): void{
		let loading = this.commonProvider.pageLoading();
		loading.present();

		if(this.resetForm.valid){
			let values = this.resetForm.value;

			this.customerProvider.resetPassword(this.email, this.resetToken, values.password).subscribe(data => {

				let toast = this.commonProvider.toast('Password has been reseted');
				toast.present();

				this.navCtrl.setRoot('LoginPage');
			}, err => {
				loading.dismiss();
				// Might want to come with a better error system
				console.error('ForgotPage - resetAttempt() - resetPassword()', err);

				let toast = this.commonProvider.toast(err);
				toast.present();
			})
		} else {
			loading.dismiss();

			let toast = this.commonProvider.toast('Invalid reset password attempt');
			toast.present();
		}
	}

	/**
	 * @public
	 * @method openPage
	 * @description Go to new page at first stack
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } page
	 */
	public openPage(page){
		if(page){
			this.navCtrl.setRoot(page);
		}
	}
}