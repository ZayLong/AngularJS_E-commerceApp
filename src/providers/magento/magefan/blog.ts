import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { BlogListModel, BlogCategoryModel } from '../../../models/magento/magefan/blog';

// Providers
import { AuthenticateProvider } from '../../../providers/magento/authenticate';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MagefanBlogProvider {

	private apiUrl: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 * @param { AuthenticateProvider } authProvider
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform,
		public authProvider: AuthenticateProvider
	){
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';
		}
	}
	
	// GET METHODS

	/**
	 * @public
	 * @method getPostList
	 * @description Get the blog post list
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.5.0
	 * @param { string } type
	 * @param { string } term
	 * @param { number } page
	 * @param { number } limit
	 * @param { number } storeId (default at 1 (TIS))
	 * @return { Observable<BlogListModel> }
	 */
	public getPostList(type: string, term: string, page: number, limit: number, storeId: number = 1): Observable<BlogListModel>{

		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<BlogListModel>(this.apiUrl + '/blog/post/list/' + type + '/' + term + '/' + storeId + '/' + page + '/' + limit, { headers: apiHeaders }).pipe(
			map(data => this.getBlogListModel(data))
		);
	}

	/**
	 * @public
	 * @method getCategory
	 * @description Get the blog category
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.5.0
	 * @param { string } catId
	 * @return { Observable<BlogCategoryModel> }
	 */
	public getCategory(catId: string): Observable<BlogCategoryModel>{
		let apiHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

		return this.http.get<BlogCategoryModel>(this.apiUrl + '/blog/category/' + catId, { headers: apiHeaders }).pipe(
			map(data => this.getBlogCategoryModel(data))
		);
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getBlogListModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { Object } data
	 * @return { BlogListModel }
	 */
	private getBlogListModel(data: any): BlogListModel{
		// We are retrieving a JSON string
		data = JSON.parse(data);

		let model: BlogListModel = new BlogListModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getBlogCategoryModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { Object } data
	 * @return { BlogListModel }
	 */
	private getBlogCategoryModel(data: any): BlogCategoryModel{
		// We are retrieving a JSON string
		data = JSON.parse(data);

		let model: BlogCategoryModel = new BlogCategoryModel();
		return model.fromJson(data);
	}
}