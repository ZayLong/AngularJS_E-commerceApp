import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { GroupcatProductActionModel } from '../../models/magento/amasty/groupcat';
import { ProductModel } from '../../models/magento/catalog/product';
import { ProductAttributeModel, ProductAttributeOptionModel } from '../../models/magento/catalog/product-attribute';
import { ProductSpecificationModel } from '../../models/ionic/page/product';

// Native
import { SocialSharing } from '@ionic-native/social-sharing';

// Providers
import { AlgoliaProvider } from '../../providers/api/algolia';
import { AmastyGroupcatProvider } from '../../providers/magento/amasty/groupcat';
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CatalogProvider } from '../../providers/magento/catalog';
import { CommonProvider } from '../../providers/ionic/common';
import { WishlistProvider } from '../../providers/magento/wishlist';

// RXJS
import { forkJoin } from "rxjs/observable/forkJoin";

@IonicPage()
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})

export class ProductPage {
	// Components
	public loading = this.commonProvider.pageLoading();

	// Product
	public product: ProductModel;
	public productAction: GroupcatProductActionModel;

	// Product Attributes
	public specs: ProductSpecificationModel = new ProductSpecificationModel;

	// Options
	public tabSegments: string = 'specifications';
	public priceDropEmail: string = '';

	// User/Cart
	public cart: CartModel;
	public logged: boolean;

	// Page Flags
	public addedToWishlist: boolean = false;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.1
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ToastController } toastCtrl
	 * @param { Events } events
	 * @param { SocialSharing } social
	 * @param { AlgoliaProvider } algoliaProvider
	 * @param { AmastyGroupcatProvider } amastyGroupcatProvider
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CatalogProvider } catalogProvider
	 * @param { CommonProvider } commonProvider
	 * @param { WishlistProvider } wishlistProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public events: Events,
		public social: SocialSharing,
		public algoliaProvider: AlgoliaProvider,
		public amastyGroupcatProvider: AmastyGroupcatProvider,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public catalogProvider: CatalogProvider,
		public commonProvider: CommonProvider,
		public wishlistProvider: WishlistProvider) {

		// If any changes made from minicart, then refresh the cart data
		this.events.subscribe('minicart:refreshPage', () => {
			this.cartProvider.cart(this.logged).subscribe(data => {
				this.authProvider.setCurrentCartProvider(data);

				this.refreshCart();
			}, err => {
				console.error('ProductPage - ionViewDidLoad()');

				this.refreshCart();
			});
		});
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.1
	 */
	public ionViewDidLoad() {
		this.refreshCart();

		this.getSku(false);
	}

	/**
	 * @private
	 * @method refreshCart
	 * @description Refresh the cart data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 */
	private refreshCart(): void{
		console.log('ProductPage - refreshCart()');
		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		console.log('IonViewDidEnter');
		// Firebase code in loadProduct
	}

	/**
	 * @private
	 * @method getSku
	 * @description Retrieve the SKU either by page transition or history
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 * @todo Try to get deeplinking to work
	 * @param { boolean } refresh
	 */
	private getSku(refresh: boolean): void{
		let sku: string = '';

		if(this.navParams.get('product')){
			sku = this.navParams.get('product');
			sessionStorage.setItem('productSku', sku);

			this.loadProduct(sku, refresh);
		} else {
			sku = sessionStorage.getItem('productSku')
			this.loadProduct(sku, refresh);
		}
	}

	/**
	 * @private
	 * @method loadProduct
	 * @description Load product data to page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } sku
	 * @param { boolean } refresh
	 * @version 1.5.0
	 */
	private loadProduct(sku: string, refresh: boolean): void{
		let requests = [];
		requests.push(this.catalogProvider.readProduct(sku));
		requests.push(this.amastyGroupcatProvider.productAction(this.logged, sku));

		forkJoin(requests).subscribe(data => {
			// console.info('ProductPage - loadProduct() - forkJoin()', data);

			this.product = data[0] as ProductModel;
			this.productAction = data[1] as GroupcatProductActionModel;

			// If we are refreshing the page, do not send a firebase event
			if(!refresh){
				this.commonProvider.analyticsLogEvent('view_item', {
					item_id: 'product_' + this.product.sku,
					item_name: this.product.name,
					item_category: 'Product'
				});	
			}
			
			this.updateProduct();
		}, err => console.error('ProductPage - ionViewDidLoad() - forkJoin()', err));
	}

	/**
	 * @public
	 * @method updateProduct
	 * @description Update the product model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.1
	 * @todo Do we need to update the product model instead of just making new variables?
	 */
	public updateProduct(): void{
		let attributes = [
			this.catalogProvider.readProductAttributeByCode('manufacturer'),
			this.catalogProvider.readProductAttributeByCode('collections'),
			this.catalogProvider.readProductAttributeByCode('polish_group'),
			this.catalogProvider.readProductAttributeByCode('tags'),
			this.catalogProvider.readProductAttributeByCode('color')
		];

		forkJoin(attributes).subscribe(data => {
			// console.info('ProductPage - updateProduct() - readProductAttributeByCode()', data);

			let manufacturer = data[0] as ProductAttributeModel;
			let collections = data[1] as ProductAttributeModel;
			let polish = data[2] as ProductAttributeModel;
			let tags = data[3] as ProductAttributeModel;
			let color = data[4] as ProductAttributeModel;

			let attributeManufacturer = this.product.get_custom_attribute('manufacturer');
			let attributeCollections = this.product.get_custom_attribute('collections');
			let attributePolish = this.product.get_custom_attribute('polish_group');
			let attributeTags = this.product.get_custom_attribute('tags');
			let attributeColor = this.product.get_custom_attribute('color');

			if(attributeManufacturer != undefined && attributeManufacturer.value != null){
				this.specs.branding = manufacturer.optionByValue( attributeManufacturer.value );
			}

			if(attributeCollections != undefined && attributeCollections.value != null){
				this.specs.collection = collections.optionByValue( attributeCollections.value );
			}

			if(attributePolish != undefined && attributePolish.value != null){
				this.specs.polish = polish.optionByValue( attributePolish.value );
			}

			if(attributeTags != undefined && attributeTags.value != null){
				this.specs.tag = tags.optionByValue( attributeTags.value );
			}

			if(attributeColor != undefined && attributeColor.value != null){
				this.specs.color = color.optionByValue( attributeColor.value );
			}

		}, err => console.error('ProductPage - updateProduct() - readProductAttributeByCode()', err));
	}

	// ADD TO METHODS

	/**
	 * @public
	 * @method addToWishlist
	 * @description Add product to wishlist
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.2
	 * @param { ProductModel } product
	 */
	public addToWishlist(product: ProductModel): void{
		console.info('ProductPage - addToWishlist() - addProductToWishlist()', product);

		if(this.logged){
			this.wishlistProvider.addProductToWishlist(product, false).subscribe(data => {
				let toast = this.commonProvider.toast('Product added to wishlist successfully');
				toast.present();

				this.events.publish('app:getWishlist');

				// Firebase event
				this.commonProvider.analyticsLogEvent('add_to_wishlist', {
					item_id: 'product_' + product.sku,
					item_name: product.name,
					item_category: 'Product',
					quantity: 1,
					price: product.price,
					value: product.price, // this one would be for price * quantity
					currency: 'USD'
				});

				// Show the Go To Wishlist Page button
				this.addedToWishlist = true;
			}, err => {
				console.error('ProductPage - addToWishlist() - addProductToWishlist()', err);

				let toast = this.commonProvider.toast('Product added to wishlist failed');
				toast.present();
			});
		}
	}

	// GOTO METHODS

	/**
	 * @public
	 * @method gotoCategory
	 * @description Go to the feed page with a category search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } id
	 */
	public gotoCategory(id: number): void{
		this.algoliaProvider.clearSearch();

		this.navCtrl.push('FeedsPage', {
			category: id,
			flag: 'category'
		});
	}

	/**
	 * @public
	 * @method gotoManufacturer
	 * @description Go to the feed page with a manufacturer search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { ProductAttributeOptionModel } manufacturer
	 */
	public gotoManufacturer(manufacturer: ProductAttributeOptionModel): void{
		this.algoliaProvider.clearSearch();
		
		sessionStorage.setItem('searchManufacturer', manufacturer.label);

		this.navCtrl.push('FeedsPage', {
			flag: 'text',
			search: ''
		});
	}

	/**
	 * @public
	 * @method gotoPage (click)
	 * @description Go to a page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } page
	 */
	public gotoPage(page: string): void{
		if(page){
			this.navCtrl.push(page);
		}
	}

	/**
	 * @public
	 * @method share (click)
	 * @description Share the product to various apps and services
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	public share(): void{
		this.social.shareWithOptions({
			message: '',
			subject: this.product.name,
			files: this.product.imageThumbnailPath(),
			url: this.product.urlStorePath(),
			chooserTitle: 'Share ' + this.product.name
		}).then(data => {
			console.info('ProductPage - share() - shareWithOptions()', data);

			// Uncomment to bring back
			//let appName = this.extractShareComponent(data.app);

			if(!data.completed){ // This will always return false, sigh...
				// Unfortunally, with the SocialSharing app not giving a precise success/fail callback; I will disable this code block for now till that is fixed. Unless I just do separate apps. :\

				let toast = this.commonProvider.toast('Product Shared');
				toast.present();

				/* Remove comments to enable it
				this.commonProvider.analyticsLogEvent('share', {
					content_type: 'Product', 
					item_id: 'product_' + this.product.sku,
					method: appName
				});
				*/
			}
			
		}).catch(onrejected => {
			console.error('ProductPage - share() - shareWithOptions()', onrejected);

			let toast = this.commonProvider.toast('Unable to share product.');
			toast.present();
		});
	}

	/**
	 * @private
	 * @method extractShareComponent
	 * @description Extract the shared component data from after sharing
	 * @desc This is to get the name of the component for Firebase
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 * @param { string } component
	 * @return { string }
	 */
	private extractShareComponent(component: string): string{
		// Find the first substring then remove it
		let trimLeftFind: string = 'ComponentInfo{';
		let trimLeftStartPosition: number = component.indexOf(trimLeftFind);
		let trimLeftEndPosition: number = component.indexOf('/', trimLeftStartPosition);

		let appname: string = component.substring(trimLeftStartPosition + trimLeftFind.length, trimLeftEndPosition).trim();

		return appname;
	}

	/**
	 * @public
	 * @method refresh (refresher)
	 * @description Perform a refresh
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.5.2
	 * @param { any } event
	 */
	public refresh(event: any): void{
		setTimeout(() => {
			event.complete();

			this.cartProvider.getCart().subscribe(data => {
				this.logged = data.logged;
				this.cart = data.cart;
				this.authProvider.setCurrentCartProvider(data.cart);

				this.getSku(true); // When reloading the product, flag it as refreshing

				event.complete();
			}, err => {
				console.error('ProductPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
