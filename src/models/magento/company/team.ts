import { CustomAttributeModel } from '../general/custom-attribute';

export class CompanyTeamModel{
	private _id: number;
	private _name: string;
	private _description: string;
	//private _extension_attributes: any;
	private _custom_attributes: Array<CustomAttributeModel>;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get description(): string{
		return this._description;
	}

	set description(value: string){
		this._description = value;
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
		this.name = data.name;
		this.description = data.description;

		//private _extension_attributes: any;
		
		if(data.custom_attributes){
			for(let attribute of data.custom_attributes){
				let model: CustomAttributeModel = new CustomAttributeModel();
				this.set_custom_attribute( model.fromJson(attribute) );
			}
		}

		return this;
	}
}