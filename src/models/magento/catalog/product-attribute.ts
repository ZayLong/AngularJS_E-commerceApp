import { CustomAttributeModel } from '../general/custom-attribute';

export class ProductAttributeModel{
	private _is_wysiwyg_enabled: boolean;
	private _is_html_allowed_on_front: boolean;
	private _used_for_sort_by: boolean;
	private _is_filterable: boolean;
	private _is_filterable_in_search: boolean;
	private _is_used_in_grid: boolean;
	private _is_visible_in_grid: boolean;
	private _is_filterable_in_grid: boolean;
	private _position: number;
	private _apply_to: Array<string> = [];
	private _is_searchable: string;
	private _is_visible_in_advanced_search: string;
	private _is_comparable: string;
	private _is_used_for_promo_rules: string;
	private _is_visible_on_front: string;
	private _used_in_product_listing: string;
	private _is_visible: boolean;
	private _scope: string;
	//extension_attributes
	private _attribute_id: number;
	private _attribute_code: string;
	private _frontend_input: string;
	private _entity_type_id: string;
	private _is_required: boolean;
	private _options: Array<ProductAttributeOptionModel> = [];
	private _is_user_defined: boolean;
  	private _default_frontend_label: string;
  	private _frontend_labels: Array<ProductAttributeLabelModel> = [];
	private _note: string;
	private _backend_type: string;
	private _backend_model: string;
	private _source_model: string;
	private _default_value: string;
	private _is_unique: string;
	private _frontend_class: string;
	private _validation_rules: Array<ProductAttributeValidationModel> = [];
	private _custom_attributes: Array<CustomAttributeModel> = [];

	get is_wysiwyg_enabled(): boolean{
		return this._is_wysiwyg_enabled;
	}

	set is_wysiwyg_enabled(value: boolean){
		this._is_wysiwyg_enabled = value;
	}

	get is_html_allowed_on_front(): boolean{
		return this._is_html_allowed_on_front;
	}

	set is_html_allowed_on_front(value: boolean){
		this._is_html_allowed_on_front = value;
	}

	get used_for_sort_by(): boolean{
		return this._used_for_sort_by;
	}

	set used_for_sort_by(value: boolean){
		this._used_for_sort_by = value;
	}

	get is_filterable(): boolean{
		return this._is_filterable;
	}

	set is_filterable(value: boolean){
		this._is_filterable = value;
	}

	get is_filterable_in_search(): boolean{
		return this._is_filterable_in_search;
	}

	set is_filterable_in_search(value: boolean){
		this._is_filterable_in_search = value;
	}

	get is_used_in_grid(): boolean{
		return this._is_used_in_grid;
	}

	set is_used_in_grid(value: boolean){
		this._is_used_in_grid = value;
	}

	get is_visible_in_grid(): boolean{
		return this._is_visible_in_grid;
	}

	set is_visible_in_grid(value: boolean){
		this._is_visible_in_grid = value;
	}

	get is_filterable_in_grid(): boolean{
		return this._is_filterable_in_grid;
	}

	set is_filterable_in_grid(value: boolean){
		this._is_filterable_in_grid = value;
	}

	get position(): number{
		return this._position;
	}

	set position(value: number){
		this._position = value;
	}

	get apply_to(): Array<string>{
		return this._apply_to;
	}

	get_apply_to(key: number): string{
		return this.apply_to[key];
	}

	set apply_to(value: Array<string>){
		this._apply_to = value;
	}

	set_apply_to(value: string): void{
		this.apply_to.push(value);
	}

	get is_searchable(): string{
		return this._is_searchable;
	}

	set is_searchable(value: string){
		this._is_searchable = value;
	}

	get is_visible_in_advanced_search(): string{
		return this._is_visible_in_advanced_search;
	}

	set is_visible_in_advanced_search(value: string){
		this._is_visible_in_advanced_search = value;
	}

	get is_comparable(): string{
		return this._is_comparable;
	}

	set is_comparable(value: string){
		this._is_comparable = value;
	}

	get is_used_for_promo_rules(): string{
		return this._is_used_for_promo_rules;
	}

	set is_used_for_promo_rules(value: string){
		this._is_used_for_promo_rules = value;
	}

	get is_visible_on_front(): string{
		return this._is_visible_on_front;
	}

	set is_visible_on_front(value: string){
		this._is_visible_on_front = value;
	}

	get used_in_product_listing(): string{
		return this._used_in_product_listing;
	}

	set used_in_product_listing(value: string){
		this._used_in_product_listing = value;
	}

	get is_visible(): boolean{
		return this._is_visible;
	}

	set is_visible(value: boolean){
		this._is_visible = value;
	}

	get scope(): string{
		return this._scope;
	}

	set scope(value: string){
		this._scope = value;
	}

	get attribute_id(): number{
		return this._attribute_id;
	}

	set attribute_id(value: number){
		this._attribute_id = value;
	}

	get attribute_code(): string{
		return this._attribute_code;
	}

	set attribute_code(value: string){
		this._attribute_code = value;
	}

	get frontend_input(): string{
		return this._frontend_input;
	}

	set frontend_input(value: string){
		this._frontend_input = value;
	}

	get entity_type_id(): string{
		return this._entity_type_id;
	}

	set entity_type_id(value: string){
		this._entity_type_id = value;
	}

	get is_required(): boolean{
		return this._is_required;
	}

	set is_required(value: boolean){
		this._is_required = value;
	}

	get options(): Array<ProductAttributeOptionModel>{
		return this._options;
	}

	get_option(key: number): ProductAttributeOptionModel{
		return this.options[key];
	}

	set options(value: Array<ProductAttributeOptionModel>){
		this._options = value;
	}

	set_option(value: ProductAttributeOptionModel){
		this.options.push(value);
	}

	get is_user_defined(): boolean{
		return this._is_user_defined;
	}

	set is_user_defined(value: boolean){
		this._is_user_defined = value;
	}

  	get default_frontend_label(): string{
  		return this._default_frontend_label;
  	}

  	set default_frontend_label(value: string){
  		this._default_frontend_label = value;
  	}

  	get frontend_labels(): Array<ProductAttributeLabelModel>{
  		return this._frontend_labels
  	}

  	get_frontend_label(key: number): ProductAttributeLabelModel{
  		return this.frontend_labels[key];
  	}

  	set frontend_labels(value: Array<ProductAttributeLabelModel>){
  		this._frontend_labels = value;
  	}

  	set_frontend_label(value: ProductAttributeLabelModel): void{
  		this.frontend_labels.push(value);
  	}

	get note(): string{
		return this._note;
	}

	set note(value: string){
		this._note = value;
	}

	get backend_type(): string{
		return this._backend_type;
	}

	set backend_type(value: string){
		this._backend_type = value;
	}

	get backend_model(): string{
		return this._backend_model;
	}

	set backend_model(value: string){
		this._backend_model = value;
	}

	get source_model(): string{
		return this._source_model;
	}

	set source_model(value: string){
		this._source_model = value;
	}

	get default_value(): string{
		return this._default_value;
	}

	set default_value(value: string){
		this._default_value = value;
	}

	get is_unique(): string{
		return this._is_unique;
	}

	set is_unique(value: string){
		this._is_unique = value;
	}

	get frontend_class(): string{
		return this._frontend_class;
	}

	set frontend_class(value: string){
		this._frontend_class = value;
	}

	get validation_rules(): Array<ProductAttributeValidationModel>{
		return this._validation_rules;
	}

	get_validation_rule(key: number): ProductAttributeValidationModel{
		return this.validation_rules[key];
	}

	set validation_rules(value: Array<ProductAttributeValidationModel>){
		this._validation_rules = value;
	}

	set_validation_rule(value: ProductAttributeValidationModel){
		this.validation_rules.push(value);
	}

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
		this.is_wysiwyg_enabled = data.is_wysiwyg_enabled;
		this.is_html_allowed_on_front = data.is_html_allowed_on_front;
		this.used_for_sort_by = data.used_for_sort_by;
		this.is_filterable = data.is_filterable;
		this.is_filterable_in_search = data.is_filterable_in_search;
		this.is_used_in_grid = data.is_used_in_grid;
		this.is_visible_in_grid = data.is_visible_in_grid;
		this.is_filterable_in_grid = data.is_filterable_in_grid;
		this.position = data.position;
		this.apply_to = data.apply_to;
		this.is_searchable = data.is_searchable;
		this.is_visible_in_advanced_search = data.is_visible_in_advanced_search;
		this.is_comparable = data.is_comparable;
		this.is_used_for_promo_rules = data.is_used_for_promo_rules;
		this.is_visible_on_front = data.is_visible_on_front;
		this.used_in_product_listing = data.used_in_product_listing;
		this.is_visible = data.is_visible;
		this.scope = data.scope;
		
		//extension_attributes

		this.attribute_id = data.attribute_id;
		this.attribute_code = data.attribute_code;
		this.frontend_input = data.frontend_input;
		this.entity_type_id = data.entity_type_id;
		this.is_required = data.is_required;

		if(data.options){
			for(let option of data.options){
				let model: ProductAttributeOptionModel = new ProductAttributeOptionModel();
				this.set_option( model.fromJson(option) );
			}
		}

		this.is_user_defined = data.is_user_defined;
	  	this.default_frontend_label = data.default_frontend_label;
	  	
	  	if(data.frontend_labels){
	  		for(let label of data.frontend_labels){
	  			let model: ProductAttributeLabelModel = new ProductAttributeLabelModel();
	  			this.set_frontend_label( model.fromJson(label) );
	  		}
	  	}
		
		this.note = data.note;
		this.backend_type = data.backend_type;
		this.backend_model = data.backend_model;
		this.source_model = data.source_model;
		this.default_value = data.default_value;
		this.is_unique = data.is_unique;
		this.frontend_class = data.frontend_class;

		if(data.validation_rules){
			for(let rule of data.validation_rules){
				let model: ProductAttributeValidationModel = new ProductAttributeValidationModel();
				this.set_validation_rule( model.fromJson(rule) );
			}
		}

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
	 * @method optionByValue
	 * @description Retrieve an option by its value
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param string key
	 * @return ProductAttributeOptionModel
	 */
	optionByValue(key: string): ProductAttributeOptionModel{
		for(let option of this.options){
			if(option.value === key){
				return option;
			}
		}

		return null;
	}
}

export class ProductAttributeLabelModel{
	private _store_id: number;
	private _label: string;

	get store_id(): number{
		return this._store_id;
	}

	set store_id(value: number){
		this._store_id = value;
	}

	get label(): string{
		return this._label;
	}

	set label(value: string){
		this._label = value;
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
		this.store_id = data.store_id;
		this.label = data.label;

		return this;
	}
}

export class ProductAttributeOptionModel{
	private _label: string;
	private _value: string;
	private _sort_order: number;
	private _is_default: boolean;
	private _store_labels: Array<ProductAttributeLabelModel> = [];

	get label(): string{
		return this._label;
	}

	set label(value: string){
		this._label = value;
	}

	get value(): string{
		return this._value;
	}

	set value(value: string){
		this._value = value;
	}

	get sort_order(): number{
		return this._sort_order;
	}

	set sort_order(value: number){
		this._sort_order = value;
	}

	get is_default(): boolean{
		return this._is_default;
	}

	set is_default(value: boolean){
		this._is_default = value;
	}

	get store_labels(): Array<ProductAttributeLabelModel>{
		return this._store_labels;
	}

	get_store_label(key: number): ProductAttributeLabelModel{
		return this.store_labels[key];
	}

	set store_labels(value: Array<ProductAttributeLabelModel>){
		this._store_labels = value;
	}

	set_store_label(value: ProductAttributeLabelModel){
		this._store_labels.push(value);
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
		this.label = data.label;
		this.value = data.value;
		this.sort_order = data.sort_order;
		this.is_default = data.is_default;

		if(data.store_labels){
			for(let label of data.store_labels){
				let model: ProductAttributeLabelModel = new ProductAttributeLabelModel();
				this.set_store_label( model.fromJson(label) );
			}
		}

		return this;
	}
}

export class ProductAttributeValidationModel{
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
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.attribute_code = data.attribute_code;
		this.value = data.value;
		
		return this;
	}
}