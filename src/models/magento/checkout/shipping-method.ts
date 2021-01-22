export class ShippingMethodModel{
	private _carrier_code: string;
	private _method_code: string;
	private _carrier_title: string;
	private _method_title: string;
	private _amount: number;
	private _base_amount: number;
	private _available: boolean;
	//extension attributes
	private _error_message: string;
	private _price_excl_tax: number;
	private _price_incl_tax: number;

	get carrier_code(): string{
		return this._carrier_code;
	}

	set carrier_code(value: string){
		this._carrier_code = value;
	}

	get method_code(): string{
		return this._method_code;
	}

	set method_code(value: string){
		this._method_code = value;
	}

	get carrier_title(): string{
		return this._carrier_title;
	}

	set carrier_title(value: string){
		this._carrier_title = value;
	}

	get method_title(): string{
		return this._method_title;
	}

	set method_title(value: string){
		this._method_title = value;
	}

	get amount(): number{
		return this._amount;
	}

	set amount(value: number){
		this._amount = value;
	}

	get base_amount(): number{
		return this._base_amount;
	}

	set base_amount(value: number){
		this._base_amount = value;
	}

	get available(): boolean{
		return this._available;
	}

	set available(value: boolean){
		this._available = value;
	}

	//extension_attributes

	get error_message(): string{
		return this._error_message;
	}

	set error_message(value: string){
		this._error_message = value;
	}

	get price_excl_tax(): number{
		return this._price_excl_tax;
	}

	set price_excl_tax(value: number){
		this._price_excl_tax = value;
	}

	get price_incl_tax(): number{
		return this._price_incl_tax;
	}

	set price_incl_tax(value: number){
		this._price_incl_tax = value;
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
		this.carrier_code = data.carrier_code;
		this.method_code = data.method_code;
		this.carrier_title = data.carrier_title;
		this.method_title = data.method_title;
		this.amount = data.amount;
		this.base_amount = data.base_amount;
		this.available = data.available;
		
		//extension attributes
		
		this.error_message = data.error_message;
		this.price_excl_tax = data.price_excl_tax;
		this.price_incl_tax = data.price_incl_tax;
		
		return this;
	}
}