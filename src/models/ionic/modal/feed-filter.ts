export class FilterModel{
	private _value: any;
	private _data: any;
	private _options: any;

	get value(): any{
		return this._value;
	}

	set value(value: any){
		this._value = value;
	}

	get data(): any{
		return this._data;
	}

	set data(value: any){
		this._data = value;
	}

	get options(): any{
		return this._options;
	}

	set options(value: any){
		this._options = value;
	}
}