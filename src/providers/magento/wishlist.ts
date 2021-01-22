import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { ProductModel } from '../../models/magento/catalog/product';
import { WishlistModel, WishlistItemModel } from '../../models/magento/wishlist/wishlist';

// Providers
import { AuthenticateProvider } from '../magento/authenticate';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WishlistProvider{

	public apiUrl: string;

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
		public authProvider: AuthenticateProvider) {
		
		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	// POST METHODS

	/**
	 * @public
	 * @method addProductToWishlist
	 * @description Add product to a customers' wishlist
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @param { ProductModel } product
	 * @param { boolean } forceQty
	 * @return { Observable<boolean> }
	 */
	public addProductToWishlist(product: ProductModel, forceQty: boolean): Observable<boolean>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			sku: product.sku,
			forceQty: forceQty
		};

		return this.http.post<boolean>(this.apiUrl + '/tng/wishlist/mine/add', postData, { headers: apiHeader });
	}

	/**
	 * @public
	 * @method transferItemToCart
	 * @description Transfer a wishlist item to the cart
	 * @desc Once transfered, wishlist item will be gone from wishlist
	 * @author J. Trpka <jtrpka@tngworlwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @param { WishlistItemModel } item
	 * @return { Observable<boolean> }
	 */
	public transferItemToCart(item: WishlistItemModel): Observable<boolean>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let postData = {
			itemId: item.wishlist_item_id,
			qty: item.qty
		};

		return this.http.post<boolean>(this.apiUrl + '/tng/wishlist/mine/transfer', postData, { headers: apiHeader });
	}

	// GET METHODS

	/**
	 * @public
	 * @method readWishlist
	 * @description Retrieve customers' wishlist
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @return { Observable<WishlistModel> }
	 */
	public readWishlist(): Observable<WishlistModel>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		return this.http.get<WishlistModel>(this.apiUrl + '/tng/wishlist/mine', { headers: apiHeader }).pipe(
			map(data => this.getWishlistModel(data))
		);
	}

	// PUT METHODS

	/**
	 * @public
	 * @method updateWishlistItem
	 * @description Update a wishlist item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @return { Observable<boolean> }
	 */
	public updateWishlistItem(item: number, qty: number): Observable<boolean>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let putData = {
			itemId: item,
			qty: qty
		};

		return this.http.put<boolean>(this.apiUrl + '/tng/wishlist/mine/update', putData, { headers: apiHeader });
	}

	/**
	 * @public
	 * @method updateWishlist
	 * @description Update the wishlist
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @return { Observable<boolean> }
	 */
	public updateWishlist(items: Array<number>, qty: Array<number>): Observable<boolean>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		let putData = {
			itemId: items,
			qty: qty
		};

		return this.http.put<boolean>(this.apiUrl + '/tng/wishlist/mine/updates', putData, { headers: apiHeader });
	}

	// DELETE METHODS

	/**
	 * @public
	 * @method deleteItem
	 * @description Remove a wishlist item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @param { number } itemId
	 * @return { Observable<boolean> }
	 */
	public deleteItem(itemId: number): Observable<boolean>{
		let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getCustomerTokenProvider());

		return this.http.delete<boolean>(this.apiUrl + '/tng/wishlist/mine/delete/' + itemId, { headers: apiHeader });
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getWishlistModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @param { Object } data
	 * @return { WishlistModel }
	 */
	private getWishlistModel(data: any): WishlistModel{
		let model: WishlistModel = new WishlistModel();
		return model.fromJson(data);
	}
}