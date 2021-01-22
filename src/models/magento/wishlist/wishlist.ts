import { ProductModel } from '../catalog/product';

export class WishlistModel{
	private _wishlist_id: number;
	private _customer_id: number;
	private _shared: number;
	private _sharing_code: string;
	private _updated_at: string;
	private _name: string;
	private _visibility: boolean;
	private _items: Array<WishlistItemModel> = [];

	get wishlist_id(): number{
		return this._wishlist_id;
	}

	set wishlist_id(value: number){
		this._wishlist_id = value;
	}

	get customer_id(): number{
		return this._customer_id;
	}

	set customer_id(value: number){
		this._customer_id = value;
	}

	get shared(): number{
		return this._shared;
	}

	set shared(value: number){
		this._shared = value;
	}

	get sharing_code(): string{
		return this._sharing_code;
	}

	set sharing_code(value: string){
		this._sharing_code = value;
	}

	get updated_at(): string{
		return this._updated_at;
	}

	set updated_at(value: string){
		this._updated_at = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get visibility(): boolean{
		return this._visibility;
	}

	set visibility(value: boolean){
		this._visibility = value;
	}

	get items(): Array<WishlistItemModel>{
		return this._items;
	}

	get_items(key: number): WishlistItemModel{
		return this.items[key];
	}

	set items(value: Array<WishlistItemModel>){
		this._items = [];
	}

	set_items(value: WishlistItemModel): void{
		this.items.push(value);
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { this }
	 */
	fromJson(data: any): this{
		this.wishlist_id = data.wishlist_id;
		this.customer_id = data.customer_id;
		this.shared = data.shared;
		this.sharing_code = data.sharing_code;
		this.updated_at = data.updated_at;
		this.name = data.name;
		this.visibility = data.visibility;

		if(data.items){
			for(let item of data.items){
				let model: WishlistItemModel = new WishlistItemModel();
				this.set_items( model.fromJson(item) );
			}
		}

		return this;
	}
}

export class WishlistItemModel{
	private _wishlist_item_id: number;
    private _wishlist_id: number;
    private _product_id: number;
    private _store_id: number;
    private _added_at: string;
    private _description: string;
    private _qty: number;
    private _product: ProductModel;

    get wishlist_item_id(): number{
		return this._wishlist_item_id;
    }

	set wishlist_item_id(value: number){
		this._wishlist_item_id = value;
	}

    get wishlist_id(): number{
		return this._wishlist_id;
    }

	set wishlist_id(value: number){
		this._wishlist_id = value;
	}

    get product_id(): number{
		return this._product_id;
    }

	set product_id(value: number){
		this._product_id = value;
	}

    get store_id(): number{
		return this._store_id;
    }

	set store_id(value: number){
		this._store_id = value;
	}

    get added_at(): string{
		return this._added_at;
    }

	set added_at(value: string){
		this._added_at = value;
	}

    get description(): string{
		return this._description;
    }

	set description(value: string){
		this._description = value;
	}

    get qty(): number{
		return this._qty;
    }

	set qty(value: number){
		this._qty = value;
	}

	get product(): ProductModel{
		return this._product;
    }

	set product(value: ProductModel){
		this._product = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { this }
	 */
	fromJson(data: any): this{
		this.wishlist_item_id = data.wishlist_item_id;
    	this.wishlist_id = data.wishlist_id;
    	this.product_id = data.product_id;
    	this.store_id = data.store_id;
    	this.added_at = data.added_at;
    	this.description = data.description;
    	this.qty = data.qty;

    	if(data.product){
    		let model: ProductModel = new ProductModel();
    		this.product = model.fromJson(data.product);
    	}

		return this;
	}

	/**
	 * @public
	 * @method subtotal
	 * @description Get the sub-total price from quantity and price
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return number
	 */
	subtotal(): number{
		return this.product.price * this.qty;
	}
}