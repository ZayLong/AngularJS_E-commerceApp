import { CustomerGroupModel } from '../../../magento/customer/customer';
import { SearchCriteriaModel } from '../../../magento/general/search';

export class SearchCustomerGroupResponseModel{
	private _items: Array<CustomerGroupModel> = [];
	private _search_criteria: SearchCriteriaModel;
	private _total_count: number;

	get items(): Array<CustomerGroupModel>{
		return this._items;
	}

	get_item(key: number): CustomerGroupModel{
		return this.items[key];
	}

	set items(value: Array<CustomerGroupModel>){
		this._items = value;
	}

	set_item(value: CustomerGroupModel): void{
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
			let model: CustomerGroupModel = new CustomerGroupModel();
			this.set_item( model.fromJson(item) );
		}

		this.search_criteria = data.search_criteria;
		this.total_count = data.total_count;

		return this;
	}
}