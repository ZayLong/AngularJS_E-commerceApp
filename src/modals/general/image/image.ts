import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'modal-image',
	templateUrl: 'image.html',
})

export class ImageModal {

	public image: string;
	public title: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public viewCtrl: ViewController) {}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {
		this.image = this.navParams.get('image');
		this.title = this.navParams.get('title');
	}

	/**
	 * @public
	 * @method dismiss
	 * @description Dismiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss(null);
	}

}
