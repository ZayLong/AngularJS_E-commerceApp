import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { AnalyticsModel } from '../../models/magento/store/analytics';
import { ConfigModel } from '../../models/magento/store/config';
import { CountryModel, CountryAvailableRegionModel } from '../../models/magento/store/country';
import { CurrencyModel } from '../../models/magento/store/currency';
import { CmsPageModel, CmsBlockModel } from '../../models/magento/store/cms';

// Providers
import { AuthenticateProvider } from '../magento/authenticate';

//RXJS
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()

export class StoreProvider {

	private apiUrl:string;

	// Defaults
	config: ConfigModel;
	countries: Array<CountryModel> = [];
	currency: CurrencyModel;

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

	// C(R)UD

	/**
	 * @public
	 * @method readAnalytics
	 * @description Get analytics data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<AnalyticsModel> }
	 */
	public readAnalytics(): Observable<AnalyticsModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<AnalyticsModel>(this.apiUrl + '/analytics/link', { headers: apiHeader }).pipe(
			map(data => this.getAnalyticsModel(data))
		);
	}

	/**
	 * @public
	 * @method readConfig
	 * @description Get an array of store config values
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<ConfigModel> }
	 */
	public readConfig(): Observable<Array<ConfigModel>>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<Array<ConfigModel>>(this.apiUrl + '/store/storeConfigs', { headers: apiHeader }).pipe(
			map(data => this.getConfigModels(data))
		);
	}

	/**
	 * @public
	 * @method readCurrency
	 * @description Get store currencies
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CurrencyModel> }
	 */
	public readCurrency(): Observable<CurrencyModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CurrencyModel>(this.apiUrl + '/directory/currency', { headers: apiHeader }).pipe(
			map(data => this.getCurrencyModel(data))
		);
	}

	/**
	 * @public
	 * @method readCountries
	 * @description Get store countries
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable }
	 */
	public readCountries(): any{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get(this.apiUrl + '/directory/countries', { headers: apiHeader });
	}

	/**
	 * @public
	 * @method readCountry
	 * @description Get store countries
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param string country
	 * @return { Observable }
	 */
	public readCountry(country: string): Observable<CountryModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CountryModel>(this.apiUrl + '/directory/countries/' + country, { headers: apiHeader }).pipe(
			map( data => this.getCountryModel(data) )
		);
	}

	/**
	 * @public
	 * @method readViews
	 * @description Get store views
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Make the model
	 * @return { Observable }
	 */
	public readViews(): any{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get(this.apiUrl + '/store/storeViews', { headers: apiHeader });
	}

	/**
	 * @public
	 * @method readWebsites
	 * @description Get store websites
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Make the model
	 * @return { Observable }
	 */
	public readWebsites(): any{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get(this.apiUrl + '/store/websites', { headers: apiHeader });
	}

	// Make the CMS calls

	/**
	 * @public
	 * @method readCmsPage
	 * @description Get the store pages
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CmsPageModel> }
	 */
	public readCmsPage(id: number): Observable<CmsPageModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CmsPageModel>(this.apiUrl + '/cmsPage/' + id, { headers: apiHeaders }).pipe(
			map(data => this.getCmsPageModel(data))
		);
	}

	/**
	 * @public
	 * @method readCmsBlock
	 * @description Get the store pages
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CmsBlockModel> }
	 */
	public readCmsBlock(id: number): Observable<CmsBlockModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CmsBlockModel>(this.apiUrl + '/cmsPage/' + id, { headers: apiHeaders }).pipe(
			map(data => this.getCmsBlockModel(data))
		);
	}

	// GET MODEL METHODS 

	/**
	 * @private
	 * @method getAnalyticsModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { AnalyticsModel }
	 */
	private getAnalyticsModel(data: any): AnalyticsModel{
		let model: AnalyticsModel = new AnalyticsModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getConfigModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { Array<ConfigModel> }
	 */
	private getConfigModels(data: any): Array<ConfigModel>{
		let array: Array<ConfigModel> = [];

		for(let item of data){
			let model: ConfigModel = new ConfigModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getCountryModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { CountryModel }
	 */
	private getCountryModel(data: any): CountryModel{
		let model: CountryModel = new CountryModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCurrencyModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { CurrencyModel }
	 */
	private getCurrencyModel(data: any): CurrencyModel{
		let model: CurrencyModel = new CurrencyModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCmsPageModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { CmsPageModel }
	 */
	private getCmsPageModel(data: any): CmsPageModel{
		let model: CmsPageModel = new CmsPageModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCmsBlockModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { CmsBlockModel }
	 */
	private getCmsBlockModel(data: any): CmsBlockModel{
		let model: CmsBlockModel = new CmsBlockModel();
		return model.fromJson(data);
	}

	/**
	 * @public
	 * @method findCountry
	 * @description Find country by id
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @deprecated
	 * @param { string } key
	 * @return { CountryModel }
	 */
	public findCountry(key: string): CountryModel{
		console.info('StoreProvider - findCountry() - readCountry()', key);

		return Observable.create(observer => {
			this.readCountry(key).subscribe(data => {
				console.info('StoreProvider - findCountry() - readCountry()', data);
				observer.next(data)
			}, err => {
				console.error('StoreProvider - findCountry() - readCountry()', err);
				observer.error(err);
			});
		});
	}

	/**
	 * @public
	 * @method findRegionByAbbr
	 * @description Find the region by abbreviation
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @deprecated Replace with findRegion (replace this from login and register pages)
	 * @param { string } key
	 * @param { string } country (default at US)
	 * @return { CountryAvailableRegionModel }
	 */
	public findRegionByAbbr(key: string, country: string = 'US'): CountryAvailableRegionModel{
		let countryData: CountryModel = this.findCountry(country);

		for(let region of countryData.available_regions){
			if(region.code === key){
				return region;
			}
		}

		return null;
	}

	/**
	 * @public
	 * @method findRegion
	 * @description Find the region by different methods
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.3.0
	 * @param { string } search
	 * @param { string } key
	 * @param { string } country (default at US)
	 * @return { Observable<CountryAvailableRegionModel> }
	 */
	public findRegion(search: string, key: string = 'id', country: string = 'US'): Observable<CountryAvailableRegionModel>{
		return Observable.create(observer => {
			this.readCountry(country).subscribe(data => {
				for(let region of data.available_regions){
					if(region[key] === search){
						observer.next(region);
					}
				}

				observer.error(false);
			}, err => {
				console.error('StoreProvider - findRegion() - readCountry()', err);
				observer.error(err);
			});
		});
	}
}
