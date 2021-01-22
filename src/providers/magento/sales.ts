import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { 
	SearchCriteriaModel, 
	FilterModel, 
	FilterGroupModel, 
	SortOrderModel, 
	SortOrderGroupModel, 
	PagingModel, 
	Direction 
} from '../../models/magento/general/search';

import { OrderModel } from '../../models/magento/sales/order';
import { CustomerModel } from '../../models/magento/customer/customer';
import { SearchOrderResponseModel } from '../../models/ionic/provider/magento/order';

// Providers
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SalesProvider {

	apiUrl:string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider) {
		
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	/**
	 * @public
	 * @method readOrder
	 * @description Read an order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { number } id
	 * @return { Observable<OrderModel> }
	 */
	public readOrder(id: number): Observable<OrderModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<OrderModel>(this.apiUrl + '/orders/' + id, { headers: apiHeaders }).pipe(
			map(data => this.getOrderModel(data))
		);
	}

	/**
	 * @public
	 * @method readOrders
	 * @description Read all orders from a user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @uses SearchOrderResponseModel
	 * @param { CustomerModel } customer
	 * @return { Observable<SearchOrderResponseModel> }
	 */
	public readOrders(customer: CustomerModel): Observable<SearchOrderResponseModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		let filterModel = new FilterModel('customer_email', customer.email);
		let filterGroup = new FilterGroupModel();
		filterGroup.set_filter(filterModel);
		let searchModel = new SearchCriteriaModel(filterGroup);

		return this.http.get<SearchOrderResponseModel>(this.apiUrl + '/orders' + searchModel.toString(), { headers: apiHeaders }).pipe(
			map(data => this.getSearchOrderResponseModel(data))
		);
	}

	/**
	 * @public
	 * @method readOrdersByPage
	 * @description Read some recent orders from a user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @uses SearchOrderResponseModel
	 * @param { CustomerModel } customer
	 * @param { number } pageSize
	 * @param { number } currentPage
	 * @return { Observable<SearchOrderResponseModel> }
	 */
	public readOrdersByPage(customer: CustomerModel, pageSize: number, currentPage: number): Observable<SearchOrderResponseModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		let emailFilter = new FilterModel('customer_email', customer.email);
		let filterGroup = new FilterGroupModel();
		filterGroup.set_filter(emailFilter);

		let sortOrder = new SortOrderModel('increment_id', Direction.Descending);
		let sortGroup = new SortOrderGroupModel();
		sortGroup.set_sort_order(sortOrder);

		let paging = new PagingModel(pageSize, currentPage);

		let searchCriteria = new SearchCriteriaModel(filterGroup, sortGroup, paging);

		return this.http.get<SearchOrderResponseModel>(this.apiUrl + '/orders' + searchCriteria.toString(), { headers: apiHeaders }).pipe(
			map(data => this.getSearchOrderResponseModel(data))
		);
	}

	/**
	 * @public
	 * @method reorder
	 * @description Reorder an existing order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @param { OrderModel } order
	 * @return { Observable<boolean> }
	 */
	public reorder(order: OrderModel): Observable<boolean>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<boolean>(this.apiUrl + '/tng/orders/reorder/' + order.entity_id, { headers: apiHeaders });
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getOrderModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { OrderModel }
	 */
	private getOrderModel(data: any): OrderModel{
		let model: OrderModel = new OrderModel();
		return model.fromJson(data);
	}ß

	/**
	 * @private
	 * @method getSearchOrderResponseModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { OrderModel }
	 */
	private getSearchOrderResponseModel(data: any): SearchOrderResponseModel{
		let model: SearchOrderResponseModel = new SearchOrderResponseModel();
		return model.fromJson(data);
	}
}