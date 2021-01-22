import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { 
	GroupcatProductActionModel,
	GroupcatProductsActionModel 
} from '../../../models/magento/amasty/groupcat';

// Providers
import { AuthenticateProvider } from '../../magento/authenticate';

// RXJS
import { Observable } from 'rxjs';


@Injectable()
export class AmastyGroupcatProvider {

	private apiUrl: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 * @param { AuthenticateProvider } authProvider
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform,
		private authProvider: AuthenticateProvider){

		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';
		}
	}

	// ACTION METHODS

	/**
	 * @private
	 * @method readProductAction
	 * @description Get the product actions from product rules for a customer
	 * @desc The difference between guest and customer will matter with customer groups
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } sku
	 * @return { Observable<ProductActionModel> }
	 */
	private readProductAction(sku: string): Observable<GroupcatProductActionModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		return this.http.get<GroupcatProductActionModel>(this.apiUrl + '/tng/groupcat/rules/me/' + sku, { headers: apiHeader });
	}

	/**
	 * @private
	 * @method readProductActionForGuest
	 * @description Get the product actions from product rules for a guest
	 * @desc The difference between guest and customer will matter with customer groups
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } sku
	 * @return { Observable<ProductActionModel> }
	 */
	private readProductActionForGuest(sku: string): Observable<GroupcatProductActionModel>{
		return this.http.get<GroupcatProductActionModel>(this.apiUrl + '/tng/groupcat/rules/guest/' + sku);
	}

	/**
	 * @private
	 * @method readGroupProductAction
	 * @description Get the product actions from product rules for a customer
	 * @desc The difference between guest and customer will matter with customer groups
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Array<string> } skus
	 * @return { Observable<ProductActionModel> }
	 */
	private readProductsAction(skus: Array<string>): Observable<GroupcatProductsActionModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			skus: skus
		};

		return this.http.post<GroupcatProductsActionModel>(this.apiUrl + '/tng/groupcat/rules-group/me', postData, { headers: apiHeader });
	}

	/**
	 * @private
	 * @method readGroupProductActionForGuest
	 * @description Get the product actions from product rules for a guest
	 * @desc The difference between guest and customer will matter with customer groups
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Array<string> } skus
	 * @return { Observable<ProductActionModel> }
	 */
	private readProductsActionForGuest(skus: Array<string>): Observable<GroupcatProductsActionModel>{
		let postData = {
			skus: skus
		};

		return this.http.post<GroupcatProductsActionModel>(this.apiUrl + '/tng/groupcat/rules-group/guest', postData);
	}

	// CUSTOMER/GUEST METHODS

	/**
	 * @public
	 * @method productAction
	 * @description Decide if we call on either the customer or guest api call
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { boolean } logged
	 * @param { string } sku
	 * @return { Observable<GroupcatProductActionModel> }
	 */
	public productAction(logged: boolean, sku: string): Observable<GroupcatProductActionModel>{
		if(logged){
			return this.readProductAction(sku);
		} else {
			return this.readProductActionForGuest(sku);
		}
	}

	/**
	 * @public
	 * @method groupProductAction
	 * @description Decide if we call on either the customer or guest api call
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { boolean } logged
	 * @param { Array<string> } sku
	 * @return { Observable<GroupcatProductActionModel> }
	 */
	public productsAction(logged: boolean, skus: Array<string>): Observable<GroupcatProductsActionModel>{
		if(logged){
			return this.readProductsAction(skus);
		} else {
			return this.readProductsActionForGuest(skus);
		}
	}
}
