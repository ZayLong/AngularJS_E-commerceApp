import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { TaggingProductQueueModel } from '../../../models/magento/nosto/tagging';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class NostoTaggingProvider{

	private apiUrl: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform){

		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';
		}
	}

	/**
	 * @public
	 * @method readTaggingProductQueue
	 * @description ???
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { number } productId
	 * @return { Observable<TaggingProductQueueModel> }
	 */
	public readTaggingProductQueue(productId: number): Observable<TaggingProductQueueModel>{
		return this.http.get<TaggingProductQueueModel>(this.apiUrl + '/tng/nosto/products/' + productId).pipe(
			map(data => this.getTaggingProductQueueModel(data))
		);
	}

	/**
	 * @private
	 * @method getTaggingProductQueueModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { TaggingProductQueueModel }
	 */
	private getTaggingProductQueueModel(data: any): TaggingProductQueueModel{
		let model: TaggingProductQueueModel = new TaggingProductQueueModel();
		return model.fromJson(data);
	}

}