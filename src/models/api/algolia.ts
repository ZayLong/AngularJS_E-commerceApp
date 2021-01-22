export enum AlgoliaSearchIndex{
	PriceDesc = 'magento2_staging_theindustrysource_view_products_price_default_desc',
	PriceAsc = 'magento2_staging_theindustrysource_view_products_price_default_asc',
	CreatedAtDesc = 'magento2_staging_theindustrysource_view_products_created_at_desc',
	CreatedAtAsc = 'magento2_staging_theindustrysource_view_products', // This is almost the same as CreatedAtDesc
	BestSellerAsc = 'magento2_staging_theindustrysource_view_products_sales_count_asc',
	BestSellerDesc = 'magento2_staging_theindustrysource_view_products_sales_count_desc'
}

export class AlgoliaSearchResultModel{
	private _exhaustiveFacetsCount: boolean;
	private _exhaustiveNbHits: boolean;
	private _facets: any; //Dynamic properties
	private _facets_stats: any; //Dynamic properties
	private _hits: Array<AlgoliaHitModel> = [];
	private _hitsPerPage: number;
	private _nbHits: number;
	private _nbPages: number;
	private _page: number;
	private _params: string;
	private _processingTimeMS: number;
	private _query: string;

	get exhaustiveFacetsCount(): boolean{
		return this._exhaustiveFacetsCount;
	}

	set exhaustiveFacetsCount(value: boolean){
		this._exhaustiveFacetsCount;
	}

	get exhaustiveNbHits(): boolean{
		return this._exhaustiveNbHits;
	}

	set exhaustiveNbHits(value: boolean){
		this._exhaustiveNbHits;
	}

	get facets(): any{
		return this._facets;
	}

	set facets(value: any){
		this._facets = value;
	}

	get facets_stats(): any{
		return this._facets_stats;
	}

	set facets_stats(value: any){
		this._facets_stats = value;
	}

	get hits(): Array<AlgoliaHitModel>{
		return this._hits;
	}

	get_hit(key: number): AlgoliaHitModel{
		return this.hits[key];
	}

	set hits(value: Array<AlgoliaHitModel>){
		this._hits = value;
	}

	set_hit(value: AlgoliaHitModel): void{
		this.hits.push(value);
	}

	get hitsPerPage(): number{
		return this._hitsPerPage;
	}

	set hitsPerPage(value: number){
		this._hitsPerPage = value;
	}

	get nbHits(): number{
		return this._nbHits;
	}

	set nbHits(value: number){
		this._nbHits = value;
	}

	get nbPages(): number{
		return this._nbPages;
	}

	set nbPages(value: number){
		this._nbPages = value;
	}

	get page(): number{
		return this._page;
	}

	set page(value: number){
		this._page = value;
	}

	get params(): string{
		return this._params;
	}

	set params(value: string){
		this._params = value;
	}

	get processingTimeMS(): number{
		return this._processingTimeMS;
	}

	set processingTimeMS(value: number){
		this._processingTimeMS = value;
	}

	get query(): string{
		return this._query;
	}

	set query(value: string){
		this._query = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.exhaustiveFacetsCount = data.exhaustiveFacetsCount;
		this.exhaustiveNbHits = data.exhaustiveNbHits;

		this.facets = data.facets;
		this.facets_stats = data.facets_stats;
		
		if(data.hits){
			for(let hit of data.hits){
				let model: AlgoliaHitModel = new AlgoliaHitModel();
				this.set_hit(model.fromJson(hit));
			}
		}
		
		this.hitsPerPage = data.hitsPerPage;
		this.nbHits = data.nbHits;
		this.nbPages = data.nbPages;
		this.page = data.page;
		this.params = data.params;
		this.processingTimeMS = data.processingTimeMS;
		this.query = data.query;

		return this;
	}
}

export class AlgoliaHitModel{
	private _name: string;
	private _url: string;
	private _visibility_search: number;
	private _visibility_catalog: number;
	private _categories: any; // Dynamic properties
	private _categories_without_path: Array<string>;
	private _thumbnail_url: string;
	private _image_url: string;
	private _in_stock: number;
	private _sku: string;
	private _manufacturer: string;
	private _collections: string;
	private _tags: string;
	private _price: any; // Dynamic properties
	private _created_at: string;
	private _type_id: string;
	private _algoliaLastUpdateAtCET: string;
	private _objectID: string;
	private __highlightResult: any; // Dynamic properties
	private __rankingInfo: AlgoliaHitRankingModel;
	private _best_seller: number;
	private _sales_count: number;

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get url(): string{
		return this._url;
	}

	set url(value: string){
		this._url = value;
	}

	get visibility_search(): number{
		return this._visibility_search;
	}

	set visibility_search(value: number){
		this._visibility_search = value;
	}

	get visibility_catalog(): number{
		return this._visibility_catalog;
	}

	set visibility_catalog(value: number){
		this._visibility_catalog = value;
	}

	get categories(): any{
		return this._categories;
	}

	set categories(value: any){
		this._categories = value;
	}

	get categories_without_path(): Array<string>{
		return this._categories_without_path;
	}

	get_categories_without_path(key: number): string{
		return this.categories_without_path[key];
	}

	set categories_without_path(value: Array<string>){
		this._categories_without_path = value;
	}

	set_categories_without_path(value: string): void{
		this.categories_without_path.push(value);
	}

	get thumbnail_url(): string{
		return this._thumbnail_url;
	}

	set thumbnail_url(value: string){
		this._thumbnail_url = value;
	}

	get image_url(): string{
		return this._image_url;
	}

	set image_url(value: string){
		this._image_url = value;
	}

	get in_stock(): number{
		return this._in_stock;
	}

	set in_stock(value: number){
		this._in_stock = value;
	}

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get manufacturer(): string{
		return this._manufacturer;
	}

	set manufacturer(value: string){
		this._manufacturer = value;
	}

	get collections(): string{
		return this._collections;
	}

	set collections(value: string){
		this._collections = value;
	}

	get tags(): string{
		return this._tags;
	}

	set tags(value: string){
		this._tags = value;
	}

	get price(): any{
		return this._price;
	}

	set price(value: any){
		this._price = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get type_id(): string{
		return this._type_id;
	}

	set type_id(value: string){
		this._type_id = value;
	}

	get algoliaLastUpdateAtCET(): string{
		return this._algoliaLastUpdateAtCET;
	}

	set algoliaLastUpdateAtCET(value: string){
		this._algoliaLastUpdateAtCET = value;
	}

	get objectID(): string{
		return this._objectID;
	}

	set objectID(value: string){
		this._objectID = value;
	}

	get _highlightResult(): any{
		return this.__highlightResult;
	}

	set _highlightResult(value: any){
		this.__highlightResult = value;
	}

	get _rankingInfo(): AlgoliaHitRankingModel{
		return this.__rankingInfo;
	}

	set _rankingInfo(value: AlgoliaHitRankingModel){
		this.__rankingInfo = value;
	}

	get best_seller(): number{
		return this._best_seller;
	}

	set best_seller(value: number){
		this._best_seller = value;
	}

	get sales_count(): number{
		return this._sales_count;
	}

	set sales_count(value: number){
		this._sales_count = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.name = data.name;
		this.url = data.url;
		this.visibility_search = data.visibility_search;
		this.visibility_catalog = data.visibility_catalog;
		this.categories = data.categories; // too dynamic
		this.categories_without_path = data.categories_without_path;
		this.thumbnail_url = data.thumbnail_url;
		this.image_url = data.image_url;
		this.in_stock = data.in_stock;
		this.sku = data.sku;
		this.manufacturer = data.manufacturer;
		this.collections = data.collections;
		this.tags = data.tags;
		this.price = data.price; // too dynamic
		this.created_at = data.created_at;
		this.type_id = data.type_id;
		this.algoliaLastUpdateAtCET = data.algoliaLastUpdateAtCET;
		this.objectID = data.objectID;
		this._highlightResult = data._highlightResult; // too dynamic

		if(data._rankingInfo){
			let rankingModel: AlgoliaHitRankingModel = new AlgoliaHitRankingModel();
			this._rankingInfo = rankingModel.fromJson(data._rankingInfo);	
		}

		this.best_seller = data.best_seller;
		this.sales_count = data.sales_count;

		return this;
	}
}

export class AlgoliaHitRankingModel{
	private _nbTypos: number;
    private _firstMatchedWord: number;
    private _proximityDistance: number;
    private _userScore: number;
    private _geoDistance: number;
    private _geoPrecision: number;
    private _nbExactWords: number;
    private _words: number;
    private _filters: number;

    get nbTypos(): number{
		return this._nbTypos;
    }

	set nbTypos(value: number){
		this._nbTypos = value;
	}

    get firstMatchedWord(): number{
		return this._firstMatchedWord;
    }

	set firstMatchedWord(value: number){
		this._firstMatchedWord = value;
	}

    get proximityDistance(): number{
		return this._proximityDistance;
    }

	set proximityDistance(value: number){
		this._proximityDistance = value;
	}

    get userScore(): number{
		return this._userScore;
    }

	set userScore(value: number){
		this._userScore = value;
	}

    get geoDistance(): number{
		return this._geoDistance;
    }

	set geoDistance(value: number){
		this._geoDistance = value;
	}

    get geoPrecision(): number{
		return this._geoPrecision;
    }

	set geoPrecision(value: number){
		this._geoPrecision = value;
	}

    get nbExactWords(): number{
		return this._nbExactWords;
    }

	set nbExactWords(value: number){
		this._nbExactWords = value;
	}

    get words(): number{
		return this._words;
    }

	set words(value: number){
		this._words = value;
	}

    get filters(): number{
		return this._filters;
    }

	set filters(value: number){
		this._filters = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.nbTypos = data.nbTypos;
    	this.firstMatchedWord = data.firstMatchedWord;
    	this.proximityDistance = data.proximityDistance;
    	this.userScore = data.userScore;
    	this.geoDistance = data.geoDistance;
    	this.geoPrecision = data.geoPrecision;
    	this.nbExactWords = data.nbExactWords;
    	this.words = data.words;
    	this.filters = data.filters;

		return this;
	}
}