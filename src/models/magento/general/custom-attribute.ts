export class CustomAttributeModel{

	private _attribute_code: string;
	private _value: string;

	get attribute_code(): string{
		return this._attribute_code;
	}

	set attribute_code(value: string){
		this._attribute_code = value;
	}

	get value(): string{
		return this._value;
	}

	set value(value: string){
		this._value = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data to JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): CustomAttributeModel{
		this.attribute_code = data.attribute_code;
		this.value = data.value;

		return this;
	}
}

export class CustomAttributeParamModel{
	public attribute_code: string;
	public value: string;

	/**
	 * @public
	 * @method fromJson
	 * @description A temporary solution for sending data to REST API
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param CustomAttributeModel custom
	 * @return CustomAttributeParamModel
	 */
	fromJson(data: any): CustomAttributeParamModel{
		this.attribute_code = data.attribute_code;
		this.value = data.value;

		return this;
	}

	/**
	 * @public
	 * @method fromCustomAttribute
	 * @description A temporary solution for sending data to REST API
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param CustomAttributeModel custom
	 * @return CustomAttributeParamModel
	 */
	fromCustomAttribute(custom: CustomAttributeModel): CustomAttributeParamModel{
		this.attribute_code = custom.attribute_code;
		this.value = custom.value;

		return this;
	}
}