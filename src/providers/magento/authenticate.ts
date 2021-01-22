import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Models
import { CartModel } from '../../models/magento/cart/cart';

// RXJS
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticateProvider {

	// API Url
	private apiUrl: string;

	// Provider token storage
	public adminToken: string = '2hwem69utyacku5d5cwpqgm115hot8kl';
	public customerToken: string = ''; // This is the customer authorization string
	public guestToken: string = ''; // This is the guest cart id

	// Provider cart storage
	public currentCart: CartModel = null;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.2
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 * @param { Storage } storage
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform,
		public storage: Storage
	) {
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	// GET API Methods

	/**
	 * @public
	 * @method attemptLogin
	 * @description Attempt to login to retrieve customer token
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 * @param { string } username
	 * @param { string } password
	 * @return { Observable<string> }
	 */
	public attemptLogin(username: string, password: string): Observable<string>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAdminToken());

		let data = {
			username: username,
			password: password
		};

		return this.http.post<string>(this.apiUrl + '/integration/customer/token', data, { headers: apiHeader });
	}

	/**
	 * @public
	 * @method getAdminToken
	 * @description Get admin token from the provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { string }
	 */
	public getAdminToken(): string{
		return this.adminToken;
	}

	/**
	 * @public
	 * @method getCustomerTokenProvider
	 * @description Get customer token from the provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { string }
	 */
	public getCustomerTokenProvider(): string{
		return this.customerToken;
	}

	/**
	 * @public
	 * @method getCustomerTokenSession
	 * @description Get customer token from the session storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { string }
	 */
	public getCustomerTokenSession(): string{
		return sessionStorage.getItem('customerToken');
	}

	/**
	 * @public
	 * @method getCustomerTokenLocal
	 * @description Get customer token from the local storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { string }
	 */
	public getCustomerTokenLocal(): string{
		return localStorage.getItem('customerToken');
	}

	/**
	 * @public
	 * @method getCustomerTokenStorage
	 * @description Get customer token from the ionic storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { Promise<string> }
	 */
	public async getCustomerTokenStorage(): Promise<string>{
		return await this.storage.get('customerToken');
	}

	/**
	 * @public
	 * @method setCustomerTokenProvider
	 * @description Set customer token to the provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setCustomerTokenProvider(token: string): void{
		this.customerToken = token;
	}

	/**
	 * @public
	 * @method setCustomerTokenSession
	 * @description Set customer token to the session storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setCustomerTokenSession(token: string): void{
		sessionStorage.setItem('customerToken', token);
	}

	/**
	 * @public
	 * @method setCustomerTokenLocal
	 * @description Set customer token to the local storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setCustomerTokenLocal(token: string): void{
		localStorage.setItem('customerToken', token);
	}

	/**
	 * @public
	 * @method setCustomerTokenProvider
	 * @description Set customer token to the ionic storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 * @return { Promise<any> }
	 */
	public async setCustomerTokenStorage(token: string): Promise<any>{
		return await this.storage.set('customerToken', token);
	}

	/**
	 * @public
	 * @method setCustomerToken
	 * @description Set customer token conventiently to the provider, session, local and ionic storage
	 * @desc Only use this if you are not concerned with asynchronization
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setCustomerToken(token: string): void{
		this.setCustomerTokenProvider(token);
		this.setCustomerTokenSession(token);
		this.setCustomerTokenLocal(token);
		this.setCustomerTokenStorage(token);
	}

	/**
	 * @public
	 * @method getGuestTokenProvider
	 * @description Get guest token from the provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { string }
	 */
	public getGuestTokenProvider(): string{
		return this.guestToken;
	}

	/**
	 * @public
	 * @method getGuestTokenSession
	 * @description Get guest token from the session storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { string }
	 */
	public getGuestTokenSession(): string{
		return sessionStorage.getItem('guestToken');
	}

	/**
	 * @public
	 * @method getGuestTokenLocal
	 * @description Get guest token from the local storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { string }
	 */
	public getGuestTokenLocal(): string{
		return localStorage.getItem('guestToken');
	}

	/**
	 * @public
	 * @method getGuestTokenStorage
	 * @description Get guest token from ionic storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { Promise<string> }
	 */
	public async getGuestTokenStorage(): Promise<string>{
		return await this.storage.get('guestToken');
	}

	/**
	 * @public
	 * @method setGuestTokenProvider
	 * @description Set guest token to the provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setGuestTokenProvider(token: string): void{
		this.guestToken = token;
	}

	/**
	 * @public
	 * @method setGuestTokenSession
	 * @description Set guest token to the session storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setGuestTokenSession(token: string): void{
		sessionStorage.setItem('guestToken', token);
	}

	/**
	 * @public
	 * @method setGuestTokenLocal
	 * @description Set guest token to the local storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setGuestTokenLocal(token: string): void{
		localStorage.setItem('guestToken', token);
	}

	/**
	 * @public
	 * @method setGuestTokenStorage
	 * @description Set guest token to the ionic storage
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 * @return { Promise<any> }
	 */
	public async setGuestTokenStorage(token: string): Promise<any>{
		return await this.storage.set('guestToken', token);
	}

	/**
	 * @public
	 * @method setGuestToken
	 * @description Set guest token conventiently to the provider, session, local and ionic storage
	 * @desc Only use this if you are not concerned with asynchronization
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { string } token
	 */
	public setGuestToken(token: string): void{
		this.setGuestTokenProvider(token);
		this.setGuestTokenSession(token);
		this.setGuestTokenLocal(token);
		this.setGuestTokenStorage(token);
	}

	/**
	 * @public
	 * @method getCurrentCartProvider
	 * @description Get the current cart from the provider
	 * @desc This will not work with the storage solutions
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { CartModel }
	 */
	public getCurrentCartProvider(): CartModel{
		return this.currentCart;
	}

	/**
	 * @public
	 * @method setCurrentCartProvider
	 * @description Set the current cart to the provider
	 * @desc This will not work with the storage solutions
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { CartModel } cart
	 */
	public setCurrentCartProvider(cart: CartModel): void{
		this.currentCart = cart;		
	}
}
