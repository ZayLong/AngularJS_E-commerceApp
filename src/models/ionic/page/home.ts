import { ProductModel } from '../../magento/catalog/product';
import { GroupcatProductActionModel } from '../../magento/amasty/groupcat';

export class ProductItemModel{
	private _product: ProductModel;
	private _action: GroupcatProductActionModel;

	get product(): ProductModel{
		return this._product;
	}

	set product(value: ProductModel){
		this._product = value;
	}

	get action(): GroupcatProductActionModel{
		return this._action;
	}

	set action(value: GroupcatProductActionModel){
		this._action = value;
	}
}