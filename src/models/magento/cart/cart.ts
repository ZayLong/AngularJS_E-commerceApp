import { AddressModel } from '../general/address';
import { CustomerModel } from '../customer/customer';
import { CustomerAddressModel } from '../customer/address';
import { CustomAttributeParamModel } from '../general/custom-attribute';
import { ProductModel } from '../catalog/product';

export class CartModel{
	private _id: number;
	private _created_at: string;
	private _updated_at: string;
	private _converted_at: string;
	private _is_active: boolean;
	private _is_virtual: boolean
	private _items: Array<CartItemModel> = [];
	private _items_count: number;
	private _items_qty: number;
	private _customer: CustomerModel;
	private _billing_address: CartAddressModel;
	private _reserved_order_id: number;
	private _orig_order_id: number;
	private _currency: CartCurrencyModel;
	private _customer_is_guest: boolean;
	private _customer_note: string;
	private _customer_note_notify: boolean;
	private _customer_tax_class_id: number;
	private _store_id: number;
	private _extension_attributes: CartExtensionModel;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
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

	get converted_at(): string{
		return this._converted_at;
	}

	set converted_at(value: string){
		this._converted_at = value;
	}

	get is_active(): boolean{
		return this._is_active;
	}

	set is_active(value: boolean){
		this._is_active = value;
	}

	get is_virtual(): boolean{
		return this._is_virtual;
	}

	set is_virtual(value: boolean){
		this._is_virtual = value;
	}

	get items(): Array<CartItemModel>{
		return this._items;
	}

	get_item(key: number): CartItemModel{
		return this.items[key];
	}

	set items(value: Array<CartItemModel>){
		this._items = value;
	}

	set_item(value: CartItemModel): void{
		this.items.push(value);
	}

	get items_count(): number{
		return this._items_count;
	}

	set items_count(value: number){
		this._items_count = value;
	}

	get items_qty(): number{
		return this._items_qty;
	}

	set items_qty(value: number){
		this._items_qty = value;
	}

	get customer(): CustomerModel{
		return this._customer;
	}

	set customer(value: CustomerModel){
		this._customer = value;
	}

	get billing_address(): CartAddressModel{
		return this._billing_address;
	}

	set billing_address(value: CartAddressModel){
		this._billing_address = value;
	}

	get reserved_order_id(): number{
		return this._reserved_order_id;
	}

	set reserved_order_id(value: number){
		this._reserved_order_id = value;
	}

	get orig_order_id(): number{
		return this._orig_order_id;
	}

	set orig_order_id(value: number){
		this._orig_order_id = value;
	}

	get currency(): CartCurrencyModel{
		return this._currency;
	}

	set currency(value: CartCurrencyModel){
		this._currency = value;
	}

	get customer_is_guest(): boolean{
		return this._customer_is_guest;
	}

	set customer_is_guest(value: boolean){
		this._customer_is_guest = value;
	}

	get customer_note(): string{
		return this._customer_note;
	}

	set customer_note(value: string){
		this._customer_note = value;
	}

	get customer_note_notify(): boolean{
		return this._customer_note_notify;
	}

	set customer_note_notify(value: boolean){
		this._customer_note_notify = value;
	}

	get customer_tax_class_id(): number{
		return this._customer_tax_class_id;
	}

	set customer_tax_class_id(value: number){
		this._customer_tax_class_id = value;
	}

	get store_id(): number{
		return this._store_id;
	}

	set store_id(value: number){
		this._store_id = value;
	}

	get extension_attributes(): CartExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: CartExtensionModel){
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
		this.id = data.id;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.converted_at = data.converted_at;
		this.is_active = data.is_active;
		this.is_virtual = data.is_virtual;

		if(data.items){
			for(let item of data.items){
				let model: CartItemModel = new CartItemModel();
				this.set_item( model.fromJson(item) );
			}
		}
		
		this.items_count = data.items_count;
		this.items_qty = data.items_qty;
		
		let customerModel: CustomerModel = new CustomerModel();
		this.customer = customerModel.fromJson(data.customer);
		
		let billingAddress: CartAddressModel = new CartAddressModel();
		this.billing_address = billingAddress.fromJson(data.billing_address);
		
		this.reserved_order_id = data.reserved_order_id;
		this.orig_order_id = data.orig_order_id;

		let currency: CartCurrencyModel = new CartCurrencyModel();
		this.currency = currency.fromJson(data.currency);

		this.customer_is_guest = data.customer_is_guest;
		this.customer_note = data.customer_note;
		this.customer_note_notify = data.customer_note_notify;
		this.customer_tax_class_id = data.customer_tax_class_id;
		this.store_id = data.store_id;

		let extension: CartExtensionModel = new CartExtensionModel();
		this.extension_attributes = extension.fromJson(data.extension_attributes);

		return this;
	}

	/**
	 * @public
	 * @method subtotal
	 * @description Get cart sub-total
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param boolean format (default to false)
	 * @return string/number
	 */
	subtotal(format: boolean = false): any{
		let subtotal: number = 0.00;

		for(let item of this.items){
			subtotal += item.subtotal();
		}

		return subtotal;
	}
}

export class CartItemModel{
	private _item_id: number;
	private _sku: string;
	private _qty: number;
	private _name: string;
	private _price: number;
	private _product_type: string;
	private _quote_id: string;
	private _tax_status: string;
	//private _product_options;
	private _extension_attributes: CartItemExtensionModel;

	get item_id(): number{
		return this._item_id;
	}

	set item_id(value: number){
		this._item_id = value;
	}

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get qty(): number{
		return this._qty;
	}

	set qty(value: number){
		this._qty = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get price(): number{
		return this._price;
	}

	set price(value: number){
		this._price = value;
	}

	get product_type(): string{
		return this._product_type;
	}

	set product_type(value: string){
		this._product_type = value;
	}

	get quote_id(): string{
		return this._quote_id;
	}

	set quote_id(value: string){
		this._quote_id = value;
	}

	get tax_status(): string{
		return this._tax_status;
	}

	set tax_status(value: string){
		this._tax_status = value;
	}

	// product options

	get extension_attributes(): CartItemExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: CartItemExtensionModel){
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
		this.item_id = data.item_id;
		this.sku = data.sku;
		this.qty = data.qty;
		this.name = data.name;
		this.price = data.price;
		this.product_type = data.product_type;
		this.quote_id = data.quote_id;

		//product options

		if(data.extension_attributes){
			let extensionModel: CartItemExtensionModel = new CartItemExtensionModel();
			this.extension_attributes = extensionModel.fromJson(data.extension_attributes);
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
		return this.price * this.qty;
	}
}

export class CartItemExtensionModel{

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { this }
	 */
	fromJson(data: any): this{
		return this;
	}
}

export class CartAddressModel extends AddressModel{
	private _id: number;
	private _region: string;
	private _region_code: string;
	private _email: string;
	private _same_as_billing: number;
	private _customer_address_id: number;
	private _save_in_address_book: number;
	//private extension_attributes: any;
	//private _custom_attributes: Array<CustomAttributeModel> = [];
	private custom_attributes: Array<CustomAttributeParamModel> = [];

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get region(): string{
		return this._region;
	}

	set region(value: string){
		this._region = value;
	}

	get region_code(): string{
		return this._region_code;
	}

	set region_code(value: string){
		this._region_code = value;
	}

	get email(): string{
		return this._email;
	}

	set email(value: string){
		this._email = value;
	}

	get same_as_billing(): number{
		return this._same_as_billing;
	}

	set same_as_billing(value: number){
		this._same_as_billing = value;
	}

	get customer_address_id(): number{
		return this._customer_address_id;
	}

	set customer_address_id(value: number){
		this._customer_address_id = value;
	}

	get save_in_address_book(): number{
		return this._save_in_address_book;
	}

	set save_in_address_book(value: number){
		this._save_in_address_book = value;
	}

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
	 */
	fromJson(data: any): this{
		// From parent
		this.customer_id = data.customer_id;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.middlename = data.middlename;
		this.prefix = data.prefix;
		this.suffix = data.suffix;
		this.street = data.street;
		this.city = data.city;
		this.region_id = data.region_id;
		this.country_id = data.country_id;
		this.postcode = data.postcode;
		this.company = data.company;
		this.telephone = data.telephone;
		this.fax = data.fax;
		this.vat_id = data.vat_id;

		// Child
		this.id = data.id;
		this.region = data.region;
		this.region_code = data.region_code;
		this.email = data.email;
		this.same_as_billing = data.same_as_billing;
		this.customer_address_id = data.customer_address_id;
		this.save_in_address_book = data.save_in_address_book;

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

	/**
	 * @public
	 * @method fromCustomerAddress
	 * @description Convert customer address to cart address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param CustomerAddressModel customer
	 * @return CartAddressModel
	 */
	public fromCustomerAddress(customerAddress: CustomerAddressModel): void{
		this.firstname = customerAddress.firstname;
		this.middlename = customerAddress.middlename;
		this.lastname = customerAddress.lastname;
		this.company = customerAddress.company;
		this.telephone = customerAddress.telephone;
		this.fax = customerAddress.fax;
		this.prefix = customerAddress.prefix;
		this.suffix = customerAddress.suffix;
		
		this.street = customerAddress.street;
		this.city = customerAddress.city;
		this.region = customerAddress.region.region;
		this.region_id = customerAddress.region_id;
		this.region_code = customerAddress.region.region_code;
		this.postcode = customerAddress.postcode;
		this.country_id = customerAddress.country_id;
		
		this.customer_id = customerAddress.customer_id;
		this.vat_id = customerAddress.vat_id;
		this.customer_address_id = customerAddress.id;

		this.custom_attributes = customerAddress.get_custom_attributes();
	}

	/**
	 * @public
	 * @method fullMetroAddress
	 * @description Return the full metro location of the address
	 * @description City, State and Postcode
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return string
	 */
	public fullMetroAddress(): string{
		return this.city + ', ' + this.region + ' ' + this.postcode;
	}
}

export class CartCurrencyModel{
	private _global_currency_code: string;
	private _base_currency_code: string;
	private _store_currency_code: string;
	private _quote_currency_code: string;
	private _store_to_base_rate: number;
	private _store_to_quote_rate: number;
	private _base_to_global_rate: number;
	private _base_to_quote_rate: number;
	//private extension_attributes;

	get global_currency_code(): string{
		return this._global_currency_code;
	}

	set global_currency_code(value: string){
		this._global_currency_code = value;
	}

	get base_currency_code(): string{
		return this._base_currency_code;
	}

	set base_currency_code(value: string){
		this._base_currency_code = value;
	}

	get store_currency_code(): string{
		return this._store_currency_code;
	}

	set store_currency_code(value: string){
		this._store_currency_code = value;
	}

	get quote_currency_code(): string{
		return this._quote_currency_code;
	}

	set quote_currency_code(value: string){
		this._quote_currency_code = value;
	}

	get store_to_base_rate(): number{
		return this._store_to_base_rate;
	}

	set store_to_base_rate(value: number){
		this._store_to_base_rate = value;
	}

	get store_to_quote_rate(): number{
		return this._store_to_quote_rate;
	}

	set store_to_quote_rate(value: number){
		this._store_to_quote_rate = value;
	}

	get base_to_global_rate(): number{
		return this._base_to_global_rate;
	}

	set base_to_global_rate(value: number){
		this._base_to_global_rate = value;
	}

	get base_to_quote_rate(): number{
		return this._base_to_quote_rate;
	}

	set base_to_quote_rate(value: number){
		this._base_to_quote_rate = value;
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
		this.global_currency_code = data.global_currency_code;
		this.base_currency_code = data.base_currency_code;
		this.store_currency_code = data.store_currency_code;
		this.quote_currency_code = data.quote_currency_code;
		this.store_to_base_rate = data.store_to_base_rate;
		this.store_to_quote_rate = data.store_to_quote_rate;
		this.base_to_global_rate = data.base_to_global_rate;
		this.base_to_quote_rate = data.base_to_quote_rate;

		return this;
	}
}

export class CartExtensionModel{
	private _shipping_assignments: Array<ShippingAssignmentModel> = [];
	//private negotiable_quote;

	get shipping_assignments(): Array<ShippingAssignmentModel>{
		return this._shipping_assignments;
	}

	get_shipping_assignment(key: number): ShippingAssignmentModel{
		return this.shipping_assignments[key];
	}

	set shipping_assignments(value: Array<ShippingAssignmentModel>){
		this._shipping_assignments = value;
	}

	set_shipping_assignment(value: ShippingAssignmentModel): void{
		this.shipping_assignments.push(value);
	}

	//just a simple get and set for negotiable quote

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		if(data.shipping_assignments){
			for(let assignment of data.shipping_assignments){
				let model: ShippingAssignmentModel = new ShippingAssignmentModel();
				this.set_shipping_assignment( model.fromJson(assignment) );
			}
		}

		return this;
	}
}

export class ShippingAssignmentModel{
	private _shipping: ShippingAssignmentShippingModel;
	private _items: Array<CartItemModel> = [];

	get shipping(): ShippingAssignmentShippingModel{
		return this._shipping;
	}

	set shipping(value: ShippingAssignmentShippingModel){
		this._shipping = value;
	}

	get items(): Array<CartItemModel>{
		return this._items;
	}

	get_item(key: number): CartItemModel{
		return this.items[key];
	}

	set items(value: Array<CartItemModel>){
		this.items = value;
	}

	set_item(value: CartItemModel): void{
		this.items.push(value);
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
		let shippingModel: ShippingAssignmentShippingModel = new ShippingAssignmentShippingModel();
		this.shipping = shippingModel.fromJson(data.shipping);

		if(data.items){
			for(let item of data.items){
				let model: CartItemModel = new CartItemModel();
				this.set_item( model.fromJson(item) );
			}
		}

		return this;
	}
}

export class ShippingAssignmentShippingModel{
	private _address: CartAddressModel;
	private _method: string;
	//private extension_attributes;

	get address(): CartAddressModel{
		return this._address;
	}

	set address(value: CartAddressModel){
		this._address = value;
	}

	get method(): string{
		return this._method;
	}

	set method(value: string){
		this._method = value;
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
		let addressModel: CartAddressModel = new CartAddressModel();
		this.address = addressModel.fromJson(data.address);
		this.method = data.method;

		return this;
	}
}

import { StockModel } from '../catalog/product';

export class DetailItemModel{
	private _sku: string;
	private _product_item: ProductModel;
	private _cart_item: CartItemModel;
	private _stock_item: StockModel
	private _taxable: string;

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get product_item(): ProductModel{
		return this._product_item;
	}

	set product_item(value: ProductModel){
		this._product_item = value;
	}

	get cart_item(): CartItemModel{
		return this._cart_item;
	}

	set cart_item(value: CartItemModel){
		this._cart_item = value;
	}

	get stock_item(): StockModel{
		return this._stock_item;
	}

	set stock_item(value: StockModel){
		this._stock_item = value;
	}

	get taxable(): string{
		return this._taxable;
	}

	set taxable(value: string){
		this._taxable = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.3
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.sku = data.sku;

		let productModel: ProductModel = new ProductModel();
		this.product_item = productModel.fromJson(data.product_item);

		let cartModel: CartItemModel = new CartItemModel();
		this.cart_item = cartModel.fromJson(data.cart_item);

		let stockModel: StockModel = new StockModel();
		this.stock_item = stockModel.fromJson(data.stock_item);

		this.taxable = data.taxable;

		return this;
	}
}