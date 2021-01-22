import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { TisSlideModel, TisDealModel, TisLocationModel } from '../../models/tng/tis';

// RXJS
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class TisProvider {

	private apiUrl: string = 'http://45.79.213.195/api/v1';
	private token: string = 'tis@tngworldwide.com'

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform
	) {}

	/**
	 * @public
	 * @method readBannerSlides
	 * @description Retrieve banner slide data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { Observable<Array<TisSlideModel>> }
	 */
	public readBannerSlides(): Observable<Array<TisSlideModel>>{
		return this.http.get<Array<TisSlideModel>>(this.apiUrl + '/slides/data/list?token=' + this.token).pipe(
			map(data => this.getTisSlideModels(data))
		);
	}

	/**
	 * @public
	 * @method readFrontDeals
	 * @description Retrieve front deals data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { Observable<Array<TisDealModel>> }
	 */
	public readFrontDeals(): Observable<Array<TisDealModel>>{
		return this.http.get<Array<TisDealModel>>(this.apiUrl + '/deals/data/list?token=' + this.token).pipe(
			map(data => this.getTisDealModels(data))
		);
	}

	/**
	 * @public
	 * @method readStoreLocations
	 * @description Retrieve store location data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { Observable<Array<TisLocationModel>> }
	 */
	public readStoreLocations(): Observable<Array<TisLocationModel>>{
		return this.http.get<Array<TisLocationModel>>(this.apiUrl + '/rewardsStores/data/list').pipe(
			map(data => this.getTisLocationModels(data))
		);
	}


	/**
	 * @private
	 * @method getTisSlideModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<TisSlideModel> }
	 */
	private getTisSlideModels(data: any): Array<TisSlideModel>{
		let array: Array<TisSlideModel> = [];

		for(let item of data){
			let model: TisSlideModel = new TisSlideModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getTisDealModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<TisDealModel> }
	 */
	private getTisDealModels(data: any): Array<TisDealModel>{
		let array: Array<TisDealModel> = [];

		for(let item of data){
			let model: TisDealModel = new TisDealModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getTisLocationModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<TisLocationModel> }
	 */
	private getTisLocationModels(data: any): Array<TisLocationModel>{
		let array: Array<TisLocationModel> = [];

		for(let item of data){
			let model: TisLocationModel = new TisLocationModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}
}
