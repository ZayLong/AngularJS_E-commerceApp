import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

//import  from 'algoliasearch';
import AlgoliaClient from 'algoliasearch';

// Models
import { AlgoliaSearchIndex, AlgoliaSearchResultModel } from '../../models/api/algolia';

@Injectable()
export class AlgoliaProvider {
	
	public applicationId: string = '288AI3DQ87';
	public keyId: string = '5785055447bcf0af0ffbae9afe0c841d';
	public indexId: string = AlgoliaSearchIndex.CreatedAtAsc;

	public client: AlgoliaClient.AlgoliaClient;
	public index: AlgoliaClient.AlgoliaIndex;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 */
	public constructor(public http: HttpClient, public platform: Platform) {
		let clientOptions: AlgoliaClient.ClientOptions = {
			protocol: 'https:'
		}

		this.client = AlgoliaClient(this.applicationId, this.keyId, clientOptions);
		this.index = this.client.initIndex(this.indexId);
	}

	/**
	 * @public
	 * @method readLogs
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { Object }
	 */
	public readLogs(){
		return this.client.getLogs({});
	}

	/**
	 * @public
	 * @method readProducts
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { AlgoliaClient.AlgoliaQueryParameters } query
	 * @return { Object }
	 */
	public readProducts(query: AlgoliaClient.AlgoliaQueryParameters){
		this.index = this.client.initIndex(this.indexId);
		
		return this.index.search(query);
	}

	/**
	 * @public
	 * @method getAlgoliaSearchResultModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Figure out how to call this method from readProducts() since its a Promise
	 * @param { Object } data
	 * @return { AlgoliaSearchResultModel }
	 */
	public getAlgoliaSearchResultModel(data: any): AlgoliaSearchResultModel{
		let model: AlgoliaSearchResultModel = new AlgoliaSearchResultModel();
		return model.fromJson(data);
	}

	/**
	 * @public
	 * @method clearSearch
	 * @description Clear out the search storage cache. Useful when making a new search
	 * @desc Lot of the search derives from Algolia data, hence why its in this provider
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public clearSearch(): void{
		for(let i = 0; i < 4; i++){
			sessionStorage.setItem('searchCategory' + i.toString(), '');
		}

		sessionStorage.setItem('searchColor', '');
		sessionStorage.setItem('searchManufacturer', '');
		sessionStorage.setItem('searchCollections', '');
		sessionStorage.setItem('searchTags', '');
		sessionStorage.setItem('searchPriceLower', '');
		sessionStorage.setItem('searchPriceUpper', '');
		sessionStorage.setItem('searchQuery', '');

		sessionStorage.setItem('searchCurrentPage', '1');
	}
}