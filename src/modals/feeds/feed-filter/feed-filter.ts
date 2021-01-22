import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// Models
import { FilterModel } from '../../../models/ionic/modal/feed-filter';

@IonicPage()
@Component({
	selector: 'modal-feed-filter',
	templateUrl: 'feed-filter.html',
})

export class FeedFilterModal {

	category: Array<FilterModel> = [];
	price: FilterModel = new FilterModel();
	color: FilterModel = new FilterModel();
	manufacturer: FilterModel = new FilterModel();
	collection: FilterModel = new FilterModel();
	tag: FilterModel = new FilterModel();

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
		public viewCtrl: ViewController) {

		// category0 to category3
		for(let i = 0; i < 4; i++){
			this.category[i] = new FilterModel();
			this.category[i].value = this.navParams.get('category' + i).default;
			this.category[i].data = this.navParams.get('category' + i).data;
			this.category[i].options = {
				title: 'Category'
			}
		}

		this.price.value = this.navParams.get('prices').default;
		this.price.data = this.navParams.get('prices').data;

		this.color.value = this.navParams.get('colors').default;
		this.color.data = this.navParams.get('colors').data;
		this.color.options = {
			title: 'Colors'
		};

		this.manufacturer.value = this.navParams.get('manufacturers').default;
		this.manufacturer.data = this.navParams.get('manufacturers').data;
		this.manufacturer.options = {
			title: 'Manufacturers'
		};

		this.collection.value = this.navParams.get('collections').default;
		this.collection.data = this.navParams.get('collections').data;
		this.collection.options = {
			title: 'Collections'
		};

		console.info(this.collection);

		this.tag.value = this.navParams.get('tags').default;
		this.tag.data = this.navParams.get('tags').data;
		this.tag.options = {
			title: 'Tags'
		};

		console.info(this.tag);
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {}

	// CATEGORIES

	/**
	 * @public
	 * @method categoryChange
	 * @description Process changes made from selecting categories and sub-categories
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } level
	 */
	public categoryChange(level: number): void{
		let iterator: number = 3;

		do{ // At least allow one process
			this.category[iterator].value = '';
			iterator--; // decrement the iterator to get close to the level
		} while(iterator != level); // iterator must NOT equal to the level
	}

	// MODAL BUTTONS

	/**
	 * @public
	 * @method submit
	 * @description Submit the filter options
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public submit(): void{
		this.viewCtrl.dismiss({
			category0: this.category[0].value,
			category1: this.category[1].value,
			category2: this.category[2].value,
			category3: this.category[3].value,
			price: this.price.value,
			color: this.color.value,
			manufacturer: this.manufacturer.value,
			collection: this.collection.value,
			tag: this.tag.value
		});
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