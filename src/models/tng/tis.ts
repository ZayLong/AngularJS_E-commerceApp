export class TisSlideModel{
	private __id: string;
	private _token: string;
	private _image: string;
	private _link_type: string;
	private _filter_params: Array<TisParamModel> = [];
	private _browser_url: string;
	private _user: string;
	private _created: string;
	private _updated: string;

	get _id(): string{
		return this.__id;
	}

	set _id(value: string){
		this.__id = value;
	}

	get token(): string{
		return this._token;
	}

	set token(value: string){
		this._token = value;
	}

	get image(): string{
		return this._image;
	}

	set image(value: string){
		this._image = value;
	}

	get link_type(): string{
		return this._link_type;
	}

	set link_type(value: string){
		this._link_type = value;
	}

	get filter_params(): Array<TisParamModel>{
		return this._filter_params;
	}

	get_filter_params(key: number): TisParamModel{
		return this.filter_params[key];
	}

	set filter_params(value: Array<TisParamModel>){
		this._filter_params = value;
	}

	set_filter_params(value: TisParamModel): void{
		this.filter_params.push(value);
	}

	get browser_url(): string{
		return this._browser_url;
	}

	set browser_url(value: string){
		this._browser_url = value;
	}

	get user(): string{
		return this._user;
	}

	set user(value: string){
		this._user = value;
	}

	get created(): string{
		return this._created;
	}

	set created(value: string){
		this._created = value;
	}

	get updated(): string{
		return this._updated;
	}

	set updated(value: string){
		this._updated = value;
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
		this._id = data._id;
		this.token = data.token;
		this.image = data.image;
		this.link_type = data.link_type;

		//private _filter_params: Array<TisParamModel>;
		if(data.filter_params){
			for(let param of data.filter_params){
				let model: TisParamModel = new TisParamModel();
				this.set_filter_params( model.fromJson(param) );
			}
		}

		this.browser_url = data.browser_url;
		this.user = data.user;
		this.created = data.created;
		this.updated = data.updated;

		return this;
	}
}

export class TisDealModel{
	private _id: number;
	private _token: string;
	private _user: string;
	private _image: string;
	private _browser_url: string;
	private _type: string;
	private _filter_params: Array<TisParamModel> = [];
	private _created: string;
	private _updated: string;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get token(): string{
		return this._token;
	}

	set token(value: string){
		this._token = value;
	}

	get user(): string{
		return this._user;
	}

	set user(value: string){
		this._user = value;
	}

	get image(): string{
		return this._image;
	}

	set image(value: string){
		this._image = value;
	}

	get browser_url(): string{
		return this._browser_url;
	}

	set browser_url(value: string){
		this._browser_url = value;
	}

	get type(): string{
		return this._type;
	}

	set type(value: string){
		this._type = value;
	}

	get filter_params(): Array<TisParamModel>{
		return this._filter_params;
	}

	get_filter_params(key: number): TisParamModel{
		return this.filter_params[key];
	}

	set filter_params(value: Array<TisParamModel>){
		this._filter_params = value;
	}

	set_filter_params(value: TisParamModel): void{
		this.filter_params.push(value);
	}

	get created(): string{
		return this._created;
	}

	set created(value: string){
		this._created = value;
	}

	get updated(): string{
		return this._updated;
	}

	set updated(value: string){
		this._updated = value;
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
		this.id = data.id;
		this.token = data.token;
		this.user = data.user;
		this.image = data.image;
		this.browser_url = data.browser_url;
		this.type = data.type;

		if(data.filter_params){
			for(let param of data.filter_params){
				let model: TisParamModel = new TisParamModel();
				this.set_filter_params( model.fromJson(param) );
			}
		}
		
		this.created = data.created;
		this.updated = data.updated;

		return this;
	}
}

export class TisLocationModel{
	private _id: string;
	private _name: string;
	private _lat: string;
	private _lng: string;
	private _address: string;
	private _phone: string;
	private _fax: string;
	private _type: string;
	private _hours: Array<TisHoursLocationModel> = [];
	private _features: Array<string> = [];

	get id(): string{
		return this._id;
	}

	set id(value: string){
		this._id = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get lat(): string{
		return this._lat;
	}

	set lat(value: string){
		this._lat = value;
	}

	get lng(): string{
		return this._lng;
	}

	set lng(value: string){
		this._lng = value;
	}

	get address(): string{
		return this._address;
	}

	set address(value: string){
		this._address = value;
	}

	get phone(): string{
		return this._phone;
	}

	set phone(value: string){
		this._phone = value;
	}

	get fax(): string{
		return this._fax;
	}

	set fax(value: string){
		this._fax = value;
	}

	get type(): string{
		return this._type;
	}

	set type(value: string){
		this._type = value;
	}

	get hours(): Array<TisHoursLocationModel>{
		return this._hours;
	}

	get_hours(day: string): TisHoursLocationModel{
		for(let hour of this.hours){
			if(hour.day === day){
				return hour;
			}
		}
	}

	set hours(value: Array<TisHoursLocationModel>){
		this._hours = value;
	}

	set_hours(value: TisHoursLocationModel): void{
		this.hours.push(value);
	}

	get features(): Array<string>{
		return this._features;
	}

	get_features(key: string): string{
		return this.features[key];
	}

	set features(value: Array<string>){
		this._features = value;
	}

	set_features(value: string): void{
		this.features.push(value);
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
		this.id = data.id;
		this.name = data.name;
		this.lat = data.lat;
		this.lng = data.lng;
		this.address = data.address;
		this.phone = data.phone;
		this.fax = data.fax;
		this.type = data.type;

		if(data.hours){
			for(let hour of data.hours){
				let model: TisHoursLocationModel = new TisHoursLocationModel();
				this.set_hours(model.fromJson(hour));
			}	
		}
		
		if(data.features){
			this.features = data.features;	
		}

		return this;
	}
}

export class TisParamModel{
	private _id: string;
	private _attribute: string;
	private _attribute_value: string;

	get id(): string{
		return this._id;
	}

	set id(value: string){
		this._id = value;
	}

	get attribute(): string{
		return this._attribute;
	}

	set attribute(value: string){
		this._attribute = value;
	}

	get attribute_value(): string{
		return this._attribute_value;
	}

	set attribute_value(value: string){
		this._attribute_value = value;
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
		this.id = data.id;
		this.attribute = data.attribute;
		this.attribute_value = data.attribute_value;

		return this;
	}
}

export class TisHoursLocationModel{
	private _day: string;
	private _open: string;
	private _close: string;

	get day(): string{
		return this._day;
	}

	set day(value: string){
		this._day = value;
	}

	get open(): string{
		return this._open;
	}

	set open(value: string){
		this._open = value;
	}

	get close(): string{
		return this._close;
	}

	set close(value: string){
		this._close = value;
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
		this.day = data.day;
		this.open = data.open;
		this.close = data.close;

		return this;
	}

}