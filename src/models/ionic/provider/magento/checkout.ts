import { PaymentMethodModel } from '../../../magento/checkout/payment-method';
import { CartTotalModel } from '../../../magento/cart/total';

export class PaymentInformationResponseModel{
	private _payment_methods: Array<PaymentMethodModel>;
	private _totals: CartTotalModel;
	//private _extension_attributes

	get payment_methods(): Array<PaymentMethodModel>{
		return this._payment_methods;
	}

	get_payment_method(key: number): PaymentMethodModel{
		return this.payment_methods[key];
	}

	set payment_methods(value: Array<PaymentMethodModel>){
		this._payment_methods = value;
	}

	set_payment_method(value: PaymentMethodModel): void{
		this.payment_methods.push(value);
	}

	get totals(): CartTotalModel{
		return this._totals;
	}

	set totals(value: CartTotalModel){
		this._totals = value;
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
		this.payment_methods = data.payment_methods;
		this.totals = data.totals;
		return this;
	}
}