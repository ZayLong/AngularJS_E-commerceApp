export class TaggingProductQueueModel{
	private _items: any;
	private _total_count: number;

	get items(): any{
		return this._items;
	}

	set items(value: any){
		this._items = value;
	}

	get total_count(): number{
		return this._total_count;
	}

	set total_count(value: number){
		this._total_count = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	fromJson(data: any): this{
		this.items = data.items;
		this.total_count = data.total_count;

		return this;
	}
}