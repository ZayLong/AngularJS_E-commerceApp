import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { CustomerModel, CustomerAttributeModel, CustomerGroupModel } from '../../models/magento/customer/customer';
import { CustomerAddressModel } from '../../models/magento/customer/address';

import { 
	SortOrderModel, 
	SortOrderGroupModel, 
	SearchCriteriaModel, 
	Direction 
} from '../../models/magento/general/search';

import { SearchCustomerGroupResponseModel } from '../../models/ionic/provider/magento/customer';

// Providers
import { AuthenticateProvider } from '../magento/authenticate';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class CustomerProvider {

	public apiUrl:string;

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
		private authProvider: AuthenticateProvider
	){
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	//(C)RUD

	/**
	 * @public
	 * @method createCustomerAccount
	 * @description Create a customer account
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CustomerModel } customer
	 * @param { string } password
	 * @return { Observable<CustomerModel> }
	 */
	public createCustomerAccount(customer: CustomerModel, password: string): Observable<CustomerModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		let postData = {
			customer: customer,
			password: password
		};

		return this.http.post<CustomerModel>(this.apiUrl + '/customers', postData, { headers: apiHeader }).pipe(
			map(data => this.getCustomerModel(data))
		);
	}

	/**
	 * @public
	 * @method isEmailAvailable
	 * @description Check if email is already taken
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Find out if it returns a boolean
	 * @param { string } email
	 * @return { Observable }
	 */
	public isEmailAvailable(email: string): any{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		let postData = {
			customerEmail: email,
			websiteId: 1
		};

		return this.http.post(this.apiUrl + '/customers/isEmailAvailable', postData, { headers: apiHeader });
	}

	/**
	 * @public
	 * @method resetPassword
	 * @description Reset password
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns
	 * @param { string } email
	 * @param { string } token
	 * @param { string } password
	 * @return { Observable }
	 */
	public resetPassword(email: string, token: string, password: string): any{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		let postData = {
			email: email,
			resetToken: token,
			newPassword: password
		};

		return this.http.post(this.apiUrl + '/customers/resetPassword', postData, { headers: apiHeader });
	}

	//C(R)UD

	/**
	 * @public
	 * @method readCustomer
	 * @description Get the logged customer from API
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CustomerModel> }
	 */
	public readCustomer(): Observable<CustomerModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		return this.http.get<CustomerModel>(this.apiUrl + '/customers/me', { headers: apiHeaders }).pipe(
			map(data => this.getCustomerModel(data))
		);
	}

	/**
	 * @public
	 * @method readCustomerGroups
	 * @description Get customer group collection from search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<SearchCustomerGroupResponseModel> }
	 */
	public readCustomerGroups(): Observable<SearchCustomerGroupResponseModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		// Let it sort by ID (might be default)
		let sortOrder: SortOrderModel = new SortOrderModel('id', Direction.Descending);
		let sortOrderGroup: SortOrderGroupModel = new SortOrderGroupModel;
		sortOrderGroup.set_sort_order(sortOrder);
		let searchCriteria: SearchCriteriaModel = new SearchCriteriaModel(null, sortOrderGroup);

		return this.http.get<SearchCustomerGroupResponseModel>(this.apiUrl + '/customerGroups/search' + searchCriteria.toString(), { headers:apiHeader }).pipe(
			map(data => this.getSearchCustomerGroupResponseModel(data))
		);
	}

	/**
	 * @public
	 * @method readCustomerGroupById
	 * @description Get customer group by ID
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { number } id
	 * @return { Observable<CustomerGroupModel> }
	 */
	public readCustomerGroupById(id: number): Observable<CustomerGroupModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<CustomerGroupModel>(this.apiUrl + '/customerGroups/' + id, { headers:apiHeader }).pipe(
			map(data => this.getCustomerGroupModel(data))
		);
	}

	/**
	 * @public
	 * @method readCustomerMetadataAttribute
	 * @description Get a customer metadata attribute data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } code
	 * @return { Observable<CustomerAttributeModel> }
	 */
	public readCustomerMetadataAttribute(code: string): Observable<CustomerAttributeModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CustomerAttributeModel>(this.apiUrl + '/attributeMetadata/customer/attribute/' + code, { headers: apiHeader }).pipe(
			map(data => this.getCustomerAttributeModel(data))
		);
	}

	/**
	 * @public
	 * @method readCustomerAddress
	 * @description Get a customer address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { number } id
	 * @return { Observable<CustomerAddressModel> }
	 */
	public readCustomerAddress(id: number): Observable<CustomerAddressModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CustomerAddressModel>(this.apiUrl + '/customers/addresses/' + id, { headers: apiHeaders }).pipe(
			map(data => this.getCustomerAddressModel(data))
		);
	}

	/**
	 * @public
	 * @method readCustomerAddressMetadataAttribute
	 * @description Get a customer address metadata attribute data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Make a CustomerAddress Metadata Attribute inside customer address model file
	 * @param { string } code
	 * @return { Observable }
	 */
	public readCustomerAddressMetadataAttribute(code: string){
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get(this.apiUrl + '/attributeMetadata/customerAddress/attribute/' + code, { headers: apiHeader });
	}

	// CR(U)D

	/**
	 * @public
	 * @method updateCustomer
	 * @description Update the customer data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CustomerModel } customer
	 * @return { Observable<CustomerModel> }
	 */
	public updateCustomer(customer: CustomerModel): Observable<CustomerModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let putData = {
			customer: customer
		};

		return this.http.put<CustomerModel>(this.apiUrl + '/customers/me', putData , { headers: apiHeaders }).pipe(
			map(data => this.getCustomerModel(data))
		);
	}

	/**
	 * @public
	 * @method updatePassword
	 * @description Update the customer/user password
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns
	 * @param { string } currentPassword
	 * @param { string } newPassword
	 * @return { Observable }
	 */
	public updatePassword(currentPassword: string, newPassword: string){
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let putData = {
			currentPassword: currentPassword,
			newPassword: newPassword
		};

		return this.http.put(this.apiUrl + '/customers/me/password', putData, { headers: apiHeaders });
	}

	/**
	 * @public
	 * @method sendResetToken
	 * @description Send a token to request a password reset
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns, YOU SHOULD KNOW! :P
	 * @param { string } email
	 * @return { Observable }
	 */
	public sendResetToken(email: string){
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let putData = {
			email: email,
			websiteId: 1 // The Industry Source
		};

		return this.http.put(this.apiUrl + '/tng/customers/password', putData, { headers: apiHeaders });
	}

	// GET METHODS

	/**
	 * @private
	 * @method getCustomerModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CustomerModel }
	 */
	private getCustomerModel(data: any): CustomerModel{
		let model: CustomerModel = new CustomerModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCustomerGroupModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CustomerGroupModel }
	 */
	private getCustomerGroupModel(data: any): CustomerGroupModel{
		let model: CustomerGroupModel = new CustomerGroupModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCustomerAttributeModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CustomerAttributeModel }
	 */
	private getCustomerAttributeModel(data: any): CustomerAttributeModel{
		let model: CustomerAttributeModel = new CustomerAttributeModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCustomerAddressModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CustomerAddressModel }
	 */
	private getCustomerAddressModel(data: any): CustomerAddressModel{
		let model: CustomerAddressModel = new CustomerAddressModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getSearchCustomerGroupResponseModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { SearchCustomerGroupResponseModel }
	 */
	private getSearchCustomerGroupResponseModel(data: any): SearchCustomerGroupResponseModel{
		let model: SearchCustomerGroupResponseModel = new SearchCustomerGroupResponseModel();
		return model.fromJson(data);
	}
}