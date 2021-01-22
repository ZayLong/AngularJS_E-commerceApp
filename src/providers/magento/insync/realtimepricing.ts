import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { CartAddressModel } from '../../../models/magento/cart/cart';
import {
	PaymetricInfoModel
} from '../../../models/magento/checkout/payment-method/payment-info';

// Provider
import { AuthenticateProvider } from '../authenticate';

// RXJS
import { Observable } from 'rxjs';

@Injectable()
export class InsyncRealTimePricingProvider {

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
		private authProvider: AuthenticateProvider
	) {
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	/**
	 * @public
	 * @method taxExemptUpdate
	 * @description Update the cart items if tax exempt
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Array<string> } exemptItems
	 * @param { number } storeId (default at 1 (TIS))
	 */
	public taxExemptUpdate(exemptItems: Array<string>, storeId = 1){
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let putData = {
			exemptItems: exemptItems,
			store: this.storeIdToCode(storeId)
		};

		return this.http.put(this.apiUrl + '/tng/realtimepricing/carts/mine/tax-exempt', putData, { headers: apiHeader });
	}

	/**
	 * @public
	 * @method refreshRealTimePricing
	 * @description Refresh real time pricing
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartModel } cart
	 * @param { string } paymentCode
	 * @param { number } storeId (defaults at theindustrysource_view)
	 * @return { Observable<string> }
	 */
	public refreshRealTimePricing(
		paymentCode: string, 
		storeId: number = 1): Observable<string>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		// Construct a mockup paymentMethod model
		// Add more data when needed
		let paymentInfoModel = {
			method: paymentCode
		};

		let postData = {
			paymentInfo: paymentInfoModel,
			store: this.storeIdToCode(storeId)
		};

		return this.http.post<string>(this.apiUrl + '/tng/realtimepricing/carts/mine/refresh-realtimeprice', postData, { headers: apiHeaders });
	}

	/**
	 * @public
	 * @method validateCart
	 * @description Validate the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } cartId
	 * @param { PaymetricInfoModel } paymentInfo
	 * @param { number } storeId (defaults at theindustrysource_view)
	 * @return { Observable<number> }
	 */
	public validateCart(cartId: number, paymentInfo: PaymetricInfoModel, storeId: number = 1){
		let postData = {
			cartId: cartId,
			paymentInfo: {
				method: paymentInfo.method
			},
			storeCode: this.storeIdToCode(storeId)
		};

		return this.http.post<number>(this.apiUrl + '/carts/mine/cart-validation', postData);
	}

	/**
	 * @public
	 * @method validateExclusiveProducts
	 * @description Validate exclusive products
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { number } cartId,
	 * @param { CartAddressModel } shippingAddress
	 * @param { number } storeId
	 * @return { Observable<number> }
	 */
	public validateExclusiveProducts(cartId: number, shippingAddress: CartAddressModel, $storeId = 1): Observable<number>{

		let postData = {
			cartId: cartId,
			shippingAddress: shippingAddress,
			storeCode: this.storeIdToCode(1)
		};

		return this.http.post<number>(this.apiUrl + '/carts/mine/exclusive-product-validation', postData);
	}

	/**
	 * @private
	 * @method storeIdToCode
	 * @description Swap number with the store code
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } storeId
	 * @return { string }
	 */
	private storeIdToCode(storeId: number): string{
		switch(storeId){
			case 1:
				return 'theindustrysource_view';
			case 4:
				return 'tngworldwide_view';
			default:
				return '';
		}
	}
}
