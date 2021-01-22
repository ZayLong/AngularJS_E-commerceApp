export abstract class AddressModel{
	private _customer_id: number;
	private _firstname: string;
	private _lastname: string;
	private _middlename: string;
	private _prefix: string;
	private _suffix: string;
	private _street: Array<string> = [];
	private _city: string;
	private _region_id: number;
	private _country_id: string;
	private _postcode: string;
	private _company: string;
	private _telephone: string;
	private _fax: string;
	private _vat_id: string;

	get customer_id(): number{
		return  this._customer_id;
	}

	set customer_id(value: number){
		this._customer_id = value;
	}

	get firstname(): string{
		return  this._firstname;
	}

	set firstname(value: string){
		this._firstname = value;
	}

	get lastname(): string{
		return  this._lastname;
	}

	set lastname(value: string){
		this._lastname = value;
	}

	get middlename(): string{
		return  this._middlename;
	}

	set middlename(value: string){
		this._middlename = value;
	}

	get prefix(): string{
		return  this._prefix;
	}

	set prefix(value: string){
		this._prefix = value;
	}

	get suffix(): string{
		return  this._suffix;
	}

	set suffix(value: string){
		this._suffix = value;
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

	set_street(value: string){
		this.street.push(value);
	}

	get city(): string{
		return  this._city;
	}

	set city(value: string){
		this._city = value;
	}

	get region_id(): number{
		return  this._region_id;
	}

	set region_id(value: number){
		this._region_id = value;
	}

	get country_id(): string{
		return  this._country_id;
	}

	set country_id(value: string){
		this._country_id = value;
	}

	get postcode(): string{
		return  this._postcode;
	}

	set postcode(value: string){
		this._postcode = value;
	}

	get company(): string{
		return  this._company;
	}

	set company(value: string){
		this._company = value;
	}

	get telephone(): string{
		return  this._telephone;
	}

	set telephone(value: string){
		this._telephone = value;
	}

	get fax(): string{
		return  this._fax;
	}

	set fax(value: string){
		this._fax = value;
	}

	get vat_id(): string{
		return  this._vat_id;
	}

	set vat_id(value: string){
		this._vat_id = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data to JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Should this be an abstract method?
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
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

		return this;
	}

	/**
	 * @public
	 * @method fullName
	 * @description Return the full name of the customer
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Add prefix and suffix (only when needed)
	 * @return string
	 */
	fullName(): string{
		if(this.middlename){
			return this.firstname + ' ' + this.middlename + ' ' + this.lastname;
		} else {
			return this.firstname + ' ' + this.lastname;
		}
	}

	/**
	 * @public
	 * @method fullStreetAddress
	 * @description Return the full street of the address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
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
	 * @public
	 * @abstract
	 * @method fullMetroAddress
	 * @description Return the full metro location of the address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return string
	 */
	abstract fullMetroAddress(): string;
}