import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

// Modals
import { ClassDetailModal } from '../../modals/classes/class-detail/class-detail';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { ClassModel } from '../../models/ionic/page/classes';
import { ProductModel } from '../../models/magento/catalog/product';
import { 
	SearchCriteriaModel,
	FilterGroupModel,
	FilterModel,
	SortOrderGroupModel,
	SortOrderModel,
	PagingModel,
	Condition,
	Direction
} from '../../models/magento/general/search';

// Natives
import { Calendar } from '@ionic-native/calendar';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CatalogProvider } from '../../providers/magento/catalog';
import { CommonProvider } from '../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'page-classes',
	templateUrl: 'classes.html',
})

export class ClassesPage {

	// Customer/Cart
	public logged: boolean;
	public cart: CartModel;

	// Classes
	public classes: Array<{ type: string, value: any }> = [];

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { ModalController } modalCtrl
	 * @param { Calendar } calendar
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CatalogProvider } catalogProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public events: Events,
		public modalCtrl: ModalController,
		public calendar: Calendar,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public catalogProvider: CatalogProvider,
		public commonProvider: CommonProvider) {}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart != null && this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		this.getClasses();

		// Lets throw in request permission to enable permission
		this.calendar.requestWritePermission().then(data => {
			console.info('ClassesPage - ionViewDidLoad() - requestWritePermission()', data);
		}).catch(onrejected => console.error('ClassesPage - ionViewDidLoad() - requestWritePermission()', onrejected));
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_classes',
			item_name: 'Classes Page',
			item_category: 'Page'
		});
	}

	/**
	 * @private
	 * @method getClasses
	 * @description Get the class with a search model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private getClasses(){
		this.classes = []; // Clear out the class array

		// Create the search model to retrieve all active classes from The Academy category
		let filterGroup: FilterGroupModel = new FilterGroupModel();
		let catFilter: FilterModel = new FilterModel('category_id', '1598', Condition.Equal);
		let statusFilter: FilterModel = new FilterModel('status', '1', Condition.Equal);

		filterGroup.set_filter(catFilter);
		filterGroup.set_filter(statusFilter);

		let sortGroup: SortOrderGroupModel = new SortOrderGroupModel();
		let sort: SortOrderModel = new SortOrderModel('id', Direction.Ascending);
		sortGroup.set_sort_order(sort);

		let paging: PagingModel = new PagingModel(500, 1);

		let searchModel: SearchCriteriaModel = new SearchCriteriaModel(filterGroup, sortGroup, paging);

		this.catalogProvider.readProductsBySearch(searchModel).subscribe(data => {
			this.processClasses(data.items);
		}, err => console.error('ClassesPage - ionViewDidLoad() - readProductsBySearch()', err));
	}

	/**
	 * @private
	 * @method processClasses
	 * @description Take the product objects of the classes and process them as class objects
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { Array<ProductModel> } products
	 */
	private processClasses(products: Array<ProductModel>): void{
		let unsorted: Array<ClassModel> = []; // The initial order of classes
		let sorted: Array<ClassModel> = []; // The sorted order of classes

		for(let product of products){
			let model: ClassModel = new ClassModel(product);
			unsorted.push(model);
		}

		// Sort the objects by start date
		sorted = unsorted.sort(function(a, b){
			return a.startDateTime.valueOf() - b.startDateTime.valueOf();
		});

		// Then create the first header with the first month and year
		let startingMonth = sorted[0].startDateTime.getMonth();
		let startingYear = sorted[0].startDateTime.getFullYear();
		this.classes.push({
			type: 'header',
			value: this.convertMonthToString(startingMonth) + ', ' + startingYear
		});

		// Go through each item and check if the year and month changed
		for(let item of sorted){
			// Check if the year changed (ie going from December to January)
			if(item.startDateTime.getFullYear() !== startingYear){
				// More likely the starting month had changed too
				startingMonth = item.startDateTime.getMonth();
				startingYear = item.startDateTime.getFullYear();

				this.classes.push({
					type: 'header',
					value: this.convertMonthToString(startingMonth) + ', ' + startingYear
				});
			} else {
				// Check if the month changed
				if(item.startDateTime.getMonth() !== startingMonth){
					startingMonth = item.startDateTime.getMonth();

					this.classes.push({
						type: 'header',
						value: this.convertMonthToString(startingMonth) + ', ' + startingYear
					});	
				}
			}

			this.classes.push({
				type: 'class',
				value: item
			});
		}
	}

	// INDIVIDUAL ITEM METHODS

	/**
	 * @public
	 * @method classModal (click)
	 * @description Bring up a modal to show class details
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @uses ModalController
	 * @param { ClassModel } item
	 */
	public classModal(item: ClassModel): void{
		this.commonProvider.analyticsLogEvent('select_content', {
			content_type: 'Class',
			item_id: 'class_' + item.product.sku,
		});

		let modal = this.modalCtrl.create(ClassDetailModal, {
			class: item,
			cart: this.cart,
			logged: this.logged
		});

		modal.present();
	}

	/**
	 * @private
	 * @method convertMonthToString
	 * @description Convert the month number to the name
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { number } month
	 * @return { string }
	 */
	private convertMonthToString(month: number): string{
		switch(month){
			case 0: return 'January';
			case 1: return 'February';
			case 2: return 'March';
			case 3: return 'April';
			case 4: return 'May';
			case 5: return 'June';
			case 6: return 'July';
			case 7: return 'August';
			case 8: return 'September';
			case 9: return 'October';
			case 10: return 'November';
			case 11: return 'December';
		}
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

				this.getClasses();

				event.complete();
			}, err => {
				console.error('ClassesPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}
