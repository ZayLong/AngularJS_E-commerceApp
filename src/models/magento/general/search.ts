export enum Condition{
	Equal = 'eq',
	FinSet = 'finset', 
	From = 'from',
	GreaterThan = 'gt',
	GreaterThanEqual = 'gteq',
	In = 'in',
	Like = 'like',
	LessThan = 'lt',
	LessThanEqual = 'lteq',
	MoreEqual = 'moreq',
	NotEqual = 'neq',
	NotIn = 'nin',
	NotNull = 'notnull',
	Null = 'null',
	To = 'to'
}

export enum Direction{
	Ascending = 'ASC',
	Descending = 'DESC'
}

export class SearchCriteriaModel{
	private _filterGroup: FilterGroupModel;
	private _sortOrderGroup: SortOrderGroupModel;
	private _paging: PagingModel;

	get filterGroup(): FilterGroupModel{
		return this._filterGroup;
	}

	set filterGroup(value: FilterGroupModel){
		this._filterGroup = value;
	}

	get sortOrderGroup(): SortOrderGroupModel{
		return this._sortOrderGroup;
	}

	set sortOrderGroup(value: SortOrderGroupModel){
		this._sortOrderGroup = value;
	}

	get paging(): PagingModel{
		return this._paging;
	}

	set paging(value: PagingModel){
		this._paging = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { FilterGroupModel } filter (optional)
	 * @param { SortOrderGroupModel } sortOrder (optional)
	 * @param { PagingModel } paging (optional)
	 */
	public constructor(filter?: FilterGroupModel, sortOrder?: SortOrderGroupModel, paging?: PagingModel){
		if(filter){
			this.filterGroup = filter;
		}

		if(sortOrder){
			this.sortOrderGroup = sortOrder;
		}

		if(paging){
			this.paging = paging;
		}
	}

	/**
	 * @public
	 * @method toString
	 * @description Take all of the search criteria models and combine them
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { string }
	 */
	public toString(): string{
		// Start with the beginning query character
		let returnString: string = '?';
		
		if(this.filterGroup != undefined && this.filterGroup.filter.length > 0){
			if(returnString){
				returnString = returnString + '&' + this.filterGroup.toString();
			} else {
				returnString = returnString + this.filterGroup.toString();
			}
		}

		if(this.sortOrderGroup != undefined && this.sortOrderGroup.sort_order.length > 0){
			if(returnString){
				returnString = returnString + '&' + this.sortOrderGroup.toString();
			} else {
				returnString = returnString + this.sortOrderGroup.toString();
			}
		}

		if(this.paging != undefined && this.paging){
			if(returnString){
				returnString = returnString + '&' + this.paging.toString();
			} else {
				returnString = returnString + this.paging.toString();
			}
		}		

		return returnString;
	}
}

export class FilterGroupModel{
	private _filter: Array<FilterModel> = [];

	get filter(): Array<FilterModel>{
		return this._filter;
	}

	get_filter(key: number): FilterModel{
		return this.filter[key];
	}

	set filter(value: Array<FilterModel>){
		this._filter = value;
	}

	set_filter(value: FilterModel): void{
		this._filter.push(value);
	}

	/**
	 * @public
	 * @method toString
	 * @description Take the array of FilterModels and convert it to a url string
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo May have to rework how the indexing work
	 * @return { string }
	 */
	public toString(): string{
		let returnString: string = '';
		let i: number = 0;

		for(let filter of this.filter){
			let query = '';

			if(returnString !== ''){
				// Continue the query
				query = query + '&';
			} else {
				// Start the query
				query = '';
			}

			// Set the field name
			query = query + 'searchCriteria[filter_groups][' + i + '][filters][' + i + '][field]=' + filter.field;
			// Set the value
			query = query + '&searchCriteria[filter_groups][' + i + '][filters][' + i + '][value]=' + filter.value;
			// Set the conditioning
			query = query + '&searchCriteria[filter_groups][' + i + '][filters][' + i + '][conditionType]=' + filter.condition_type;

			i++;

			returnString = returnString + query;
		}

		return returnString;
	}
}

export class FilterModel{
	private _field: string;
	private _value: string;
	private _condition_type: string;

	get field(): string{
		return this._field;
	}

	set field(value: string){
		this._field = value;
	}

	get value(): string{
		return this._value;
	}

	set value(value: string){
		this._value = value;
	}

	get condition_type(): string{
		return this._condition_type;
	}

	set condition_type(value: string){
		//Acceptable values
		//eq, finset, from, gt, gteq, in, like, lt, lteq, moreq, neq, nin, notnull, null, to
		this._condition_type = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } field (optional)
	 * @param { string } value (optional)
	 * @param { string } condition (default to Equal)
	 */
	public constructor(field?: string, value?: string, condition: string = Condition.Equal){
		if(field){
			this.field = field;
		}

		if(value){
			this.value = value;
		}

		this.condition_type = condition;
	}
}

export class SortOrderGroupModel{
	private _sort_order: Array<SortOrderModel> = [];

	get sort_order(): Array<SortOrderModel>{
		return this._sort_order;
	}

	get_sort_order(key: number): SortOrderModel{
		return this.sort_order[key];
	}

	set sort_order(value: Array<SortOrderModel>){
		this._sort_order = value;
	}

	set_sort_order(value: SortOrderModel){
		this.sort_order.push(value);
	}

	/**
	 * @public
	 * @method toString
	 * @description Take the array of SortOrders and convert it to a url string
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { string }
	 */
	public toString(): string{
		let returnString: string = '';
		let i: number = 0;

		for(let sort of this.sort_order){
			let query = '';

			if(returnString !== ''){
				// Continue the query
				query = query + '&';
			} else {
				// Start the query
				query = '';
			}

			// Set the field name
			query = query + 'searchCriteria[sortOrders][' + i + '][field]=' + sort.field;
			// Set the value
			query = query + '&searchCriteria[sortOrders][' + i + '][direction]=' + sort.direction;

			i++;

			returnString = returnString + query;
		}

		return returnString;
	}
}

export class SortOrderModel{
	private _field: string;
	private _direction: string;

	get field(): string{
		return this._field;
	}

	set field(value: string){
		this._field = value;
	}

	get direction(): string{
		return this._direction;
	}

	set direction(value: string){
		this._direction = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } field (optional)
	 * @param { string } direction (default to Descending)
	 */
	public constructor(field?: string, direction: string = Direction.Descending){
		if(field){
			this.field = field;
		}

		this.direction = direction;
	}
}

export class PagingModel{
	private _page_size: number;
	private _current_page: number;

	get page_size(): number{
		return this._page_size;
	}

	set page_size(value: number){
		this._page_size = value;
	}

	get current_page(): number{
		return this._current_page;
	}

	set current_page(value: number){
		this._current_page = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } pageSize (optional)
	 * @param { number } currentPage (default at 0)
	 */
	public constructor(pageSize?: number, currentPage: number = 0){

		if(pageSize){
			this.page_size = pageSize;
		} else {
			this.page_size = 0;
		}

		this.current_page = currentPage;
	}

	/**
	 * @public
	 * @method toString
	 * @description Take the PagingModel and convert it to a url string
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { string }
	 */
	public toString(): string{
		return 'searchCriteria[pageSize]=' + this.page_size + '&searchCriteria[currentPage]=' + this.current_page;
	}
}