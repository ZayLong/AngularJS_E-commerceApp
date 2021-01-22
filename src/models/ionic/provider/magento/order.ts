import { OrderModel } from '../../../magento/sales/order';
import { SearchCriteriaModel } from '../../../magento/general/search';

export class SearchOrderResponseModel{
	private _items: Array<OrderModel> = [];
	private _search_criteria: SearchCriteriaModel;
	private _total_count: number;

	get items(): Array<OrderModel>{
		return this._items;
	}

	get_item(key: number): OrderModel{
		return this.items[key];
	}

	set items(value: Array<OrderModel>){
		this._items = value;
	}

	set_item(value: OrderModel): void{
		this.items.push(value);
	}

	get search_criteria(): SearchCriteriaModel{
		return this._search_criteria;
	}

	set search_criteria(value: SearchCriteriaModel){
		this._search_criteria = value;
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
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		for(let item of data.items){
			let model: OrderModel = new OrderModel();
			this.set_item( model.fromJson(item) );
		}

		this.search_criteria = data.search_criteria;
		this.total_count = data.total_count;

		return this;
	}
}