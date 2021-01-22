export class HierarchyModel{
	private _structure_id: number;
    private _entity_id: number;
    private _entity_type: string;
    private _structure_parent_id: number;
    //private extension_attributes: any;

    get structure_id(): number{
		return this._structure_id;
    }

	set structure_id(value: number){
		this._structure_id = value;
	}

    get entity_id(): number{
		return this._entity_id;
    }

	set entity_id(value: number){
		this._entity_id = value;
	}

    get entity_type(): string{
		return this._entity_type;
    }

	set entity_type(value: string){
		this._entity_type = value;
	}

    get structure_parent_id(): number{
		return this._structure_parent_id;
    }

	set structure_parent_id(value: number){
		this._structure_parent_id = value;
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
		this.structure_id = data.structure_id;
    	this.entity_id = data.entity_id;
    	this.entity_type = data.entity_type;
    	this.structure_parent_id = data.structure_parent_id;
    	
		return this;
	}
}