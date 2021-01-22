import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

// Modals
import { CreateReviewModal } from '../../../modals/product/create-review/create-review';

// Models
import { ProductModel } from '../../../models/magento/catalog/product';
import { CustomerModel } from '../../../models/magento/customer/customer';
import { 
	YotpoProductModel,
	YotpoProductReviewReturnModel,
	YotpoBottomlineModel,
	YotpoReviewSortType,
	YotpoReviewSortDirection
} from '../../../models/api/yotpo';

// Providers
import { YotpoProvider } from '../../../providers/api/yotpo';

@Component({
	selector: 'product-review',
	templateUrl: 'product-review.html'
})

export class ProductReviewComponent {

	@Input('product') product: ProductModel;
	@Input('customer') customer: CustomerModel;

	// Reviews
	public reviews: YotpoProductReviewReturnModel;
	public showReviews: boolean = false;

	// Queries
	public itemsPerPage: number = 5;
	public currentPage: number = 1;
	public starFilter: number = null;
	public sortType: string = 'votes';
	public sortDirection: string = 'DESC';

	// Bottomline
	public percentageStars: Array<number> = [0, 0, 0, 0, 0];
	public theStars: Array<string> = ['one', 'two', 'three', 'four', 'five'];
	public averageStarsReview: Array<number> = [0, 0, 0, 0, 0];

	// Component
	public loading: boolean = true;
	public totalPages: number = 1;

	public sorts: Array<{ key: string, value: string }> = [];
	public sortOptions: any;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { ModalController } modalCtrl
	 * @param { YotpoProvider } yotpoProvider
	 */
	public constructor(
		public modalCtrl: ModalController,
		public yotpoProvider: YotpoProvider
	) {
		this.sorts = [
			{ key: 'Date', value: YotpoReviewSortType.Date },
			{ key: 'Votes', value: 'votes' },
			{ key: 'Time', value: YotpoReviewSortType.Time },
			{ key: 'Rating', value: YotpoReviewSortType.Rating },
			{ key: 'Reviewer Type', value: YotpoReviewSortType.ReviewerType }
		];

		this.sortOptions = {
			title: 'Sort By'
		};
	}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the component
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private process(): void{
		this.getReviews();
	}

	/**
	 * @private
	 * @method getReviews
	 * @description Get the reviews from process or paging
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private getReviews(): void{
		console.info('ProductReviewComponent - process() - getProductReviews()');
		console.info('product.id', this.product.id);
		console.info('itemsPerPage', this.itemsPerPage);
		console.info('currentPage', this.currentPage);
		console.info('starFilter', this.starFilter);
		console.info('sortType', this.sortType);
		console.info('sortDirection', this.sortDirection);

		this.yotpoProvider.getProductReviews(this.product.id, this.itemsPerPage, this.currentPage, this.starFilter, this.sortType, this.sortDirection).subscribe(data => {
			
			console.info('ProductReviewComponent - process() - getProductReviews()', data);

			this.reviews = data;

			// Get the total pages count
			this.totalPages = Math.ceil(this.reviews.response.pagination.total / this.reviews.response.pagination.per_page);

			// Lets get the stars needed for the average product rating
			// Get the original average score
			let average: number = this.reviews.response.bottomline.average_score;

			// Need to round down the number to retrieve the half star if needed
			let averageRoundDown: number = Math.floor(average); 

			// Then get the decimal from the average and the round down average
			let averageDecimal: number = average - averageRoundDown;

			// While loop incrementer
			let i: number = 0;

			while(i < averageRoundDown){
				this.averageStarsReview[i] = 1; // full star
				i++;
			}

			if(averageDecimal > 0.5){
				this.averageStarsReview[i] = 2; // half star
			}

			// Show the review section
			this.loading = false;

		}, err => console.error('ProductReviewComponent - process() - getProductReviews()', err));
	}

	/**
	 * @public
	 * @method paging
	 * @description Change the pages of the reviews
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @uses PagingComponent
	 * @param { number } page
	 */
	public paging(page: number): void{
		this.currentPage = page;
		this.getReviews();
	}

	/**
	 * @public
	 * @method switchSort (ionChange)
	 * @description Switch the ordering for reviews
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } sort
	 */
	public switchSort(sort: string): void{
		this.sortType = sort;
		this.getReviews();
	}

	/**
	 * @public
	 * @method switchDirection (click)
	 * @description Switch the ordering direction for reviews
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } direction
	 */
	public switchDirection(direction: string): void{
		this.sortDirection = direction;
		this.getReviews();
	}

	/**
	 * @public
	 * @method revealReviews (click)
	 * @description Either show or hide the reviews
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public revealReviews(): void{
		this.showReviews = !this.showReviews;
	}

	/**
	 * @public
	 * @method modalCreateReview (click)
	 * @description Bring up the create review modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { YotpoProductModel } yotpoProduct
	 * @param { CustomerModel } customer
	 */
	public modalCreateReview(yotpoProduct: YotpoProductModel, customer: CustomerModel): void{
		let modal = this.modalCtrl.create(CreateReviewModal, {
			product: this.product,
			yotpoProduct: yotpoProduct,
			customer: customer
		});

		modal.onDidDismiss(data => {
			console.info('ProductReviewComponent - modalCreateReview() - onDidDismiss()', data);
		});

		modal.present();
	}
}
