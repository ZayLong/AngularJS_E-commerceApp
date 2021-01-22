import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

@Component({
	selector: 'profile-menu',
	templateUrl: 'profile-menu.html'
})

export class ProfileMenuComponent {

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { ActionSheetController } actionSheetCtrl
	 */
	public constructor(
		public navCtrl: NavController,
		public actionSheetCtrl: ActionSheetController
	) {}

	/**
	 * @public
	 * @method openMenu
	 * @description Open the action sheet profile menu
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses ActionSheetController
	 */
	public openMenu(): void{
		let menu = this.actionSheetCtrl.create({
			title: 'Profile Menu',
			cssClass: 'profile-action-sheet',
			buttons: [{
				text: 'Account Dashboard',
				handler: () => {
					this.gotoPage('ProfileDashboardPage');
				}
			}, {
				text: 'Account Information',
				handler: () => {
					this.gotoPage('ProfileAccountPage');
				}
			}, {
				text: 'Address Book',
				handler: () => {
					this.gotoPage('ProfileAddressPage');
				}
			}/*, {
				text: 'Stored Payment Methods',
				handler: () => {
					this.gotoPage('ProfilePaymentPage');
				}
			}*/, {
				text: 'TIS Rewards',
				handler: () => {
					this.gotoPage('RewardsPage');
				}
			}, {
				text: 'Order by SKU',
				handler: () => {
					this.gotoPage('ProfileQuickPage');
				}
			}, {
				text: 'My Orders',
				handler: () => {
					this.gotoPage('ProfileOrdersPage');
				}
			}, {
				text: 'My Wish List',
				handler: () => {
					this.gotoPage('ProfileWishlistPage');
				}
			}/*, {
				text: 'Price Subscriptions',
				handler: () => {
					this.gotoPage();
				}
			}, {
				text: 'Out of Stock Subscriptions',
				handler: () => {
					this.gotoPage();
				}
			}*/]
		});

		menu.present();
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