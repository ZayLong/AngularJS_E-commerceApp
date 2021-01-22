// ENUMS

export enum PayPalCardType{
	Visa = 'visa',
	Mastercard = 'mastercard',
	AmericanExpress = 'amex',
	Discover = 'discover',
	Maestro = 'maestro'
}

export enum PayPalCardState{
	Expired = 'expired',
	Ok = 'ok'
}

// REQUESTS

export class PayPalVaultStoreRequestModel{
	private number: string;
	private type: string;
	private expire_month: string;
	private expire_year: string;
	private first_name: string;
	private last_name: string;
	private billing_address: PayPalVaultAddressModel;
	private external_customer_id: string;
	private merchant_id: string;
	private payer_id: string;
	private external_card_id: string;

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

	get_billing_address(): PayPalVaultAddressModel{
		return this.billing_address;
	}

	set_billing_address(value: PayPalVaultAddressModel){
		this.billing_address = value;
	}

	get_external_customer_id(): string{
		return this.external_customer_id;
	}

	set_external_customer_id(value: string){
		this.external_customer_id = value;
	}

	get_merchant_id(): string{
		return this.merchant_id;
	}

	set_merchant_id(value: string){
		this.merchant_id = value;
	}

	get_payer_id(): string{
		return this.payer_id;
	}

	set_payer_id(value: string){
		this.payer_id = value;
	}

	get_external_card_id(): string{
		return this.external_card_id;
	}

	set_external_card_id(value: string){
		this.external_card_id = value;
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
		this.set_first_name(data.first_name);
		this.set_last_name(data.last_name);
		
		let address: PayPalVaultAddressModel = new PayPalVaultAddressModel();
		this.set_billing_address(address.fromJson(data.billing_address));

		this.set_external_customer_id(data.external_customer_id);
		this.set_merchant_id(data.merchant_id);
		this.set_payer_id(data.payer_id);
		this.set_external_card_id(data.external_card_id);

		return this;
	}
}

// RESPONSES

export class PayPalVaultListResponseModel{
	private items: Array<PayPalVaultCreditCardModel> = [];
	private links: Array<PayPalVaultLinkDescriptionModel> = [];
	private total_items: number;
	private total_pages: number;

	get_items(): Array<PayPalVaultCreditCardModel>{
		return this.items;
	}

	get_item(key: number): PayPalVaultCreditCardModel{
		return this.items[key];
	}

	set_items(value: Array<PayPalVaultCreditCardModel>){
		this.items = value;
	}

	set_item(value: PayPalVaultCreditCardModel){
		this.items.push(value);
	}

	get_links(): Array<PayPalVaultLinkDescriptionModel>{
		return this.links;
	}

	get_link(key: number): PayPalVaultLinkDescriptionModel{
		return this.links[key];
	}

	set_links(value: Array<PayPalVaultLinkDescriptionModel>){
		this.links = value;
	}

	set_link(value: PayPalVaultLinkDescriptionModel){
		this.links.push(value);
	}

	get_total_items(): number{
		return this.total_items;
	}

	set_total_items(value: number){
		this.total_items = value;
	}

	get_total_pages(): number{
		return this.total_pages;
	}

	set_total_pages(value: number){
		this.total_pages = value;
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
				let model: PayPalVaultCreditCardModel = new PayPalVaultCreditCardModel();
				this.set_item(model.fromJson(item));
			}
		}

		if(data.links){
			for(let link of data.links){
				let model: PayPalVaultLinkDescriptionModel = new PayPalVaultLinkDescriptionModel();
				this.set_link(model.fromJson(link));
			}
		}

		this.set_total_items(data.total_items);
		this.set_total_pages(data.total_pages);

		return this;
	}
}

// PARTS

export class PayPalVaultAddressModel{
	private line1: string;
	private line2: string;
	private city: string;
	private state: string;
	private country_code: string;
	private postal_code: string;

	get_line1(): string{
		return this.line1;
	}

	set_line1(value: string){
		this.line1 = value;
	}

	get_line2(): string{
		return this.line2;
	}

	set_line2(value: string){
		this.line2 = value;
	}

	get_city(): string{
		return this.city;
	}

	set_city(value: string){
		this.city = value;
	}

	get_state(): string{
		return this.state;
	}

	set_state(value: string){
		this.state = value;
	}

	get_country_code(): string{
		return this.country_code;
	}

	set_country_code(value: string){
		this.country_code = value;
	}

	get_postal_code(): string{
		return this.postal_code;
	}

	set_postal_code(value: string){
		this.postal_code = value;
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
		this.set_state(data.state);
		this.set_country_code(data.country_code);
		this.set_postal_code(data.postal_code);

		return this;
	}
}

export class PayPalVaultCreditCardModel{
	private id: string;
	private number: string;
	private type: string;
	private expire_month: string;
	private expire_year: string;
	private first_name: string;
	private last_name: string;
	private billing_address: PayPalVaultAddressModel;
	private external_customer_id: string;
	private merchant_id: string;
	private payer_id: string;
	private external_card_id: string;
	private state: string;
	private create_time: string;
	private update_time: string;
	private valid_until: string;
	private links: Array<PayPalVaultLinkDescriptionModel> = [];

	get_id(): string{
		return this.id;
	}

	set_id(value: string){
		this.id = value;
	}

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

	get_billing_address(): PayPalVaultAddressModel{
		return this.billing_address;
	}

	set_billing_address(value: PayPalVaultAddressModel){
		this.billing_address = value;
	}

	get_external_customer_id(): string{
		return this.external_customer_id;
	}

	set_external_customer_id(value: string){
		this.external_customer_id = value;
	}

	get_merchant_id(): string{
		return this.merchant_id;
	}

	set_merchant_id(value: string){
		this.merchant_id = value;
	}

	get_payer_id(): string{
		return this.payer_id;
	}

	set_payer_id(value: string){
		this.payer_id = value;
	}

	get_external_card_id(): string{
		return this.external_card_id;
	}

	set_external_card_id(value: string){
		this.external_card_id = value;
	}

	get_state(): string{
		return this.state;
	}

	set_state(value: string){
		this.state = value;
	}

	get_create_time(): string{
		return this.create_time;
	}

	set_create_time(value: string){
		this.create_time = value;
	}

	get_update_time(): string{
		return this.update_time;
	}

	set_update_time(value: string){
		this.update_time = value;
	}

	get_valid_until(): string{
		return this.valid_until;
	}

	set_valid_until(value: string){
		this.valid_until = value;
	}

	get_links(): Array<PayPalVaultLinkDescriptionModel>{
		return this.links;
	}

	get_link(key: number): PayPalVaultLinkDescriptionModel{
		return this.links[key];
	}

	set_links(value: Array<PayPalVaultLinkDescriptionModel>){
		this.links = value;
	}

	set_link(value: PayPalVaultLinkDescriptionModel){
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
		this.set_number(data.number);
		this.set_type(data.type);
		this.set_expire_month(data.expire_month);
		this.set_expire_year(data.expire_year);
		this.set_first_name(data.first_name);
		this.set_last_name(data.last_name);
		this.set_billing_address(data.billing_address);
		this.set_external_customer_id(data.external_customer_id);
		this.set_merchant_id(data.merchant_id);
		this.set_payer_id(data.payer_id);
		this.set_external_card_id(data.external_card_id);
		this.set_state(data.state);
		this.set_create_time(data.create_time);
		this.set_update_time(data.update_time);
		this.set_valid_until(data.valid_until);
		
		if(data.links){
			for(let link of data.links){
				let model: PayPalVaultLinkDescriptionModel = new PayPalVaultLinkDescriptionModel();
				this.set_link(model.fromJson(link));
			}
		}

		return this;
	}
}

export class PayPalVaultLinkDescriptionModel{
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