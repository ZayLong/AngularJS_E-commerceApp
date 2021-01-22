import { CustomerAddressModel } from './address';
import { CustomAttributeParamModel } from '../general/custom-attribute';

/**
 * @public
 * @enum RewardPointMinimum
 * @description The minimum point value for each tier
 * @author J. Trpka <jtrpka@tngworldwide.com>
 * @since 1.5.1
 * @version 1.5.1
 */
export enum RewardPointMinimum{
	Bronze = 900,
	Silver = 1350,
	Gold = 2000,
	Platinum = 3000,
	Black = 4000
}

/**
 * @public
 * @enum RewardCouponValue
 * @description The coupon value for each reward level tier
 * @author J. Trpka <jtrpka@tngworldwide.com>
 * @since 1.5.1
 * @version 1.5.1
 */
export enum RewardCouponValue{
	Bronze = 5.00,
	Silver = 10.00,
	Gold = 15.00,
	Platinum = 30.00,
	Black = 50.00
}

export class CustomerModel{
	private _id: number;
	private _group_id: number;
	private _default_billing: string;
	private _default_shipping: string;
	private _confirmation: string;
	private _created_at: string;
	private _updated_at: string;
	private _created_in: string;
	private _dob: string;
	private _email: string;
	private	_firstname: string;
	private _lastname: string;
	private _middlename: string;
	private _prefix: string;
	private _suffix: string;
	private _gender: number;
	private _store_id: number;
	private _taxvat: string;
	private _website_id: number;
	private _addresses: Array<CustomerAddressModel> = [];
	private _disable_auto_group_change: number;
	//private _extensionAttributes; // Look into these later

	//private _custom_attributes: Array<CustomAttributeModel> = [];
	private custom_attributes: Array<CustomAttributeParamModel> = [];

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get group_id(): number{
		return this._group_id;
	}

	set group_id(value: number){
		this._group_id = value;
	}

	get default_billing(): string{
		return this._default_billing;
	}

	set default_billing(value: string){
		this._default_billing = value;
	}

	get default_shipping(): string{
		return this._default_shipping;
	}

	set default_shipping(value: string){
		this._default_shipping = value;
	}

	get confirmation(): string{
		return this._confirmation;
	}

	set confirmation(value: string){
		this._confirmation = value;
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

	get created_in(): string{
		return this._created_in;
	}

	set created_in(value: string){
		this._created_in = value;
	}

	get dob(): string{
		return this._dob;
	}

	set dob(value: string){
		this._dob = value;
	}

	get email(): string{
		return this._email;
	}

	set email(value: string){
		this._email = value;
	}

	get firstname(): string{
		return this._firstname;
	}

	set firstname(value: string){
		this._firstname = value;
	}

	get lastname(): string{
		return this._lastname;
	}

	set lastname(value: string){
		this._lastname = value;
	}

	get middlename(): string{
		return this._middlename;
	}

	set middlename(value: string){
		this._middlename = value;
	}

	get prefix(): string{
		return this._prefix;
	}

	set prefix(value: string){
		this._prefix = value;
	}

	get suffix(): string{
		return this._suffix;
	}

	set suffix(value: string){
		this._suffix = value;
	}

	get gender(): number{
		return this._gender;
	}

	set gender(value: number){
		this._gender = value;
	}

	get store_id(): number{
		return this._store_id;
	}

	set store_id(value: number){
		this._store_id = value;
	}

	get taxvat(): string{
		return this._taxvat;
	}

	set taxvat(value: string){
		this._taxvat = value;
	}

	get website_id(): number{
		return this._website_id;
	}

	set website_id(value: number){
		this._website_id = value;
	}

	get addresses(): Array<CustomerAddressModel>{
		return this._addresses;
	}

	get_address(key: number): CustomerAddressModel{
		return this.addresses[key];
	}

	set addresses(value: Array<CustomerAddressModel>){
		this._addresses = value;
	}

	set_address(value: CustomerAddressModel): void{
		this.addresses.push(value);
	}

	get disable_auto_group_change(): number{
		return this._disable_auto_group_change;
	}

	set disable_auto_group_change(value: number){
		this._disable_auto_group_change = value;
	}

	//extension_attributes;

	/*
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
	*/

	get_custom_attributes(): Array<CustomAttributeParamModel>{
		return this.custom_attributes;
	}

	get_custom_attribute(key: string): CustomAttributeParamModel{
		for(let attribute of this.custom_attributes){
			if(attribute.attribute_code === key) return attribute;
		}
	}

	set_custom_attributes(value: Array<CustomAttributeParamModel>): void{
		this.custom_attributes = value;
	}

	set_custom_attribute(value: CustomAttributeParamModel): void{
		this.custom_attributes.push(value);
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { this }
	 */
	fromJson(data: any): this{
		this.id = data.id;
		this.group_id = data.group_id;
		this.default_billing = data.default_billing;
		this.default_shipping = data.default_shipping;
		this.confirmation = data.confirmation;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.created_in = data.created_in;
		this.dob = data.dob;
		this.email = data.email;
		this.firstname =	data.firstname;
		this.lastname = data.lastname;
		this.middlename = data.middlename;
		this.prefix = data.prefix;
		this.suffix = data.suffix;
		this.gender = data.gender;
		this.store_id = data.store_id;
		this.taxvat = data.taxvat;
		this.website_id = data.website_id;
		
		if(data.addresses){
			for(let address of data.addresses){
				let model: CustomerAddressModel = new CustomerAddressModel();
				this.set_address( model.fromJson(address) );
			}
		}

		this.disable_auto_group_change = data.disable_auto_group_change;
		//extension_attributes;

		/*
		if(data.custom_attributes){
			for(let attribute of data.custom_attributes){
				let model: CustomAttributeModel = new CustomAttributeModel();
				this.set_custom_attribute( model.fromJson(attribute) );
			}
		}
		*/

		if(data.custom_attributes){
			for(let attribute of data.custom_attributes){
				let model: CustomAttributeParamModel = new CustomAttributeParamModel();
				this.set_custom_attribute(model.fromJson(attribute));
			}
		}
		
		return this;
	}

	/**
	 * @public
	 * @method fullName
	 * @description Return the full name of the customer
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Add prefix and suffix
	 * @return { string }
	 */
	fullName(): string{
		if(this.middlename){
			return this.firstname + ' ' + this.middlename + ' ' + this.lastname;
		} else {
			return this.firstname + ' ' + this.lastname;
		}
	}

	/**
	 * @public
	 * @method defaultBillingAddress
	 * @description Retrieve the default billing address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Return an error instead of just null
	 * @return { CustomerAddressModel }
	 */
	defaultBillingAddress(): CustomerAddressModel{
		if(this.default_billing != null){
			for(let address of this.addresses){
				if(address.id.toString() === this.default_billing){
					return address;
				}
			}	
		}

		return null; // Should return an error
	}

	/**
	 * @public
	 * @method defaultShippingAddress
	 * @description Retrieve the default shipping address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Return an error instead of just null
	 * @return { CustomerAddressModel }
	 */
	defaultShippingAddress(): CustomerAddressModel{
		if(this.default_shipping != null){
			for(let address of this.addresses){
				if(address.id.toString() === this.default_shipping){
					return address;
				}
			}	
		}

		return null; // Should return an error
	}

	/**
	 * @public
	 * @method defaultSoldToAddress
	 * @description Retrieve the default sold to address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.1
	 * @todo Return an error instead of just null
	 * @return { CustomerAddressModel }
	 */
	defaultSoldToAddress(): CustomerAddressModel{
		if(this.get_custom_attribute('default_sold') != null){
			for(let address of this.addresses){
				if(address.id.toString() === this.get_custom_attribute('default_sold').value){
					return address;
				}
			}	
		}

		return null; // Should return an error
	}

	/**
	 * @public
	 * @method additionalAddresses
	 * @description Retrieve the other addresses
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { Array<CustomerAddressModel> }
	 */
	additionalAddresses(): Array<CustomerAddressModel>{
		let array = [];

		for(let address of this.addresses){
			if(
				address.id.toString() !== this.default_billing || 
				address.id.toString() !== this.default_shipping || 
				address.id.toString() !== this.get_custom_attribute('default_sold').value
			){
				array.push(address);
			}
		}

		return array;
	}

	/**
	 * @public
	 * @method isTermCustomer
	 * @description Check if customer is a term customer
	 * @desc Term customers have the option to pay by invoice at checkout
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { boolean }
	 */
	isTermCustomer(): boolean{
		let paymentTerm = this.get_custom_attribute('payment_terms');

		//Customers with the following paymentTerms are term customers
		//let termed = ['NT10', 'NT15', 'NT20', 'NT30', 'NT45', 'NT60', 'NT90', 'NT120'];
		//NT10 = Net 10 Days

		//or

		//Customers with CCRD (credit card) for paymentTerms are NOT term customers
		if(paymentTerm.value !== 'CCRD'){
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @public
	 * @method isTaxExempt
	 * @description Check if customer can tax exempt cart items
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo 1) Change the condition where the customer is tax exempted.
	 * @return { boolean }
	 */
	isTaxExempt(): boolean{
		let taxcode1: string;
		let taxcode2: string;

		if(this.get_custom_attribute('taxcode1')){
			taxcode1 = this.get_custom_attribute('taxcode1').value;
		} else {
			return false;
		}

		if(this.get_custom_attribute('taxcode2')){
			taxcode2 = this.get_custom_attribute('taxcode2').value;
		} else {
			return false;
		}

		// @todo (1)
		// Think I just need taxcode2
		// If that is the case, taxcode2 will need to be 0 to mark a customer as tax exempt
		if(taxcode1 && taxcode2){
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @public
	 * @method rewardLevel
	 * @description Display the CORRECT reward level
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @desc Right now the custom attribute, rewards_level, is incorrect
	 * @return string
	 */
	public rewardLevel(): string{
		let currentPoints: number = this.rewardPoints();

		if(currentPoints < RewardPointMinimum.Bronze){
			return 'Basic';
		} else if(currentPoints < RewardPointMinimum.Silver){
			return 'Bronze';
		} else if(currentPoints < RewardPointMinimum.Gold){
			return 'Silver';
		} else if(currentPoints < RewardPointMinimum.Platinum){
			return 'Gold';
		} else if(currentPoints < RewardPointMinimum.Black){
			return 'Platinum'
		} else {
			return 'Black';
		}
	}

	/**
	 * @public
	 * @method rewardCouponValue
	 * @description Get the coupon value
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { number }
	 */
	public rewardCouponValue(): number{
		console.info('CustomerModel - rewardCouponValue() - rewards_coupon', this.get_custom_attribute('rewards_coupon'));

		if(this.get_custom_attribute('rewards_coupon')){
			let coupon = this.get_custom_attribute('rewards_coupon').value;

			switch(coupon){
				case 'Bronze':
					return RewardCouponValue.Bronze;
				//end case Bronze
				case 'Silver':
					return RewardCouponValue.Silver;
				//end case Silver
				case 'Gold':
					return RewardCouponValue.Gold;
				//end case Gold
				case 'Platinum':
					return RewardCouponValue.Platinum;
				//end case Platinum
				case 'Black':
					return RewardCouponValue.Black;
				//end case Black
				default:
					return 0;
				//end default
			}
		} else {
			return 0;
		}
	}

	/**
	 * @public
	 * @method nextRewardLevelBalance
	 * @description How many reward points to the next level
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Figure out how to handle Black level
	 * @return number
	 */
	public nextRewardLevelBalance(): number{
		let currentPoints: number = this.rewardPoints();
		let currentLevel:string = this.rewardLevel();

		switch(currentLevel){
			case 'Basic':
				return RewardPointMinimum.Bronze - currentPoints;
			//end case Basic
			case 'Bronze':
				return RewardPointMinimum.Silver - currentPoints;
			//end case Bronze
			case 'Silver':
				return RewardPointMinimum.Gold - currentPoints;
			//end case Silver
			case 'Gold':
				return RewardPointMinimum.Platinum - currentPoints;
			//end case Gold
			case 'Platinum':
				return RewardPointMinimum.Black - currentPoints;
			//end case Platinum
			case 'Black':
				return 0;
			//end case Black
		}
	}

	/**
	 * @public
	 * @method nextRewardLevelPercentage
	 * @description How many reward points, as a percentage, to the next level
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Figure out how to handle Black level
	 * @return number
	 */
	public nextRewardLevelPercentage(): number{
		let currentPoints: number = this.rewardPoints();
		let currentLevel:string = this.rewardLevel();

		switch(currentLevel){
			case 'Basic':
				return currentPoints / RewardPointMinimum.Bronze * 100;
			//end case Basic
			case 'Bronze':
				return currentPoints / RewardPointMinimum.Silver * 100;
			//end case Bronze
			case 'Silver':
				return currentPoints / RewardPointMinimum.Gold * 100;
			//end case Silver
			case 'Gold':
				return currentPoints / RewardPointMinimum.Platinum * 100;
			//end case Gold
			case 'Platinum':
				return currentPoints / RewardPointMinimum.Black * 100;
			//end case Platinum
			case 'Black':
				return 100;
			//end case Black
		}
	}

	/**
	 * @public
	 * @method nextRewardLevelRank
	 * @description The next rank to earn
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @todo Figure out how to handle Black level
	 * @return { string }
	 */
	public nextRewardLevelRank(): string{
		let currentLevel:string = this.rewardLevel();

		switch(currentLevel){
			case 'Basic':
				return 'Bronze';
			//end case Basic
			case 'Bronze':
				return 'Silver';
			//end case Bronze
			case 'Silver':
				return 'Gold';
			//end case Silver
			case 'Gold':
				return 'Platinum';
			//end case Gold
			case 'Platinum':
				return 'Black';
			//end case Platinum
			case 'Black':
				return 'Highest Rank';
			//end case Black
		}
	}

	/**
	 * @public
	 * @method rewardPoints
	 * @description Get a user's reward points (shortcut)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return number
	 */
	public rewardPoints(): number{
		if(this.get_custom_attribute('rewards_points')){
			return parseFloat(this.get_custom_attribute('rewards_points').value);
		} else {
			return 0;
		}
	}

	/**
	 * @public
	 * @method isUserBlocked
	 * @description Check if user is blocked from using the app
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Array<string> } checkCode
	 * @return { boolean }
	 */
	public isUserBlocked(checkCode: Array<string>): boolean{
		if(this.get_custom_attribute('web_block_code')){
			let code: string = this.get_custom_attribute('web_block_code').value;
		
			if(code != undefined){
				for(let check of checkCode){
					if(code === check){
						return true;
					}
				}
			}	
		}

		return false;
	}
}

export class CustomerAttributeModel{
	private _attribute_code: string;
	private _backend_type: string;
	private _data_model: string;
	private _frontend_class: string;
	private _frontend_input: string;
	private _frontend_label: string;
	private _input_filter: string;
	private _is_filterable_in_grid: boolean;
	private _is_searchable_in_grid: boolean;
	private _is_used_in_grid: boolean;
	private _is_visible_in_grid: boolean;
	private _multiline_count: number;
	private _note: string;
	private _options: Array<CustomerAttributeOptionModel> = [];
	private _required: boolean;
	private _sort_order: number;
	private _store_label: string;
	private _system: boolean;
	private _user_defined: boolean;
	//private validationRules: Array<>; // find a customer attribute with validation rules
	private _visible: boolean;

	get attribute_code(): string{
		return this._attribute_code;
	}

	set attribute_code(value: string){
		this._attribute_code = value;
	}

	get backend_type(): string{
		return this._backend_type;
	}

	set backend_type(value: string){
		this._backend_type = value;
	}

	get data_model(): string{
		return this._data_model;
	}

	set data_model(value: string){
		this._data_model = value;
	}

	get frontend_class(): string{
		return this._frontend_class;
	}

	set frontend_class(value: string){
		this._frontend_class = value;
	}

	get frontend_input(): string{
		return this._frontend_input;
	}

	set frontend_input(value: string){
		this._frontend_input = value;
	}

	get frontend_label(): string{
		return this._frontend_label;
	}

	set frontend_label(value: string){
		this._frontend_label = value;
	}

	get input_filter(): string{
		return this._input_filter;
	}

	set input_filter(value: string){
		this._input_filter = value;
	}

	get is_filterable_in_grid(): boolean{
		return this._is_filterable_in_grid;
	}

	set is_filterable_in_grid(value: boolean){
		this._is_filterable_in_grid = value;
	}

	get is_searchable_in_grid(): boolean{
		return this._is_searchable_in_grid;
	}

	set is_searchable_in_grid(value: boolean){
		this._is_searchable_in_grid = value;
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

	get multiline_count(): number{
		return this._multiline_count;
	}

	set multiline_count(value: number){
		this._multiline_count = value;
	}

	get note(): string{
		return this._note;
	}

	set note(value: string){
		this._note = value;
	}

	get options(): Array<CustomerAttributeOptionModel>{
		return this._options;
	}

	get_option(key: string): CustomerAttributeOptionModel{
		for(let option of this.options){
			if(option.label === key){
				return option;
			}
		}

		return null;
	}

	set options(value: Array<CustomerAttributeOptionModel>){
		this._options = value;
	}

	set_option(value: CustomerAttributeOptionModel): void{
		this.options.push(value);
	}

	get required(): boolean{
		return this._required;
	}

	set required(value: boolean){
		this._required = value;
	}

	get sort_order(): number{
		return this._sort_order;
	}

	set sort_order(value: number){
		this._sort_order = value;
	}

	get store_label(): string{
		return this._store_label;
	}

	set store_label(value: string){
		this._store_label = value;
	}

	get system(): boolean{
		return this._system;
	}

	set system(value: boolean){
		this._system = value;
	}

	get user_defined(): boolean{
		return this._user_defined;
	}

	set user_defined(value: boolean){
		this._user_defined = value;
	}

	//validation

	get visible(): boolean {
		return this._visible;
	}

	set visible(value: boolean){
		this._visible = value;
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
		this.backend_type = data.backend_type;
		this.data_model = data.data_model;
		this.frontend_class = data.frontend_class;
		this.frontend_input = data.frontend_input;
		this.frontend_label = data.frontend_label;
		this.input_filter = data.input_filter;
		this.is_filterable_in_grid = data.is_filterable_in_grid;
		this.is_searchable_in_grid = data.is_searchable_in_grid;
		this.is_used_in_grid = data.is_used_in_grid;
		this.is_visible_in_grid = data.is_visible_in_grid;
		this.multiline_count = data.multiline_count;
		this.note = data.note;

		if(data.options){
			for(let option of data.options){
				let model: CustomerAttributeOptionModel = new CustomerAttributeOptionModel();
				this.set_option( model.fromJson(option) );
			}
		}

		this.required = data.required;
		this.sort_order = data.sort_order;
		this.store_label = data.store_label;
		this.system = data.system;
		this.user_defined = data.user_defined;
		
		//private validationRules: Array<>; // find a customer attribute with validation rules
		
		this.visible = data.visible;
		
		return this;
	}
}

export class CustomerAttributeOptionModel{
	private _label: string;
	private _value: string;

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

		return this;
	}
}

export class CustomerGroupModel{
	private _id: number;
	private _code: string;
	private _tax_class_id: number;
	private _tax_class_name: string;
	//private extension_attributes

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get code(): string{
		return this._code;
	}

	set code(value: string){
		this._code = value;
	}

	get tax_class_id(): number{
		return this._tax_class_id;
	}

	set tax_class_id(value: number){
		this._tax_class_id = value;
	}

	get tax_class_name(): string{
		return this._tax_class_name;
	}

	set tax_class_name(value: string){
		this._tax_class_name = value;
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
		this.code = data.code;
		this.tax_class_id = data.tax_class_id;
		this.tax_class_name = data.tax_class_name;
		
		return this;
	}
}