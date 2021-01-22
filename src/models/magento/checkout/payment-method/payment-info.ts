import { PaymetricCardModel } from '../../tng/paymetric';

export abstract class PaymentInfoModel{
	private _po_number: number;
	private _method: string;
	private _extension_attributes: PaymentInfoExtensionAttributeModel;

	get po_number(): number{
		return this._po_number;
	}

	set po_number(value: number){
		this._po_number = value;
	}

	get method(): string{
		return this._method;
	}

	set method(value: string){
		this._method = value;
	}

	get extension_attributes(): PaymentInfoExtensionAttributeModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: PaymentInfoExtensionAttributeModel){
		this._extension_attributes = value;
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
		this.po_number = data.po_number;
		this.method = data.method;

		let extensionModel: PaymentInfoExtensionAttributeModel = new PaymentInfoExtensionAttributeModel();
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		return this;
	}
}

export class PaymentInfoExtensionAttributeModel{
	private _agreement_ids: string;

	get agreement_ids(): string{
		return this._agreement_ids;
	}

	set agreement_ids(value: string){
		this._agreement_ids = value;
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
		this.agreement_ids = data.agreement_ids;
		
		return this;
	}
}

// PAYMETRIC METHOD

export class PaymetricInfoModel extends PaymentInfoModel{
	//private _additional_data: PaymetricAdditionalDataModel;
	private additional_data: PaymetricAdditionalDataModel;

	/*
	get additional_data(): PaymetricAdditionalDataModel{
		return this._additional_data;
	}

	set additional_data(value: PaymetricAdditionalDataModel){
		this._additional_data = value
	}
	*/

	get_additional_data(): PaymetricAdditionalDataModel{
		return this.additional_data;
	}

	set_additional_data(value: PaymetricAdditionalDataModel){
		this.additional_data = value
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
		this.po_number = data.po_number;
		this.method = data.method;

		let additionalModel: PaymetricAdditionalDataModel = new PaymetricAdditionalDataModel();
		this.set_additional_data(additionalModel.fromJson(data.additional_data));

		let extensionModel: PaymentInfoExtensionAttributeModel = new PaymentInfoExtensionAttributeModel();
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		return this;
	}
}

export class PaymetricAdditionalDataModel{
	private cc_cid: string;
	private cc_ss_start_month: string;
	private cc_ss_start_year: string;
	private cc_type: string;
	private cc_exp_year: string;
	private cc_exp_month: string;
	private cc_number: string;
	private savePayment: boolean;
	private extOrderId: string;

	get_cc_cid(): string{
		return this.cc_cid;
	}

	set_cc_cid(value: string){
		this.cc_cid = value;
	}

	get_cc_ss_start_month(): string{
		return this.cc_ss_start_month;
	}

	set_cc_ss_start_month(value: string){
		this.cc_ss_start_month = value;
	}

	get_cc_ss_start_year(): string{
		return this.cc_ss_start_year;
	}

	set_cc_ss_start_year(value: string){
		this.cc_ss_start_year = value;
	}

	get_cc_type(): string{
		return this.cc_type;
	}

	set_cc_type(value: string){
		this.cc_type = value;
	}

	get_cc_exp_year(): string{
		return this.cc_exp_year;
	}

	set_cc_exp_year(value: string){
		this.cc_exp_year = value;
	}

	get_cc_exp_month(): string{
		return this.cc_exp_month;
	}

	set_cc_exp_month(value: string){
		this.cc_exp_month = value;
	}

	get_cc_number(): string{
		return this.cc_number;
	}

	set_cc_number(value: string){
		this.cc_number = value;
	}

	get_savePayment(): boolean{
		return this.savePayment;
	}

	set_savePayment(value: boolean){
		this.savePayment = value;
	}

	get_extOrderId(): string{
		return this.extOrderId;
	}

	set_extOrderId(value: string){
		this.extOrderId = value;
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
		this.set_cc_cid(data.cc_cid);
		this.set_cc_ss_start_month(data.cc_ss_start_month);
		this.set_cc_ss_start_year(data.cc_ss_start_year);
		this.set_cc_type(data.cc_type);
		this.set_cc_exp_year(data.cc_exp_year);
		this.set_cc_exp_month(data.cc_exp_month);
		this.set_cc_number(data.cc_number);
		this.set_savePayment(data.savePayment);
		this.set_extOrderId(data.extOrderId);

		return this;
	}

	/**
	 * @public
	 * @method convertSavedToInfo
	 * @description Convert a saved card model to an info model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { PaymetricCardModel } card
	 */
	public convertSavedToInfo(card: PaymetricCardModel): void{
		this.set_cc_number(card.card_number);
		this.set_cc_type(card.card_type);
		this.set_savePayment(false); // it is already saved
		this.set_cc_exp_month(card.cardExpiration().month.toString());
		this.set_cc_exp_year(card.cardExpiration().year.toString());
	}

	/**
	 * @public
	 * @method fullTypeName
	 * @description Get the full name of the card type
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @return { string }
	 */
	public fullTypeName(): string {
		switch(this.get_cc_type()){
			case 'VI':
				return 'Visa';
			// end case VI
			case 'MC':
				return 'Mastercard';
			// end case MC
			case 'DI':
				return 'Discover';
			// end case DI
			case 'AE':
				return 'American Express';
			// end case AE
		}
	}

	/**
	 * @public
	 * @method lastFour
	 * @description Get the last four numbers of the card number
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @todo Wondering if I want to add the astericks
	 * @return { string }
	 */
	public lastFour(): string{
		// First assume if numbers are spaced apart
		let stringToArray: Array<string> = this.get_cc_number().split(' ');

		// Check if array has more than just one element (no splitting)
		if(stringToArray.length > 1){
			if(this.get_cc_type() != 'AE'){
				// Get the fourth (last) element
				return stringToArray[3];
			} else {
				// Get the third (last) element, but ignore the first character
				// (5 characters in the third element)
				return stringToArray[2].substring(1); 
			}
		} else {
			// Should do some more splitting then check again
			if(this.get_cc_type() != 'AE'){
				return stringToArray[0].substring(12);
			} else {
				return stringToArray[0].substring(11);
			}
		}
	}
}

// PURCHASE ORDER METHOD

export class PurchaseOrderInfoModel extends PaymentInfoModel{}

// PAYPAL METHOD

export class PayPalInfoModel extends PaymentInfoModel{
	private _additional_data: PayPalAdditionalDataModel;

	get additional_data(): PayPalAdditionalDataModel{
		return this._additional_data;
	}

	set additional_data(value: PayPalAdditionalDataModel){
		this._additional_data = value
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
		this.po_number = data.po_number;
		this.method = data.method;

		let additionalModel: PayPalAdditionalDataModel = new PayPalAdditionalDataModel();
		this.additional_data = additionalModel.fromJson(data.additional_data);

		let extensionModel: PaymentInfoExtensionAttributeModel = new PaymentInfoExtensionAttributeModel();
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		return this;
	}
}

export class PayPalAdditionalDataModel{
	private _payer_id: string;
	private _token: string;

	get payer_id(): string{
		return this._payer_id;
	}

	set payer_id(value: string){
		this._payer_id = value;
	}

	get token(): string{
		return this._token;
	}

	set token(value: string){
		this._token = value;
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
		this.payer_id = data.payer_id;
		this.token = data.token;

		return this;
	}
}