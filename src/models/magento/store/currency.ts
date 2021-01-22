export class CurrencyModel{
	private _base_currency_code: string;
	private _base_currency_symbol: string;
	private _default_display_currency_code: string;
	private _default_display_currency_symbol: string;
	private _available_currency_codes: Array<string> = [];
	private _exchange_rates: Array<CurrencyExchangeRateModel> = [];
	//extension attributes

	get base_currency_code(): string{
		return this._base_currency_code;
	}

	set base_currency_code(value: string){
		this._base_currency_code = value;
	}

	get base_currency_symbol(): string{
		return this._base_currency_symbol;
	}

	set base_currency_symbol(value: string){
		this._base_currency_symbol = value;
	}

	get default_display_currency_code(): string{
		return this._default_display_currency_code;
	}

	set default_display_currency_code(value: string){
		this._default_display_currency_code = value;
	}

	get default_display_currency_symbol(): string{
		return this._default_display_currency_symbol;
	}

	set default_display_currency_symbol(value: string){
		this._default_display_currency_symbol = value;
	}

	get available_currency_codes(): Array<string>{
		return this._available_currency_codes;
	}

	getAvailableCurrencyCode(key: number): string{
		return this.available_currency_codes[key];
	}

	set available_currency_codes(value: Array<string>){
		this._available_currency_codes = value;
	}

	setAvailableCurrencyCode(value: string): void{
		this.available_currency_codes.push(value);
	}

	get exchange_rates(): Array<CurrencyExchangeRateModel>{
		return this._exchange_rates;
	}

	get_exchange_rate(key: number): CurrencyExchangeRateModel{
		return this.exchange_rates[key];
	}

	set exchange_rates(value: Array<CurrencyExchangeRateModel>){
		this._exchange_rates = value;
	}

	set_exchange_rate(value: CurrencyExchangeRateModel): void{
		this.exchange_rates.push(value);
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
		this.base_currency_code = data.base_currency_code;
		this.base_currency_symbol = data.base_currency_symbol;
		this.default_display_currency_code = data.default_display_currency_code;
		this.default_display_currency_symbol = data.default_display_currency_symbol;
		this.available_currency_codes = data.available_currency_codes ;

		if(data.exchange_rates){
			for(let rate of data.exchange_rates){
				let model: CurrencyExchangeRateModel = new CurrencyExchangeRateModel();
				this.set_exchange_rate( model.fromJson(rate) );
			}
		}

		return this;
	}
}

export class CurrencyExchangeRateModel{
	private _currency_to: string;
	private _rate: number;
	//extension_attributes

	get currency_to(): string{
		return this._currency_to;
	}

	set currency_to(value: string){
		this._currency_to = value;
	}

	get rate(): number{
		return this._rate;
	}

	set rate(value: number){
		this._rate = value;
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
		this.currency_to = data.currency_to;
		this.rate = data.rate;

		return this;
	}
}