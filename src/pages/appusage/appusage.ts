import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { CommonProvider } from '../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'page-appusage',
	templateUrl: 'appusage.html',
})

export class AppusagePage {

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.2
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public commonProvider: CommonProvider) {
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 */
	public ionViewDidLoad() {}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_appusage',
			item_name: 'App Usage Page',
			item_category: 'page'
		});
	}

}
