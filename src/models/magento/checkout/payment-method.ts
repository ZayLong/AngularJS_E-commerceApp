export class PaymentMethodModel{
	private _code: string;
	private _title: string;

	get code(): string{
		return this._code;
	}

	set code(value: string){
		this._code = value;
	}

	get title(): string{
		return this._title;
	}

	set title(value: string){
		this._title = value;
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
		this.code = data.code;
		this.title = data.title;

		return this;
	}
}