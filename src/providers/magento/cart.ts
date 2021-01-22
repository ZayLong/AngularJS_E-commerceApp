import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Models
import { CartModel, CartItemModel, DetailItemModel } from '../../models/magento/cart/cart';
import { CartTotalModel } from '../../models/magento/cart/total';
import { ProductModel } from '../../models/magento/catalog/product';

// Providers
import { AuthenticateProvider } from '../magento/authenticate';
import { CommonProvider } from '../ionic/common';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CartProvider {

	private apiUrl:string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { HttpClient } http
	 * @param { Platform } platform
	 * @param { Events } events
	 * @param { Storage } storage
	 * @param { AuthenticateProvider } authProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public http: HttpClient,
		public platform: Platform,
		public events: Events,
		public storage: Storage,
		public authProvider: AuthenticateProvider,
		public commonProvider: CommonProvider) {

		if(this.platform.is('core') || this.platform.is('mobileweb')){
			this.apiUrl = '/api';
		} else {
			this.apiUrl = 'https://www.theindustrysource.com/index.php/rest/V1';	
		}
	}

	// POST API CALLS

	/**
	 * @public
	 * @method createCart
	 * @description Create a new cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } customerKey
	 * @return { Observable<string> } cartId
	 */
	public createCart(): Observable<string>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			let postData = {};

			return this.http.post<string>(this.apiUrl + '/carts/mine', postData, { headers: apiHeader });
		});
	}

	/**
	 * @public
	 * @method createGuestCart
	 * @description Create a new guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { Observable<string> } cartId
	 */
	public createGuestCart(): Observable<string>{
		let postData = {};

		return this.http.post<string>(this.apiUrl + '/guest-carts', postData);
	}

	/**
	 * @private
	 * @method createCartItem
	 * @description Add product to the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartItemModel } item
	 * @return { Observable<CartItemModel> }
	 */
	private createCartItem(item: CartItemModel): Observable<CartItemModel>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			let postData = {
				cartItem: item
			};
			
			return this.http.post<CartItemModel>(this.apiUrl + '/carts/mine/items', postData, { headers: apiHeader }).pipe(
				map(data => this.getCartItemModel(data))
			);	
		});
	}

	/**
	 * @private
	 * @method createGuestCartItem
	 * @description Add product to the guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartItemModel } item
	 * @return { Observable<CartItemModel> }
	 */
	private createGuestCartItem(item: CartItemModel): Observable<CartItemModel>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(key => {
			let guestId: string = key;

			item.quote_id = guestId;

			let postData = {
				cartItem: item
			};

			return this.http.post<CartItemModel>(this.apiUrl + '/guest-carts/' + guestId + '/items', postData).pipe(
				map(data => this.getCartItemModel(data))
			);	
		});
	}

	/**
	 * @private
	 * @method clearCartItems
	 * @description Remove items from the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Array<CartItemModel> } items
	 * @return { Observable<boolean> }
	 */
	private clearCartItems(items: Array<CartItemModel>): Observable<boolean>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			let ids: Array<number> = [];
			for(let item of items){
				ids.push(item.item_id);
			}

			let putData = {
				cartItems: ids
			}

			return this.http.post<boolean>(this.apiUrl + '/tng/carts/mine/items/clear', putData, { headers: apiHeader });
		});
	}

	/**
	 * @private
	 * @method clearGuestCartItems
	 * @description Remove items from the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Array<CartItemModel> } items
	 * @return { Observable<boolean> }
	 */
	private clearGuestCartItems(items: Array<CartItemModel>): Observable<boolean>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			let guestId: string = guestKey;

			let ids: Array<number> = [];
			for(let item of items){
				ids.push(item.item_id);
			}

			let postData = {
				cartItems: ids
			}

			return this.http.post<boolean>(this.apiUrl + '/tng/guest-carts/' + guestId + '/items/clear', postData);	
		});
	}

	/**
	 * @private
	 * @method quickOrderAsUser
	 * @description Add products to cart by SKU and quantity
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.0
	 * @todo Try to retrieve the cart
	 * @param { Array<{sku: string, qty: number}> } items
	 * @return { Observable<CartModel> }
	 */
	private quickOrderAsUser(items: Array<{ sku: string, qty: number }>): Observable<CartModel>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			let postData = {
				items: items
			}

			return this.http.post<CartModel>(this.apiUrl + '/tng/mine/quick-order', postData, { headers: apiHeader }).pipe(
				map(data => this.getCartModel(data))
			);
		});
	}

	// GET API CALLS

	/**
	 * @private
	 * @method readCart
	 * @description Get the cart from customer user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CartModel> }
	 */
	private readCart(): Observable<CartModel>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			return this.http.get<CartModel>(this.apiUrl + '/carts/mine', { headers: apiHeader }).pipe(
				map(data => this.getCartModel(data))
			);
		});
	}

	/**
	 * @private
	 * @method readGuestCart
	 * @description Get the cart from guest
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CartModel> }
	 */
	private readGuestCart(): Observable<CartModel>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			return this.http.get<CartModel>(this.apiUrl + '/guest-carts/' + guestKey).pipe(map(data => this.getCartModel(data)));
		});
	}

	/**
	 * @public
	 * @method readCartItems
	 * @description Get the items from customer user's cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<Array<CartItemModel>> }
	 */
	public readCartItems(): Observable<Array<CartItemModel>>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			return this.http.get<Array<CartItemModel>>(this.apiUrl + '/carts/mine/items', { headers: apiHeader }).pipe(
				map(data => this.getCartItemModels(data))
			);
		});
	}

	/**
	 * @public
	 * @method readGuestCartItems
	 * @description Get the items from guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<Array<CartItemModel>> }
	 */
	public readGuestCartItems(): Observable<Array<CartItemModel>>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			return this.http.get(this.apiUrl + '/guest-carts/' + guestKey + '/items').pipe(map(data => this.getCartItemModels(data)));
		});
	}

	/**
	 * @public
	 * @method readCartDetailItems
	 * @description Get the detail items from customer cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<Array<DetailItemModel>> }
	 */
	public readCartDetailItems(): Observable<Array<DetailItemModel>>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			return this.http.get<Array<DetailItemModel>>(this.apiUrl + '/tng/carts/mine/detail', { headers: apiHeader }).pipe(
				map(data => this.getDetailItemModels(data))
			);	
		});
	}

	/**
	 * @public
	 * @method readGuestCartDetailItems
	 * @description Get the detail items from guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<Array<DetailItemModel>> }
	 */
	public readGuestCartDetailItems(): Observable<Array<DetailItemModel>>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			return this.http.get<Array<DetailItemModel>>(this.apiUrl + '/tng/guest-carts/' + guestKey + '/detail').pipe(map(data => this.getDetailItemModels(data)));
		});
	}

	/**
	 * @public
	 * @method readCartTotal
	 * @description Get the cart total from customer user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CartTotalModel> }
	 */
	public readCartTotal(): Observable<CartTotalModel>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			return this.http.get<CartTotalModel>(this.apiUrl + '/carts/mine/totals', { headers: apiHeader }).pipe(
				map(data => this.getCartTotalModel(data))
			);	
		});
	}

	/**
	 * @public
	 * @method readGuestCartTotal
	 * @description Get the cart total from guest
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<CartTotalModel> }
	 */
	public readGuestCartTotal(): Observable<CartTotalModel>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			return this.http.get<CartTotalModel>(this.apiUrl + '/guest-carts/' + guestKey + '/totals').pipe(map(data => this.getCartTotalModel(data)));	
		});
	}

	/**
	 * @public
	 * @method readCoupon
	 * @description Get coupon information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<string> }
	 */	 
	public readCoupon(): Observable<string>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			return this.http.get<string>(this.apiUrl + '/carts/mine/coupons', { headers: apiHeader });	
		});
	}

	/**
	 * @public
	 * @method readGuestCoupon
	 * @description Get guest coupon information
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @return { Observable<string> }
	 */
	public readGuestCoupon(): Observable<string>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			return this.http.get<string>(this.apiUrl + '/guest-carts/' + guestKey + '/coupons');	
		});
	}

	// PUT API CALLS

	/**
	 * @private
	 * @method updateCartItem
	 * @description Update item in the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartItemModel } item
	 * @return { Observable<CartItemModel> }
	 */
	private updateCartItem(item: CartItemModel): Observable<CartItemModel>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			let putData = {
				cartItem: item
			};

			return this.http.put<CartItemModel>(this.apiUrl + '/carts/mine/items/' + item.item_id, putData, { headers: apiHeader }).pipe(
				map(data => this.getCartItemModel(data))
			);
		});
	}

	/**
	 * @private
	 * @method updateCartItems
	 * @description Update items in the cart using arrays of item ids and qtys
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Array<number> } cartItemsId
	 * @param { Array<number> } cartItemsQty
	 * @return { Observable<Array<CartItemModel>> }
	 */
	private updateCartItems(cartItemsId: Array<number>, cartItemsQty: Array<number>): Observable<Array<CartItemModel>>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			let putData = {
				cartItemsId: cartItemsId,
				cartItemsQty: cartItemsQty
			};

			return this.http.put<Array<CartItemModel>>(this.apiUrl + '/tng/carts/mine/items', putData, { headers: apiHeader }).pipe(
				map(data => this.getCartItemModels(data))
			);	
		});
	}

	/**
	 * @private
	 * @method updateGuestCartItem
	 * @description Update item in a guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartItemModel } item
	 * @return { Observable<CartItemModel> }
	 */
	private updateGuestCartItem(item: CartItemModel): Observable<CartItemModel>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			item.quote_id = guestKey;

			let putData = {
				cartItem: item
			};

			return this.http.put<CartItemModel>(this.apiUrl + '/guest-carts/' + guestKey + '/items/' + item.item_id, putData).pipe(
				map(data => this.getCartItemModel(data))
			);	
		});
	}

	/**
	 * @private
	 * @method updateGuestCartItems
	 * @description Update items in the guest cart using arrays of item ids and qtys
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Array<number> } cartItemsId
	 * @param { Array<number> } cartItemsQty
	 * @return { Observable<Array<CartItemModel>> }
	 */
	private updateGuestCartItems(cartItemsId: Array<number>, cartItemsQty: Array<number>): Observable<Array<CartItemModel>>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			let putData = {
				cartItemsId: cartItemsId,
				cartItemsQty: cartItemsQty
			};

			return this.http.put<Array<CartItemModel>>(this.apiUrl + '/tng/guest-carts/' + guestKey + '/items/', putData).pipe(
				map(data => this.getCartItemModels(data))
			);
		});
	}

	/**
	 * @private
	 * @method setCoupon
	 * @description Add/Update coupon in the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns (think its a string)
	 * @param { string } code
	 * @return { Observable }
	 */
	private setCoupon(code: string){
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			let putData = {};

			return this.http.put(this.apiUrl + '/carts/mine/coupons/' + code, putData, { headers: apiHeader });
		});
	}

	/**
	 * @private
	 * @method setGuestCoupon
	 * @description Add/Update coupon in the guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns (think its a string)
	 * @param { string } code
	 * @return { Observable }
	 */
	private setGuestCoupon(code: string){
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			let putData = {};

			return this.http.put(this.apiUrl + '/guest-carts/' + guestKey + '/coupons/' + code, putData);
		});
	}

	// DELETE API CALLS

	/**
	 * @private
	 * @method deleteCartItem
	 * @description Remove item from the cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartItemModel } item
	 * @return { Observable<boolean> }
	 */
	private deleteCartItem(item: CartItemModel): Observable<boolean>{
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			return this.http.delete<boolean>(this.apiUrl + '/carts/mine/items/' + item.item_id, { headers: apiHeader });
		});
	}

	/**
	 * @private
	 * @method deleteGuestCartItem
	 * @description Remove item from the guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { CartItemModel } item
	 * @return { Observable<boolean> }
	 */
	private deleteGuestCartItem(item: CartItemModel): Observable<boolean>{
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			return this.http.delete<boolean>(this.apiUrl + '/guest-carts/' + guestKey + '/items/' + item.item_id);
		});
	}

	/**
	 * @private
	 * @method deleteCoupon
	 * @description Remove coupon from cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns
	 * @return { Observable }
	 */
	private deleteCoupon(){
		return Observable.fromPromise(this.authProvider.getCustomerTokenStorage()).flatMap(customerKey => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + customerKey);

			return this.http.delete(this.apiUrl + '/carts/mine/coupons', { headers: apiHeader });
		});
	}

	/**
	 * @private
	 * @method deleteGuestCoupon
	 * @description Remove coupon from guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @todo Figure out what it returns
	 * @return { Observable }
	 */
	private deleteGuestCoupon(){
		return Observable.fromPromise(this.authProvider.getGuestTokenStorage()).flatMap(guestKey => {
			return this.http.delete(this.apiUrl + '/guest-carts/' + guestKey + '/coupons');
		});
	}

	// GET MODEL METHODS

	/**
	 * @private
	 * @method getCartModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CartModel }
	 */
	private getCartModel(data: any): CartModel{
		let model: CartModel = new CartModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCartItemModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { Array<CartItemModel> }
	 */
	private getCartItemModels(data: any): Array<CartItemModel>{
		let array: Array<CartItemModel> = [];

		for(let item of data){
			let model: CartItemModel = new CartItemModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getCartItemModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CartItemModel }
	 */
	private getCartItemModel(data: any): CartItemModel{
		let model: CartItemModel = new CartItemModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getDetailItemModels
	 * @description Convert JSON data to models
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.3
	 * @param { Object } data
	 * @return { Array<DetailItemModel> }
	 */
	private getDetailItemModels(data: any): Array<DetailItemModel>{
		let array: Array<DetailItemModel> = [];

		for(let item of data){
			let model: DetailItemModel = new DetailItemModel();
			array.push(model.fromJson(item));
		}
		
		return array;
	}

	/**
	 * @private
	 * @method getDetailItemModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.3
	 * @param { Object } data
	 * @return { DetailItemModel }
	 */
	private getDetailItemModel(data: any): DetailItemModel{
		let model: DetailItemModel = new DetailItemModel();
		return model.fromJson(data);
	}

	/**
	 * @private
	 * @method getCartTotalModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { CartTotalModel }
	 */
	private getCartTotalModel(data: any): CartTotalModel{
		let model: CartTotalModel = new CartTotalModel();
		return model.fromJson(data);
	}

	// MISC METHODS

	/**
	 * @public
	 * @method getExistingCartItem
	 * @description Check if product exists in cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartModel } cart
	 * @param { ProductModel } product
	 * @param { string } quantity (should be number)
	 */
	public getExistingCartItem(cart: CartModel, cartItem: CartItemModel, quantity: any){
		let found: boolean = false;

		if(typeof quantity == 'string'){
			quantity = parseInt(quantity);
		}

		for(let item of cart.items){
			if(cartItem.sku === item.sku){
				found = true;
				cartItem.item_id = item.item_id; // Add item id to item
				cartItem.qty = (quantity + item.qty); // Add quantity to item
				break; //leave the loop
			}
		}

		// If not found in cart, then apply quantity to item
		if(!found){
			cartItem.qty = quantity;
		}

		cartItem.quote_id = cart.id.toString(); // Add quote/cart id to item

		return cartItem;
	}

	// CONVERT METHODS

	/**
	 * @public
	 * @method convertProductToCartItem
	 * @description Convert a product model to a cart item model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { ProductModel } product
	 * @return { CartItemModel }
	 */
	public convertProductToCartItem(product: ProductModel): CartItemModel{
		let item = new CartItemModel();
		//item.setItemId(product.getId());
		item.sku = product.sku;
		item.name = product.name;
		item.price = product.price;
		item.product_type = product.type_id; // Not sure if the same
		// product options
		// extension attributes

		return item;
	}

	/**
	 * GUEST VS CUSTOMER CART METHODS
	 */

	// ADD TO CART

	/**
	 * @public
	 * @method processAddToCart
	 * @description Process the item before adding to cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.5.1
	 * @param { CartModel } cart
	 * @param { ProductModel } product
	 * @param { number } qty
	 * @param { boolean } logged
	 */
	public processAddToCart(cart: CartModel, product: ProductModel, qty: number, logged: boolean): void{

		console.info('CartProvider - processAddToCart()', cart, product, qty, logged);

		let loading = this.commonProvider.pageLoading();
		loading.present();

		// Convert product model to cart item model cause Magento doesn't know consistency -.-
		let cartItem: CartItemModel = this.convertProductToCartItem(product);

		// Update the cart item depending if it exists in cart or not
		cartItem = this.getExistingCartItem(cart, cartItem, qty);

		this.addToCart(cartItem, logged).subscribe(data => {
			loading.dismiss();

			this.commonProvider.analyticsLogEvent('add_to_cart', {
				item_id: 'product_' + cartItem.sku,
				item_name: cartItem.name,
				item_category: 'Product',
				quantity: cartItem.qty,
				price: cartItem.price,
				value: cartItem.price * cartItem.qty,
				currency: 'USD'
			});

			this.events.publish('header:updateMiniCart', logged);

			let toast = this.commonProvider.toast('Product added to cart successfully');
			toast.present();
		}, err => {
			loading.dismiss();
			console.error('CartProvider - processAddToCart() - addToCart()', err);

			let toast = this.commonProvider.toast('Product added to cart failed');
			toast.present();
		});
	}

	/**
	 * @public
	 * @method addToCart
	 * @description Add item to cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 * @param { boolean } logged
	 * @return { Observable<CartItemModel> }
	 */
	public addToCart(item: CartItemModel, logged: boolean): Observable<CartItemModel>{
		if(logged){
			return this.customerAddToCart(item);
		} else {
			return this.guestAddToCart(item);
		}
	}

	/**
	 * @private
	 * @method guestAddToCart
	 * @description Add to cart with guest user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 * @return { Observable<CartItemModel> }
	 */
	private guestAddToCart(item: CartItemModel): Observable<CartItemModel>{
		if(item.item_id != undefined){
			// Does exist in cart
			return this.updateGuestCartItem(item);
		} else {
			//Does NOT exist in cart
			return this.createGuestCartItem(item);
		}
	}

	/**
	 * @private
	 * @method customerAddToCart
	 * @description Add to cart with customer user
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 * @param { number } qty
	 * @return { Observable<CartItemModel> }
	 */
	private customerAddToCart(item: CartItemModel): Observable<CartItemModel>{
		if(item.item_id != undefined){
			// Does exist in cart
			return this.updateCartItem(item);
		} else {
			// Does NOT exist in cart
			return this.createCartItem(item);
		}
	}

	// ADD MULTIPLE TO CART

	/**
	 * @public
	 * @method addsToCart
	 * @description Add multiple items to cart using arrays of quantity and item ids
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { Array<number> } cartItemsId
	 * @param { Array<number> } cartItemsQty
	 * @param { boolean } logged
	 * @return { Observable }
	 */
	public addsToCart(cartItemsId: Array<number>, cartItemsQty: Array<number>, logged: boolean){
		if(logged){
			return this.updateCartItems(cartItemsId, cartItemsQty);
		} else {
			return this.updateGuestCartItems(cartItemsId, cartItemsQty);
		}
	}

	// ADD COUPON

	/**
	 * @public
	 * @method addCoupon
	 * @description Add coupon to a cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } code
	 * @param { boolean } logged
	 * @return { Observable }
	 */
	public addCoupon(code: string, logged: boolean){
		if(logged){
			return this.setCoupon(code);
		} else {
			return this.setGuestCoupon(code);
		}
	}

	// REMOVE FROM CART

	/**
	 * @public
	 * @method removeFromCart
	 * @description Remove item from a cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { CartItemModel } item
	 * @param { boolean } logged
	 * @return { Observable<boolean> }
	 */
	public removeFromCart(item: CartItemModel, logged: boolean){
		if(logged){
			return this.deleteCartItem(item);
		} else {
			return this.deleteGuestCartItem(item);
		}
	}

	// CLEAR THE CART

	/**
	 * @public
	 * @method clearFromCart
	 * @description Remove items from a cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Array<CartItemModel> } $items
	 * @param { boolean } logged
	 * @return { Observable<boolean> }
	 */
	public clearFromCart(items: Array<CartItemModel>, logged: boolean){
		if(logged){
			return this.clearCartItems(items);
		} else {
			return this.clearGuestCartItems(items);
		}
	}

	// REMOVE COUPON

	/**
	 * @public
	 * @method removeCoupon
	 * @description Remove coupon from a cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { boolean } logged
	 * @return { Observable }
	 */
	public removeCoupon(logged: boolean){
		if(logged){
			return this.deleteCoupon();
		} else {
			return this.deleteGuestCoupon();
		}
	}

	// CART

	/**
	 * @public
	 * @method cart
	 * @description Retrieve either customer or guest cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { boolean } logged
	 * @return { Observable<CartModel> }
	 */
	public cart(logged: boolean): Observable<CartModel>{
		if(logged){
			return this.readCart();
		} else {
			return this.readGuestCart();
		}
	}	

	/**
	 * @public
	 * @method cartTotal
	 * @description Retrieve either customer or guest cart totals
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { boolean } logged
	 * @return { Observable<CartTotalModel> }
	 */
	public cartTotal(logged: boolean): Observable<CartTotalModel>{
		if(logged){
			return this.readCartTotal();
		} else {
			return this.readGuestCartTotal();
		}
	}

	// DETAIL ITEMS

	/**
	 * @public
	 * @method detailItem
	 * @description Retrieve the detail information of each cart item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { boolean } logged
	 * @return { Observable<Array<DetailItemModel>> }
	 */
	public detailItem(logged: boolean): Observable<Array<DetailItemModel>>{
		if(logged){
			return this.readCartDetailItems();
		} else {
			return this.readGuestCartDetailItems();
		}
	}

	// FETCHING CART

	/**
	 * @public
	 * @method getCart
	 * @description Handle fetching a cart for the sake of (refreshing) customer data
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.2
	 * @version 1.5.2
	 * @return { Observable<{ cart: CartModel, logged: boolean }> }
	 */
	public getCart(): Observable<{ cart: CartModel, logged: boolean }>{
		return Observable.create(observer => {
			this.cart(true).subscribe(data => {
				console.info('CartProvider - getCart() - cart(true)', data);

				// Send reward points tally to slide menu
				this.events.publish('app:getRewardPoints', data.customer.rewardPoints());

				// Publish the wishlist tally
				this.events.publish('app:getWishlist');

				this.events.publish('header:updateMiniCart', true);

				// Remember to set the auth provider data outside of this method
				observer.next({
					cart: data,
					logged: true
				});
			}, err => {
				console.warn('CartProvider - getCart() - cart(true)', err);

				switch(err.status){
					case 400:
						console.log('400');
						console.log('Bad Request, ' + err.error.message);
						console.log('=========================================');

						break;
					case 401:
						console.log('401');
						console.log('Unauthorized, customer key is now invalid');
						console.log('=========================================');

						this.authProvider.setCustomerToken('');

						// Check if guest token is found (which it should)
						this.cart(false).subscribe(data => {
							console.info('CartProvider - getCart() - cart(false)', data);

							this.events.publish('header:updateMiniCart', false);

							// Remember to set the auth provider data outside of this method
							observer.next({
								cart: data,
								logged: false
							});
						}, err => {
							console.error('CartProvider - getCart() - cart(false)', err);

							observer.error(err);
						});

						break;
					case 404:
						console.log('404');
						console.log('Not found, no customer cart was found');
						console.log('============================');
						this.createCart().subscribe(() => {
							console.log('CartProvider - getCart() - createCart()');
							this.getCart();
						}, err => console.error('CartProvider - getCart() - createCart()', err));

						break;
					case 500:
						console.log('500');
						console.log('Something happened to the server');
						console.log('================================');

						break;
					case 503:
						console.log('503');
						console.log('Connection to server severed');
						console.log('============================');

						break;
				}
			});
		}, err => {
			console.error('CartProvider - getCart() - Observerable.create()', err);
		});
	}

	// QUICK ORDER
	
	/**
	 * @public
	 * @method quickOrder
	 * @description Make a quick order
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @todo Make a guest version when needed
	 * @param { Array< { sku: string, qty: number  } > } items
	 * @param { boolean } logged
	 * @return { Observable<CartModel> }
	 */
	public quickOrder(items: Array<{ sku: string, qty: number }>, logged: boolean): Observable<CartModel>{

		return this.quickOrderAsUser(items);
	}

	// CONVERTING GUEST TO LOGGED

	/**
	 * @public
	 * @method convertGuestToCustomer
	 * @description Convert a guest cart to a customer cart from login
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { string } adminToken
	 * @param { number } loginCart
	 * @param { string } guestCart
	 * @return { Observable<CartModel> }
	 */
	public convertGuestToCustomer(loginId: number, guestId: string): Observable<CartModel>{
		return Observable.create(observer => {
			let apiHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.authProvider.getAdminToken());

			let postData = {
				cartId: loginId,
				guestId: guestId
			};

			// This will move all cart items from guest to customer cart
			this.http.post<boolean>(this.apiUrl + '/tng/carts/guesttouser', postData, { headers: apiHeader }).subscribe(data => {

				// Lets take the guest cart one last time to clear out the items
				this.cart(false).subscribe(data => {
					
					// Now clear the guest cart
					if(data.items.length > 0){
						this.clearFromCart(data.items, false).subscribe(data => {
							this.cart(true).subscribe(data => observer.next(data), err => observer.error(err)); // cart(true)
						}, err => observer.error(err)) // clearFromCart Error	
					} else {
						this.cart(true).subscribe(data => observer.next(data), err => observer.error(err)); // cart(true)
					}

				}, err => observer.error(err))// cart Error
			}, err => observer.error(err)); // guestToUser Error
		});
	}
}