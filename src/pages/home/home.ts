import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Slides, Events } from 'ionic-angular';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { BlogPostModel, Type } from '../../models/magento/magefan/blog';
import { TisSlideModel, TisDealModel, TisParamModel } from '../../models/tng/tis';
import { ProductItemModel } from '../../models/ionic/page/home';
import { SearchProductResponseModel } from '../../models/ionic/provider/magento/catalog';

// Providers
import { AlgoliaProvider } from '../../providers/api/algolia';
import { AmastyGroupcatProvider } from '../../providers/magento/amasty/groupcat';
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CatalogProvider } from '../../providers/magento/catalog';
import { CommonProvider } from '../../providers/ionic/common';
import { MagefanBlogProvider } from '../../providers/magento/magefan/blog';
import { TisProvider } from '../../providers/tng/tis';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})

export class HomePage {

	// Banner slider
	@ViewChild('homeSlider') homeSlider: Slides;
	public slides: Array<TisSlideModel> = [];

	// Front deals
	public deals: Array<TisDealModel> = [];

	// Common
	public loading = this.commonProvider.pageLoading();

	// User/Cart
	public cart: CartModel;
	public logged: boolean;

	// Top product sliders
	public newArrivals: any;
	public topPicks: any;
	public showNewArrivals: boolean = false;
	public showTopPicks: boolean = false;

	// Blogs
	public posts: Array<BlogPostModel> = [];

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { LoadingController } loadingCtrl
	 * @param { ToastController } toastCtrl
	 * @param { Events } events
	 * @param { AlgoliaProvider } algoliaProvider
	 * @param { AmastyGroupcatProvider } amastyGroupCatProvider
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CatalogProvider } catalogProvider
	 * @param { MagefanBlogProvider } magefanBlogProvider
	 * @param { CommonProvider } commonProvider
	 * @param { TisProvider } tisProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController, 
		public toastCtrl: ToastController,
		public events: Events,
		public algoliaProvider: AlgoliaProvider,
		public amastyGroupCatProvider: AmastyGroupcatProvider,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public catalogProvider: CatalogProvider,
		public magefanBlogProvider: MagefanBlogProvider,
		public commonProvider: CommonProvider,
		public tisProvider: TisProvider){
		// This will need to be called prior to ionViewDidLoad
		this.getBannerSlides();
		this.getFrontDeals();
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 */
	public ionViewDidLoad(){
		this.cart = this.authProvider.getCurrentCartProvider();

		// Check if cart is not null and has customer id
		if(this.cart !== null && this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		this.events.publish('app:changeAccountMenu', this.logged);

		// Retrieve the new arrivals
		this.getNewArrivalProducts();

		// Retrieve the top picks
		this.getTopPicksProducts();

		// Retrieve the latest two blog entries
		this.getBlogEntries();

		this.loading.onDidDismiss(() => {
			this.showNewArrivals = true;
		});
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_home',
			item_name: 'Home Page',
			item_category: 'Page'
		});

		this.commonProvider.analyticsLogEvent('view_item_list', {
			item_category: 'Product'
		});
	}

	// GET DYNAMIC CONTENT METHODS

	/**
	 * @private
	 * @method getBannerSlides
	 * @description Gather the banner slides
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	private getBannerSlides(): void{
		this.tisProvider.readBannerSlides().subscribe(data => {
			for(let slide of data){
				this.slides.push(slide);
			}
		});
	}

	/**
	 * @private
	 * @method getBannerSlides
	 * @description Gather the front deals
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	private getFrontDeals(): void{
		this.tisProvider.readFrontDeals().subscribe(data => {
			for(let deal of data){
				this.deals.push(deal);
			}
		});
	}

	/**
	 * @private
	 * @method getNewArrivalProducts
	 * @description Gather the new arrival products
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	private getNewArrivalProducts(): void{
		this.homeSlider.stopAutoplay();

		this.catalogProvider.readCategoryProductsBySearch(2078).subscribe(data => {
			this.newArrivals = this.processSearch(data);
			this.showNewArrivals = true;

			this.homeSlider.loop = true;
			this.homeSlider.autoplay = 5000;

			// Getting an undefined is undefined error message
			if(this.homeSlider != undefined){
				this.homeSlider.startAutoplay();	
			}
			
		}, err => console.error('HomePage - ionViewDidLoad() - readCategoryProductsBySearch(2078)', err));
	}

	/**
	 * @private
	 * @method getTopPicksProducts
	 * @description Gather the top pick products
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	private getTopPicksProducts(): void{
		this.catalogProvider.readCategoryProductsBySearch(1780).subscribe(data => {
			this.topPicks = this.processSearch(data);
		}, err => console.error('HomePage - ionViewDidLoad() - readCategoryProductsBySearch(1780)', err));
	}

	/**
	 * @private
	 * @method getBlogEntries
	 * @description Get the latest blog entries
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	private getBlogEntries(): void{
		this.magefanBlogProvider.getPostList(Type.Category, '1', 0, 2).subscribe(data => {

			if(data.posts){
				this.posts = data.posts;
			}
		}, err => console.error('HomePage - getBlogEntries() - getPostList()'));
	}

	// MISC METHODS

	/**
	 * @public
	 * @method toggleNewTop
	 * @description Toggle new arrivals and top picks
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param string show ('new' or 'top')
	 * @todo Might want to make an enum
	 */
	public toggleNewTop(show: string): void{
		if(show === 'new'){
			this.showNewArrivals = !this.showNewArrivals;
		} else if(show === 'top'){
			this.showTopPicks = !this.showTopPicks;
		} else {
			console.error('Invalid command');
		}
	}

	/**
	 * @private
	 * @method processSearch
	 * @description Process the search results then compose the item listing
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { SearchProductResponseModel } products
	 * @return { Array<ProductItemModel> }
	 */
	private processSearch(products: SearchProductResponseModel): Array<ProductItemModel>{
		let array: Array<ProductItemModel> = [];
		let skus: Array<string> = [];

		for(let product of products.items){
			skus.push(product.sku);
		}

		this.amastyGroupCatProvider.productsAction(this.logged, skus).subscribe(data => {
			for(let action of data.items){
				for(let product of products.items){
					if(action.sku === product.sku){
						let item: ProductItemModel = new ProductItemModel();
						item.product = product;
						item.action = action.action;

						array.push(item);
						break; // stop second loop and continue first loop
					}
				}
			}
		}, err => console.error('HomePage - processSearch() - productsAction()', err));

		return array;
	}

	// GOTO METHODS

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
	 * @method gotoProduct (click)
	 * @description Go to a product
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } sku
	 */
	public gotoProduct(sku: string): void{
		if(sku){
			this.commonProvider.analyticsLogEvent('select_content', {
				content_type: 'Product',
				item_id: 'product_' + sku
			});

			this.navCtrl.push('ProductPage', {
				product: sku
			});
		}
	}

	/**
	 * @public
	 * @method gotoBanner (click)
	 * @description Go to advertised banner
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { TisSlideModel } slide
	 */
	public gotoSearchWithSlide(slide: TisSlideModel): void{
		let search: string = '';
		
		this.algoliaProvider.clearSearch();

		for(let filter of slide.filter_params){
			this.tisSearchFilterParams(filter);

			if(filter.attribute === 'search'){
				search = filter.attribute_value;
			}
		}

		this.navCtrl.push('FeedsPage', {
			flag: 'text',
			search: search
		});
	}

	/**
	 * @public
	 * @method gotoBanner (click)
	 * @description Go to front deal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { TisDealModel } deal
	 */
	public gotoSearchWithDeal(deal: TisDealModel): void{
		let search: string = '';
		let searchResult: boolean = true;

		this.algoliaProvider.clearSearch();

		for(let filter of deal.filter_params){
			switch(deal.type){
				case 'product':
					searchResult = false;
					this.gotoProduct(filter.attribute_value);
					break;
				// end product case
				case 'search':
					this.tisSearchFilterParams(filter);

					if(filter.attribute === 'search'){
						search = filter.attribute_value;	
					}
					
					break;
				// end search case
			}
		}

		if(searchResult){
			this.navCtrl.push('FeedsPage', {
				flag: 'text',
				search: search
			});	
		}
	}

	// FILTER METHODS

	/**
	 * @private
	 * @method tisSearchFilterParams
	 * @description Go through TIS parameters
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { TisParamModel } param
	 */
	private tisSearchFilterParams(param: TisParamModel): void{
		switch(param.attribute){
			case 'categories.level0':
				sessionStorage.setItem('searchCategory0', param.attribute_value);
				break;
			// categories.level0
			case 'categories.level1':
				sessionStorage.setItem('searchCategory1', param.attribute_value);
				break;
			// categories.level1
			case 'categories.level2':
				sessionStorage.setItem('searchCategory2', param.attribute_value);
				break;
			// categories.level2
			case 'categories.level3':
				sessionStorage.setItem('searchCategory3', param.attribute_value);
				break;
			// categories.level3
			case 'manufacturer':
				sessionStorage.setItem('searchManufacturer', param.attribute_value);
				break;
			// manufacturer
			case 'collections':
				sessionStorage.setItem('searchCollections', param.attribute_value);
				break;
			// collections
			case 'tags':
				sessionStorage.setItem('searchTags', param.attribute_value);
				break;
			// tags
			case 'search':
				sessionStorage.setItem('searchQuery', param.attribute_value);
				break;
			// search
		}
	}

	// REFRESH METHOD

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
			this.cartProvider.getCart().subscribe(data => {
				this.cart = data.cart;
				this.logged = data.logged;
				this.authProvider.setCurrentCartProvider(data.cart);

				// Close the accordion menus
				this.showNewArrivals = false;
				this.showTopPicks = false;

				// Clear out the dynamic content
				this.newArrivals = [];
				this.topPicks = [];
				this.slides = [];
				this.deals = [];

				// Now retrieve the dynamic content
				this.getBannerSlides();
				this.getFrontDeals();
				this.getNewArrivalProducts();
				this.getTopPicksProducts();

				event.complete();
			}, err => {
				console.error('HomePage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}