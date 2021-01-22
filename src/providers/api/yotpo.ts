import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Enums
import { 
	YotpoReviewSortType,
	YotpoReviewSortDirection
} from '../../models/api/yotpo';

// Models
import {
	YotpoAuthenticationModel,
	YotpoAccountPlatformReturnModel,
	YotpoProductReviewReturnModel
} from '../../models/api/yotpo';

import {
	ProductModel
} from '../../models/magento/catalog/product';

import {
	CustomerModel
} from '../../models/magento/customer/customer';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class YotpoProvider{

	// Yotpo Info
	public apiKey: string = '5IPyMLacvfy8qSkelyJFRNYS1BtmzDiJMZ2fXpxI';
	public secretKey: string = 't2pYWw1aIdlH4AFKLSfuxPzazBzYhAzBxRmawCuq';
	public accountId: string = '178514';

	public platformTypeId: string = '5'; // Magento
	public shopDomain: string = 'http://www.theindustrysource.com';

	// Yotpo API
	private apiUrl: string = 'https://api.yotpo.com';

	// Storage
	public storageKey: string = 'appYotpoBearpaw'; //BEARer Token :)

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { HttpClient } http
	 * @param { Storage } storage
	 */
	public constructor(
		public http: HttpClient,
		public storage: Storage
	){}

	/**
	 * POST METHODS
	 */

	/**
	 * @private
	 * @method postAuthentication
	 * @description Get authentication to use Yotpo API calls
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @see https://apidocs.yotpo.com/reference#yotpo-authentication
	 */
	private postAuthentication(): Observable<YotpoAuthenticationModel>{
		let postData = {
			client_id: this.apiKey,
			client_secret: this.secretKey,
			grant_type: 'client_credentials'
		}

		return this.http.post<YotpoAuthenticationModel>(this.apiUrl + '/oauth/token', postData).pipe(
			map(data => this.getYotpoAuthenticationModel(data))
		);
	}

	/**
	 * @public
	 * @method postAccountPlatform
	 * @description Get the basic information of your account
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { Observable<YotpoAccountPlatformReturnModel> }
	 */
	public postAccountPlatform(): Observable<YotpoAccountPlatformReturnModel>{
		// Because we have to work with a Promise, we need to take the Promise and convert it to an Observable
		return Observable
		.fromPromise(this.getAuthentication())
		.flatMap(key => {
			let postData = {
				account_platform: {
					shop_domain: this.shopDomain,
					platform_type_id: this.platformTypeId	
				},
				utoken: key
			};

			return this.http.post<YotpoAccountPlatformReturnModel>(this.apiUrl + '/apps/' + this.apiKey + '/account_platform', postData).pipe(
				map(data => this.getYotpoAccountPlatformReturnModel(data))
			);
		});
	}

	/**
	 * @public
	 * @method postReview
	 * @description Create a review for a product
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.1
	 * @param { ProductModel } product
	 * @param { CustomerModel } customer
	 * @param { number } reviewRating
	 * @param { string } reviewTitle
	 * @param { string } reviewContent
	 * @param { string } reviewerName
	 * @param { string } reviewerEmail
	 */
	public postReview(
		product: ProductModel, 
		customer: CustomerModel, 
		reviewRating: number, 
		reviewTitle: string, 
		reviewContent: string,
		reviewerName: string,
		reviewerEmail: string): any{

		let postData = {
			appKey: this.apiKey,
			domain: this.shopDomain,
			sku: product.id,
			product_title: product.name,
			product_url: this.shopDomain + product.get_custom_attribute(''),
			// product_description: product.get_custom_attribute('content'),
			// product_image_url: this.shopDomain + product.get_custom_attribute(''),
			display_name: reviewerName,
			email: reviewerEmail,
			review_content: reviewContent,
			review_title: reviewTitle,
			review_score: reviewRating,
			// There are more fields that can be used
			customer_metadata: {
				state: customer.defaultBillingAddress().region_id,
				country: customer.defaultBillingAddress().country_id,
				address: customer.defaultBillingAddress().fullStreetAddress(),
				phone_number: customer.defaultBillingAddress().telephone
			}
		};

		return this.http.post(this.apiUrl + '/v1/widget/reviews', postData);
	}

	/**
	 * @public
	 * @method postVoteReview
	 * @description Up or down vote a review
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { number } reviewId
	 * @param { string } vote
	 */
	public postVoteReview(reviewId: number, vote: string): any{
		return this.http.post(this.apiUrl + '/reviews/' + reviewId + '/vote/' + vote, {});
	}

	/**
	 * GET METHODS
	 */

	/**
	 * @public
	 * @method getProductReviews
	 * @description Get reviews of a product
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { number } productId
	 * @param { number } perPage (default 5)
	 * @param { number } pageNo  (default 1)
	 * @param { number } starFilter (optional)
	 * @param { string } sortType (optional)
	 * @param { string } sortDirection (optional)
	 * @return { Observable<YotpoProductReviewReturnModel> }
	 */
	public getProductReviews(
		productId: number,
		perPage: number = 5,
		pageNo: number = 1,
		starFilter?: number,
		sortType?: string,
		sortDirection?: string
	): Observable<YotpoProductReviewReturnModel>{
		// Because we have to work with a Promise, we need to take the Promise and convert it to an Observable
		return Observable
		.fromPromise(this.getAuthentication())
		.flatMap(key => {

			let queryString: string = '';

			// PerPage has a default and will be the first query
			queryString = queryString + '?per_page=' + perPage;

			// PageNo has a default and will be the second query
			queryString = queryString + '&page=' + pageNo;

			// Filter by stars if any
			if(starFilter){
				queryString = queryString + '&star=' + starFilter;
			}

			// Check if type is votes and which direction
			if(sortType == 'votes'){
				if(sortDirection.toLowerCase() == YotpoReviewSortDirection.Desc){
					sortType = YotpoReviewSortType.VotesUp;
					sortDirection = null;
				} else if(sortDirection.toLowerCase() == YotpoReviewSortDirection.Asc){
					sortType = YotpoReviewSortType.VotesDown;
					sortDirection = null;
				}
			}

			// Sort by ...
			if(sortType){
				queryString = queryString + '&sort=' + sortType;
			}

			// By this direction...
			if(sortDirection){
				queryString = queryString + '&direction=' + sortDirection.toLowerCase();
			}

			console.info('YotpoProvider - getProductReview() - queryString', queryString);

			return this.http.get<YotpoProductReviewReturnModel>(this.apiUrl + '/v1/widget/' + this.apiKey + '/products/' + productId + '/reviews.json' + queryString).pipe(
				map(data => this.getYotpoProductReviewReturnModel(data))
			);
		});
	}

	/**
	 * GET MODEL METHODS
	 */

	 /**
	 * @private
	 * @method getYotpoAuthenticationModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { YotpoAuthenticationModel }
	 */
	private getYotpoAuthenticationModel(data: any): YotpoAuthenticationModel{
		let model: YotpoAuthenticationModel = new YotpoAuthenticationModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getYotpoAccountPlatformReturnModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { YotpoAccountPlatformReturnModel }
	 */
	private getYotpoAccountPlatformReturnModel(data: any): YotpoAccountPlatformReturnModel{
		let model: YotpoAccountPlatformReturnModel = new YotpoAccountPlatformReturnModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getYotpoProductReviewReturnModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { YotpoProductReviewReturnModel }
	 */
	private getYotpoProductReviewReturnModel(data: any): YotpoProductReviewReturnModel{
		let model: YotpoProductReviewReturnModel = new YotpoProductReviewReturnModel();
		return model.fromJson(data);
	}

	/**
	 * AUTHENTICATION METHODS
	 */

	/**
	 * @public
	 * @method getAuthentication
	 * @description Get the authentication token model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @uses IonicStorage
	 * @return { Promise<string> }
	 */
	public getAuthentication(): Promise<string>{
		return this.storage.get(this.storageKey);
	}

	/**
	 * @public
	 * @method setAuthentication
	 * @description Set the authentication token model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @uses IonicStorage
	 * @return { Observable }
	 */
	public setAuthentication(): Observable<any>{
		return Observable.create(observer => {
			this.postAuthentication().subscribe(data => {
				console.info('YotpoProvider - setAuthentication() - postAuthentication()', data);

				this.storage.set(this.storageKey, data.access_token).then(() => {
					observer.next(true);
				}).catch(onrejected => observer.error(onrejected));
			}, err => {
				console.error('YotpoProvider - setAuthentication() - postAuthentication()', err);

				observer.error(err);
			})
		});
	}
}