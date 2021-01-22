import { Component, Input } from '@angular/core';
import { NavController, Events, PopoverController } from 'ionic-angular';

// Models
import { CartModel } from '../../../models/magento/cart/cart';
import { ProductModel } from '../../../models/magento/catalog/product';
import { ProductItemModel } from '../../../models/ionic/page/home';
import { ProductAttributeModel, ProductAttributeOptionModel } from '../../../models/magento/catalog/product-attribute';

// Providers
import { CartProvider } from '../../../providers/magento/cart';
import { CatalogProvider } from '../../../providers/magento/catalog';
import { CommonProvider } from '../../../providers/ionic/common';

@Component({
	selector: 'home-item',
	templateUrl: 'home-item.html'
})

export class HomeItemComponent {

	@Input('item') item: ProductItemModel;
	@Input('logged') logged: boolean;
	@Input('cart') cart: CartModel;

	public canAddToCart: boolean = false;
	public tag: ProductAttributeOptionModel = null;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { Events } events
	 * @param { PopoverController } popoverCtrl
	 * @param { CartProvider } cartProvider
	 * @param { CatalogProvider } catalogProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public events: Events,
		public popoverCtrl: PopoverController,
		public cartProvider: CartProvider,
		public catalogProvider: CatalogProvider,
		public commonProvider: CommonProvider
	) {}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the home item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private process(): void{
		this.catalogProvider.readProductAttributeByCode('tags').subscribe(data => {
			let tags: ProductAttributeModel = data;

			let attributeTags = this.item.product.get_custom_attribute('tags');

			if(attributeTags != undefined && attributeTags.value != null){
				this.tag = tags.optionByValue( attributeTags.value );
			}
		}, err => console.error('HomeItem - process() - readProductAttributeByCode()', err));
		this.canAddToCart = this.item.product.canAddToCart(this.item.action, this.logged);
	}

	/**
	 * @public
	 * @method gotoProduct
	 * @description Go to product page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { ProductModel } product
	 */
	public gotoProduct(product: ProductModel): void{
		this.commonProvider.analyticsLogEvent('select_content', {
			content_type: 'Product',
			item_id: 'product_' + product.sku
		});

		this.navCtrl.push('ProductPage', {
			product: product.sku
		}).catch(err => {
			console.error('Home Page - gotoProduct() - push()', err);

			let toast = this.commonProvider.toast('Unable to navigate to page' + err.message);
			toast.present();
		});
	}
}
