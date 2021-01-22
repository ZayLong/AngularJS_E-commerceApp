import { CustomAttributeModel } from '../general/custom-attribute';

export class CategoryModel{
	private _id: number;
	private _parent_id: number;
	private _name: string;
	private _is_active: boolean;
	private _position: number;
	private _level: number;
	private _product_count: number;
	private _children_data: Array<CategoryModel> = [];

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get parent_id(): number{
		return this._parent_id;
	}

	set parent_id(value: number){
		this._parent_id = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get is_active(): boolean{
		return this._is_active;
	}

	set is_active(value: boolean){
		this._is_active = value;
	}

	get position(): number{
		return this._position;
	}

	set position(value: number){
		this._position = value;
	}

	get level(): number{
		return this._level;
	}

	set level(value: number){
		this._level = value;
	}

	get product_count(): number{
		return this._product_count;
	}

	set product_count(value: number){
		this._product_count = value;
	}

	get children_data(): Array<CategoryModel>{
		return this._children_data;
	}

	get_children_data(key: number): CategoryModel{
		return this.children_data[key];
	}

	set children_data(value: Array<CategoryModel>){
		this._children_data = value;
	}

	set_children_data(value: CategoryModel): void{
		this.children_data.push(value);
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
		this.id = data.id;
		this.parent_id = data.parent_id;
		this.name = data.name;
		this.is_active = data.is_active;
		this.position = data.position;
		this.level = data.level;
		this.product_count = data.product_count;

		if(data.children_data){
			for(let child of data.children_data){
				let model: CategoryModel = new CategoryModel();
				this.set_children_data( model.fromJson(child) );
			}
		}

		return this;
	}
}

export class CategoryItemModel{
	private _id: number;
	private _parent_id: number;
	private _name: string;
	private _is_active: boolean;
	private _position: number;
	private _level: number;
	private _children: string;
	private _created_at: string;
	private _updated_at: string;
	private _path: string;
	private _available_sort_by: Array<string> = [];
	private _include_in_menu: boolean;
	//private extension_attributes;
	private _custom_attributes: Array<CustomAttributeModel> = [];

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get parent_id(): number{
		return this._parent_id;
	}

	set parent_id(value: number){
		this._parent_id = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get is_active(): boolean{
		return this._is_active;
	}

	set is_active(value: boolean){
		this._is_active = value;
	}

	get position(): number{
		return this._position;
	}

	set position(value: number){
		this._position = value;
	}

	get level(): number{
		return this._level;
	}

	set level(value: number){
		this._level = value;
	}

	get children(): string{
		return this._children;
	}

	set children(value: string){
		this._children = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get updated_at(): string{
		return this._updated_at;
	}

	set updated_at(value: string){
		this._updated_at = value;
	}

	get path(): string{
		return this._path;
	}

	set path(value: string){
		this._path = value;
	}

	get available_sort_by(): Array<string>{
		return this._available_sort_by;
	}

	set available_sort_by(value: Array<string>){
		this._available_sort_by = value;
	}

	get include_in_menu(): boolean{
		return this._include_in_menu;
	}

	set include_in_menu(value: boolean){
		this._include_in_menu = value;
	}

	//extension attributes

	get custom_attributes(): Array<CustomAttributeModel>{
		return this._custom_attributes;
	}

	get_custom_attribute(key: string): CustomAttributeModel{
		for(let attribute of this.custom_attributes){
			if(attribute.attribute_code === key) return attribute;
		}
	}

	set custom_attributes(value: Array<CustomAttributeModel>){
		this._custom_attributes = value;
	}

	set_custom_attribute(value: CustomAttributeModel): void{
		this.custom_attributes.push(value);
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
		this.id = data.id;
		this.parent_id = data.parent_id;
		this.name = data.name;
		this.is_active = data.is_active;
		this.position = data.position;
		this.level = data.level;
		this.children = data.children;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.path = data.path;
		this.available_sort_by = data.available_sort_by;
		this.include_in_menu = data.include_in_menu;
	
		//private extension_attributes;
	
		if(data.custom_attributes){
			for(let attribute of data.custom_attributes){
				let model: CustomAttributeModel = new CustomAttributeModel();
				this.set_custom_attribute( model.fromJson(attribute) );
			}
		}

		return this;
	}

	/**
	 * @public
	 * @method children_arrays
	 * @description Get an array of children category ids
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return Array<string>
	 */
	children_arrays(): Array<string>{
		return this.children.split(',');
	}

	/**
	 * @public
	 * @method children_arrays
	 * @description Get an array of path category ids
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return Array<string>
	 */
	path_arrays(): Array<string>{
		return this.path.split('/')
	}	
}

export class CategoryProductLinkModel{
	private _sku: string;
	private _position: number;
	private _category_id: string;
	// private extension_attributes;

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get position(): number{
		return this._position;
	}

	set position(value: number){
		this._position = value;
	}

	get category_id(): string{
		return this._category_id;
	}

	set category_id(value: string){
		this._category_id = value;
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
		this.sku = data.sku;
		this.position = data.position;
		this.category_id = data.category_id;

		return this;
	}
}