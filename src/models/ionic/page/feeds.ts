import { GroupcatProductActionModel } from '../../magento/amasty/groupcat';

export class ProductItemModel{
	private _product: any;
	private _action: GroupcatProductActionModel;

	get product(): any{
		return this._product;
	}

	set product(value: any){
		this._product = value;
	}

	get action(): GroupcatProductActionModel{
		return this._action;
	}

	set action(value: GroupcatProductActionModel){
		this._action = value;
	}
}

//SEARCH FILTER

export class SearchModel{
	private _query: string;

	private _categories: Array<string> = [];
	private _color: string;
	private _manufacturer: string;
	private _collection: string;
	private _tag: string;
	
	private _prices: SearchPriceModel;
	private _order: SearchOrderModel;
	private _paging: SearchPagingModel;

	get query(): string{
		return this._query;
	}

	set query(value: string){
		this._query = value;
	}

	get categories(): Array<string>{
		return this._categories;
	}

	get_category(level: number): string{
		return this.categories[level];
	}

	set categories(value: Array<string>){
		this._categories = value;
	}

	set_category(value: string, level: number){
		this.categories[level] = value;
	}

	get color(): string{
		return this._color;
	}

	set color(value: string){
		this._color = value;
	}

	get manufacturer(): string{
		return this._manufacturer;
	}

	set manufacturer(value: string){
		this._manufacturer = value;
	}

	get collection(): string{
		return this._collection;
	}

	set collection(value: string){
		this._collection = value;
	}

	get tag(): string{
		return this._tag;
	}

	set tag(value: string){
		this._tag = value;
	}

	get prices(): SearchPriceModel{
		return this._prices;
	}

	set prices(value: SearchPriceModel){
		this._prices = value;
	}

	get order(): SearchOrderModel{
		return this._order;
	}

	set order(value: SearchOrderModel){
		this._order = value;
	}

	get paging(): SearchPagingModel{
		return this._paging;
	}

	set paging(value: SearchPagingModel){
		this._paging = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	constructor(){
		this.prices = new SearchPriceModel();
		this.order = new SearchOrderModel();
		this.paging = new SearchPagingModel();
	}
}

export class SearchPriceModel{
	private _lower: number;
	private _upper: number;

	get lower(): number{
		return this._lower;
	}

	set lower(value: number){
		this._lower = value;
	}

	get upper(): number{
		return this._upper;
	}

	set upper(value: number){
		this._upper = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public constructor(){
		this.lower = 0;
		this.upper = 0;
	}
}

export class SearchOrderModel{
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
	 */
	public constructor(){
		this.field = 'createdAt';
		this.direction = 'ASC';
	}
}

export class SearchPagingModel{
	private _count: number;
	private _current: number;
	private _total: number;

	get count(): number{
		return this._count;
	}

	set count(value: number){
		this._count = value;
	}

	get current(): number{
		return this._current;
	}

	set current(value: number){
		this._current = value;
	}

	get total(): number{
		return this._total;
	}

	set total(value: number){
		this._total = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public constructor(){
		this.count = 32;
		this.current = 1;
		this.total = 0;
	}
}

//FILTER OPTIONS

export class FilterModel{
	private _categories: FilterCategoryModel;
	private _prices: FilterPriceModel;
	private _colors: Array<FilterOptionModel> = [];
	private _manufacturers: Array<FilterOptionModel> = [];
	private _collections: Array<FilterOptionModel> = [];
	private _tags: Array<FilterOptionModel> = [];

	get categories(): FilterCategoryModel{
		return this._categories;
	}

	set categories(value: FilterCategoryModel){
		this._categories = value;
	}

	get prices(): FilterPriceModel{
		return this._prices;
	}

	set prices(value: FilterPriceModel){
		this._prices = value;
	}

	get colors(): Array<FilterOptionModel>{
		return this._colors;
	}

	get_colors(key: number): FilterOptionModel{
		return this.colors[key];
	}

	set colors(value: Array<FilterOptionModel>){
		this._colors = value;
	}

	set_colors(value: FilterOptionModel): void{
		this.colors.push(value);
	}

	get manufacturers(): Array<FilterOptionModel>{
		return this._manufacturers;
	}

	get_manufacturers(key: number): FilterOptionModel{
		return this.manufacturers[key];
	}

	set manufacturers(value: Array<FilterOptionModel>){
		this._manufacturers = value;
	}

	set_manufacturers(value: FilterOptionModel): void{
		this.manufacturers.push(value);
	}

	get collections(): Array<FilterOptionModel>{
		return this._collections;
	}

	get_collections(key: number): FilterOptionModel{
		return this.collections[key];
	}

	set collections(value: Array<FilterOptionModel>){
		this._collections = value;
	}

	set_collections(value: FilterOptionModel): void{
		this.collections.push(value);
	}

	get tags(): Array<FilterOptionModel>{
		return this._tags;
	}

	get_tags(key: number): FilterOptionModel{
		return this.tags[key];
	}

	set tags(value: Array<FilterOptionModel>){
		this._tags = value;
	}

	set_tags(value: FilterOptionModel): void{
		this.tags.push(value);
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	constructor(){
		this.categories = new FilterCategoryModel();
		this.prices = new FilterPriceModel();
	}
}

export class FilterCategoryModel{
	private _level0: Array<FilterCategoryOptionModel>;
	private _level1: Array<FilterCategoryOptionModel>;
	private _level2: Array<FilterCategoryOptionModel>;
	private _level3: Array<FilterCategoryOptionModel>;
	private _active: number;

	get level0(): Array<FilterCategoryOptionModel>{
		return this._level0;
	}

	get_level0(key: number): FilterCategoryOptionModel{
		return this.level0[key];
	}

	set level0(value: Array<FilterCategoryOptionModel>){
		this._level0 = value;
	}

	set_level0(value: FilterCategoryOptionModel){
		this._level0.push(value);
	}

	get level1(): Array<FilterCategoryOptionModel>{
		return this._level1;
	}

	get_level1(key: number): FilterCategoryOptionModel{
		return this.level1[key];
	}

	set level1(value: Array<FilterCategoryOptionModel>){
		this._level1 = value;
	}

	set_level1(value: FilterCategoryOptionModel){
		this._level1.push(value);
	}

	get level2(): Array<FilterCategoryOptionModel>{
		return this._level2;
	}

	get_level2(key: number): FilterCategoryOptionModel{
		return this.level2[key];
	}

	set level2(value: Array<FilterCategoryOptionModel>){
		this._level2 = value;
	}

	set_level2(value: FilterCategoryOptionModel){
		this._level2.push(value);
	}

	get level3(): Array<FilterCategoryOptionModel>{
		return this._level3;
	}

	get_level3(key: number): FilterCategoryOptionModel{
		return this.level3[key];
	}

	set level3(value: Array<FilterCategoryOptionModel>){
		this._level3 = value;
	}

	set_level3(value: FilterCategoryOptionModel){
		this._level3.push(value);
	}

	get active(): number{
		return this._active;
	}

	set active(value: number){
		this._active = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	constructor(){
		this.active = 0;
	}
}

export class FilterOptionModel{
	private _name: string;
	private _value: number;

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get value(): number{
		return this._value;
	}

	set value(value: number){
		this._value = value;
	}
}

export class FilterCategoryOptionModel extends FilterOptionModel{
	private _parent: string;

	get parent(): string{
		return this._parent;
	}

	set parent(value: string){
		this._parent = value;
	}
}

export class FilterPriceModel{
	private _min: number;
	private _max: number;

	get min(): number{
		return this._min;
	}

	set min(value: number){
		this._min = value;
	}

	get max(): number{
		return this._max;
	}

	set max(value: number){
		this._max = value;
	}
}