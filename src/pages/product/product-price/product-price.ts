import { Component, Input } from '@angular/core';

// Models
import { ProductModel } from '../../../models/magento/catalog/product';
import { GroupcatProductActionModel } from '../../../models/magento/amasty/groupcat';

@Component({
	selector: 'product-price',
	templateUrl: 'product-price.html'
})

export class ProductPriceComponent {

	@Input('logged') logged: boolean;
	@Input('product') product: ProductModel;
	@Input('action') action: GroupcatProductActionModel;
	
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
		// If on call 
		if(this.action.call_to_order == false){
			// Check if user is logged or not
			if(this.logged){
				if(this.product.storePrice().onSale){
					this.status = 'customer-onsale';
				} else {
					this.status = 'customer-notsale';
				}
			} else if(this.logged == false && this.action.change_price_text == false){
				if(this.product.storePrice().onSale){
					this.status = 'guest-onsale';
				} else {
					this.status = 'guest-notsale';
				}
			}
		} else {
			this.status = 'calltoorder';
		} // Otherwise do not show price
	}
}
