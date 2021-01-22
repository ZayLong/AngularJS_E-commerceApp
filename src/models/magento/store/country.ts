export class CountryModel{
	private _id: string;
	private _two_letter_abbreviation: string;
	private _three_letter_abbreviation: string;
	private _full_name_locale: string;
	private _full_name_english: string;
	private _available_regions: Array<CountryAvailableRegionModel> = [];
	//extension attributes

	get id(): string{
		return this._id;
	}

	set id(value: string){
		this._id = value;
	}

	get two_letter_abbreviation(): string{
		return this._two_letter_abbreviation;
	}

	set two_letter_abbreviation(value: string){
		this._two_letter_abbreviation = value;
	}

	get three_letter_abbreviation(): string{
		return this._three_letter_abbreviation;
	}

	set three_letter_abbreviation(value: string){
		this._three_letter_abbreviation = value;
	}

	get full_name_locale(): string{
		return this._full_name_locale;
	}

	set full_name_locale(value: string){
		this._full_name_locale = value;
	}

	get full_name_english(): string{
		return this._full_name_english;
	}

	set full_name_english(value: string){
		this._full_name_english = value;
	}

	get available_regions(): Array<CountryAvailableRegionModel>{
		return this._available_regions;
	}

	get_available_region(key: number): CountryAvailableRegionModel{
		return this.available_regions[key];
	}

	set available_regions(value: Array<CountryAvailableRegionModel>){
		this._available_regions = value;
	}

	set_available_region(value: CountryAvailableRegionModel){
		return this.available_regions.push(value);
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
		this.two_letter_abbreviation = data.two_letter_abbreviation;
		this.three_letter_abbreviation = data.three_letter_abbreviation;
		this.full_name_locale = data.full_name_locale;
		this.full_name_english = data.full_name_english;

		if(data.available_regions){
			for(let region of data.available_regions){
				let model: CountryAvailableRegionModel = new CountryAvailableRegionModel();
				this.set_available_region( model.fromJson(region) );
			}
		}

		return this;
	}
}

export class CountryAvailableRegionModel{
	private _id: string;
	private _code: string;
	private _name: string;
	//extension code

	get id(): string{
		return this._id;
	}

	set id(value: string){
		this._id = value;
	}

	get code(): string{
		return this._code;
	}

	set code(value: string){
		this._code = value;
	}

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
		this.id = data.id;
		this.code = data.code;
		this.name = data.name;

		return this;
	}
}