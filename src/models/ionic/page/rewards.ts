/**
 * @public
 * @class RewardBrandModel
 * @author J. Trpka <jtrpka@tngworldwide.com>
 * @since 1.5.1
 * @version 1.5.1
 */
export class RewardBrandModel{
	private _name: string;
	private _brand: string;
	private _query: string;
	private _image: string;

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get brand(): string{
		return this._brand;
	}

	set brand(value: string){
		this._brand = value;
	}

	get query(): string{
		return this._query;
	}

	set query(value: string){
		this._query = value;
	}

	get image(): string{
		return this._image;
	}

	set image(value: string){
		this._image = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.1
	 * @version 1.5.1
	 * @param { string } name (optional)
	 * @param { brand } brand (optional)
	 * @param { query } query (optional)
	 * @param { image } image (optional)
	 */
	public constructor(name?: string, brand?: string, query?: string, image?: string){
		if(name){ this.name = name; }
		if(brand){ this.brand = brand; }
		if(query){ this.query = query; }
		if(image){ this.image = image; }
	}
}