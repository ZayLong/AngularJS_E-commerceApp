export class CartTotalModel{
	private _grand_total: number;
	private _base_grand_total: number;
	private _subtotal: number;
	private _base_subtotal: number;
	private _discount_amount: number;
	private _base_discount_amount: number;
	private _subtotal_with_discount: number;
	private _base_subtotal_with_discount: number;
	private _shipping_amount: number;
	private _base_shipping_amount: number;
	private _shipping_discount_amount: number;
	private _base_shipping_discount_amount: number;
	private _tax_amount: number;
	private _base_tax_amount: number;
	private _weee_tax_applied_amount: number;
	private _shipping_tax_amount: number;
	private _base_shipping_tax_amount: number;
	private _subtotal_incl_tax: number;
	private _base_subtotal_incl_tax: number;
	private _shipping_incl_tax: number;
	private _base_shipping_incl_tax: number;
	private _base_currency_code: string;
	private _quote_currency_code: string;
	private _coupon_code: string;
	private _items_qty: number;
	private _items: Array<CartTotalItemModel> = [];
	private _total_segments: Array<CartTotalSegmentModel> = [];
	//private extension_attributes: any;

	get grand_total(): number{
		return this._grand_total;
	}

	set grand_total(value: number){
		this._grand_total = value;
	}

	get base_grand_total(): number{
		return this._base_grand_total;
	}

	set base_grand_total(value: number){
		this._base_grand_total = value;
	}

	get subtotal(): number{
		return this._subtotal;
	}

	set subtotal(value: number){
		this._subtotal = value;
	}

	get base_subtotal(): number{
		return this._base_subtotal;
	}

	set base_subtotal(value: number){
		this._base_subtotal = value;
	}

	get discount_amount(): number{
		return this._discount_amount;
	}

	set discount_amount(value: number){
		this._discount_amount = value;
	}

	get base_discount_amount(): number{
		return this._base_discount_amount;
	}

	set base_discount_amount(value: number){
		this._base_discount_amount = value;
	}

	get subtotal_with_discount(): number{
		return this._subtotal_with_discount;
	}

	set subtotal_with_discount(value: number){
		this._subtotal_with_discount = value;
	}

	get base_subtotal_with_discount(): number{
		return this._base_subtotal_with_discount;
	}

	set base_subtotal_with_discount(value: number){
		this._base_subtotal_with_discount = value;
	}

	get shipping_amount(): number{
		return this._shipping_amount;
	}

	set shipping_amount(value: number){
		this._shipping_amount = value;
	}

	get base_shipping_amount(): number{
		return this._base_shipping_amount;
	}

	set base_shipping_amount(value: number){
		this._base_shipping_amount = value;
	}

	get shipping_discount_amount(): number{
		return this._shipping_discount_amount;
	}

	set shipping_discount_amount(value: number){
		this._shipping_discount_amount = value;
	}

	get base_shipping_discount_amount(): number{
		return this._base_shipping_discount_amount;
	}

	set base_shipping_discount_amount(value: number){
		this._base_shipping_discount_amount = value;
	}

	get tax_amount(): number{
		return this._tax_amount;
	}

	set tax_amount(value: number){
		this._tax_amount = value;
	}

	get base_tax_amount(): number{
		return this._base_tax_amount;
	}

	set base_tax_amount(value: number){
		this._base_tax_amount = value;
	}

	get weee_tax_applied_amount(): number{
		return this._weee_tax_applied_amount;
	}

	set weee_tax_applied_amount(value: number){
		this._weee_tax_applied_amount = value;
	}

	get shipping_tax_amount(): number{
		return this._shipping_tax_amount;
	}

	set shipping_tax_amount(value: number){
		this._shipping_tax_amount = value;
	}

	get base_shipping_tax_amount(): number{
		return this._base_shipping_tax_amount;
	}

	set base_shipping_tax_amount(value: number){
		this._base_shipping_tax_amount = value;
	}

	get subtotal_incl_tax(): number{
		return this._subtotal_incl_tax;
	}

	set subtotal_incl_tax(value: number){
		this._subtotal_incl_tax = value;
	}

	get base_subtotal_incl_tax(): number{
		return this._base_subtotal_incl_tax;
	}

	set base_subtotal_incl_tax(value: number){
		this._base_subtotal_incl_tax = value;
	}

	get shipping_incl_tax(): number{
		return this._shipping_incl_tax;
	}

	set shipping_incl_tax(value: number){
		this._shipping_incl_tax = value;
	}

	get base_shipping_incl_tax(): number{
		return this._base_shipping_incl_tax;
	}

	set base_shipping_incl_tax(value: number){
		this._base_shipping_incl_tax = value;
	}

	get base_currency_code(): string{
		return this._base_currency_code;
	}

	set base_currency_code(value: string){
		this._base_currency_code = value;
	}

	get quote_currency_code(): string{
		return this._quote_currency_code;
	}

	set quote_currency_code(value: string){
		this._quote_currency_code = value;
	}

	get coupon_code(): string{
		return this._coupon_code;
	}

	set coupon_code(value: string){
		this._coupon_code = value;
	}

	get items_qty(): number{
		return this._items_qty;
	}

	set items_qty(value: number){
		this._items_qty = value;
	}

	get items(): Array<CartTotalItemModel>{
		return this._items;
	}

	get_item(key: number): CartTotalItemModel{
		return this.items[key];
	}

	set items(value: Array<CartTotalItemModel>){
		this._items = value;
	}

	set_item(value: CartTotalItemModel): void{
		this.items.push(value);
	}

	get total_segments(): Array<CartTotalSegmentModel>{
		return this._total_segments;
	}

	get_total_segment(key: string): CartTotalSegmentModel{
		for(let total of this.total_segments){
			if(key === total.code){
				return total;
			}
		}
	}

	set total_segments(value: Array<CartTotalSegmentModel>){
		this._total_segments = value;
	}

	set_total_segment(value: CartTotalSegmentModel): void{
		this.total_segments.push(value);
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
		this.grand_total = data.grand_total;
		this.base_grand_total = data.base_grand_total;
		this.subtotal = data.subtotal;
		this.base_subtotal = data.base_subtotal;
		this.discount_amount = data.discount_amount;
		this.base_discount_amount = data.base_discount_amount;
		this.subtotal_with_discount = data.subtotal_with_discount;
		this.base_subtotal_with_discount = data.base_subtotal_with_discount;
		this.shipping_amount = data.shipping_amount;
		this.base_shipping_amount = data.base_shipping_amount;
		this.shipping_discount_amount = data.shipping_discount_amount;
		this.base_shipping_discount_amount = data.base_shipping_discount_amount;
		this.tax_amount = data.tax_amount;
		this.base_tax_amount = data.base_tax_amount;
		this.weee_tax_applied_amount = data.weee_tax_applied_amount;
		this.shipping_tax_amount = data.shipping_tax_amount;
		this.base_shipping_tax_amount = data.base_shipping_tax_amount;
		this.subtotal_incl_tax = data.subtotal_incl_tax;
		this.base_subtotal_incl_tax = data.base_subtotal_incl_tax;
		this.shipping_incl_tax = data.shipping_incl_tax;
		this.base_shipping_incl_tax = data.base_shipping_incl_tax;
		this.base_currency_code = data.base_currency_code;
		this.quote_currency_code = data.quote_currency_code;
		this.coupon_code = data.coupon_code;
		this.items_qty = data.items_qty;

		if(data.items){
			for(let item of data.items){
				let model: CartTotalItemModel = new CartTotalItemModel();
				this.set_item( model.fromJson(item) );
			}
		}

		if(data.total_segments){
			for(let segment of data.total_segments){
				let model: CartTotalSegmentModel = new CartTotalSegmentModel();
				this.set_total_segment( model.fromJson(segment) );
			}
		}

		return this;
	}
}

export class CartTotalItemModel{
	private _item_id: number;
	private _price: number;
	private _base_price: number;
	private _qty: number;
	private _row_total: number;
	private _base_row_total: number;
	private _row_total_with_discount: number;
	private _tax_amount: number;
	private _base_tax_amount: number;
	private _tax_percent: number;
	private _discount_amount: number;
	private _base_discount_amount: number;
	private _discount_percent: number;
	private _price_incl_tax: number;
	private _base_price_incl_tax: number;
	private _row_total_incl_tax: number;
	private _base_row_total_incl_tax: number;
	private _options: string;
	private _weee_tax_applied_amount: number;
	private _weee_tax_applied: string;
	//private extension_attributes: Array<>;
	private _name: string;

	get item_id(): number{
		return this._item_id;
	}

	set item_id(value: number){
		this._item_id = value;
	}

	get price(): number{
		return this._price;
	}

	set price(value: number){
		this._price = value;
	}

	get base_price(): number{
		return this._base_price;
	}

	set base_price(value: number){
		this._base_price = value;
	}

	get qty(): number{
		return this._qty;
	}

	set qty(value: number){
		this._qty = value;
	}

	get row_total(): number{
		return this._row_total;
	}

	set row_total(value: number){
		this._row_total = value;
	}

	get base_row_total(): number{
		return this._base_row_total;
	}

	set base_row_total(value: number){
		this._base_row_total = value;
	}

	get row_total_with_discount(): number{
		return this._row_total_with_discount;
	}

	set row_total_with_discount(value: number){
		this._row_total_with_discount = value;
	}

	get tax_amount(): number{
		return this._tax_amount;
	}

	set tax_amount(value: number){
		this._tax_amount = value;
	}

	get base_tax_amount(): number{
		return this._base_tax_amount;
	}

	set base_tax_amount(value: number){
		this._base_tax_amount = value;
	}

	get tax_percent(): number{
		return this._tax_percent;
	}

	set tax_percent(value: number){
		this._tax_percent = value;
	}

	get discount_amount(): number{
		return this._discount_amount;
	}

	set discount_amount(value: number){
		this._discount_amount = value;
	}

	get base_discount_amount(): number{
		return this._base_discount_amount;
	}

	set base_discount_amount(value: number){
		this._base_discount_amount = value;
	}

	get discount_percent(): number{
		return this._discount_percent;
	}

	set discount_percent(value: number){
		this._discount_percent = value;
	}

	get price_incl_tax(): number{
		return this._price_incl_tax;
	}

	set price_incl_tax(value: number){
		this._price_incl_tax = value;
	}

	get base_price_incl_tax(): number{
		return this._base_price_incl_tax;
	}

	set base_price_incl_tax(value: number){
		this._base_price_incl_tax = value;
	}

	get row_total_incl_tax(): number{
		return this._row_total_incl_tax;
	}

	set row_total_incl_tax(value: number){
		this._row_total_incl_tax = value;
	}

	get base_row_total_incl_tax(): number{
		return this._base_row_total_incl_tax;
	}

	set base_row_total_incl_tax(value: number){
		this._base_row_total_incl_tax = value;
	}

	get options(): string{
		return this._options;
	}

	set options(value: string){
		this._options = value;
	}

	get weee_tax_applied_amount(): number{
		return this._weee_tax_applied_amount;
	}

	set weee_tax_applied_amount(value: number){
		this._weee_tax_applied_amount = value;
	}

	get weee_tax_applied(): string{
		return this._weee_tax_applied;
	}

	set weee_tax_applied(value: string){
		this._weee_tax_applied = value;
	}


	//extension attributes

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
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
		this.item_id = data.item_id;
		this.price = data.price;
		this.base_price = data.base_price;
		this.qty = data.qty;
		this.row_total = data.row_total;
		this.base_row_total = data.base_row_total;
		this.row_total_with_discount = data.row_total_with_discount;
		this.tax_amount = data.tax_amount;
		this.base_tax_amount = data.base_tax_amount;
		this.tax_percent = data.tax_percent;
		this.discount_amount = data.discount_amount;
		this.base_discount_amount = data.base_discount_amount;
		this.discount_percent = data.discount_percent;
		this.price_incl_tax = data.price_incl_tax;
		this.base_price_incl_tax = data.base_price_incl_tax;
		this.row_total_incl_tax = data.row_total_incl_tax;
		this.base_row_total_incl_tax = data.base_row_total_incl_tax;
		this.options = data.options;
		this.weee_tax_applied_amount = data.weee_tax_applied_amount;
		this.weee_tax_applied = data.weee_tax_applied;

		//extension attribute

		this.name = data.name;

		return this;
	}
}

export class CartTotalSegmentModel{
	private _code: string;
	private _title: string;
	private _value: number;
	private _area: string;
	//private extension_attributes: Array<>;

	get code(): string{
		return this._code;
	}

	set code(value: string){
		this._code = value;
	}

	get title(): string{
		return this._title;
	}

	set title(value: string){
		this._title = value;
	}

	get value(): number{
		return this._value;
	}

	set value(value: number){
		this._value = value;
	}

	get area(): string{
		return this._area;
	}

	set area(value: string){
		this._area = value;
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
		this.code = data.code;
		this.title = data.title;
		this.value = data.value;
		this.area = data.area;

		return this;
	}
}