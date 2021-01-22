import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { CategoryModel, CategoryItemModel, CategoryProductLinkModel } from '../../models/magento/catalog/category';
import { ProductModel, StockModel } from '../../models/magento/catalog/product';
import { ProductAttributeModel } from '../../models/magento/catalog/product-attribute';
import { MediaGalleryModel } from '../../models/magento/catalog/media-gallery';

import { 
	SearchCriteriaModel,
	FilterGroupModel,
	FilterModel,
	SortOrderGroupModel,
	SortOrderModel,
	PagingModel,
	Condition,
	Direction
} from '../../models/magento/general/search';

import { SearchProductResponseModel } from '../../models/ionic/provider/magento/catalog';

// Providers
import { AuthenticateProvider } from '../magento/authenticate';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CatalogProvider {

	public apiUrl: string;

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
		public authProvider: AuthenticateProvider) {
		
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	// C(R)UD

	/**
	 * @public
	 * @method readCategories
	 * @description Get all categories
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo I removed an interface response from this method, check back!
	 * @return { Observable<CategoryModel> }
	 */
	public readCategories(): Observable<CategoryModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CategoryModel>(this.apiUrl + '/categories', { headers: apiHeader }).pipe(
			map(data => this.getCategoryModel(data))
		);
	}

	/**
	 * @public
	 * @method readCategory
	 * @description Get a category
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { int } id
	 * @return { Observable<CategoryItemModel> }
	 */
	public readCategory(id: number): Observable<CategoryItemModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<CategoryItemModel>(this.apiUrl + '/categories/' + id, { headers: apiHeader }).pipe(
			map(data => this.getCategoryItemModel(data))
		);
	}

	/**
	 * @public
	 * @method readProducts
	 * @description Get all products
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<SearchProductResponseModel> }
	 */
	public readProducts(): Observable<SearchProductResponseModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<SearchProductResponseModel>(this.apiUrl + '/products', { headers: apiHeader }).pipe(
			map(data => this.getSearchProductResponseModel(data))
		);
	}

	/**
	 * @public
	 * @method readProductsBySearch
	 * @description Get products by search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { SearchCriteriaModel } search
	 * @return { Observable<SearchProductResponseModel> }
	 */
	public readProductsBySearch(search: SearchCriteriaModel): Observable<SearchProductResponseModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<SearchProductResponseModel>(this.apiUrl + '/products' + search.toString(), { headers: apiHeader }).pipe(
			map(data => this.getSearchProductResponseModel(data))
		);
	}

	/**
	 * @public
	 * @method readCategoryProductLinks
	 * @description Get all product links (as SKUs) from a single category
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { int } categoryID
	 * @return { Observable<Array<CategoryProductLinkModel>> }
	 */
	public readCategoryProductLinks(categoryID: number): Observable<Array<CategoryProductLinkModel>>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<Array<CategoryProductLinkModel>>(this.apiUrl + '/categories/' + categoryID + '/products', { headers: apiHeader }).pipe(
			map(data => this.getCategoryProductLinkModels(data))
		);
	}


	/**
	 * @public
	 * @method readCategoryProductsBySearch
	 * @description Get all products from a category search
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @uses SearchCriteria
	 * @param { number } categoryId
	 * @param { number } noItems (default at 10)
	 * @param { number } pageNo (default at 1)
	 */
	public readCategoryProductsBySearch(categoryId: number, noItems: number = 10, pageNo: number = 1): Observable<SearchProductResponseModel>{
		
		let filterGroup: FilterGroupModel = new FilterGroupModel();
		let catFilter: FilterModel = new FilterModel('category_id', categoryId.toString(), Condition.Equal);
		filterGroup.set_filter(catFilter);

		let sortGroup: SortOrderGroupModel = new SortOrderGroupModel();
		let sort: SortOrderModel = new SortOrderModel('id', Direction.Ascending);
		sortGroup.set_sort_order(sort);

		let paging: PagingModel = new PagingModel(noItems, pageNo);

		let searchModel: SearchCriteriaModel = new SearchCriteriaModel(filterGroup, sortGroup, paging);

		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<SearchProductResponseModel>(this.apiUrl + '/products' + searchModel.toString(), { headers: apiHeader }).pipe(
			map(data => this.getSearchProductResponseModel(data))
		);
	}

	/**
	 * @public
	 * @method readProduct
	 * @description Get a product
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } sku
	 * @return { Observable<ProductModel> }
	 */
	public readProduct(sku: string): Observable<ProductModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<ProductModel>(this.apiUrl + '/products/' + sku, { headers: apiHeader }).pipe(
			map(data => this.getProductModel(data))
		);
	}

	/**
	 * @public
	 * @method readProductAttributeByCode
	 * @description Get product attribute by code
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<ProductAttributeModel> }
	 */
	public readProductAttributeByCode(code: string): Observable<ProductAttributeModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<ProductAttributeModel>(this.apiUrl + '/products/attributes/' + code, { headers: apiHeader }).pipe(
			map(data => this.getProductAttributeModel(data))
		);
	}

	/**
	 * @public
	 * @method readProductMediaGalleries
	 * @description Get a product list of media gallery information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } sku
	 * @return { Observable<Array<MediaGalleryModel>> }
	 */
	public readProductMediaGalleries(sku: string): Observable<Array<MediaGalleryModel>>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());
		return this.http.get<Array<MediaGalleryModel>>(this.apiUrl + '/products/' + sku + '/media', { headers: apiHeader }).pipe(
			map(data => this.getMediaGalleryModels(data))
		);
	}

	/**
	 * @public
	 * @method readProductMediaGallery
	 * @description Get a product media gallery entry information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } sku
	 * @param { number } entryId (not sure what this is suppose to be)
	 * @return { Observable<MediaGalleryModel> }
	 */
	public readProductMediaGallery(sku: string, entryId: number): Observable<MediaGalleryModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<MediaGalleryModel>(this.apiUrl + '/products/' + sku + '/media/' + entryId, { headers: apiHeader }).pipe(
			map(data => this.getMediaGalleryModel(data))
		);
	}

	/**
	 * @public
	 * @method readProductStock
	 * @description Get the product stock (quantity) information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } sku
	 * @return { Observable<StockModel> }
	 */
	public readProductStock(sku: string): Observable<StockModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<StockModel>(this.apiUrl + '/stockItems/' + sku, { headers: apiHeader }).pipe(
			map(data => this.getStockModel(data))
		);
	}

	
	// OTHER PUBLIC METHODS

	/**
	 * @public
	 * @method filterProductManufacturing
	 * @description Get all (unique) manufacturing options from an array of products
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return something ???
	 */
	public filterProductManufacturing(data: any): any{
		//let manufacturing: Array<{key: string, value: string}>;
	}

	/**
	 * @public
	 * @method convertProductLinkToProduct
	 * @description Convert product link to product
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Why is the ProductLinkModel called CategoryProductLinkModel?
	 * @param { ProductLinkModel } link
	 * @return { ProductModel }
	 */
	public convertProductLinkToProduct(link: CategoryProductLinkModel): Observable<ProductModel>{

		return this.readProduct(link.sku);
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getCategoryModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CategoryModel }
	 */
	private getCategoryModel(data: any): CategoryModel{
		let model: CategoryModel = new CategoryModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCategoryItemModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CategoryItemModel }
	 */
	private getCategoryItemModel(data: any): CategoryItemModel{
		let model: CategoryItemModel = new CategoryItemModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getProductModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { ProductModel }
	 */
	private getProductModel(data: any): ProductModel{
		let model: ProductModel = new ProductModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCategoryProductLinkModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<CategoryProductLinkModel> }
	 */
	private getCategoryProductLinkModels(data: any): Array<CategoryProductLinkModel>{
		let array: Array<CategoryProductLinkModel> = [];

		for(let item of data){
			let model: CategoryProductLinkModel = new CategoryProductLinkModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getProductAttributeModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { ProductAttributeModel }
	 */
	private getProductAttributeModel(data: any): ProductAttributeModel{
		let model: ProductAttributeModel = new ProductAttributeModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getMediaGalleryModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<MediaGalleryModel> }
	 */
	private getMediaGalleryModels(data: any): Array<MediaGalleryModel>{
		let array: Array<MediaGalleryModel> = [];

		for(let item of data){
			let model: MediaGalleryModel = new MediaGalleryModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getMediaGalleryModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { MediaGalleryModel }
	 */
	private getMediaGalleryModel(data: any): MediaGalleryModel{
		let model: MediaGalleryModel = new MediaGalleryModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getStockModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { StockModel }
	 */
	private getStockModel(data: any): StockModel{
		let model: StockModel = new StockModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getSearchProductResponseModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { SearchProductResponseModel }
	 */
	private getSearchProductResponseModel(data: any): SearchProductResponseModel{
		let model: SearchProductResponseModel = new SearchProductResponseModel();
		return model.fromJson(data);
	}
}