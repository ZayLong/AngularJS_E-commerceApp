import { Component, Input } from '@angular/core';

// Models
import { ProductModel } from '../../../models/magento/catalog/product';

@Component({
	selector: 'product-instock',
	templateUrl: 'product-instock.html'
})

export class ProductInstockComponent {

	@Input('product') product: ProductModel;

	public quantity: number = 1;
	public status: string = '';

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public constructor() {}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the component
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private process(): void{
		// Check if the product is on backordered
		if(this.product.isBackOrdered()){
			this.quantity = this.product.backOrderQtyMinimum();
			this.status = 'backordered';
		} else {
			if(this.product.isInStock()){
				this.status = 'instock';
			} else {
				this.status = 'outofstock';
			}
		}
	}
}
