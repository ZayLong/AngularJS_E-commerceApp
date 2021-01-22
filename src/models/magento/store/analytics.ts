export class AnalyticsModel{
	private _url: string;
	private _initalization_vector: string;

	get url(): string{
		return this._url;
	}

	set url(value: string){
		this._url = value;
	}

	get initalization_vector(): string{
		return this._initalization_vector;
	}

	set initalization_vector(value: string){
		this._initalization_vector = value;
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
		this.url = data.url;
		this.initalization_vector = data.initalization_vector;

		return this;
	}
}