export class CompanyModel{
	private _id: number;
	private _status: number;
	private _company_name: string;
	private _legal_name: string;
	private _company_email: string;
	private _vat_tax_id: string;
	private _reseller_id: string;
	private _comment: string;
	private _street: Array<string>;
	private _city: string;
	private _country_id: string;
	private _region: string;
	private _region_id: string;
	private _postcode: string;
	private _telephone: string;
	private _customer_group_id: number;
	private _sales_representative_id: number;
	private _reject_reason: string;
	private _rejected_at: string;
	private _super_user_id: number;
	private _extension_attributes: CompanyExtensionAttributeModel;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get status(): number{
		return this._status;
	}

	set status(value: number){
		this._status = value;
	}

	get company_name(): string{
		return this._company_name;
	}

	set company_name(value: string){
		this._company_name = value;
	}

	get legal_name(): string{
		return this._legal_name;
	}

	set legal_name(value: string){
		this._legal_name = value;
	}

	get company_email(): string{
		return this._company_email;
	}

	set company_email(value: string){
		this._company_email = value;
	}

	get vat_tax_id(): string{
		return this._vat_tax_id;
	}

	set vat_tax_id(value: string){
		this._vat_tax_id = value;
	}

	get reseller_id(): string{
		return this._reseller_id;
	}

	set reseller_id(value: string){
		this._reseller_id = value;
	}

	get comment(): string{
		return this._comment;
	}

	set comment(value: string){
		this._comment = value;
	}

	get street(): Array<string>{
		return this._street;
	}

	get_street(key: number): string{
		return this.street[key];
	}

	set street(value: Array<string>){
		this._street = value;
	}

	set_street(value: string): void{
		this.street.push(value);
	}

	get city(): string{
		return this._city;
	}

	set city(value: string){
		this._city = value;
	}

	get country_id(): string{
		return this._country_id;
	}

	set country_id(value: string){
		this._country_id = value;
	}

	get region(): string{
		return this._region;
	}

	set region(value: string){
		this._region = value;
	}

	get region_id(): string{
		return this._region_id;
	}

	set region_id(value: string){
		this._region_id = value;
	}

	get postcode(): string{
		return this._postcode;
	}

	set postcode(value: string){
		this._postcode = value;
	}

	get telephone(): string{
		return this._telephone;
	}

	set telephone(value: string){
		this._telephone = value;
	}

	get customer_group_id(): number{
		return this._customer_group_id;
	}

	set customer_group_id(value: number){
		this._customer_group_id = value;
	}

	get sales_representative_id(): number{
		return this._sales_representative_id;
	}

	set sales_representative_id(value: number){
		this._sales_representative_id = value;
	}

	get reject_reason(): string{
		return this._reject_reason;
	}

	set reject_reason(value: string){
		this._reject_reason = value;
	}

	get rejected_at(): string{
		return this._rejected_at;
	}

	set rejected_at(value: string){
		this._rejected_at = value;
	}

	get super_user_id(): number{
		return this._super_user_id;
	}

	set super_user_id(value: number){
		this._super_user_id = value;
	}

	get extension_attributes(): CompanyExtensionAttributeModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: CompanyExtensionAttributeModel){
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
		this.status = data.status;
		this.company_name = data.company_name;
		this.legal_name = data.legal_name;
		this.company_email = data.company_email;
		this.vat_tax_id = data.vat_tax_id;
		this.reseller_id = data.reseller_id;
		this.comment = data.comment;
		this.street = data.street;
		this.city = data.city;
		this.country_id = data.country_id;
		this.region = data.region;
		this.region_id = data.region_id;
		this.postcode = data.postcode;
		this.telephone = data.telephone;
		this.customer_group_id = data.customer_group_id;
		this.sales_representative_id = data.sales_representative_id;
		this.reject_reason = data.reject_reason;
		this.rejected_at = data.rejected_at;
		this.super_user_id = data.super_user_id;

		let extensionModel: CompanyExtensionAttributeModel = new CompanyExtensionAttributeModel();
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		return this;
	}

	/**
	 * Return the full street of the address
	 * Street address w/ Suite
	 * @return string
	 */
	fullStreetAddress(): string{
		if(this.get_street(1)){
			return this.get_street(0) + ' ' + this.get_street(1);
		} else {
			return this.get_street(0);
		}
	}

	/**
	 * Return the full metro location of the address
	 * City, State and Postcode
	 * @return string
	 */
	fullMetroAddress(): string{
		return this.city + ', ' + this.region + ' ' + this.postcode;
	}
}

export class CompanyExtensionAttributeModel{
	private _applicable_payment_method: number;
    private _available_payment_methods: string;
    private _use_config_settings: number;
    private _quote_config: CompanyExtensionAttributeQuoteConfigModel;

    get applicable_payment_method(): number{
		return this._applicable_payment_method;
    }

	set applicable_payment_method(value: number){
		this._applicable_payment_method = value;
	}

    get available_payment_methods(): string{
		return this._available_payment_methods;
    }

	set available_payment_methods(value: string){
		this._available_payment_methods = value;
	}

    get use_config_settings(): number{
		return this._use_config_settings;
    }

	set use_config_settings(value: number){
		this._use_config_settings = value;
	}

	get quote_config(): CompanyExtensionAttributeQuoteConfigModel{
		return this._quote_config;
	}

	set quote_config(value: CompanyExtensionAttributeQuoteConfigModel){
		this._quote_config = value;
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
		this.applicable_payment_method = data.applicable_payment_method;
    	this.available_payment_methods = data.available_payment_methods;
    	this.use_config_settings = data.use_config_settings;

    	let configModel: CompanyExtensionAttributeQuoteConfigModel = new CompanyExtensionAttributeQuoteConfigModel();
    	this.quote_config = configModel.fromJson(data.quote_config);

		return this;
	}
}

export class CompanyExtensionAttributeQuoteConfigModel{
	private _company_id: string;
	private _is_quote_enabled: boolean;
	//private extension_attributes;

	get company_id(): string{
		return this._company_id;
	}

	set company_id(value: string){
		this._company_id = value;
	}

	get is_quote_enabled(): boolean{
		return this._is_quote_enabled;
	}

	set is_quote_enabled(value: boolean){
		this._is_quote_enabled = value;
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
		this.company_id = data.company_id;
		this.is_quote_enabled = data.is_quote_enabled;
		
		return this;
	}
}