export class GroupcatProductActionModel{
	private _hide_price: boolean;
	private _change_price_text: boolean;
	private _hide_product: boolean;
	private _hide_category: boolean;
	private _hide_cart: boolean;
	private _hide_wishlist: boolean;
	private _hide_compare: boolean;
	private _call_to_order: boolean;
	private _hide_from_region: boolean;
	private _unavailable: boolean;

	get hide_price(): boolean{
		return this._hide_price;
	}

	set hide_price(value: boolean){
		this._hide_price;
	}

	get change_price_text(): boolean{
		return this._change_price_text;
	}

	set change_price_text(value: boolean){
		this._change_price_text;
	}

	get hide_product(): boolean{
		return this._hide_product;
	}

	set hide_product(value: boolean){
		this._hide_product;
	}

	get hide_category(): boolean{
		return this._hide_category;
	}

	set hide_category(value: boolean){
		this._hide_category;
	}

	get hide_cart(): boolean{
		return this._hide_cart;
	}

	set hide_cart(value: boolean){
		this._hide_cart;
	}

	get hide_wishlist(): boolean{
		return this._hide_wishlist;
	}

	set hide_wishlist(value: boolean){
		this._hide_wishlist;
	}

	get hide_compare(): boolean{
		return this._hide_compare;
	}

	set hide_compare(value: boolean){
		this._hide_compare;
	}

	get call_to_order(): boolean{
		return this._call_to_order;
	}

	set call_to_order(value: boolean){
		this._call_to_order;
	}

	get hide_from_region(): boolean{
		return this._hide_from_region;
	}

	set hide_from_region(value: boolean){
		this._hide_from_region;
	}

	get unavailable(): boolean{
		return this._unavailable;
	}

	set unavailable(value: boolean){
		this._unavailable;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.hide_price = data.hide_price;
		this.change_price_text = data.change_price_text;
		this.hide_product = data.hide_product;
		this.hide_category = data.hide_category;
		this.hide_cart = data.hide_cart;
		this.hide_wishlist = data.hide_wishlist;
		this.hide_compare = data.hide_compare;
		this.call_to_order = data.call_to_order;
		this.hide_from_region = data.hide_from_region;
		this.unavailable = data.unavailable;

		return this;
	}
}

export class GroupcatProductItemModel{
	private _sku: string;
	private _action: GroupcatProductActionModel;

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get action(): GroupcatProductActionModel{
		return this._action;
	}

	set action(value: GroupcatProductActionModel){
		this._action = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.sku = data.sku;

		let actionModel: GroupcatProductActionModel = new GroupcatProductActionModel();
		this.action = actionModel.fromJson(data.action);

		return this;
	}
}

export class GroupcatProductsActionModel{
	private _items: Array<GroupcatProductItemModel>;

	get items(): Array<GroupcatProductItemModel>{
		return this._items;
	}

	get_items(key: number): GroupcatProductItemModel{
		return this.items[key];
	}

	set items(value: Array<GroupcatProductItemModel>){
		this._items = value;
	}

	set_items(value: GroupcatProductItemModel): void{
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
	public fromJson(data: any): this{
		if(data.items){
			for(let item of data.items){
				let model: GroupcatProductItemModel = new GroupcatProductItemModel();
				this.set_items(model.fromJson(item));
			}
		}

		return this;
	}
}