import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

// Models
import { ProductItemModel } from '../../../models/ionic/page/feeds';

// Providers
import { CommonProvider } from '../../../providers/ionic/common';

@Component({
	selector: 'grid-feed-item',
	templateUrl: 'grid-feed-item.html'
})

export class GridFeedItemComponent {

	@Input('item') item: ProductItemModel;
	@Input('logged') logged: boolean;

	public messageBadge: string = null;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { ModalController } modalCtrl
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public commonProvider: CommonProvider
	) {}

	/**
	 * @public
	 * @method ngAfterContentInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ngAfterContentInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the feed item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private process(): void{
		if(this.item.action.unavailable){
			this.messageBadge = 'Unavailable';
		} else {
			if(this.item.action.call_to_order){
				this.messageBadge = 'Call to Order Only';
			} else {
				if(this.item.action.hide_from_region){
					this.messageBadge = 'Restricted Area';
				} else if(this.item.action.change_price_text && (this.logged == false || this.logged == undefined)){
					this.messageBadge = 'Login to Purchase';
				} else {
					let salePrice = this.item.product.price.USD.default_formated;
					//let fullPrice = this.item.product.price.USD.default_original_formated;

					this.messageBadge = salePrice;
				}
			}
		}
	}

	/**
	 * @public
	 * @method gotoProduct
	 * @description Go to product page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { ProductItemModel } item
	 */
	public gotoProduct(item: ProductItemModel): void{
		if(!item.action.unavailable){
			this.commonProvider.analyticsLogEvent('select_content', {
				content_type: 'Product',
				item_id: 'product_' + item.product.sku
			});

			this.navCtrl.push('ProductPage', {
				product: item.product.sku
			});
		} else {
			let toast = this.commonProvider.toast('Product is unavailable');
			toast.present();
		}
	}
}
