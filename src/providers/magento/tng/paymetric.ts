import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { PaymetricCardModel } from '../../../models/magento/tng/paymetric';

// Providers
import { AuthenticateProvider } from '../../magento/authenticate';

// RXJS
import { map } from 'rxjs/operators';

@Injectable()
export class PaymetricProvider {

	private apiUrl: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 * @param { AuthenticateProvider } authProvider
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform,
		public authProvider: AuthenticateProvider
	) {
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	// Might want to move some of the methods from checkout to here that is related to paymetric

	// GET METHODS

	/**
	 * @public
	 * @method readCreditCards
	 * @description Get all stored credit cards from an user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 */
	public readCreditCards(){
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		return this.http.get(this.apiUrl + '/tng/carts/mine/SCC', { headers: apiHeaders }).pipe(
			map(data => this.getPaymetricCardModels(data))
		);
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getPaymetricCardModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @param { Object } data
	 * @return { Array<PaymetricCardModel> }
	 */
	private getPaymetricCardModels(data: any): Array<PaymetricCardModel>{
		let array: Array<PaymetricCardModel> = [];

		for(let item of data){
			let model: PaymetricCardModel = new PaymetricCardModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}
}