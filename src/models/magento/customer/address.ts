import { AddressModel } from '../general/address';
import { CartAddressModel } from '../cart/cart';
import { CustomAttributeParamModel } from '../general/custom-attribute';

export class CustomerAddressModel extends AddressModel{
	private _id: number;
	private _region: CustomerAddressRegionModel;
	private _default_shipping: boolean;
	private _default_billing: boolean;
	//private extension_attributes: any;
	//private _custom_attributes: Array<CustomAttributeModel> = [];
	private custom_attributes: Array<CustomAttributeParamModel> = [];

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get region(): CustomerAddressRegionModel{
		return this._region;
	}

	set region(value: CustomerAddressRegionModel){
		this._region = value;
	}

	get default_shipping(): boolean{
		return this._default_shipping;
	}

	set default_shipping(value: boolean){
		this._default_shipping = value;
	}

	get default_billing(): boolean{
		return this._default_billing;
	}

	set default_billing(value: boolean){
		this._default_billing = value;
	}

	//extension_attributes

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
	public fromJson(data: any): this{
		this.customer_id = data.customer_id;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.middlename = data.middlename;
		this.prefix = data.prefix;
		this.suffix = data.suffix;
		this.street = data.street;
		this.city = data.city;
		this.region_id = data.region_id;
		this.country_id = data.country_id;
		this.postcode = data.postcode;
		this.company = data.company;
		this.telephone = data.telephone;
		this.fax = data.fax;
		this.vat_id = data.vat_id;

		this.id = data.id;

		let regionModel: CustomerAddressRegionModel = new CustomerAddressRegionModel();
		this.region = regionModel.fromJson(data.region);

		this.default_shipping = data.default_shipping;
		this.default_billing = data.default_billing;

		//private extension_attributes: any;
		
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
	 * @method fromCartAddress
	 * @description Convert cart address to customer address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { CartAddressModel } address
	 */
	public fromCartAddress(address: CartAddressModel): void{
		this.firstname = address.firstname;
		this.middlename = address.middlename;
		this.lastname = address.lastname;
		this.company = address.company;
		this.telephone = address.telephone;
		this.fax = address.fax;
		this.prefix = address.prefix;
		this.suffix = address.suffix;

		this.street = address.street;
		this.city = address.city;
		this.region.region = address.region;
		this.region.region_code = address.region_code;
		this.region.region_id = address.region_id;
		this.region_id = address.region_id;
		this.postcode = address.postcode;

		this.customer_id = address.customer_id;
		this.vat_id = address.vat_id;

		this.custom_attributes = address.get_custom_attributes();
	}

	/**
	 * @public
	 * @method fullMetroAddress
	 * @description Return the full metro location of the address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { string }
	 */
	public fullMetroAddress(): string{
		return this.city + ', ' + this.region.region_code + ' ' + this.postcode;
	}
}

export class CustomerAddressRegionModel{
	private _region_code: string;
	private _region: string;
	private _region_id: number;
	//private extensionAttributes: any;

	get region_code(): string{
		return this._region_code;
	}

	set region_code(value: string){
		this._region_code = value;
	}

	get region(): string{
		return this._region;
	}

	set region(value: string){
		this._region = value;
	}

	get region_id(): number{
		return this._region_id;
	}

	set region_id(value: number){
		this._region_id = value;
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
		this.region_code = data.region_code;
		this.region = data.region;
		this.region_id = data.region_id;
		
		return this;
	}
}