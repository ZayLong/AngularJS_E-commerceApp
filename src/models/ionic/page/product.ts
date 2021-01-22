import { ProductAttributeOptionModel } from  '../../magento/catalog/product-attribute';

/**
 * @public
 * @class ProductSpecificationModel
 * @description A collection of attributes of a product
 * @author J. Trpka <jtrpka@tngworldwide.com>
 * @since 1.5.1
 * @version 1.5.1
 */
export class ProductSpecificationModel{
	private _branding: ProductAttributeOptionModel;
	private _collection: ProductAttributeOptionModel;
	private _polish: ProductAttributeOptionModel;
	private _tag: ProductAttributeOptionModel;
	private _color: ProductAttributeOptionModel;

	get branding(): ProductAttributeOptionModel{
		return this._branding;
	}

	set branding(value: ProductAttributeOptionModel){
		this._branding = value;
	}

	get collection(): ProductAttributeOptionModel{
		return this._collection;
	}

	set collection(value: ProductAttributeOptionModel){
		this._collection = value;
	}

	get polish(): ProductAttributeOptionModel{
		return this._polish;
	}

	set polish(value: ProductAttributeOptionModel){
		this._polish = value;
	}

	get tag(): ProductAttributeOptionModel{
		return this._tag;
	}

	set tag(value: ProductAttributeOptionModel){
		this._tag = value;
	}

	get color(): ProductAttributeOptionModel{
		return this._color;
	}

	set color(value: ProductAttributeOptionModel){
		this._color = value;
	}
}