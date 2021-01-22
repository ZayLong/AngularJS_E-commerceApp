import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

// Modals
import { ImageModal } from '../../../modals/general/image/image';

// Models
import { ProductItemModel } from '../../../models/ionic/page/feeds';

// Providers
import { CommonProvider } from '../../../providers/ionic/common';

@Component({
	selector: 'list-feed-item',
	templateUrl: 'list-feed-item.html'
})

export class ListFeedItemComponent {

	@Input('item') item: ProductItemModel;
	@Input('logged') logged: boolean;

	public content: string = '';

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
			this.content = '<p><strong>Product unavailable</strong></p>';
		} else {
			if(this.item.action.call_to_order){
				this.content = '<p>Please call <strong>800.362.6245</strong> to purchase this product</p>';
			} else {
				if(this.item.action.hide_from_region){
					this.content = '<p>Not available in your region</p>';
				} else if(this.item.action.change_price_text && (this.logged == false || this.logged == undefined)){
					this.content = '<p><strong>Login to Purchase</strong></p>';
				} else {
					let salePrice = this.item.product.price.USD.default_formated;
					let fullPrice = this.item.product.price.USD.default_original_formated;

					// If fullPrice does not exist, then sale price is just the full price
					if(fullPrice){
						this.content = '<p>' + salePrice + ' <span class="sale-regular-price">' + fullPrice + '</span></p>';
					} else {
						this.content = '<p>' + salePrice + '</p>';
					}
				}
			}	
		}
	}

	/**
	 * @public
	 * @method imageModal
	 * @description Show an enlarged image on a modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { any } product
	 */
	public imageModal(product: any): void{
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'image_' + product.sku,
			item_name: 'Image of ' + product.name,
			item_category: 'Image'
		});

		let modal = this.modalCtrl.create(ImageModal, {
			image: product.image_url,
			title: product.name
		});

		modal.present();
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
