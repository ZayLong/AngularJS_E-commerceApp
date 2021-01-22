import { CustomAttributeParamModel } from '../general/custom-attribute';
import { GroupcatProductActionModel } from '../amasty/groupcat';
import { MediaGalleryModel } from './media-gallery';

export class ProductModel{
	private _id: number;
	private _sku: string;
	private _name: string;
	private _attribute_set_id: number;
	private _price: number;
	private _status: number;
	private _visibility: number;
	private _type_id: string;
	private _created_at: string;
	private _updated_at: string;
	private _weight: number;
	private _extension_attributes: ProductExtensionModel;

	//private product_links // look into this later
	//private options // look into this later

	private _media_gallery_entries: Array<MediaGalleryModel> = [];

	//private tier_prices // look into this later

	//private _custom_attributes: Array<CustomAttributeModel> = [];
	private custom_attributes: Array<CustomAttributeParamModel> = [];

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get attribute_set_id(): number{
		return this._attribute_set_id;
	}

	set attribute_set_id(value: number){
		this._attribute_set_id = value;
	}

	get price(): number{
		return this._price;
	}

	set price(value: number){
		this._price = value;
	}

	get status(): number{
		return this._status;
	}

	set status(value: number){
		this._status = value;
	}

	get visibility(): number{
		return this._visibility;
	}

	set visibility(value: number){
		this._visibility = value;
	}

	get type_id(): string{
		return this._type_id;
	}

	set type_id(value: string){
		this._type_id = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get updated_at(): string{
		return this._updated_at;
	}

	set updated_at(value: string){
		this._updated_at = value;
	}

	get weight(): number{
		return this._weight;
	}

	set weight(value: number){
		this._weight = value;
	}

	get extension_attributes(): ProductExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: ProductExtensionModel){
		this._extension_attributes = value;
	}

	//product links

	//options

	get media_gallery_entries(): Array<MediaGalleryModel>{
		return this._media_gallery_entries;
	}

	get_media_gallery_entry(key: number): MediaGalleryModel{
		return this.media_gallery_entries[key];
	}

	set media_gallery_entries(value: Array<MediaGalleryModel>){
		this._media_gallery_entries = value;
	}

	set_media_gallery_entry(value: MediaGalleryModel): void{
		this.media_gallery_entries.push(value);
	}

	//tier prices

	/*
	get custom_attributes(): Array<CustomAttributeModel>{
		return this._custom_attributes;
	}

	get_custom_attribute(key: string): CustomAttributeModel{
		for(let attribute of this.custom_attributes){
			if(attribute.attribute_code === key) return attribute;
		}
	}

	set custom_attributes(value: Array<CustomAttributeModel>){
		this._custom_attributes = value;
	}

	set_custom_attribute(value: CustomAttributeModel): void{
		this.custom_attributes.push(value);
	}
	*/

	get_custom_attributes(): Array<CustomAttributeParamModel>{
		return this.custom_attributes;
	}

	get_custom_attribute(key: string): CustomAttributeParamModel{
		for(let attribute of this.custom_attributes){
			if(attribute.attribute_code === key) return attribute;
		}
	}

	set_custom_attributes(value: Array<CustomAttributeParamModel>): void{
		this.custom_attributes = value;
	}

	set_custom_attribute(value: CustomAttributeParamModel): void{
		this.custom_attributes.push(value);
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	public fromJson(data: any): this{
		this.id = data.id;
		this.sku = data.sku;
		this.name = data.name;
		this.attribute_set_id = data.attribute_set_id;
		this.price = data.price;
		this.status = data.status;
		this.visibility = data.visibility;
		this.type_id = data.type_id;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.weight = data.weight;

		let extensionModel: ProductExtensionModel = new ProductExtensionModel();
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		//product links

		//options

		//console.info('ProductModel - fromJson() - data.media_gallery_entries', data.media_gallery_entries);
		if(data.media_gallery_entries){
			for(let gallery of data.media_gallery_entries){
				let model: MediaGalleryModel = new MediaGalleryModel();
				this.set_media_gallery_entry( model.fromJson(gallery) );
			}
		}

		//tier prices

		/*
		if(data.custom_attributes){
			for(let attribute of data.custom_attributes){
				let model: CustomAttributeModel = new CustomAttributeModel();
				this.set_custom_attribute( model.fromJson(attribute) );
			}
		}
		*/

		if(data.custom_attributes){
			for(let attribute of data.custom_attributes){
				let model: CustomAttributeParamModel = new CustomAttributeParamModel();
				this.set_custom_attribute(model.fromJson(attribute));
			}
		}

		return this;
	}

	//https://www.theindustrysource.com/media/catalog/product/5/2/520214.1_2.jpg

	/**
	 * @public
	 * @method imagePath
	 * @description Get the image path
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Really need a better way to use the domain path
	 * @return string
	 */
	public imagePath(): string{
		let domain = 'https://www.theindustrysource.com/media/catalog/product';

		if(this.get_custom_attribute('image') != null){
			return domain + this.get_custom_attribute('image').value;
		} else {
			return null;
		}
	}

	/**
	 * @public
	 * @method imageSmallPath
	 * @description Get the small image path
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Really need a better way to use the domain path
	 * @return string
	 */
	public imageSmallPath(): string{
		let domain = 'https://www.theindustrysource.com/media/catalog/product';

		if(this.get_custom_attribute('small') != null){
			return domain + this.get_custom_attribute('small').value;	
		} else {
			return null;
		}
	}

	/**
	 * @public
	 * @method imageThumbnailPath
	 * @description Get the thumbanil image path
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Really need a better way to use the domain path
	 * @return string
	 */
	public imageThumbnailPath(): string{
		let domain = 'https://www.theindustrysource.com/media/catalog/product';

		if(this.get_custom_attribute('thumbnail') != null){
			return domain + this.get_custom_attribute('thumbnail').value;	
		} else {
			return null;
		}
	}

	/**
	 * @public
	 * @method urlStorePath
	 * @description Get the url path for the store
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 * @todo Make a urlAppPath when you make a deeplinking path system with the product page
	 * @return string
	 */
	public urlStorePath(): string{
		let domain = 'https://www.theindustrysource.com/';

		if(this.get_custom_attribute('url_key') != null){
			return domain + this.get_custom_attribute('url_key').value + '.html';
		} else {
			return null;
		}
	}

	/**
	 * @public
	 * @method videoId
	 * @description Get the video id from an url string
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return string
	 */
	public videoId(): string{
		if(this.get_custom_attribute('videos').value){
			let videoUrl: string = this.get_custom_attribute('videos').value;
			let start: number = videoUrl.indexOf('embed') + 6;
			if(start >= 0){
				return videoUrl.substring(start);
			}
		}

		return null;
	}

	/**
	 * @public
	 * @method isInStock
	 * @description Check if the product is in stock (shortcut method)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return boolean
	 */
	public isInStock(): boolean{
		if(this.extension_attributes.stock_item != undefined){
			return this.extension_attributes.stock_item.is_in_stock;	
		}

		return false;
	}

	/**
	 * @public
	 * @method canAddToCart
	 * @description Determine if a product can add to cart
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 * @param { GroupcatProducActionModel } action
	 * @param { boolean } logged (default as true)
	 * @return { boolean }
	 */
	public canAddToCart(action: GroupcatProductActionModel, logged: boolean = true): boolean{
		if(logged){
			if(this.isInStock() && (
				!action.hide_price &&
				//!action.change_price_text &&
				!action.hide_product &&
				!action.hide_category &&
				!action.hide_cart &&
				//!action.hide_wishlist &&
				//!action.hide_compare &&
				!action.call_to_order &&
				!action.hide_from_region &&
				!action.unavailable)
			){
				return true;
			}
		} else {
			if(this.isInStock() && ( 
				!action.hide_price &&
				!action.change_price_text &&
				!action.hide_product &&
				!action.hide_category &&
				!action.hide_cart &&
				//!action.hide_wishlist &&
				//!action.hide_compare &&
				!action.call_to_order &&
				!action.hide_from_region &&
				!action.unavailable)
			){
				return true;
			}	
		}
		
		return false;
	}

	/**
	 * @public
	 * @method isBackOrdered
	 * @description Check if a product is backordered
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.1
	 * @todo (1) May have to debate on products that may not have a MRP Type. Does it default to something?
	 * @param { StockModel } stockItem (optional)
	 */
	public isBackOrdered(stockItem?: StockModel): boolean{
		// Make sure the product is still enabled
		if(this.status === 1){
			// If a product's MRP Type is Z5, not ND0 (might be wrong), then it can be restocked thus "backordered"

			// @todo (1)
			if(this.get_custom_attribute('mrp_type') != undefined &&
				this.get_custom_attribute('mrp_type').value === 'Z5'){
				
				// Since some product models may not have the stock item attribute, you need to have an optional parameter to fill in the gap
				if(stockItem){
					if(stockItem.qty > 0){
						return false;
					} else {
						return true;
					}
				} else {
					if(this.extension_attributes.stock_item.qty > 0){
						return false;	
					} else {
						return true;
					}
					
				}
			} // Otherwise this item can not be back ordered if it does have quantity or not in stock
		}

		return false;
	}

	/**
	 * @public
	 * @method backOrderQtyMinimum
	 * @description Get the quantity minimum
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @return { number }
	 */
	public backOrderQtyMinimum(): number{
		let minimumAmount: number = 50.00;

		return Math.ceil(minimumAmount / this.storePrice()['price']);
	}

	/**
	 * @public
	 * @method categories
	 * @description Gather all the category ids
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { Array<string> }
	 */
	public categories(): Array<string>{
		let array: Array<string> = [];

		if(this.get_custom_attribute('category_ids')){
			for(let category of this.get_custom_attribute('category_ids').value){
				array.push(category);
			}	
		}

		return array;
	}

	/**
	 * @public
	 * @method storePrice
	 * @description Get the full or sale price
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { <boolean, number> }
	 */
	public storePrice(): { onSale: boolean, price: number } {
		if(this.get_custom_attribute('special_price')){
			let specialPrice: number = parseFloat(this.get_custom_attribute('special_price').value);

			if(specialPrice){
				if(this.price > specialPrice){
					return { onSale: true, price: specialPrice };
				}
			}
		}
		
		return { onSale: false, price: this.price };
	}
}

export class ProductExtensionModel{
	private _website_ids: Array<number>;
	private _category_links: Array<CategoryLinkModel>;
	private _stock_item: StockModel;
	//bundle_product_options
	//configurable_product_options
	private _configurable_product_links: Array<number>;
	//downloadable_product_links
	//downloadable_product_samples
	//giftcard_amounts

	get website_ids(): Array<number>{
		return this._website_ids;
	}

	get_website_id(key: number): number{
		return this.website_ids[key];
	}

	set website_ids(value: Array<number>){
		this._website_ids = value;
	}

	set_website_id(value: number): void{
		this.website_ids.push(value);
	}

	get category_links(): Array<CategoryLinkModel>{
		return this._category_links;
	}

	get_category_link(key: number): CategoryLinkModel{
		return this.category_links[key];
	}

	set category_links(value: Array<CategoryLinkModel>){
		this._category_links = value;
	}

	set_category_link(value: CategoryLinkModel): void{
		this.category_links.push(value);
	}

	get stock_item(): StockModel{
		return this._stock_item
	}

	set stock_item(value: StockModel){
		this._stock_item = value;
	}

	//bundle_product_options
	//configurable_product_options

	get configurable_product_links(): Array<number>{
		return this._configurable_product_links;
	}

	get_configurable_product_link(key: number): number{
		return this.configurable_product_links[key];
	}

	set configurable_product_links(value: Array<number>){
		this._configurable_product_links = value;
	}

	set_configurable_product_link(value: number){
		this.configurable_product_links.push(value);
	}

	//downloadable_product_links
	//downloadable_product_samples
	//giftcard_amounts

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.website_ids = data.website_ids;

		if(data.category_links){
			for(let link of data.category_links){
				let model: CategoryLinkModel = new CategoryLinkModel();
				this.set_category_link( model.fromJson(link) );
			}
		}

		if(data.stock_item){
			let stockModel: StockModel = new StockModel();
			this._stock_item = stockModel.fromJson(data.stock_item);	
		}
		
		
		//bundle_product_options
		//configurable_product_options

		this.configurable_product_links = data.configurable_product_links;
		
		//downloadable_product_links
		//downloadable_product_samples
		//giftcard_amounts

		return this;
	}
}

export class CategoryLinkModel{
	private _position: number;
	private _category_id: string;
	//extension attributes

	get position(): number{
		return this._position;
	}

	set position(value: number){
		this._position = value;
	}

	get category_id(): string{
		return this._category_id;
	}

	set category_id(value: string){
		this._category_id = value;
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
		this.position = data.position;
		this.category_id = data.category_id;

		return this;
	}
}

export class StockModel{
	private _item_id: number;
	private _product_id: number;
	private _stock_id: number;
	private _qty: number;
	private _is_in_stock: boolean;
	private _is_qty_decimal: boolean;
	private _show_default_notification_message: boolean;
	private _use_config_min_qty: boolean;
	private _min_qty: number;
	private _use_config_min_sale_qty: number; // Why this is a number?
	private _min_sale_qty: number;
	private _use_config_max_sale_qty: boolean;
	private _max_sale_qty: number;
	private _use_config_backorders: boolean;
	private _backorders: number;
	private _use_config_notify_stock_qty: boolean;
	private _notify_stock_qty: number;
	private _use_config_qty_increments: boolean;
	private _qty_increments: number;
	private _use_config_enable_qty_inc: boolean;
	private _enable_qty_increments: boolean;
	private _use_config_manage_stock: boolean;
	private _manage_stock: boolean;
	private _low_stock_date: string;
	private _is_decimal_divided: boolean;
	private _stock_status_changed_auto: number;
	//private extension_attributes

	get item_id(): number{
		return this._item_id;
	}

	set item_id(value: number){
		this._item_id = value;
	}

	get product_id(): number{
		return this._product_id;
	}

	set product_id(value: number){
		this._product_id = value;
	}

	get stock_id(): number{
		return this._stock_id;
	}

	set stock_id(value: number){
		this._stock_id = value;
	}

	get qty(): number{
		return this._qty;
	}

	set qty(value: number){
		this._qty = value;
	}

	get is_in_stock(): boolean{
		return this._is_in_stock;
	}

	set is_in_stock(value: boolean){
		this._is_in_stock = value;
	}

	get is_qty_decimal(): boolean{
		return this._is_qty_decimal;
	}

	set is_qty_decimal(value: boolean){
		this._is_qty_decimal = value;
	}

	get show_default_notification_message(): boolean{
		return this._show_default_notification_message;
	}

	set show_default_notification_message(value: boolean){
		this._show_default_notification_message = value;
	}

	get use_config_min_qty(): boolean{
		return this._use_config_min_qty;
	}

	set use_config_min_qty(value: boolean){
		this._use_config_min_qty = value;
	}

	get min_qty(): number{
		return this._min_qty;
	}

	set min_qty(value: number){
		this._min_qty = value;
	}

	get use_config_min_sale_qty(): number{
		return this._use_config_min_sale_qty;
	}

	set use_config_min_sale_qty(value: number){
		this._use_config_min_sale_qty = value;
	}

	get min_sale_qty(): number{
		return this._min_sale_qty;
	}

	set min_sale_qty(value: number){
		this._min_sale_qty = value;
	}

	get use_config_max_sale_qty(): boolean{
		return this._use_config_max_sale_qty;
	}

	set use_config_max_sale_qty(value: boolean){
		this._use_config_max_sale_qty = value;
	}

	get max_sale_qty(): number{
		return this._max_sale_qty;
	}

	set max_sale_qty(value: number){
		this._max_sale_qty = value;
	}

	get use_config_backorders(): boolean{
		return this._use_config_backorders;
	}

	set use_config_backorders(value: boolean){
		this._use_config_backorders = value;
	}

	get backorders(): number{
		return this._backorders;
	}

	set backorders(value: number){
		this._backorders = value;
	}

	get use_config_notify_stock_qty(): boolean{
		return this._use_config_notify_stock_qty;
	}

	set use_config_notify_stock_qty(value: boolean){
		this._use_config_notify_stock_qty = value;
	}

	get notify_stock_qty(): number{
		return this._notify_stock_qty;
	}

	set notify_stock_qty(value: number){
		this._notify_stock_qty = value;
	}

	get use_config_qty_increments(): boolean{
		return this._use_config_qty_increments;
	}

	set use_config_qty_increments(value: boolean){
		this._use_config_qty_increments = value;
	}

	get qty_increments(): number{
		return this._qty_increments;
	}

	set qty_increments(value: number){
		this._qty_increments = value;
	}

	get use_config_enable_qty_inc(): boolean{
		return this._use_config_enable_qty_inc;
	}

	set use_config_enable_qty_inc(value: boolean){
		this._use_config_enable_qty_inc = value;
	}

	get enable_qty_increments(): boolean{
		return this._enable_qty_increments;
	}

	set enable_qty_increments(value: boolean){
		this._enable_qty_increments = value;
	}

	get use_config_manage_stock(): boolean{
		return this._use_config_manage_stock;
	}

	set use_config_manage_stock(value: boolean){
		this._use_config_manage_stock = value;
	}

	get manage_stock(): boolean{
		return this._manage_stock;
	}

	set manage_stock(value: boolean){
		this._manage_stock = value;
	}

	get low_stock_date(): string{
		return this._low_stock_date;
	}

	set low_stock_date(value: string){
		this._low_stock_date = value;
	}

	get is_decimal_divided(): boolean{
		return this._is_decimal_divided;
	}

	set is_decimal_divided(value: boolean){
		this._is_decimal_divided = value;
	}

	get stock_status_changed_auto(): number{
		return this._stock_status_changed_auto;
	}

	set stock_status_changed_auto(value: number){
		this._stock_status_changed_auto = value;
	}


	//extension attributes

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.item_id = data.item_id;
		this.product_id = data.product_id;
		this.stock_id = data.stock_id;
		this.qty = data.qty;
		this.is_in_stock = data.is_in_stock;
		this.is_qty_decimal = data.is_qty_decimal;
		this.show_default_notification_message = data.show_default_notification_message;
		this.use_config_min_qty = data.use_config_min_qty;
		this.min_qty = data.min_qty;
		this.use_config_min_sale_qty = data.use_config_min_sale_qty;
		this.min_sale_qty = data.min_sale_qty;
		this.use_config_max_sale_qty = data.use_config_max_sale_qty;
		this.max_sale_qty = data.max_sale_qty;
		this.use_config_backorders = data.use_config_backorders;
		this.backorders = data.backorders;
		this.use_config_notify_stock_qty = data.use_config_notify_stock_qty;
		this.notify_stock_qty = data.notify_stock_qty;
		this.use_config_qty_increments = data.use_config_qty_increments;
		this.qty_increments = data.qty_increments;
		this.use_config_enable_qty_inc = data.use_config_enable_qty_inc;
		this.enable_qty_increments = data.enable_qty_increments;
		this.use_config_manage_stock = data.use_config_manage_stock;
		this.manage_stock = data.manage_stock;
		this.low_stock_date = data.low_stock_date;
		this.is_decimal_divided = data.is_decimal_divided;
		this.stock_status_changed_auto = data.stock_status_changed_auto;

		return this;
	}
}

export class ProductLinkModel{
	private _sku: string;
	private _link_type: string;
	private _linked_product_sku: string;
	private _linked_product_type: string;
	private _position: number;
	private _extension_attributes: ProductLinkExtensionModel;

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get link_type(): string{
		return this._link_type;
	}

	set link_type(value: string){
		this._link_type = value;
	}

	get linked_product_sku(): string{
		return this._linked_product_sku;
	}

	set linked_product_sku(value: string){
		this._linked_product_sku = value;
	}

	get linked_product_type(): string{
		return this._linked_product_type;
	}

	set linked_product_type(value: string){
		this._linked_product_type = value;
	}

	get position(): number{
		return this._position;
	}

	set position(value: number){
		this._position = value;
	}

	get extension_attributes(): ProductLinkExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: ProductLinkExtensionModel){
		this._extension_attributes = value;
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
		this.sku = data.sku;
		this.link_type = data.link_type;
		this.linked_product_sku = data.linked_product_sku;
		this.linked_product_type = data.linked_product_type;
		this.position = data.position;

		let extensionModel: ProductLinkExtensionModel = new ProductLinkExtensionModel();
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		return this;
	}
}

export class ProductLinkExtensionModel{
	private _qty: number;

	get qty(): number{
		return this._qty;
	}

	set qty(value: number){
		this._qty = value;
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
		this.qty = data.qty;

		return this;
	}
}