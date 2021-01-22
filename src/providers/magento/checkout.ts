import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { CartAddressModel } from '../../models/magento/cart/cart';
import { CartTotalModel } from '../../models/magento/cart/total';
import { PaymentMethodModel } from '../../models/magento/checkout/payment-method';
import { ShippingMethodModel } from '../../models/magento/checkout/shipping-method';
import { PaymentInformationResponseModel } from '../../models/ionic/provider/magento/checkout'; 

// Providers
import { AuthenticateProvider } from '../magento/authenticate';


// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckoutProvider {

	private apiUrl:string;

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
		private authProvider: AuthenticateProvider) {
		
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	// POST METHODS

	/**
	 * @public
	 * @method estimateShippingMethods
	 * @description Get all estimate costs for each of the shipping methods by cart address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartAddressModel }
	 * @return { Observable<Array<ShippingMethodModel>> }
	 */
	public estimateShippingMethods(shippingAddress: CartAddressModel): Observable<Array<ShippingMethodModel>>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			address: shippingAddress
		};

		return this.http.post<Array<ShippingMethodModel>>(this.apiUrl + '/carts/mine/estimate-shipping-methods', postData, { headers: apiHeaders }).pipe(
			map(data => this.getShippingMethodModels(data))
		);
	}

	/**
	 * @public
	 * @method estimateShippingByAddressId
	 * @description Get all estimate costs for each of the shipping methods by address id
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { number } addressId
	 * @return { Observable<Array<ShippingMethodModel>> }
	 */
	public estimateShippingByAddressId(addressId: number): Observable<Array<ShippingMethodModel>>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			addressId: addressId
		};

		return this.http.post<Array<ShippingMethodModel>>(this.apiUrl + '/carts/mine/estimate-shipping-methods-by-address-id', postData, { headers: apiHeaders }).pipe(
			map(data => this.getShippingMethodModels(data))
		);
	}

	/**
	 * @public
	 * @method setShippingInformation
	 * @description Set the shipping method, address, and billing address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { ShippingMethodModel } shippingMethod
	 * @param { CartAddressModel } shippingAddress
	 * @param { CartAddressModel } billingAddress
	 * @return { Observable }
	 */
	public setShippingInformation(shippingMethod: ShippingMethodModel, shippingAddress: CartAddressModel, billingAddress: CartAddressModel){
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			addressInformation: {
				shipping_address: shippingAddress,
				billing_address: billingAddress,
				shipping_method_code: shippingMethod.method_code,
				shipping_carrier_code: shippingMethod.carrier_code
			}
		};

		return this.http.post<PaymentInformationResponseModel>(this.apiUrl + '/carts/mine/shipping-information', postData, { headers: apiHeaders });
	}

	/**
	 * @public
	 * @method setPaymentInformation
	 * @description Set the payment method
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns
	 * @param { PaymentMethodModel } paymentMethod
	 * @param { CartAddressModel } billingAddress
	 * @return { Observable }
	 */
	public setPaymentInformation(paymentMethod: PaymentMethodModel, billingAddress: CartAddressModel){
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			paymentMethod: {
				//po_number: '',
				method: paymentMethod.code
			}, billingAddress: billingAddress
		};

		return this.http.post(this.apiUrl + '/carts/mine/set-payment-information', postData, { headers: apiHeaders });
	}

	/**
	 * @public
	 * @method retrieveTotalsInformation
	 * @description Get the totals information from address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartAddressModel } address
	 * @param { ShippingMethodModel } shipping
	 * @return { Observable<CartTotalModel> }
	 */
	public retrieveTotalsInformation(address: CartAddressModel, shipping: ShippingMethodModel): Observable<CartTotalModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let model: CartTotalModel = new CartTotalModel();

		let postData = {
			addressInformation: {
				address: address,
				shipping_method_code: shipping.method_code,
				shipping_carrier_code: shipping.carrier_code
				//extension_attributes: any
				//custom_attributes: any
			}
		};

		return this.http.post<CartTotalModel>(this.apiUrl + '/carts/mine/totals-information', postData, { headers: apiHeaders }).pipe(
			map(data => model.fromJson(data))
		);
	}

	/**
	 * @public
	 * @method setPaymentInformationAndOrder
	 * @description Set the payment method and place an order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Object } paymentMethod
	 * @param { CartAddressModel } billingAddress
	 * @param { string } comments
	 * @return { Observable<string> }
	 */
	public setPaymentInformationAndOrder(paymentInfo: any, billingAddress: CartAddressModel, comment: string): Observable<string>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			paymentMethod: paymentInfo, 
			billingAddress: billingAddress,
			comment: comment
		};
		
		return this.http.post(this.apiUrl + '/tng/carts/mine/payment-information', postData, { headers: apiHeaders, responseType: 'text' });
	}

	// GET METHODS

	/**
	 * @public
	 * @method readPaymentMethods
	 * @description Get available payment methods
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<Array<PaymentMethodModel>> }
	 */
	public readPaymentMethods(): Observable<Array<PaymentMethodModel>>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		return this.http.get<Array<PaymentMethodModel>>(this.apiUrl + '/carts/mine/payment-methods', { headers: apiHeaders }).pipe(
			map(data => this.getPaymentMethodModels(data))
		);
	}

	/**
	 * @public
	 * @method readShippingMethods
	 * @description Get available shipping methods
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<Array<ShippingMethodModel>> }
	 */
	public readShippingMethods(): Observable<Array<ShippingMethodModel>>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		return this.http.get<Array<ShippingMethodModel>>(this.apiUrl + '/carts/mine/shipping-methods', { headers: apiHeaders }).pipe(
			map(data => this.getShippingMethodModels(data))
		);
	}

	/**
	 * @public
	 * @method readPaymentInformation
	 * @description Get payment information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<PaymentInformationResponseModel> }
	 */
	public readPaymentInformation(): Observable<PaymentInformationResponseModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let model: PaymentInformationResponseModel = new PaymentInformationResponseModel();

		return this.http.get<PaymentInformationResponseModel>(this.apiUrl + '/carts/mine/payment-information', { headers: apiHeaders }).pipe(
			map(data => model.fromJson(data))
		);
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getPaymentMethodModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<PaymentMethodModel> }
	 */
	private getPaymentMethodModels(data: any): Array<PaymentMethodModel>{
		let array: Array<PaymentMethodModel> = [];

		for(let item of data){
			let model: PaymentMethodModel = new PaymentMethodModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getShippingMethodModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<ShippingMethodModel> }
	 */
	private getShippingMethodModels(data: any): Array<ShippingMethodModel>{
		let array: Array<ShippingMethodModel> = [];

		for(let item of data){
			let model: ShippingMethodModel = new ShippingMethodModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}
}