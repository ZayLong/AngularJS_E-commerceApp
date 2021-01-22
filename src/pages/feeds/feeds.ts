import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// 3rd Party
import AlgoliaClient from 'algoliasearch';

// Modals
import { FeedFilterModal } from '../../modals/feeds/feed-filter/feed-filter';

// Models
import { AlgoliaSearchResultModel, AlgoliaSearchIndex } from '../../models/api/algolia';
import { CartModel } from '../../models/magento/cart/cart';
import { CategoryItemModel } from '../../models/magento/catalog/category';

import { 
	FilterModel, 
	SearchModel, 
	ProductItemModel, 
	FilterOptionModel,
	FilterCategoryOptionModel
} from '../../models/ionic/page/feeds';

// Providers
import { AlgoliaProvider } from '../../providers/api/algolia';
import { AmastyGroupcatProvider } from '../../providers/magento/amasty/groupcat';
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CatalogProvider } from '../../providers/magento/catalog';
import { CommonProvider } from '../../providers/ionic/common';

// RXJS
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
	selector: 'page-feeds',
	templateUrl: 'feeds.html',
})

export class FeedsPage {

	// Components
	public loading = this.commonProvider.pageLoading();
	public loadingMessage: string;
	public showLoadingComponent: boolean = true; // Let the products load up

	public disableFilterModal: boolean = true; // Let the filter options be constructed

	// Customer
	public logged: boolean;
	public cart: CartModel;

	// Products
	public items: Array<any> = [];
	public display: string;

	// Flag
	public flag: string;

	// Categories
	public category: CategoryItemModel; // Main category for category mode
	public breadcrumbs: Array<CategoryItemModel> = []; // Path to main category
	public breadcrumbPath: Array<string> = []; // Used for translating to Algolia
	public children: Array<CategoryItemModel> = []; // Children of the main category

	// Select Options
	public sortBy: Array<{ key: string, value: string }>;
	public sortByAttributes: any;

	// Paging Count Options
	public pagingCount: Array<{ key: string, value: string }>;
	public pagingCountAttributes: any;

	// Filter Options
	public filter: FilterModel = new FilterModel();

	// Search Filters
	public search: SearchModel = new SearchModel();

	// Algolia
	public algoliaQuery: AlgoliaClient.AlgoliaQueryParameters = {};

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.1
 	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ModalController } modalCtrl
	 * @param { Events } events
	 * @param { Storage } storage
	 * @param { AlgoliaProvider } algoliaProvider
	 * @param { AmastyGroupcatProvider } amastyGroupcatProvider
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CatalogProvider } catalogProvider
	 * @param { CommonProvider } commonProvider
	 */
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public events: Events,
		public storage: Storage,
		public algoliaProvider: AlgoliaProvider,
		public amastyGroupcatProvider: AmastyGroupcatProvider,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public catalogProvider: CatalogProvider,
		public commonProvider: CommonProvider) {

		// this.events.publish('app:getUser');
		
		this.sortBy = [
			//{ key: 'Position', value: 'position' },
			//{ key: 'Product Name', value: 'name' },
			{ key: 'Price', value: 'price' },
			//{ key: 'Collection', value: 'collections' }
			{ key: 'Released', value: 'releasedAt' },
			{ key: 'Best Sellers', value: 'bestSeller' }
		];

		this.sortByAttributes = {
			title: 'Order By'
		};

		this.pagingCount = [
			{ key: '32', value: '32' },
			{ key: '64', value: '64' },
			{ key: '96', value: '96' }
		];

		this.pagingCountAttributes = {
			title: 'Items per page'
		};

		this.generateStorageValues();		
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart != null && this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		let flag: string = sessionStorage.getItem('searchFlag');

		// Fetch search display option
		if(sessionStorage.getItem('searchDisplay')){
			this.display = sessionStorage.getItem('searchDisplay');	
		} else {
			// If nothing in storage, then add it to storage with list display
			this.display = 'list';
			sessionStorage.setItem('searchDisplay', 'list');
		}

		switch(flag){
			case 'category':
			this.loadingMessage = 'Loading...';
				this.flag = 'category';
				this.categoryFeedMode();
				break;
			case 'text':
				this.flag = 'text';
				this.loadingMessage = 'Searching ' + this.search.query;
				this.textFeedMode();
				break;
			case null:
			case undefined:
			default:
				console.error('FeedsPage - ionViewDidLoad() - Flag is Null');
		}
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_feeds',
			item_name: 'Search Page',
			item_category: 'Page'
		});

		this.commonProvider.analyticsLogEvent('view_item_list', {
			item_category: 'Product'
		});
	}

	// FEED TYPE

	/**
	 * @private
	 * @method categoryFeedMode
	 * @description Category mode for Feed Page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private categoryFeedMode(): void{
		let category: number = this.navParams.get('category');

		if(category){
			sessionStorage.setItem('searchQuery', category.toString());
		}

		this.search.query = sessionStorage.getItem('searchQuery');

		this.commonProvider.analyticsLogEvent('view_search_results', {
			search_term: 'Category Search: ' + this.search.query
		});

		this.readCategory();
	}

	/**
	 * @private
	 * @method readCategory
	 * @description Read the category data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private readCategory(): void{
		if(this.search.query){
			this.catalogProvider.readCategory(parseInt(this.search.query)).subscribe(data => {
				this.category = data;

				// Since we used a level 0 category, set the search filter for category level 0 to this category
				this.search.set_category(this.category.name, 0);
				sessionStorage.setItem('searchCategory0', this.category.name);

				this.generateProductFeed();
			}, err => {
				console.error('FeedsPage - categoryFeed() - readCategory()', err);
			});
		}	
	}

	/**
	 * @private
	 * @method searchFeedMode
	 * @description Text mode for Feed Page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private textFeedMode(): void{
		let query: string = this.navParams.get('search');
		// Set query string to storage
		if(query){
			sessionStorage.setItem('searchQuery', query);
		}

		this.search.query = sessionStorage.getItem('searchQuery');

		this.commonProvider.analyticsLogEvent('view_search_results', {
			search_term: 'Search: ' + this.search.query
		});

		this.generateProductFeed();
	}

	// SORT BY

	/**
	 * @private
	 * @method switchDirection
	 * @description Switch the order direction with results
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param string direction
	 * @desc This is detected not being used.
	 */
	private switchDirection(direction: string): void{
		// Set the order direction to variable and session storage
		this.search.order.direction = direction;
		sessionStorage.setItem('searchOrderDirection', this.search.order.direction);

		// Then reload the product feed
		this.generateProductFeed();
	}

	/**
	 * @private
	 * @method switchField
	 * @description Switch the order field (price, name, etc...)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param string field
	 * @desc This is detected as not being used.
	 */
	private switchField(field: string): void{
		// Set the order type to variable and session storage
		this.search.order.field = field;
		sessionStorage.setItem('searchOrderField', this.search.order.field);
		
		// Then reload the product feed
		this.generateProductFeed();
	}

	// PAGING

	/**
	 * @public
	 * @method pageFeed
	 * @description Go to page in the feed
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses PagingComponent
	 * @param { number } page
	 */
	public pageFeed(page: number): void{
		this.search.paging.current = page;
		sessionStorage.setItem('searchCurrentPage', this.search.paging.current.toString());

		this.generateProductFeed();
	}

	/**
	 * @public
	 * @method switchCount
	 * @description Change the amount of items per page
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param string count
	 */
	public switchCount(count: string): void{
		this.search.paging.count = parseInt(count);
		sessionStorage.setItem('searchPageCount', this.search.paging.count.toString());

		this.generateProductFeed();
	}

	// GENERATORS

	/**
	 * @private
	 * @method generateProductFeed
	 * @description Generate the product feed
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Algolia
	 */
	private generateProductFeed(): void{
		// Show the loading component to let the user know products will be showing eventually
		this.showLoadingComponent = true;

		// Determine the search index
		switch(this.search.order.field){
			case 'price':

				if(this.search.order.direction === 'ASC'){
					this.algoliaProvider.indexId = AlgoliaSearchIndex.PriceAsc;
				} else {
					this.algoliaProvider.indexId = AlgoliaSearchIndex.PriceDesc;
				}

				break;
			// end case price
			case 'releasedAt':

				if(this.search.order.direction === 'ASC'){
					this.algoliaProvider.indexId = AlgoliaSearchIndex.CreatedAtAsc;
				} else {
					this.algoliaProvider.indexId = AlgoliaSearchIndex.CreatedAtDesc;
				}

				break;
			// end case releasedAt
			case 'bestSeller':
				if(this.search.order.direction === 'ASC'){
					this.algoliaProvider.indexId = AlgoliaSearchIndex.BestSellerAsc;
				} else {
					this.algoliaProvider.indexId = AlgoliaSearchIndex.BestSellerDesc;
				}

				break;
			// end case bestSeller
		}

		// Go through the session storage values
		this.generateStorageValues();

		// Modify the algolia search query
		let productSearch = this.generateSearchCriteria();
		
		// Perform an algolia search query to retrieve product information
		this.algoliaProvider.readProducts(productSearch).then(data => {
			console.info('FeedsPage - generateProductFeed() - readProducts()', data);

			// Transform the data response to an object to work with
			let result: AlgoliaSearchResultModel = this.algoliaProvider.getAlgoliaSearchResultModel(data);

			// Check if any hits from the Algolia search results
			if(result.hits.length > 0){
				// There are products found from this result
				this.generateResults(result);
			} else {
				// No hits, this will show the "No product found" message and stop showing the loading component
				this.showLoadingComponent = false; // Stop showing the loading component since there are no products found
			}
		}, err => console.error('FeedsPage - generateProductFeed() - readProducts()', err));
	}

	/**
	 * @private
	 * @method generateResults
	 * @description Generate the data from the Algolia result
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Algolia
	 * @param AlgoliaSearchResultModel result
	 */
	private generateResults(result: AlgoliaSearchResultModel): void{
		this.items = []; // Clear out the old response

		this.generateProductItem(result.hits).subscribe(data => {
			// Stop show the loading component since products have been loaded
			this.showLoadingComponent = false;

			// Create an array of items with algolia details and product actions
			this.items = data;

			// Get the total number of pages for the pager
			this.search.paging.total = result.nbPages;

			// Get the categories
			if(result.facets['categories.level0'] != undefined){
				this.filter.categories.level0 = this.categoryOptions(result.facets['categories.level0']);
			}

			if(result.facets['categories.level1'] != undefined){
				this.filter.categories.level1 = this.categoryOptions(result.facets['categories.level1']);
			}

			if(result.facets['categories.level2'] != undefined){
				this.filter.categories.level2 = this.categoryOptions(result.facets['categories.level2']);
			}

			if(result.facets['categories.level3'] != undefined){
				this.filter.categories.level3 = this.categoryOptions(result.facets['categories.level3']);
			}


			// Compile the filter options from facets
			if(result.facets_stats['price.USD.default']){
				this.filter.prices.min = result.facets_stats['price.USD.default'].min;
				this.filter.prices.max = result.facets_stats['price.USD.default'].max;
			}
			
			if(result.facets.color){
				this.filter.colors = this.facetOptions(result.facets.color);
			}

			if(result.facets.manufacturer){
				this.filter.manufacturers = this.facetOptions(result.facets.manufacturer);
			}

			if(result.facets.collections){
				this.filter.collections = this.facetOptions(result.facets.collections);
			}

			if(result.facets.tags){
				this.filter.tags = this.facetOptions(result.facets.tags);
			}
		});
	}

	/**
	 * @private
	 * @method generateProductItem
	 * @description Generate the items that will store Algolia product items and Amasty product rules
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Algolia.hits } items
	 * @return { Observable<Array<ProductItemModel>> }
	 */
	private generateProductItem(items): Observable<Array<ProductItemModel>>{
		return Observable.create(observer => {
			let array: Array<ProductItemModel> = [];
			let skus: Array<string> = [];

			// Create the array needed to make the actions for the products
			for(let item of items){
				skus.push(item.sku);
			}

			this.amastyGroupcatProvider.productsAction(this.logged, skus).subscribe(data => {
				for(let action of data.items){
					for(let item of items){
						if(item.sku.toString() === action.sku){
							let model: ProductItemModel = new ProductItemModel();
							model.product = item;
							model.action = action.action;

							array.push(model);

							break;
						}
					}
				}

				observer.next(array);
			}, err => {
				console.error('FeedsPage - generateProductItem() - productsAction()', err);
				observer.error(err);
			});
		})
	}

	/**
	 * @private
	 * @method generateStorageValues
	 * @description Go through the session variables, and refresh the search values
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private generateStorageValues() : void{
		// Set other options from session storage

		// Categories

		for(let i = 0; i < 4; i++){
			if(sessionStorage.getItem('searchCategory' + i)){
				this.search.set_category(sessionStorage.getItem('searchCategory' + i), i);
			} else {
				sessionStorage.setItem('searchCategory' + i, '')
			}
		}

		// Facets

		if(sessionStorage.getItem('searchColor')){
			this.search.color = sessionStorage.getItem('searchColor');
		} else {
			sessionStorage.setItem('searchColor', '')
		}

		if(sessionStorage.getItem('searchManufacturer')){
			this.search.manufacturer = sessionStorage.getItem('searchManufacturer');
		} else {
			sessionStorage.setItem('searchManufacturer', '')
		}

		if(sessionStorage.getItem('searchCollections')){
			this.search.collection = sessionStorage.getItem('searchCollections');
		} else {
			sessionStorage.setItem('searchCollections', '')
		}

		if(sessionStorage.getItem('searchTags')){
			this.search.tag = sessionStorage.getItem('searchTags');
		} else {
			sessionStorage.setItem('searchTags', '')
		}

		if(sessionStorage.getItem('searchPriceLower')){
			this.search.prices.lower = parseFloat(sessionStorage.getItem('searchPriceLower'));
		} else {
			sessionStorage.setItem('searchPriceLower', '')
		}

		if(sessionStorage.getItem('searchPriceUpper')){
			this.search.prices.upper = parseFloat(sessionStorage.getItem('searchPriceUpper'));
		} else {
			sessionStorage.setItem('searchPriceUpper', '')
		}

		// Order Values

		if(sessionStorage.getItem('searchOrderField')){
			this.search.order.field = sessionStorage.getItem('searchOrderField');
		} else {
			sessionStorage.setItem('searchOrderField', 'releasedAt')
		}

		if(sessionStorage.getItem('searchOrderDirection')){
			this.search.order.direction = sessionStorage.getItem('searchOrderDirection');
		} else {
			sessionStorage.setItem('searchOrderDirection', 'ASC')
		}

		// Paging
		if(sessionStorage.getItem('searchCurrentPage')){
			this.search.paging.current = parseInt(sessionStorage.getItem('searchCurrentPage'));
		} else {
			sessionStorage.setItem('searchCurrentPage', '1')
		}

		if(sessionStorage.getItem('searchPageCount')){
			this.search.paging.count = parseInt(sessionStorage.getItem('searchPageCount'));
		} else {
			sessionStorage.setItem('searchPageCount', '32')
		}

		// Mode

		// Set the flag if param is available
		if(this.navParams.get('flag')){
			sessionStorage.setItem('searchFlag', this.navParams.get('flag'))
		}
	}

	/**
	 * @private
	 * @method generateSearchCriteria
	 * @description Generate the search filter results for Algolia
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses Algolia
	 * @param boolean allitems (defaults at false)
	 * @return AlgoliaClient.AlgoliaQueryParameters
	 */
	private generateSearchCriteria(allitems: boolean = false): AlgoliaClient.AlgoliaQueryParameters{
		// Algolia Search
		let filtersArray = [];

		let flag: string = sessionStorage.getItem('searchFlag');

		if(flag == 'text'){
			if(this.search.query){
				this.algoliaQuery.query = this.search.query;
			}
		}

		// Create the category strings for the search query from an array
		for(let i = 0; i < 4; i++){
			// If there is a value, then create the appropriate string
			if(this.search.get_category(i)){
				let iterator: number = 0;
				let path: Array<string> = [];

				while(iterator <= i){
					path.push(this.search.get_category(iterator));
					iterator++;
				}

				filtersArray.push('categories.level' + i + ':\"' + path.join(' /// ') + '\"');
			} else {
				break; // If one value is empty then the rest SHOULD be empty or ignored
			}
		}
		

		if(this.search.prices.lower && this.search.prices.upper){
			filtersArray.push('price: ' + this.search.prices.lower + ' TO ' + this.search.prices.upper);
		}

		if(this.search.color){
			filtersArray.push('color:' + this.search.color);
		}

		if(this.search.manufacturer){
			filtersArray.push('manufacturer:"' + this.search.manufacturer + '"');
		}

		if(this.search.collection){
			filtersArray.push('collections:"' + this.search.collection + '"');
		}

		if(this.search.tag){
			filtersArray.push('tags:"' + this.search.tag + '"');
		}

		// Add other filter criteria

		// If requesting for not all items, then ask for a page search model, otherwise do not add such model to search criteria
		if(!allitems){
			// Algolia Search
			this.algoliaQuery.page = this.search.paging.current - 1;
			this.algoliaQuery.hitsPerPage = this.search.paging.count;
		}

		this.algoliaQuery.filters = filtersArray.join(' AND ');

		//console.info('FeedsPage - generateSearchCriteria() - algoliaQuery', this.algoliaQuery);

		this.algoliaQuery.facets = '*';
		return this.algoliaQuery;
	}

	// FILTERS

	/**
	 * @private
	 * @method facetOptions
	 * @description Gather the facet data from Algolia search result
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return Array<FilterOptionModel>
	 */
	private facetOptions(data: any): Array<FilterOptionModel>{
		let options: Array<FilterOptionModel> = [];
		let facetNames = Object.getOwnPropertyNames(data); // Get the name of the keys

		for(let name of facetNames){
			let option: FilterOptionModel = new FilterOptionModel();
			option.name = name;
			option.value = data[name];

			options.push(option)
		}

		return options;
	}

	/**
	 * @private
	 * @method categoryOptions
	 * @description Gather the category facet data from Algolia search result
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return Array<>
	 */
	private categoryOptions(data: any): Array<FilterCategoryOptionModel>{
		let basicOptions: Array<FilterOptionModel> = this.facetOptions(data);
		let options: Array<FilterCategoryOptionModel> = [];

		for(let basic of basicOptions){
			let option: FilterCategoryOptionModel = new FilterCategoryOptionModel();
			option.value = basic.value;

			// Now find the parent which will be the main level minus one (ex. level2's parent will be index 1)
			let split: Array<string> = basic.name.split(' /// ');

			// Check if split array is longer than one (parent found)
			if(split.length > 1){
				option.name = split[split.length - 1]; // Go back one for zero (0) index
				option.parent = split[split.length - 2]; // Go back one for zero (0) index and one back for prior
			} else {
				option.name = basic.name;
				option.parent = null;
			}

			options.push(option);
		}

		return options;
	}

	/**
	 * @private
	 * @method clearFilter (click)
	 * @description Clear active filter's value
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @desc This is detected not being used
	 * @see FeedFilterModal.categoryChange()
	 * @param string filterName
	 */
	private clearFilter(filterName: string): void{
		if(filterName){
			switch(filterName){
				case 'searchPrice':
					sessionStorage.setItem('searchPriceLower', '0');
					sessionStorage.setItem('searchPriceUpper', '0');
					this.search.prices.lower = 0;
					this.search.prices.upper = 0;
					break;
				//end case searchPrice
				case 'searchCategory0':
				case 'searchCategory1':
				case 'searchCategory2':
				case 'searchCategory3':
					console.info(filterName);
					// Remove the searchCategory substring, and parse the remaining string to get the level as an integer
					let breakdown: number = parseInt(filterName.substr(14));

					// Start from the most bottom level, 3, and go down till the parent (breakdown)
					let iterator: number = 3;

					do{
						sessionStorage.setItem('searchCategory' + iterator, '');
						this.search.set_category('', iterator);
						iterator--;
					} while(iterator >= breakdown); 

					//unlike the filter feed modal, it must include the level that we want to delete instead of its decendants.

					break;
				//end case searchCategory
				case 'searchManufacturer':
					sessionStorage.setItem('searchManufacturer', '');
					this.search.manufacturer = '';
					break;
				//end case searchManufacturer
				case 'searchCollections':
					sessionStorage.setItem('searchCollections', '');
					this.search.collection = '';
					break;
				//end case searchCollections
				case 'searchTags':
					sessionStorage.setItem('searchTags', '');
					this.search.tag = '';
					break;
				//end case searchTags
				default:
					sessionStorage.setItem(filterName, '');
					this.search.manufacturer = '';
					break;
				//end default
			}
		}

		this.generateProductFeed();
	}

	// MODALS

	/**
	 * @public
	 * @method filterModal
	 * @description Show filter options on a modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public filterModal(): void{
		// console.info('this.search', this.search);
		// console.info('this.filter', this.filter);

		let modal = this.modalCtrl.create(FeedFilterModal, {
			// Default is the current value set to the filter option
			// Data is the options available for the filter

			category0:{
				default: this.search.get_category(0),
				data: this.filter.categories.level0
			},

			category1:{
				default: this.search.get_category(1),
				data: this.filter.categories.level1
			},

			category2:{
				default: this.search.get_category(2),
				data: this.filter.categories.level2
			},

			category3:{
				default: this.search.get_category(3),
				data: this.filter.categories.level3
			},
			
			prices: {
				default: {
					lower: Math.floor(this.search.prices.lower),
					upper: Math.ceil(this.search.prices.upper)
				}, data: {
					min: Math.floor(this.filter.prices.min),
					max: Math.ceil(this.filter.prices.max)
				}
			},
			
			colors: {
				default: this.search.color,
				data: this.filter.colors
			},

			manufacturers: {
				default: this.search.manufacturer,
				data: this.filter.manufacturers
			},

			collections: {
				default: this.search.collection,
				data: this.filter.collections
			},

			tags: {
				default: this.search.tag,
				data: this.filter.tags
			}
		});

		modal.present();

		modal.onDidDismiss(data => {
			//console.info('FeedsPage - filterModal() - onDidDismiss()', data);

			if(data != null){
				for(let i = 0; i < 4; i++){
					if(data['category' + i] != undefined){
						sessionStorage.setItem('searchCategory' + i, data['category' + i]);
					}
				}
			
				if(data.price.lower != undefined && data.price.upper != undefined){
					sessionStorage.setItem('searchPriceLower', data.price.lower.toString());
					sessionStorage.setItem('searchPriceUpper', data.price.upper.toString());
				}	
				
				if(data.color != undefined){
					sessionStorage.setItem('searchColor', data.color);
				}

				if(data.manufacturer != undefined){
					sessionStorage.setItem('searchManufacturer', data.manufacturer);	
				}

				if(data.collection != undefined){
					sessionStorage.setItem('searchCollections', data.collection);	
				}

				if(data.tag != undefined){
					sessionStorage.setItem('searchTags', data.tag);	
				}
				
				this.generateProductFeed();
			}
		});
	}

	// ACTIONS

	/**
	 * @public
	 * @method changeDisplay (click)
	 * @description Change how the products are displayed
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { string } display
	 */
	public changeDisplay(display: string): void{
		this.display = display;
		sessionStorage.setItem('searchDisplay', display);
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
			this.cartProvider.getCart().subscribe(data => {
				this.logged = data.logged;
				this.cart = data.cart;
				this.authProvider.setCurrentCartProvider(data.cart);

				this.generateProductFeed();

				event.complete();
			}, err => {
				console.error('FeedsPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}