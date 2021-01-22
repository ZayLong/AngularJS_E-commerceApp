export class InvoiceModel{
	private _base_currency_code: string;
	private _base_discount_amount: number;
	private _base_grand_total: number;
	private _base_discount_tax_compensation_amount: number;
	private _base_shipping_amount: number;
	private _base_shipping_discount_tax_compensation_amnt: number;
	private _base_shipping_incl_tax: number;
	private _base_shipping_tax_amount: number;
	private _base_subtotal: number;
	private _base_subtotal_incl_tax: number;
	private _base_tax_amount: number;
	private _base_total_refunded: number;
	private _base_to_global_rate: number;
	private _base_to_order_rate: number;
	private _billing_address_id: number;
	private _can_void_flag: number;
	private _created_at: string;
	private _discount_amount: number;
	private _discount_description: string;
	private _email_sent: number;
	private _entity_id: number;
	private _global_currency_code: string;
	private _grand_total: number;
	private _discount_tax_compensation_amount: number;
	private _increment_id: string;
	private _is_used_for_refund: number;
	private _order_currency_code: string;
	private _order_id: number;
	private _shipping_address_id: number;
	private _shipping_amount: number;
	private _shipping_discount_tax_compensation_amount: number;
	private _shipping_incl_tax: number;
	private _shipping_tax_amount: number;
	private _state: number;
	private _store_currency_code: string;
	private _store_id: number;
	private _store_to_base_rate: number;
	private _store_to_order_rate: number;
	private _subtotal: number;
	private _subtotal_incl_tax: number;
	private _tax_amount: number;
	private _total_qty: number;
	private _transaction_id: string;
	private _updated_at: string;
	private _items: Array<InvoiceItemModel> = [];
	private _comments: Array<InvoiceCommentModel> = [];
	private _extension_attributes: InvoiceExtensionModel;

	get base_currency_code(): string{
		return this._base_currency_code;
	}

	set base_currency_code(value: string){
		this._base_currency_code = value;
	}

	get base_discount_amount(): number{
		return this._base_discount_amount;
	}

	set base_discount_amount(value: number){
		this._base_discount_amount = value;
	}

	get base_grand_total(): number{
		return this._base_grand_total;
	}

	set base_grand_total(value: number){
		this._base_grand_total = value;
	}

	get base_discount_tax_compensation_amount(): number{
		return this._base_discount_tax_compensation_amount;
	}

	set base_discount_tax_compensation_amount(value: number){
		this._base_discount_tax_compensation_amount = value;
	}

	get base_shipping_amount(): number{
		return this._base_shipping_amount;
	}

	set base_shipping_amount(value: number){
		this._base_shipping_amount = value;
	}

	get base_shipping_discount_tax_compensation_amnt(): number{
		return this._base_shipping_discount_tax_compensation_amnt;
	}

	set base_shipping_discount_tax_compensation_amnt(value: number){
		this._base_shipping_discount_tax_compensation_amnt = value;
	}

	get base_shipping_incl_tax(): number{
		return this._base_shipping_incl_tax;
	}

	set base_shipping_incl_tax(value: number){
		this._base_shipping_incl_tax = value;
	}

	get base_shipping_tax_amount(): number{
		return this._base_shipping_tax_amount;
	}

	set base_shipping_tax_amount(value: number){
		this._base_shipping_tax_amount = value;
	}

	get base_subtotal(): number{
		return this._base_subtotal;
	}

	set base_subtotal(value: number){
		this._base_subtotal = value;
	}

	get base_subtotal_incl_tax(): number{
		return this._base_subtotal_incl_tax;
	}

	set base_subtotal_incl_tax(value: number){
		this._base_subtotal_incl_tax = value;
	}

	get base_tax_amount(): number{
		return this._base_tax_amount;
	}

	set base_tax_amount(value: number){
		this._base_tax_amount = value;
	}

	get base_total_refunded(): number{
		return this._base_total_refunded;
	}

	set base_total_refunded(value: number){
		this._base_total_refunded = value;
	}

	get base_to_global_rate(): number{
		return this._base_to_global_rate;
	}

	set base_to_global_rate(value: number){
		this._base_to_global_rate = value;
	}

	get base_to_order_rate(): number{
		return this._base_to_order_rate;
	}

	set base_to_order_rate(value: number){
		this._base_to_order_rate = value;
	}

	get billing_address_id(): number{
		return this._billing_address_id;
	}

	set billing_address_id(value: number){
		this._billing_address_id = value;
	}

	get can_void_flag(): number{
		return this._can_void_flag;
	}

	set can_void_flag(value: number){
		this._can_void_flag = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get discount_amount(): number{
		return this._discount_amount;
	}

	set discount_amount(value: number){
		this._discount_amount = value;
	}

	get discount_description(): string{
		return this._discount_description;
	}

	set discount_description(value: string){
		this._discount_description = value;
	}

	get email_sent(): number{
		return this._email_sent;
	}

	set email_sent(value: number){
		this._email_sent = value;
	}

	get entity_id(): number{
		return this._entity_id;
	}

	set entity_id(value: number){
		this._entity_id = value;
	}

	get global_currency_code(): string{
		return this._global_currency_code;
	}

	set global_currency_code(value: string){
		this._global_currency_code = value;
	}

	get grand_total(): number{
		return this._grand_total;
	}

	set grand_total(value: number){
		this._grand_total = value;
	}

	get discount_tax_compensation_amount(): number{
		return this._discount_tax_compensation_amount;
	}

	set discount_tax_compensation_amount(value: number){
		this._discount_tax_compensation_amount = value;
	}

	get increment_id(): string{
		return this._increment_id;
	}

	set increment_id(value: string){
		this._increment_id = value;
	}

	get is_used_for_refund(): number{
		return this._is_used_for_refund;
	}

	set is_used_for_refund(value: number){
		this._is_used_for_refund = value;
	}

	get order_currency_code(): string{
		return this._order_currency_code;
	}

	set order_currency_code(value: string){
		this._order_currency_code = value;
	}

	get order_id(): number{
		return this._order_id;
	}

	set order_id(value: number){
		this._order_id = value;
	}

	get shipping_address_id(): number{
		return this._shipping_address_id;
	}

	set shipping_address_id(value: number){
		this._shipping_address_id = value;
	}

	get shipping_amount(): number{
		return this._shipping_amount;
	}

	set shipping_amount(value: number){
		this._shipping_amount = value;
	}

	get shipping_discount_tax_compensation_amount(): number{
		return this._shipping_discount_tax_compensation_amount;
	}

	set shipping_discount_tax_compensation_amount(value: number){
		this._shipping_discount_tax_compensation_amount = value;
	}

	get shipping_incl_tax(): number{
		return this._shipping_incl_tax;
	}

	set shipping_incl_tax(value: number){
		this._shipping_incl_tax = value;
	}

	get shipping_tax_amount(): number{
		return this._shipping_tax_amount;
	}

	set shipping_tax_amount(value: number){
		this._shipping_tax_amount = value;
	}

	get state(): number{
		return this._state;
	}

	set state(value: number){
		this._state = value;
	}

	get store_currency_code(): string{
		return this._store_currency_code;
	}

	set store_currency_code(value: string){
		this._store_currency_code = value;
	}

	get store_id(): number{
		return this._store_id;
	}

	set store_id(value: number){
		this._store_id = value;
	}

	get store_to_base_rate(): number{
		return this._store_to_base_rate;
	}

	set store_to_base_rate(value: number){
		this._store_to_base_rate = value;
	}

	get store_to_order_rate(): number{
		return this._store_to_order_rate;
	}

	set store_to_order_rate(value: number){
		this._store_to_order_rate = value;
	}

	get subtotal(): number{
		return this._subtotal;
	}

	set subtotal(value: number){
		this._subtotal = value;
	}

	get subtotal_incl_tax(): number{
		return this._subtotal_incl_tax;
	}

	set subtotal_incl_tax(value: number){
		this._subtotal_incl_tax = value;
	}

	get tax_amount(): number{
		return this._tax_amount;
	}

	set tax_amount(value: number){
		this._tax_amount = value;
	}

	get total_qty(): number{
		return this._total_qty;
	}

	set total_qty(value: number){
		this._total_qty = value;
	}

	get transaction_id(): string{
		return this._transaction_id;
	}

	set transaction_id(value: string){
		this._transaction_id = value;
	}

	get updated_at(): string{
		return this._updated_at;
	}

	set updated_at(value: string){
		this._updated_at = value;
	}

	//private _items: Array<InvoiceItemModel> = [];
	get items(): Array<InvoiceItemModel>{
		return this._items;
	}

	get_item(key: number): InvoiceItemModel{
		return this.items[key];
	}

	set items(value: Array<InvoiceItemModel>){
		this._items = value;
	}

	set_item(value: InvoiceItemModel): void{
		this.items.push(value);
	}

	get comments(): Array<InvoiceCommentModel>{
		return this._comments;
	}

	get_comment(key: number): InvoiceCommentModel{
		return this.comments[key];
	}

	set comments(value: Array<InvoiceCommentModel>){
		this._comments = value;
	}

	set_comment(value: InvoiceCommentModel): void{
		this.comments.push(value);
	}

	get extension_attributes(): InvoiceExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: InvoiceExtensionModel){
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
		this.base_currency_code = data.base_currency_code;
		this.base_discount_amount = data.base_discount_amount;
		this.base_grand_total = data.base_grand_total;
		this.base_discount_tax_compensation_amount = data.base_discount_tax_compensation_amount;
		this.base_shipping_amount = data.base_shipping_amount;
		this.base_shipping_discount_tax_compensation_amnt = data.base_shipping_discount_tax_compensation_amnt;
		this.base_shipping_incl_tax = data.base_shipping_incl_tax;
		this.base_shipping_tax_amount = data.base_shipping_tax_amount;
		this.base_subtotal = data.base_subtotal;
		this.base_subtotal_incl_tax = data.base_subtotal_incl_tax;
		this.base_tax_amount = data.base_tax_amount;
		this.base_total_refunded = data.base_total_refunded;
		this.base_to_global_rate = data.base_to_global_rate;
		this.base_to_order_rate = data.base_to_order_rate;
		this.billing_address_id = data.billing_address_id;
		this.can_void_flag = data.can_void_flag;
		this.created_at = data.created_at;
		this.discount_amount = data.discount_amount;
		this.discount_description = data.discount_description;
		this.email_sent = data.email_sent;
		this.entity_id = data.entity_id;
		this.global_currency_code = data.global_currency_code;
		this.grand_total = data.grand_total;
		this.discount_tax_compensation_amount = data.discount_tax_compensation_amount;
		this.increment_id = data.increment_id;
		this.is_used_for_refund = data.is_used_for_refund;
		this.order_currency_code = data.order_currency_code;
		this.order_id = data.order_id;
		this.shipping_address_id = data.shipping_address_id;
		this.shipping_amount = data.shipping_amount;
		this.shipping_discount_tax_compensation_amount = data.shipping_discount_tax_compensation_amount;
		this.shipping_incl_tax = data.shipping_incl_tax;
		this.shipping_tax_amount = data.shipping_tax_amount;
		this.state = data.state;
		this.store_currency_code = data.store_currency_code;
		this.store_id = data.store_id;
		this.store_to_base_rate = data.store_to_base_rate;
		this.store_to_order_rate = data.store_to_order_rate;
		this.subtotal = data.subtotal;
		this.subtotal_incl_tax = data.subtotal_incl_tax;
		this.tax_amount = data.tax_amount;
		this.total_qty = data.total_qty;
		this.transaction_id = data.transaction_id;
		this.updated_at = data.updated_at;

		if(data.items){
			for(let item of data.items){
				let model: InvoiceItemModel = new InvoiceItemModel();
				this.set_item( model.fromJson(item) );
			}
		}
		
		if(data.comments){
			for(let comment of data.comments){
				let model: InvoiceCommentModel = new InvoiceCommentModel();
				this.set_comment( model.fromJson(comment) );
			}
		}
		
		let extensionModel: InvoiceExtensionModel = new InvoiceExtensionModel();
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		return this;
	}
}

export class InvoiceCommentModel{
	private _is_customer_notified: number;
	private _parent_id: number;
	//private extension_attributes;
	private _comment: string;
	private _is_visible_on_front: number;
	private _created_at: string;
	private _entity_id: number;

	get is_customer_notified(): number{
		return this._is_customer_notified;
	}

	set is_customer_notified(value: number){
		this._is_customer_notified = value;
	}

	get parent_id(): number{
		return this._parent_id;
	}

	set parent_id(value: number){
		this._parent_id = value;
	}

	//extension_attributes

	get comment(): string{
		return this._comment;
	}

	set comment(value: string){
		this._comment = value;
	}

	get is_visible_on_front(): number{
		return this._is_visible_on_front;
	}

	set is_visible_on_front(value: number){
		this._is_visible_on_front = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get entity_id(): number{
		return this._entity_id;
	}

	set entity_id(value: number){
		this._entity_id = value;
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
		this.is_customer_notified = data.is_customer_notified;
		this.parent_id = data.parent_id;

		//private extension_attributes;
		
		this.comment = data.comment;
		this.is_visible_on_front = data.is_visible_on_front;
		this.created_at = data.created_at;
		this.entity_id = data.entity_id;

		return this;
	}
}

export class InvoiceItemModel{
	private _additional_data: string;
	private _base_cost: number;
	private _base_discount_amount: number;
	private _base_discount_tax_compensation_amount: number;
	private _base_price: number;
	private _base_price_incl_tax: number;
	private _base_row_total: number;
	private _base_row_total_incl_tax: number;
	private _base_tax_amount: number;
	private _description: string;
	private _discount_amount: number;
	private _entity_id: number;
	private _discount_tax_compensation_amount: number;
	private _name: string;
	private _parent_id: number;
	private _price: number;
	private _price_incl_tax: number;
	private _product_id: number;
	private _row_total: number;
	private _row_total_incl_tax: number;
	private _sku: string;
	private _tax_amount: number;
	//private extension_attributes: Array
	private _order_item_id: number;
	private _qty: number;

	get additional_data(): string{
		return this._additional_data;
	}

	set additional_data(value: string){
		this._additional_data = value;
	}

	get base_cost(): number{
		return this._base_cost;
	}

	set base_cost(value: number){
		this._base_cost = value;
	}

	get base_discount_amount(): number{
		return this._base_discount_amount;
	}

	set base_discount_amount(value: number){
		this._base_discount_amount = value;
	}

	get base_discount_tax_compensation_amount(): number{
		return this._base_discount_tax_compensation_amount;
	}

	set base_discount_tax_compensation_amount(value: number){
		this._base_discount_tax_compensation_amount = value;
	}

	get base_price(): number{
		return this._base_price;
	}

	set base_price(value: number){
		this._base_price = value;
	}

	get base_price_incl_tax(): number{
		return this._base_price_incl_tax;
	}

	set base_price_incl_tax(value: number){
		this._base_price_incl_tax = value;
	}

	get base_row_total(): number{
		return this._base_row_total;
	}

	set base_row_total(value: number){
		this._base_row_total = value;
	}

	get base_row_total_incl_tax(): number{
		return this._base_row_total_incl_tax;
	}

	set base_row_total_incl_tax(value: number){
		this._base_row_total_incl_tax = value;
	}

	get base_tax_amount(): number{
		return this._base_tax_amount;
	}

	set base_tax_amount(value: number){
		this._base_tax_amount = value;
	}

	get description(): string{
		return this._description;
	}

	set description(value: string){
		this._description = value;
	}

	get discount_amount(): number{
		return this._discount_amount;
	}

	set discount_amount(value: number){
		this._discount_amount = value;
	}

	get entity_id(): number{
		return this._entity_id;
	}

	set entity_id(value: number){
		this._entity_id = value;
	}

	get discount_tax_compensation_amount(): number{
		return this._discount_tax_compensation_amount;
	}

	set discount_tax_compensation_amount(value: number){
		this._discount_tax_compensation_amount = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get parent_id(): number{
		return this._parent_id;
	}

	set parent_id(value: number){
		this._parent_id = value;
	}

	get price(): number{
		return this._price;
	}

	set price(value: number){
		this._price = value;
	}

	get price_incl_tax(): number{
		return this._price_incl_tax;
	}

	set price_incl_tax(value: number){
		this._price_incl_tax = value;
	}

	get product_id(): number{
		return this._product_id;
	}

	set product_id(value: number){
		this._product_id = value;
	}

	get row_total(): number{
		return this._row_total;
	}

	set row_total(value: number){
		this._row_total = value;
	}

	get row_total_incl_tax(): number{
		return this._row_total_incl_tax;
	}

	set row_total_incl_tax(value: number){
		this._row_total_incl_tax = value;
	}

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get tax_amount(): number{
		return this._tax_amount;
	}

	set tax_amount(value: number){
		this._tax_amount = value;
	}

	//private extension_attributes

	get order_item_id(): number{
		return this._order_item_id;
	}

	set order_item_id(value: number){
		this._order_item_id = value;
	}

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
		this.additional_data = data.additional_data;
		this.base_cost = data.base_cost;
		this.base_discount_amount = data.base_discount_amount;
		this.base_discount_tax_compensation_amount = data.base_discount_tax_compensation_amount;
		this.base_price = data.base_price;
		this.base_price_incl_tax = data.base_price_incl_tax;
		this.base_row_total = data.base_row_total;
		this.base_row_total_incl_tax = data.base_row_total_incl_tax;
		this.base_tax_amount = data.base_tax_amount;
		this.description = data.description;
		this.discount_amount = data.discount_amount;
		this.entity_id = data.entity_id;
		this.discount_tax_compensation_amount = data.discount_tax_compensation_amount;
		this.name = data.name;
		this.parent_id = data.parent_id;
		this.price = data.price;
		this.price_incl_tax = data.price_incl_tax;
		this.product_id = data.product_id;
		this.row_total = data.row_total;
		this.row_total_incl_tax = data.row_total_incl_tax;
		this.sku = data.sku;
		this.tax_amount = data.tax_amount;

		//private extension_attributes: Array
		
		this.order_item_id = data.order_item_id;
		this.qty = data.qty;
		
		return this;
	}
}

export class InvoiceExtensionModel{
	private _base_customer_balance_amount: number;
	private _customer_balance_amount: number;
	private _base_gift_cards_amount: number;
	private _gift_cards_amount: number;
	private _gw_base_price: string;
	private _gw_price: string;
	private _gw_items_base_price: string;
	private _gw_items_price: string;
	private _gw_card_base_price: string;
	private _gw_card_price: string;
	private _gw_base_tax_amount: string;
	private _gw_tax_amount: string;
	private _gw_items_base_tax_amount: string;
	private _gw_items_tax_amount: string;
	private _gw_card_base_tax_amount: string;
	private _gw_card_tax_amount: string;

	get base_customer_balance_amount(): number{
		return this._base_customer_balance_amount;
	}

	set base_customer_balance_amount(value: number){
		this._base_customer_balance_amount = value;
	}

	get customer_balance_amount(): number{
		return this._customer_balance_amount;
	}

	set customer_balance_amount(value: number){
		this._customer_balance_amount = value;
	}

	get base_gift_cards_amount(): number{
		return this._base_gift_cards_amount;
	}

	set base_gift_cards_amount(value: number){
		this._base_gift_cards_amount = value;
	}

	get gift_cards_amount(): number{
		return this._gift_cards_amount;
	}

	set gift_cards_amount(value: number){
		this._gift_cards_amount = value;
	}

	get gw_base_price(): string{
		return this._gw_base_price;
	}

	set gw_base_price(value: string){
		this._gw_base_price = value;
	}

	get gw_price(): string{
		return this._gw_price;
	}

	set gw_price(value: string){
		this._gw_price = value;
	}

	get gw_items_base_price(): string{
		return this._gw_items_base_price;
	}

	set gw_items_base_price(value: string){
		this._gw_items_base_price = value;
	}

	get gw_items_price(): string{
		return this._gw_items_price;
	}

	set gw_items_price(value: string){
		this._gw_items_price = value;
	}

	get gw_card_base_price(): string{
		return this._gw_card_base_price;
	}

	set gw_card_base_price(value: string){
		this._gw_card_base_price = value;
	}

	get gw_card_price(): string{
		return this._gw_card_price;
	}

	set gw_card_price(value: string){
		this._gw_card_price = value;
	}

	get gw_base_tax_amount(): string{
		return this._gw_base_tax_amount;
	}

	set gw_base_tax_amount(value: string){
		this._gw_base_tax_amount = value;
	}

	get gw_tax_amount(): string{
		return this._gw_tax_amount;
	}

	set gw_tax_amount(value: string){
		this._gw_tax_amount = value;
	}

	get gw_items_base_tax_amount(): string{
		return this._gw_items_base_tax_amount;
	}

	set gw_items_base_tax_amount(value: string){
		this._gw_items_base_tax_amount = value;
	}

	get gw_items_tax_amount(): string{
		return this._gw_items_tax_amount;
	}

	set gw_items_tax_amount(value: string){
		this._gw_items_tax_amount = value;
	}

	get gw_card_base_tax_amount(): string{
		return this._gw_card_base_tax_amount;
	}

	set gw_card_base_tax_amount(value: string){
		this._gw_card_base_tax_amount = value;
	}

	get gw_card_tax_amount(): string{
		return this._gw_card_tax_amount;
	}

	set gw_card_tax_amount(value: string){
		this._gw_card_tax_amount = value;
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
		this.base_customer_balance_amount = data.base_customer_balance_amount;
		this.customer_balance_amount = data.customer_balance_amount;
		this.base_gift_cards_amount = data.base_gift_cards_amount;
		this.gift_cards_amount = data.gift_cards_amount;
		this.gw_base_price = data.gw_base_price;
		this.gw_price = data.gw_price;
		this.gw_items_base_price = data.gw_items_base_price;
		this.gw_items_price = data.gw_items_price;
		this.gw_card_base_price = data.gw_card_base_price;
		this.gw_card_price = data.gw_card_price;
		this.gw_base_tax_amount = data.gw_base_tax_amount;
		this.gw_tax_amount = data.gw_tax_amount;
		this.gw_items_base_tax_amount = data.gw_items_base_tax_amount;
		this.gw_items_tax_amount = data.gw_items_tax_amount;
		this.gw_card_base_tax_amount = data.gw_card_base_tax_amount;
		this.gw_card_tax_amount = data.gw_card_tax_amount;
		
		return this;
	}
}