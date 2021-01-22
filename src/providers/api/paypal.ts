import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// MODELS
import {
	// Enum
	PayPalSandbox,
	PayPalProduction,
	// Model
	PayPalAccessTokenModel
} from '../../models/api/paypal/access';

import {
	// Model
	PayPalPaymentStoreRequestModel,
	PayPalPaymentStoreResponseModel
} from '../../models/api/paypal/payment';

import {
	// Model
	PayPalVaultStoreRequestModel,
	PayPalVaultListResponseModel,
	PayPalVaultCreditCardModel
} from '../../models/api/paypal/vault';


// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaypalProvider{

	private production: boolean = false; // false = staging, true = production
	private apiUrl: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform) {
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			if(this.production){
				this.apiUrl = '/paypalproductionapi';
			} else {
				this.apiUrl = '/paypalsandboxapi';	
			}
		} else {
			if(this.production){
				this.apiUrl = 'https://api.paypal.com/v1';	
			} else {
				this.apiUrl = 'https://api.sandbox.paypal.com/v1';	
			}
		}
	}

	// TOKEN METHODS

	/**
	 * @private
	 * @method accessToken
	 * @description Create an OAuth access token from PayPal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { Observable<PayPalRestAccessTokenModel> }
	 */
	private accessToken(){
		let apiHeaders = new HttpHeaders();

		// The body and content type must be set in a specific way to get the access token
		let postData = 'grant_type=client_credentials';
		apiHeaders = apiHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

		if(this.production){
			apiHeaders = apiHeaders.append('Authorization', 'Basic ' + btoa(PayPalProduction.ClientId + ':' + PayPalProduction.Secret));

			return this.http.post(this.apiUrl + '/oauth2/token', postData, { headers: apiHeaders }).pipe(
				map(data => this.getPayPalAccessTokenModel(data))
			);
		} else {
			apiHeaders = apiHeaders.append('Authorization', 'Basic ' + btoa(PayPalSandbox.ClientId + ':' + PayPalSandbox.Secret));

			return this.http.post(this.apiUrl + '/oauth2/token', postData, { headers: apiHeaders }).pipe(
				map(data => this.getPayPalAccessTokenModel(data))
			);
		}
	}

	// PAYMENT METHODS

	/**
	 * @public
	 * @method createPayment
	 * @description Creates a sale, an authorized payment to be captured later, or an order.
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { Observable<PayPalPaymentStoreRequestModel> }
	 */
	public createPayment(request: PayPalPaymentStoreRequestModel): Observable<PayPalPaymentStoreResponseModel>{
	 	let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAccessToken());

	 	let postData = request;

		return this.http.post<PayPalPaymentStoreResponseModel>(this.apiUrl + '/payments/payment', postData, { headers: apiHeader }).pipe(
			map(data => this.getPayPalPaymentStoreResponseModel(data))
		);
	}

	// VAULT METHODS

	/**
	 * @public
	 * @method createCreditCard
	 * @description Stores credit card details in the PayPal vault.
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { Observable<PayPalVaultCreditCardModel> }
	 */
	public createCreditCard(request: PayPalVaultStoreRequestModel): Observable<PayPalVaultCreditCardModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAccessToken());

	 	let postData = request;

	 	return this.http.post<PayPalVaultCreditCardModel>(this.apiUrl + '/vault/credit-cards', postData, { headers: apiHeader }).pipe(
			map(data => this.getPayPalVaultCreditCardModel(data))
		);
	}

	/**
	 * @public
	 * @method getCreditCard
	 * @description Shows details for a vaulted credit card, by ID.
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { string } cardId
	 * @return { Observable<PayPalVaultCreditCardModel> }
	 */
	public readCreditCard(cardId: string): Observable<PayPalVaultCreditCardModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAccessToken());

		return this.http.get<PayPalVaultCreditCardModel>(this.apiUrl + '/vault/credit-cards/' + cardId, { headers: apiHeader }).pipe(
			map(data => this.getPayPalVaultCreditCardModel(data))
		);
	}

	/**
	 * @public
	 * @method listCreditCards
	 * @description Lists vaulted credit cards.
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { Observable<PayPalVaultListResponseModel> }
	 */
	public readCreditCards(): Observable<PayPalVaultListResponseModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAccessToken());

		return this.http.get<PayPalVaultListResponseModel>(this.apiUrl + '/vault/credit-cards', { headers: apiHeader }).pipe(
			map(data => this.getPayPalVaultListResponseModel(data))
		);
	}

	/**
	 * @public
	 * @method updateCreditCard
	 * @description Updates information for a vaulted credit card, by ID.
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @todo Make the actual function and patch models
	 * @desc Though this looks a bit crazy
	 * @param { string } cardId
	 * @param { request } request
	 * @return { Observable<PayPalVaultCreditCardModel> }
	 */

	/**
	 * @public
	 * @method deleteCreditCard
	 * @description Deletes a vaulted credit card, by ID.
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { string } cardId
	 */
	public deleteCreditCard(cardId: string){
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAccessToken());

		return this.http.delete(this.apiUrl + '/vault/credit-cards/' + cardId, { headers: apiHeader });
	}

	// ACCESS TOKEN METHODS

	/**
	 * @public
	 * @method getAccessToken
	 * @description Get the access token
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { string }
	 */
	public getAccessToken(): string{
		return sessionStorage.getItem('appPayPalToken');
	}

	/**
	 * @public
	 * @method getTokenExpiration
	 * @description Get the access token expiration
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { string }
	 */
	public getTokenExpiration(): string{
		return sessionStorage.getItem('appPayPalExpiry');
	}

	/**
	 * @public
	 * @method removeAccessToken
	 * @description Remove the access token
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	public removeAccessToken(): void{
		sessionStorage.removeItem('appPayPalToken');
	}

	/**
	 * @public
	 * @method removeTokenExpiration
	 * @description Remove the access token expiration
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 */
	public removeTokenExpiration(): void{
		sessionStorage.removeItem('appPayPalExpiry');
	}

	/**
	 * @public
	 * @method setAccessToken
	 * @description Store the access token, and expiration
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { Observable }
	 */
	public setAccessToken(){
		return Observable.create(observer => {
			this.accessToken().subscribe(data => {
				console.info('PayPalRestProvider - setAccessToken() - accessToken()', data);

				// Set an expiration date for the PayPal token to clear the storage later
				let expiration = new Date();
				expiration.setSeconds(expiration.getSeconds() + parseInt(data.expires_in)); // Add the seconds to the current date

				// Set the tokens into a session storage
				sessionStorage.setItem('appPayPalExpiry', expiration.getTime().toString());
				sessionStorage.setItem('appPayPalToken', data.access_token);

				observer.next(true);
			}, err => console.error('PayPalRestProvider - setAccessToken() - accessToken()', err));
		});
	}

	/**
	 * @public
	 * @method checkAccessToken
	 * @description Check if access token has expired then create a new token
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { Observable<boolean> }
	 */
	public checkAccessToken(): Observable<boolean>{
		return Observable.create(observer => {
			let expTimestamp = this.getTokenExpiration();

			let now: Date = new Date();
			let nowTimestamp: number = now.getTime();

			console.info('Now', nowTimestamp);
			console.info('Exp', parseInt(expTimestamp));

			if(nowTimestamp > parseInt(expTimestamp) || expTimestamp == null){
				console.info('PayPalRestProvider - checkAccessToken() - expired');

				//Clear out both access token and expiration timestamp
				this.removeAccessToken();
				this.removeTokenExpiration();

				this.setAccessToken().subscribe(data => {
					observer.next(true);
				}, err => observer.error(false));
			} else {
				console.log('PayPalRestProvider - checkAccessToken() - not expired');
				observer.next(true);
			}
		});
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getPayPalAccessTokenModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @since 1.3.0
	 * @return { PayPalAccessTokenModel }
	 */
	private getPayPalAccessTokenModel(data: any): PayPalAccessTokenModel{
		let model: PayPalAccessTokenModel = new PayPalAccessTokenModel();
		return model.fromJson(data);
	}

	// Payment

	/**
	 * @public
	 * @method getPayPalPaymentStoreResponseModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { PayPalPaymentStoreResponseModel }
	 */
	public getPayPalPaymentStoreResponseModel(data: any): PayPalPaymentStoreResponseModel{
		let model: PayPalPaymentStoreResponseModel = new PayPalPaymentStoreResponseModel();
		return model.fromJson(data);
	}

	// Vault

	/**
	 * @public
	 * @method getPayPalVaultListResponseModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { PayPalVaultListResponseModel }
	 */
	public getPayPalVaultListResponseModel(data: any): PayPalVaultListResponseModel{
		let model: PayPalVaultListResponseModel = new PayPalVaultListResponseModel();
		return model.fromJson(data);
	}

	/**
	 * @public
	 * @method getPayPalVaultCreditCardModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { PayPalVaultCreditCardModel }
	 */
	public getPayPalVaultCreditCardModel(data: any): PayPalVaultCreditCardModel{
		let model: PayPalVaultCreditCardModel = new PayPalVaultCreditCardModel();
		return model.fromJson(data);
	}
}