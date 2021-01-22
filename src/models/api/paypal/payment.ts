// ENUMS

export enum PayPalPaymentIntent{
	Sale = 'sale',
	Authorize = 'authorize',
	Order = 'order'
}

export enum PayPalPaymentMethod{
	CreditCard = 'credit_card', // RESTRICTED
	PayPal = 'paypal',
	Invoice = 'pay_upon_invoice',
	Carrier = 'carrier',
	AlternativePayment = 'alternative_payment',
	Bank = 'bank'
}

export enum PayPalPaymentStatus{
	Verified = 'VERIFIED',
	Unverified = 'UNVERIFIED'
}

export enum PayPalPaymentHrefMethod{
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Delete = 'DELETE',
	Head = 'HEAD',
	Connect = 'CONNECT',
	Options = 'OPTIONS',
	Patch = 'PATCH'
}

export enum PayPalPaymentTaxIdType{
	BrCpf = 'BR_CPF',
	BrCnpj = 'BR_CNPJ'
}

export enum PayPalPaymentShippingPreference{
	NoShipping = 'NO_SHIPPING',
	GetFromFile = 'GET_FROM_FILE',
	SetProvidedAddress = 'SET_PROVIDED_ADDRESS'
}

export enum PayPalPaymentAllowedPaymentMethod{
	Unrestricted = 'UNRESTRICTED',
	InstantFunding = 'INSTANT_FUNDING_SOURCE',
	ImmediatePay = 'IMMEDIATE_PAY'
}

export enum PayPalPaymentFailureReason{
	UnableToComplete = 'UNABLE_TO_COMPLETE_TRANSACTION',
	InvalidPaymentMethod = 'INVALID_PAYMENT_METHOD',
	PayerCannotPay = 'PAYER_CANNOT_PAY',
	CannotPayThisPayee = 'CANNOT_PAY_THIS_PAYEE',
	RedirectRequired = 'REDIRECT_REQUIRED',
	PayeeFilterRestriction = 'PAYEE_FILTER_RESTRICTIONS'
}

// REQUESTS

export class PayPalPaymentStoreRequestModel{
	private intent: string;
	private payer: PayPalPaymentPayerModel;
	private application_context: PayPalPaymentApplicationContextModel;
	private transactions: Array<PayPalPaymentTransactionModel>;
	private experience_profile_id: string;
	private note_to_payer: string;
	private redirect_urls: PayPalPaymentRedirectUrlModel;

	get_intent(): string{
		return this.intent;
	}

	set_intent(value: string): void{
		this.intent = value;
	}

	get_payer(): PayPalPaymentPayerModel{
		return this.payer;
	}

	set_payer(value: PayPalPaymentPayerModel): void{
		this.payer = value;
	}

	get_application_context(): PayPalPaymentApplicationContextModel{
		return this.application_context;
	}

	set_application_context(value: PayPalPaymentApplicationContextModel): void{
		this.application_context = value;
	}

	get_transactions(): Array<PayPalPaymentTransactionModel>{
		return this.transactions;
	}

	get_transaction(key: number): PayPalPaymentTransactionModel{
		return this.transactions[key];
	}

	set_transactions(value: Array<PayPalPaymentTransactionModel>): void{
		this.transactions = value;
	}

	set_transaction(value: PayPalPaymentTransactionModel): void{
		this.transactions.push(value);
	}

	get_experience_profile_id(): string{
		return this.experience_profile_id;
	}

	set_experience_profile_id(value: string): void{
		this.experience_profile_id = value;
	}

	get_note_to_payer(): string{
		return this.note_to_payer;
	}

	set_note_to_payer(value: string): void{
		this.note_to_payer = value;
	}

	get_redirect_urls(): PayPalPaymentRedirectUrlModel{
		return this.redirect_urls;
	}

	set_redirect_urls(value: PayPalPaymentRedirectUrlModel): void{
		this.redirect_urls = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_intent(data.intent);
		
		let payer: PayPalPaymentPayerModel = new PayPalPaymentPayerModel();
		this.set_payer(payer.fromJson(data.payer));

		let context: PayPalPaymentApplicationContextModel = new PayPalPaymentApplicationContextModel();
		this.set_application_context(context.fromJson(data.application_context));

		if(data.transactions){
			for(let transaction of data.transactions){
				let model: PayPalPaymentTransactionModel = new PayPalPaymentTransactionModel();
				this.set_transaction(model.fromJson(transaction));
			}
		}

		this.set_experience_profile_id(data.experience_profile_id);
		this.set_note_to_payer(data.note_to_payer);

		let redirect: PayPalPaymentRedirectUrlModel = new PayPalPaymentRedirectUrlModel();
		this.set_redirect_urls(redirect.fromJson(data.redirect_urls));

		return this;
	}
}

// RESPONSE

export class PayPalPaymentStoreResponseModel{
	private id: string;
	private intent: string;
	private payer: PayPalPaymentPayerModel;
	private application_context: PayPalPaymentApplicationContextModel;
	private transactions: Array<PayPalPaymentTransactionModel>;
	private state: string;
	private experience_profile_id: string;
	private note_to_payer: string;
	private redirect_urls: PayPalPaymentRedirectUrlModel;
	private failure_reason: string;
	private create_time: string;
	private update_time: string;
	private links: Array<PayPalPaymentLinkDescriptionModel>;

	get_id(): string{
		return this.id;
	}

	set_id(value: string): void{
		this.id = value;
	}

	get_intent(): string{
		return this.intent;
	}

	set_intent(value: string): void{
		this.intent = value;
	}

	get_payer(): PayPalPaymentPayerModel{
		return this.payer;
	}

	set_payer(value: PayPalPaymentPayerModel): void{
		this.payer = value;
	}

	get_application_context(): PayPalPaymentApplicationContextModel{
		return this.application_context;
	}

	set_application_context(value: PayPalPaymentApplicationContextModel): void{
		this.application_context = value;
	}

	get_transactions(): Array<PayPalPaymentTransactionModel>{
		return this.transactions;
	}

	get_transaction(key: number): PayPalPaymentTransactionModel{
		return this.transactions[key];
	}

	set_transactions(value: Array<PayPalPaymentTransactionModel>): void{
		this.transactions = value;
	}

	set_transaction(value: PayPalPaymentTransactionModel): void{
		this.transactions.push(value);
	}

	get_state(): string{
		return this.state;
	}

	set_state(value: string): void{
		this.state = value;
	}

	get_experience_profile_id(): string{
		return this.experience_profile_id;
	}

	set_experience_profile_id(value: string): void{
		this.experience_profile_id = value;
	}

	get_note_to_payer(): string{
		return this.note_to_payer;
	}

	set_note_to_payer(value: string): void{
		this.note_to_payer = value;
	}

	get_redirect_urls(): PayPalPaymentRedirectUrlModel{
		return this.redirect_urls;
	}

	set_redirect_urls(value: PayPalPaymentRedirectUrlModel): void{
		this.redirect_urls = value;
	}

	get_failure_reason(): string{
		return this.failure_reason;
	}

	set_failure_reason(value: string): void{
		this.failure_reason = value;
	}

	get_create_time(): string{
		return this.create_time;
	}

	set_create_time(value: string): void{
		this.create_time = value;
	}

	get_update_time(): string{
		return this.update_time;
	}

	set_update_time(value: string): void{
		this.update_time = value;
	}

	get_links(): Array<PayPalPaymentLinkDescriptionModel>{
		return this.links;
	}

	get_link(key: number): PayPalPaymentLinkDescriptionModel{
		return this.links[key];
	}

	set_links(value: Array<PayPalPaymentLinkDescriptionModel>): void{
		this.links = value;
	}

	set_link(value: PayPalPaymentLinkDescriptionModel): void{
		this.links.push(value);
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_id(data.id);
		this.set_intent(data.intent);
		
		let payer: PayPalPaymentPayerModel = new PayPalPaymentPayerModel();
		this.set_payer(payer.fromJson(data.payer));

		let context: PayPalPaymentApplicationContextModel = new PayPalPaymentApplicationContextModel();
		this.set_application_context(context.fromJson(data.application_context));

		if(data.transactions){
			for(let transaction of data.transactions){
				let model: PayPalPaymentTransactionModel = new PayPalPaymentTransactionModel();
				this.set_transaction(model.fromJson(transaction));
			}
		}

		this.set_state(data.state);
		this.set_experience_profile_id(data.experience_profile_id);
		this.set_note_to_payer(data.note_to_payer);

		let redirect: PayPalPaymentRedirectUrlModel = new PayPalPaymentRedirectUrlModel();
		this.set_redirect_urls(redirect.fromJson(data.redirect_urls));

		this.set_failure_reason(data.failure_reason);
		this.set_create_time(data.create_time);
		this.set_update_time(data.update_time);

		if(data.links){
			for(let link of data.links){
				let model: PayPalPaymentLinkDescriptionModel = new PayPalPaymentLinkDescriptionModel();
				this.set_link(model.fromJson(link));
			}
		}

		return this;
	}
}

// PARTS

export class PayPalPaymentPayerModel{
	private payment_method: string;
	private status: string;
	private funding_instruments: Array<PayPalPaymentFundingInstrumentModel>;
	private payer_info: PayPalPaymentPayerInfoModel;

	get_payment_method(): string{
		return this.payment_method;
	}

	set_payment_method(value: string){
		this.payment_method = value;
	}

	get_status(): string{
		return this.status;
	}

	set_status(value: string){
		this.status = value;
	}

	get_funding_instruments(): Array<PayPalPaymentFundingInstrumentModel>{
		return this.funding_instruments;
	}

	get_funding_instrument(key: number): PayPalPaymentFundingInstrumentModel{
		return this.funding_instruments[key];
	}

	set_funding_instruments(value: Array<PayPalPaymentFundingInstrumentModel>): void{
		this.funding_instruments = value;
	}

	set_funding_instrument(value: PayPalPaymentFundingInstrumentModel): void{
		this.funding_instruments.push(value);
	}

	get_payer_info(): PayPalPaymentPayerInfoModel{
		return this.payer_info;
	}

	set_payer_info(value: PayPalPaymentPayerInfoModel){
		this.payer_info = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_payment_method(data.payment_method);
		this.set_status(data.status);

		if(data.funding_instruments){
			for(let instrument of data.funding_instruments){
				let model: PayPalPaymentFundingInstrumentModel = new PayPalPaymentFundingInstrumentModel();
				this.set_funding_instrument(model.fromJson(instrument));
			}
		}

		let payerInfo: PayPalPaymentPayerInfoModel = new PayPalPaymentPayerInfoModel();
		this.set_payer_info(payerInfo.fromJson(data.payer_info));

		return this;
	}
}

export class PayPalPaymentFundingInstrumentModel{
	private credit_card: PayPalPaymentCreditCardModel;
	private credit_card_token: PayPalPaymentCreditCardTokenModel;

	get_credit_card(): PayPalPaymentCreditCardModel{
		return this.credit_card;
	}

	set_credit_card(value: PayPalPaymentCreditCardModel){
		this.credit_card = value;
	}

	get_credit_card_token(): PayPalPaymentCreditCardTokenModel{
		return this.credit_card_token;
	}

	set_credit_card_token(value: PayPalPaymentCreditCardTokenModel){
		this.credit_card_token = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		let creditCard: PayPalPaymentCreditCardModel = new PayPalPaymentCreditCardModel();
		this.set_credit_card(creditCard.fromJson(data.credit_card));
		
		let creditCardToken: PayPalPaymentCreditCardTokenModel = new PayPalPaymentCreditCardTokenModel();
		this.set_credit_card_token(creditCardToken.fromJson(data.credit_card));

		return this;
	}
}

export class PayPalPaymentCreditCardModel{
	private number: string;
	private type: string;
	private expire_month: string;
	private expire_year: string;
	private cvv2: string;
	private first_name: string;
	private last_name: string;
	private billing_address: PayPalPaymentAddressModel;
	private links: Array<PayPalPaymentLinkDescriptionModel>;

	get_number(): string{
		return this.number;
	}

	set_number(value: string){
		this.number = value;
	}

	get_type(): string{
		return this.type;
	}

	set_type(value: string){
		this.type = value;
	}

	get_expire_month(): string{
		return this.expire_month;
	}

	set_expire_month(value: string){
		this.expire_month = value;
	}

	get_expire_year(): string{
		return this.expire_year;
	}

	set_expire_year(value: string){
		this.expire_year = value;
	}

	get_cvv2(): string{
		return this.cvv2;
	}

	set_cvv2(value: string){
		this.cvv2 = value;
	}

	get_first_name(): string{
		return this.first_name;
	}

	set_first_name(value: string){
		this.first_name = value;
	}

	get_last_name(): string{
		return this.last_name;
	}

	set_last_name(value: string){
		this.last_name = value;
	}

	get_billing_address(): PayPalPaymentAddressModel{
		return this.billing_address;
	}

	set_billing_address(value: PayPalPaymentAddressModel): void{
		this.billing_address = value;
	}

	get_links(): Array<PayPalPaymentLinkDescriptionModel>{
		return this.links;
	}

	get_link(key: number): PayPalPaymentLinkDescriptionModel{
		return this.links[key];
	}

	set_links(value: Array<PayPalPaymentLinkDescriptionModel>): void{
		this.links = value;
	}

	set_link(value: PayPalPaymentLinkDescriptionModel): void{
		this.links.push(value);
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_number(data.number);
		this.set_type(data.type);
		this.set_expire_month(data.expire_month);
		this.set_expire_year(data.expire_year);
		this.set_cvv2(data.cvv2);
		this.set_first_name(data.first_name);
		this.set_last_name(data.last_name);
		this.set_billing_address(data.billing_address);
		this.set_links(data.links);

		let address: PayPalPaymentAddressModel = new PayPalPaymentAddressModel();
		this.set_billing_address(address.fromJson(data.billing_address));

		if(data.links){
			for(let link of data.links){
				let model: PayPalPaymentLinkDescriptionModel = new PayPalPaymentLinkDescriptionModel();
				this.set_link(model.fromJson(link));
			}
		}

		return this;
	}
}

export class PayPalPaymentAddressModel{
	private line1: string;
	private line2: string;
	private city: string;
	private country_code: string;
	private postal_code: string;
	private state: string;
	private phone: string;
	private type: string;

	get_line1(): string{
		return this.line1;
	}

	set_line1(value: string): void{
		this.line1 = value;
	}

	get_line2(): string{
		return this.line2;
	}

	set_line2(value: string): void{
		this.line2 = value;
	}

	get_city(): string{
		return this.city;
	}

	set_city(value: string): void{
		this.city = value;
	}

	get_country_code(): string{
		return this.country_code;
	}

	set_country_code(value: string): void{
		this.country_code = value;
	}

	get_postal_code(): string{
		return this.postal_code;
	}

	set_postal_code(value: string): void{
		this.postal_code = value;
	}

	get_state(): string{
		return this.state;
	}

	set_state(value: string): void{
		this.state = value;
	}

	get_phone(): string{
		return this.phone;
	}

	set_phone(value: string): void{
		this.phone = value;
	}

	get_type(): string{
		return this.type;
	}

	set_type(value: string): void{
		this.type = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_line1(data.line1);
		this.set_line2(data.line2);
		this.set_city(data.city);
		this.set_country_code(data.country_code);
		this.set_postal_code(data.postal_code);
		this.set_state(data.state);
		this.set_phone(data.phone);
		this.set_type(data.type);

		return this;
	}
}

export class PayPalPaymentLinkDescriptionModel{
	private href: string;
	private rel: string;
	private method: string;

	get_href(): string{
		return this.href;
	}

	set_href(value: string){
		this.href = value;
	}

	get_rel(): string{
		return this.rel;
	}

	set_rel(value: string){
		this.rel = value;
	}

	get_method(): string{
		return this.method;
	}

	set_method(value: string){
		this.method = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_href(data.href);
		this.set_rel(data.rel);
		this.set_method(data.method);

		return this;
	}
}

export class PayPalPaymentCreditCardTokenModel{
	private credit_card_id: string;
	private payer_id: string;
	private last4: string;
	private type: string;
	private expire_month: number;
	private expire_year: number;

	get_credit_card_id(): string{
		return this.credit_card_id;
	}

	set_credit_card_id(value: string){
		this.credit_card_id = value;
	}

	get_payer_id(): string{
		return this.payer_id;
	}

	set_payer_id(value: string){
		this.payer_id = value;
	}

	get_last4(): string{
		return this.last4;
	}

	set_last4(value: string){
		this.last4 = value;
	}

	get_type(): string{
		return this.type;
	}

	set_type(value: string){
		this.type = value;
	}

	get_expire_month(): number{
		return this.expire_month;
	}

	set_expire_month(value: number){
		this.expire_month = value;
	}

	get_expire_year(): number{
		return this.expire_year;
	}

	set_expire_year(value: number){
		this.expire_year = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_credit_card_id(data.credit_card_id);
		this.set_payer_id(data.payer_id);
		this.set_last4(data.last4);
		this.set_type(data.type);
		this.set_expire_month(data.expire_month);
		this.set_expire_year(data.expire_year);

		return this;
	}
}

export class PayPalPaymentPayerInfoModel{
	private email: string;
	private salutation: string;
	private first_name: string;
	private middle_name: string;
	private last_name: string;
	private suffix: string;
	private payer_id: string;
	private birth_date: string;
	private tax_id: string;
	private tax_id_type: string;
	private country_code: string;
	private billing_address: PayPalPaymentAddressModel;
	private shipping_address: PayPalPaymentShippingAddressModel;

	get_email(): string{
		return this.email;
	}

	set_email(value: string): void{
		this.email = value;
	}

	get_salutation(): string{
		return this.salutation;
	}

	set_salutation(value: string): void{
		this.salutation = value;
	}

	get_first_name(): string{
		return this.first_name;
	}

	set_first_name(value: string): void{
		this.first_name = value;
	}

	get_middle_name(): string{
		return this.middle_name;
	}

	set_middle_name(value: string): void{
		this.middle_name = value;
	}

	get_last_name(): string{
		return this.last_name;
	}

	set_last_name(value: string): void{
		this.last_name = value;
	}

	get_suffix(): string{
		return this.suffix;
	}

	set_suffix(value: string): void{
		this.suffix = value;
	}

	get_payer_id(): string{
		return this.payer_id;
	}

	set_payer_id(value: string): void{
		this.payer_id = value;
	}

	get_birth_date(): string{
		return this.birth_date;
	}

	set_birth_date(value: string): void{
		this.birth_date = value;
	}

	get_tax_id(): string{
		return this.tax_id;
	}

	set_tax_id(value: string): void{
		this.tax_id = value;
	}

	get_tax_id_type(): string{
		return this.tax_id_type;
	}

	set_tax_id_type(value: string): void{
		this.tax_id_type = value;
	}

	get_country_code(): string{
		return this.country_code;
	}

	set_country_code(value: string): void{
		this.country_code = value;
	}

	get_billing_address(): PayPalPaymentAddressModel{
		return this.billing_address;
	}

	set_billing_address(value: PayPalPaymentAddressModel): void{
		this.billing_address = value;
	}

	get_shipping_address(): PayPalPaymentShippingAddressModel{
		return this.shipping_address;
	}

	set_shipping_address(value: PayPalPaymentShippingAddressModel): void{
		this.shipping_address = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_email(data.email);
		this.set_salutation(data.salutation);
		this.set_first_name(data.first_name);
		this.set_middle_name(data.middle_name);
		this.set_last_name(data.last_name);
		this.set_suffix(data.suffix);
		this.set_payer_id(data.payer_id);
		this.set_birth_date(data.birth_date);
		this.set_tax_id(data.tax_id);
		this.set_tax_id_type(data.tax_id_type);
		this.set_country_code(data.country_code);

		let billing: PayPalPaymentAddressModel = new PayPalPaymentAddressModel();
		this.set_billing_address(billing.fromJson(data.billing_address));

		let shipping: PayPalPaymentShippingAddressModel = new PayPalPaymentShippingAddressModel();
		this.set_shipping_address(shipping.fromJson(data.shipping_address));

		return this;
	}
}

export class PayPalPaymentShippingAddressModel{
	private line1: string;
	private line2: string;
	private city: string;
	private country_code: string;
	private postal_code: string;
	private state: string;
	private phone: string;
	private type: string;
	private recipient_name: string;

	get_line1(): string{
		return this.line1;
	}

	set_line1(value: string): void{
		this.line1 = value;
	}

	get_line2(): string{
		return this.line2;
	}

	set_line2(value: string): void{
		this.line2 = value;
	}

	get_city(): string{
		return this.city;
	}

	set_city(value: string): void{
		this.city = value;
	}

	get_country_code(): string{
		return this.country_code;
	}

	set_country_code(value: string): void{
		this.country_code = value;
	}

	get_postal_code(): string{
		return this.postal_code;
	}

	set_postal_code(value: string): void{
		this.postal_code = value;
	}

	get_state(): string{
		return this.state;
	}

	set_state(value: string): void{
		this.state = value;
	}

	get_phone(): string{
		return this.phone;
	}

	set_phone(value: string): void{
		this.phone = value;
	}

	get_type(): string{
		return this.type;
	}

	set_type(value: string): void{
		this.type = value;
	}

	get_recipient_name(): string{
		return this.recipient_name;
	}

	set_recipient_name(value: string): void{
		this.recipient_name = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_line1(data.line1);
		this.set_line2(data.line2);
		this.set_city(data.city);
		this.set_country_code(data.country_code);
		this.set_postal_code(data.postal_code);
		this.set_state(data.state);
		this.set_phone(data.phone);
		this.set_type(data.type);
		this.set_recipient_name(data.recipient_name);

		return this;
	}
}

export class PayPalPaymentApplicationContextModel{
	private brand_name: string;
	private locale: string;
	private landing_page: string;
	private shipping_preference: string;
	private user_action: string;

	get_brand_name(): string{
		return this.brand_name;
	}

	set_brand_name(value: string): void{
		this.brand_name = value;
	}

	get_locale(): string{
		return this.locale;
	}

	set_locale(value: string): void{
		this.locale = value;
	}

	get_landing_page(): string{
		return this.landing_page;
	}

	set_landing_page(value: string): void{
		this.landing_page = value;
	}

	get_shipping_preference(): string{
		return this.shipping_preference;
	}

	set_shipping_preference(value: string): void{
		this.shipping_preference = value;
	}

	get_user_action(): string{
		return this.user_action;
	}

	set_user_action(value: string): void{
		this.user_action = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_brand_name(data.brand_name);
		this.set_locale(data.locale);
		this.set_landing_page(data.landing_page);
		this.set_shipping_preference(data.shipping_preference);
		this.set_user_action(data.user_action);

		return this;
	}
}

export class PayPalPaymentTransactionModel{
	private amount: PayPalPaymentAmountModel;
	private payee: PayPalPaymentPayeeModel;
	private description: string;
	private note_to_payee: string;
	private custom: string;
	private invoice_number: string;
	private soft_descriptor: string;
	private payment_options: PayPalPaymentPaymentOptionModel;
	private item_list: PayPalPaymentItemListModel;
	private notify_url: string;
	private related_resources: Array<PayPalPaymentRelatedResourceModel>;

	get_amount(): PayPalPaymentAmountModel{
		return this.amount;
	}

	set_amount(value: PayPalPaymentAmountModel): void{
		this.amount = value;
	}

	get_payee(): PayPalPaymentPayeeModel{
		return this.payee;
	}

	set_payee(value: PayPalPaymentPayeeModel): void{
		this.payee = value;
	}

	get_description(): string{
		return this.description;
	}

	set_description(value: string){
		this.description = value;
	}

	get_note_to_payee(): string{
		return this.note_to_payee;
	}

	set_note_to_payee(value: string){
		this.note_to_payee = value;
	}

	get_custom(): string{
		return this.custom;
	}

	set_custom(value: string){
		this.custom = value;
	}

	get_invoice_number(): string{
		return this.invoice_number;
	}

	set_invoice_number(value: string){
		this.invoice_number = value;
	}

	get_soft_descriptor(): string{
		return this.soft_descriptor;
	}

	set_soft_descriptor(value: string){
		this.soft_descriptor = value;
	}

	get_payment_options(): PayPalPaymentPaymentOptionModel{
		return this.payment_options;
	}

	set_payment_options(value: PayPalPaymentPaymentOptionModel): void{
		this.payment_options = value;
	}

	get_item_list(): PayPalPaymentItemListModel{
		return this.item_list;
	}

	set_item_list(value: PayPalPaymentItemListModel): void{
		this.item_list = value;
	}

	get_notify_url(): string{
		return this.notify_url;
	}

	set_notify_url(value: string){
		this.notify_url = value;
	}

	get_related_resources(): Array<PayPalPaymentRelatedResourceModel>{
		return this.related_resources;
	}

	get_related_resource(key: number): PayPalPaymentRelatedResourceModel{
		return this.related_resources[key];
	}

	set_related_resources(value: Array<PayPalPaymentRelatedResourceModel>): void{
		this.related_resources = value;
	}

	set_related_resource(value: PayPalPaymentRelatedResourceModel): void{
		this.related_resources.push(value);
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		let amount: PayPalPaymentAmountModel = new PayPalPaymentAmountModel();
		this.set_amount(amount.fromJson(data.amount));

		let payee: PayPalPaymentPayeeModel = new PayPalPaymentPayeeModel();
		this.set_payee(payee.fromJson(data.payee));

		this.set_description(data.description);
		this.set_note_to_payee(data.note_to_payee);
		this.set_custom(data.custom);
		this.set_invoice_number(data.invoice_number);
		this.set_soft_descriptor(data.soft_descriptor);

		let option: PayPalPaymentPaymentOptionModel = new PayPalPaymentPaymentOptionModel();
		this.set_payment_options(option.fromJson(data.payment_options));

		let list: PayPalPaymentItemListModel = new PayPalPaymentItemListModel();
		this.set_item_list(list.fromJson(data.item_list));

		this.set_notify_url(data.notify_url);

		if(data.related_resources){
			for(let related of data.related_resources){
				let model: PayPalPaymentRelatedResourceModel = new PayPalPaymentRelatedResourceModel();
				this.set_related_resource(model.fromJson(related));
			}
		}

		return this;
	}
}

export class PayPalPaymentAmountModel{
	private currency: string;
	private total: string;
	private details: PayPalPaymentAmountDetailModel;

	get_currency(): string{
		return this.currency;
	}

	set_currency(value: string): void{
		this.currency = value;
	}

	get_total(): string{
		return this.total;
	}

	set_total(value: string): void{
		this.total = value;
	}

	get_details(): PayPalPaymentAmountDetailModel{
		return this.details;
	}

	set_details(value: PayPalPaymentAmountDetailModel): void{
		this.details = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_currency(data.currency);
		this.set_total(data.total);

		let detail: PayPalPaymentAmountDetailModel = new PayPalPaymentAmountDetailModel();
		this.set_details(detail.fromJson(data.details));

		return this;
	}
}

export class PayPalPaymentAmountDetailModel{
	private subtotal: string;
	private shipping: string;
	private tax: string;
	private handling_fee: string;
	private shipping_discount: string;
	private insurance: string;
	private gift_wrap: string;

	get_subtotal(): string{
		return this.subtotal;
	}

	set_subtotal(value: string): void{
		this.subtotal = value;
	}

	get_shipping(): string{
		return this.shipping;
	}

	set_shipping(value: string): void{
		this.shipping = value;
	}

	get_tax(): string{
		return this.tax;
	}

	set_tax(value: string): void{
		this.tax = value;
	}

	get_handling_fee(): string{
		return this.handling_fee;
	}

	set_handling_fee(value: string): void{
		this.handling_fee = value;
	}

	get_shipping_discount(): string{
		return this.shipping_discount;
	}

	set_shipping_discount(value: string): void{
		this.shipping_discount = value;
	}

	get_insurance(): string{
		return this.insurance;
	}

	set_insurance(value: string): void{
		this.insurance = value;
	}

	get_gift_wrap(): string{
		return this.gift_wrap;
	}

	set_gift_wrap(value: string): void{
		this.gift_wrap = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_subtotal(data.subtotal);
		this.set_shipping(data.shipping);
		this.set_tax(data.tax);
		this.set_handling_fee(data.handling_fee);
		this.set_shipping_discount(data.shipping_discount);
		this.set_insurance(data.insurance);
		this.set_gift_wrap(data.gift_wrap);

		return this;
	}
}

export class PayPalPaymentPayeeModel{
	private email: string;
	private merchant_id: string;
	private payee_display_metadata: PayPalPaymentPayeeMetaModel;

	get_email(): string{
		return this.email;
	}

	set_email(value: string): void{
		this.email = value;
	}

	get_merchant_id(): string{
		return this.merchant_id;
	}

	set_merchant_id(value: string): void{
		this.merchant_id = value;
	}

	get_payee_display_metadata(): PayPalPaymentPayeeMetaModel{
		return this.payee_display_metadata;
	}

	set_payee_display_metadata(value: PayPalPaymentPayeeMetaModel): void{
		this.payee_display_metadata = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_email(data.email);
		this.set_merchant_id(data.merchant_id);

		let meta: PayPalPaymentPayeeMetaModel = new PayPalPaymentPayeeMetaModel();
		this.set_payee_display_metadata(meta.fromJson(data.payee_display_metadata));

		return this;
	}
}

export class PayPalPaymentPayeeMetaModel{
	private email: string;
	private display_phone: PayPalPaymentPhoneModel;
	private brand_name: string;

	get_email(): string{
		return this.email;
	}

	set_email(value: string): void{
		this.email = value;
	}

	get_display_phone(): PayPalPaymentPhoneModel{
		return this.display_phone;
	}

	set_display_phone(value: PayPalPaymentPhoneModel): void{
		this.display_phone = value;
	}

	get_brand_name(): string{
		return this.brand_name;
	}

	set_brand_name(value: string): void{
		this.brand_name = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_email(data.email);

		let meta: PayPalPaymentPhoneModel = new PayPalPaymentPhoneModel();
		this.set_display_phone(meta.fromJson(data.display_phone));

		this.set_brand_name(data.brand_name);

		return this;
	}
}

export class PayPalPaymentPhoneModel{
	private country_code: string;
	private number: string;

	get_country_code(): string{
		return this.country_code;
	}

	set_country_code(value: string): void{
		this.country_code = value;
	}

	get_number(): string{
		return this.number;
	}

	set_number(value: string): void{
		this.number = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_country_code(data.country_code);
		this.set_number(data.number);

		return this;
	}
}

export class PayPalPaymentPaymentOptionModel{
	private allowed_payment_method: string;

	get_allowed_payment_method(): string{
		return this.allowed_payment_method;
	}

	set_allowed_payment_method(value: string): void{
		this.allowed_payment_method = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_allowed_payment_method(data.allowed_payment_method);

		return this;
	}
}

export class PayPalPaymentItemListModel{
	private items: Array<PayPalPaymentItemModel>;
	private shipping_address: PayPalPaymentShippingAddressModel;
	private shipping_phone_number: string;

	get_items(): Array<PayPalPaymentItemModel>{
		return this.items;
	}

	get_item(key: number): PayPalPaymentItemModel{
		return this.items[key];
	}

	set_items(value: Array<PayPalPaymentItemModel>){
		this.items = value;
	}

	set_item(value: PayPalPaymentItemModel){
		this.items.push(value);
	}

	get_shipping_address(): PayPalPaymentShippingAddressModel{
		return this.shipping_address;
	}

	set_shipping_address(value: PayPalPaymentShippingAddressModel): void{
		this.shipping_address = value;
	}

	get_shipping_phone_number(): string{
		return this.shipping_phone_number;
	}

	set_shipping_phone_number(value: string){
		this.shipping_phone_number = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		if(data.items){
			for(let item of data.items){
				let model: PayPalPaymentItemModel = new PayPalPaymentItemModel();
				this.set_item(model.fromJson(item));
			}
		}
		
		let shipping: PayPalPaymentShippingAddressModel = new PayPalPaymentShippingAddressModel();
		this.set_shipping_address(shipping.fromJson(data.shipping_address));

		this.set_shipping_phone_number(data.shipping_phone_number);

		return this;
	}
}

export class PayPalPaymentRelatedResourceModel{
	private sale: PayPalPaymentSaleResourceModel;
	private authorization: PayPalPaymentAuthorizationResourceModel;
	private order: PayPalPaymentOrderResourceModel;
	private capture: PayPalPaymentCaptureResourceModel;
	private refund: PayPalPaymentRefundResourceModel;

	get_sale(): PayPalPaymentSaleResourceModel{
		return this.sale;
	}

	set_sale(value: PayPalPaymentSaleResourceModel): void{
		this.sale = value;
	}

	get_authorization(): PayPalPaymentAuthorizationResourceModel{
		return this.authorization;
	}

	set_authorization(value: PayPalPaymentAuthorizationResourceModel): void{
		this.authorization = value;
	}

	get_order(): PayPalPaymentOrderResourceModel{
		return this.order;
	}

	set_order(value: PayPalPaymentOrderResourceModel): void{
		this.order = value;
	}

	get_capture(): PayPalPaymentCaptureResourceModel{
		return this.capture;
	}

	set_capture(value: PayPalPaymentCaptureResourceModel): void{
		this.capture = value;
	}

	get_refund(): PayPalPaymentRefundResourceModel{
		return this.refund;
	}

	set_refund(value: PayPalPaymentRefundResourceModel): void{
		this.refund = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_sale(data.sale);
		this.set_authorization(data.authorization);
		this.set_order(data.order);
		this.set_capture(data.capture);
		this.set_refund(data.refund);

		return this;
	}
}

export class PayPalPaymentSaleResourceModel{

}

export class PayPalPaymentAuthorizationResourceModel{

}

export class PayPalPaymentOrderResourceModel{

}

export class PayPalPaymentCaptureResourceModel{

}

export class PayPalPaymentRefundResourceModel{

}

export class PayPalPaymentItemModel{
	private sku: string;
	private name: string;
	private description: string;
	private quantity: string;
	private price: string;
	private currency: string;
	private tax: string;

	get_sku(): string{
		return this.sku;
	}

	set_sku(value: string){
		this.sku = value;
	}

	get_name(): string{
		return this.name;
	}

	set_name(value: string){
		this.name = value;
	}

	get_description(): string{
		return this.description;
	}

	set_description(value: string){
		this.description = value;
	}

	get_quantity(): string{
		return this.quantity;
	}

	set_quantity(value: string){
		this.quantity = value;
	}

	get_price(): string{
		return this.price;
	}

	set_price(value: string){
		this.price = value;
	}

	get_currency(): string{
		return this.currency;
	}

	set_currency(value: string){
		this.currency = value;
	}

	get_tax(): string{
		return this.tax;
	}

	set_tax(value: string){
		this.tax = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_sku(data.sku);
		this.set_name(data.name);
		this.set_description(data.description);
		this.set_quantity(data.quantity);
		this.set_price(data.price);
		this.set_currency(data.currency);
		this.set_tax(data.tax);

		return this;
	}
}

export class PayPalPaymentRedirectUrlModel{
	private return_url: string;
	private cancel_url: string;

	get_return_url(): string{
		return this.return_url;
	}

	set_return_url(value: string){
		this.return_url = value;
	}

	get_cancel_url(): string{
		return this.cancel_url;
	}

	set_cancel_url(value: string){
		this.cancel_url = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.set_return_url(data.return_url);
		this.set_cancel_url(data.cancel_url);

		return this;
	}
}