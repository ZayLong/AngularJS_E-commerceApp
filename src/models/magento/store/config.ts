export class ConfigModel{
	private _id: number;
	private _code: string;
	private _website_id: number;
	private _locale: string;
	private _base_currency_code: string;
	private _default_display_currency_code: string;
	private _timezone: string;
	private _weight_unit: string;
	private _base_url: string;
	private _base_link_url: string;
    private _base_static_url: string;
    private _base_media_url: string;
    private _secure_base_url: string;
    private _secure_base_link_url: string;
    private _secure_base_static_url: string;
    private _secure_base_media_url: string;
    // extension attributes

    get id(): number{
		return this._id;
    }

	set id(value: number){
		this._id = value;
	}

	get code(): string{
		return this._code;
	}

	set code(value: string){
		this._code = value;
	}

	get website_id(): number{
		return this._website_id;
	}

	set website_id(value: number){
		this._website_id = value;
	}

	get locale(): string{
		return this._locale;
	}

	set locale(value: string){
		this._locale = value;
	}

	get base_currency_code(): string{
		return this._base_currency_code;
	}

	set base_currency_code(value: string){
		this._base_currency_code = value;
	}

	get default_display_currency_code(): string{
		return this._default_display_currency_code;
	}

	set default_display_currency_code(value: string){
		this._default_display_currency_code = value;
	}

	get timezone(): string{
		return this._timezone;
	}

	set timezone(value: string){
		this._timezone = value;
	}

	get weight_unit(): string{
		return this._weight_unit;
	}

	set weight_unit(value: string){
		this._weight_unit = value;
	}

	get base_url(): string{
		return this._base_url;
	}

	set base_url(value: string){
		this._base_url = value;
	}

	get base_link_url(): string{
		return this._base_link_url;
	}

	set base_link_url(value: string){
		this._base_link_url = value;
	}

    get base_static_url(): string{
		return this._base_static_url;
    }

	set base_static_url(value: string){
		this._base_static_url = value;
	}

    get base_media_url(): string{
		return this._base_media_url;
    }

	set base_media_url(value: string){
		this._base_media_url = value;
	}

    get secure_base_url(): string{
		return this._secure_base_url;
    }

	set secure_base_url(value: string){
		this._secure_base_url = value;
	}

    get secure_base_link_url(): string{
		return this._secure_base_link_url;
    }

	set secure_base_link_url(value: string){
		this._secure_base_link_url = value;
	}

    get secure_base_static_url(): string{
		return this._secure_base_static_url;
    }

	set secure_base_static_url(value: string){
		this._secure_base_static_url = value;
	}

    get secure_base_media_url(): string{
		return this._secure_base_media_url;
    }

	set secure_base_media_url(value: string){
		this._secure_base_media_url = value;
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
		this.website_id = data.website_id;
		this.locale = data.locale;
		this.base_currency_code = data.base_currency_code;
		this.default_display_currency_code = data.default_display_currency_code;
		this.timezone = data.timezone;
		this.weight_unit = data.weight_unit;
		this.base_url = data.base_url;
		this.base_link_url = data.base_link_url;
	    this.base_static_url = data.base_static_url;
	    this.base_media_url = data.base_media_url;
	    this.secure_base_url = data.secure_base_url;
	    this.secure_base_link_url = data.secure_base_link_url;
	    this.secure_base_static_url = data.secure_base_static_url;
	    this.secure_base_media_url = data.secure_base_media_url;

		return this;
	}
}