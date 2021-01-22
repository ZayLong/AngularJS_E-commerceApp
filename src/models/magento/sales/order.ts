import { AddressModel } from '../general/address';

export class OrderModel{
	private _adjustment_negative: number;
	private _adjustment_positive: number;
	private _applied_rule_ids: string;
	private _base_adjustment_negative: number;
	private _base_adjustment_positive: number;
	private _base_currency_code: string;
	private _base_discount_amount: number;
	private _base_discount_canceled: number;
	private _base_discount_invoiced: number;
	private _base_discount_refunded: number;
	private _base_grand_total: number;
	private _base_discount_tax_compensation_amount: number;
	private _base_discount_tax_compensation_invoiced: number;
	private _base_discount_tax_compensation_refunded: number;
	private _base_shipping_amount: number;
	private _base_shipping_canceled: number;
	private _base_shipping_discount_amount: number;
	private _base_shipping_discount_tax_compensation_amnt: number;
	private _base_shipping_incl_tax: number;
	private _base_shipping_invoiced: number;
	private _base_shipping_refunded: number;
	private _base_shipping_tax_amount: number;
	private _base_shipping_tax_refunded: number;
	private _base_subtotal: number;
	private _base_subtotal_canceled: number;
	private _base_subtotal_incl_tax: number;
	private _base_subtotal_invoiced: number;
	private _base_subtotal_refunded: number;
	private _base_tax_amount: number;
	private _base_tax_canceled: number;
	private _base_tax_invoiced: number;
	private _base_tax_refunded: number;
	private _base_total_canceled: number;
	private _base_total_due: number;
	private _base_total_invoiced: number;
	private _base_total_invoiced_cost: number;
	private _base_total_offline_refunded: number;
	private _base_total_online_refunded: number;
	private _base_total_paid: number;
	private _base_total_qty_ordered: number;
	private _base_total_refunded: number;
	private _base_to_global_rate: number;
	private _base_to_order_rate: number;
	private _billing_address_id: number;
	private _can_ship_partially: number;
	private _can_ship_partially_item: number;
	private _coupon_code: string;
	private _created_at: string;
	private _customer_dob: string;
	private _customer_email: string;
	private _customer_firstname: string;
	private _customer_gender: number;
	private _customer_group_id: number;
	private _customer_id: number;
	private _customer_is_guest: number;
	private _customer_lastname: string;
	private _customer_middlename: string;
	private _customer_note: string;
	private _customer_note_notify: number;
	private _customer_prefix: string;
	private _customer_suffix: string;
	private _customer_taxvat: string;
	private _discount_amount: number;
	private _discount_canceled: number;
	private _discount_description: string;
	private _discount_invoiced: number;
	private _discount_refunded: number;
	private _edit_increment: number;
	private _email_sent: number;
	private _entity_id: number;
	private _ext_customer_id: string;
	private _ext_order_id: string;
	private _forced_shipment_with_invoice: number;
	private _global_currency_code: string;
	private _grand_total: number;
	private _discount_tax_compensation_amount: number;
	private _discount_tax_compensation_invoiced: number;
	private _discount_tax_compensation_refunded: number;
	private _hold_before_state: string;
	private _hold_before_status: string;
	private _increment_id: string;
	private _is_virtual: number;
	private _order_currency_code: string;
	private _original_increment_id: string;
	private _payment_authorization_amount: number;
	private _payment_auth_expiration: number;
	private _protect_code: string;
	private _quote_address_id: number;
	private _quote_id: number;
	private _relation_child_id: string;
	private _relation_child_real_id: string;
	private _relation_parent_id: string;
	private _relation_parent_real_id: string;
	private _remote_ip: string;
	private _shipping_amount: number;
	private _shipping_canceled: number;
	private _shipping_description: string;
	private _shipping_discount_amount: number;
	private _shipping_discount_tax_compensation_amount: number;
	private _shipping_incl_tax: number;
	private _shipping_invoiced: number;
	private _shipping_refunded: number;
	private _shipping_tax_amount: number;
	private _shipping_tax_refunded: number;
	private _state: string;
	private _status: string;
	private _store_currency_code: string;
	private _store_id: number;
	private _store_name: string;
	private _store_to_base_rate: number;
	private _store_to_order_rate: number;
	private _subtotal: number;
	private _subtotal_canceled: number;
	private _subtotal_incl_tax: number;
	private _subtotal_invoiced: number;
	private _subtotal_refunded: number;
	private _tax_amount: number;
	private _tax_canceled: number;
	private _tax_invoiced: number;
	private _tax_refunded: number;
	private _total_canceled: number;
	private _total_due: number;
	private _total_invoiced: number;
	private _total_item_count: number;
	private _total_offline_refunded: number;
	private _total_online_refunded: number;
	private _total_paid: number;
	private _total_qty_ordered: number;
	private _total_refunded: number;
	private _updated_at: string;
	private _weight: number;
	private _x_forwarded_for: string;
	private _items: Array<OrderItemModel> = [];
	private _billing_address: OrderAddressModel;
	private _payment: OrderPaymentModel;
	private _status_histories: Array<OrderStatusHistoryModel> = [];
	private _extension_attributes: OrderExtensionModel;

	get adjustment_negative(): number{
		return this._adjustment_negative;
	}

	set adjustment_negative(value: number){
		this._adjustment_negative = value;
	}

	get adjustment_positive(): number{
		return this._adjustment_positive;
	}

	set adjustment_positive(value: number){
		this._adjustment_positive = value;
	}

	get applied_rule_ids(): string{
		return this._applied_rule_ids;
	}

	set applied_rule_ids(value: string){
		this._applied_rule_ids = value;
	}

	get base_adjustment_negative(): number{
		return this._base_adjustment_negative;
	}

	set base_adjustment_negative(value: number){
		this._base_adjustment_negative = value;
	}

	get base_adjustment_positive(): number{
		return this._base_adjustment_positive;
	}

	set base_adjustment_positive(value: number){
		this._base_adjustment_positive = value;
	}

	get base_currency_code(): string{
		return this._base_currency_code;
	}

	set base_currency_code(value: string){
		this._base_currency_code = value;
	}

	get base_discount_amount(): number{
		return this._base_discount_amount;
	}

	set base_discount_amount(value: number){
		this._base_discount_amount = value;
	}

	get base_discount_canceled(): number{
		return this._base_discount_canceled;
	}

	set base_discount_canceled(value: number){
		this._base_discount_canceled = value;
	}

	get base_discount_invoiced(): number{
		return this._base_discount_invoiced;
	}

	set base_discount_invoiced(value: number){
		this._base_discount_invoiced = value;
	}

	get base_discount_refunded(): number{
		return this._base_discount_refunded;
	}

	set base_discount_refunded(value: number){
		this._base_discount_refunded = value;
	}

	get base_grand_total(): number{
		return this._base_grand_total;
	}

	set base_grand_total(value: number){
		this._base_grand_total = value;
	}

	get base_discount_tax_compensation_amount(): number{
		return this._base_discount_tax_compensation_amount;
	}

	set base_discount_tax_compensation_amount(value: number){
		this._base_discount_tax_compensation_amount = value;
	}

	get base_discount_tax_compensation_invoiced(): number{
		return this._base_discount_tax_compensation_invoiced;
	}

	set base_discount_tax_compensation_invoiced(value: number){
		this._base_discount_tax_compensation_invoiced = value;
	}

	get base_discount_tax_compensation_refunded(): number{
		return this._base_discount_tax_compensation_refunded;
	}

	set base_discount_tax_compensation_refunded(value: number){
		this._base_discount_tax_compensation_refunded = value;
	}

	get base_shipping_amount(): number{
		return this._base_shipping_amount;
	}

	set base_shipping_amount(value: number){
		this._base_shipping_amount = value;
	}

	get base_shipping_canceled(): number{
		return this._base_shipping_canceled;
	}

	set base_shipping_canceled(value: number){
		this._base_shipping_canceled = value;
	}

	get base_shipping_discount_amount(): number{
		return this._base_shipping_discount_amount;
	}

	set base_shipping_discount_amount(value: number){
		this._base_shipping_discount_amount = value;
	}

	get base_shipping_discount_tax_compensation_amnt(): number{
		return this._base_shipping_discount_tax_compensation_amnt;
	}

	set base_shipping_discount_tax_compensation_amnt(value: number){
		this._base_shipping_discount_tax_compensation_amnt = value;
	}

	get base_shipping_incl_tax(): number{
		return this._base_shipping_incl_tax;
	}

	set base_shipping_incl_tax(value: number){
		this._base_shipping_incl_tax = value;
	}

	get base_shipping_invoiced(): number{
		return this._base_shipping_invoiced;
	}

	set base_shipping_invoiced(value: number){
		this._base_shipping_invoiced = value;
	}

	get base_shipping_refunded(): number{
		return this._base_shipping_refunded;
	}

	set base_shipping_refunded(value: number){
		this._base_shipping_refunded = value;
	}

	get base_shipping_tax_amount(): number{
		return this._base_shipping_tax_amount;
	}

	set base_shipping_tax_amount(value: number){
		this._base_shipping_tax_amount = value;
	}

	get base_shipping_tax_refunded(): number{
		return this._base_shipping_tax_refunded;
	}

	set base_shipping_tax_refunded(value: number){
		this._base_shipping_tax_refunded = value;
	}

	get base_subtotal(): number{
		return this._base_subtotal;
	}

	set base_subtotal(value: number){
		this._base_subtotal = value;
	}

	get base_subtotal_canceled(): number{
		return this._base_subtotal_canceled;
	}

	set base_subtotal_canceled(value: number){
		this._base_subtotal_canceled = value;
	}

	get base_subtotal_incl_tax(): number{
		return this._base_subtotal_incl_tax;
	}

	set base_subtotal_incl_tax(value: number){
		this._base_subtotal_incl_tax = value;
	}

	get base_subtotal_invoiced(): number{
		return this._base_subtotal_invoiced;
	}

	set base_subtotal_invoiced(value: number){
		this._base_subtotal_invoiced = value;
	}

	get base_subtotal_refunded(): number{
		return this._base_subtotal_refunded;
	}

	set base_subtotal_refunded(value: number){
		this._base_subtotal_refunded = value;
	}

	get base_tax_amount(): number{
		return this._base_tax_amount;
	}

	set base_tax_amount(value: number){
		this._base_tax_amount = value;
	}

	get base_tax_canceled(): number{
		return this._base_tax_canceled;
	}

	set base_tax_canceled(value: number){
		this._base_tax_canceled = value;
	}

	get base_tax_invoiced(): number{
		return this._base_tax_invoiced;
	}

	set base_tax_invoiced(value: number){
		this._base_tax_invoiced = value;
	}

	get base_tax_refunded(): number{
		return this._base_tax_refunded;
	}

	set base_tax_refunded(value: number){
		this._base_tax_refunded = value;
	}

	get base_total_canceled(): number{
		return this._base_total_canceled;
	}

	set base_total_canceled(value: number){
		this._base_total_canceled = value;
	}

	get base_total_due(): number{
		return this._base_total_due;
	}

	set base_total_due(value: number){
		this._base_total_due = value;
	}

	get base_total_invoiced(): number{
		return this._base_total_invoiced;
	}

	set base_total_invoiced(value: number){
		this._base_total_invoiced = value;
	}

	get base_total_invoiced_cost(): number{
		return this._base_total_invoiced_cost;
	}

	set base_total_invoiced_cost(value: number){
		this._base_total_invoiced_cost = value;
	}

	get base_total_offline_refunded(): number{
		return this._base_total_offline_refunded;
	}

	set base_total_offline_refunded(value: number){
		this._base_total_offline_refunded = value;
	}

	get base_total_online_refunded(): number{
		return this._base_total_online_refunded;
	}

	set base_total_online_refunded(value: number){
		this._base_total_online_refunded = value;
	}

	get base_total_paid(): number{
		return this._base_total_paid;
	}

	set base_total_paid(value: number){
		this._base_total_paid = value;
	}

	get base_total_qty_ordered(): number{
		return this._base_total_qty_ordered;
	}

	set base_total_qty_ordered(value: number){
		this._base_total_qty_ordered = value;
	}

	get base_total_refunded(): number{
		return this._base_total_refunded;
	}

	set base_total_refunded(value: number){
		this._base_total_refunded = value;
	}

	get base_to_global_rate(): number{
		return this._base_to_global_rate;
	}

	set base_to_global_rate(value: number){
		this._base_to_global_rate = value;
	}

	get base_to_order_rate(): number{
		return this._base_to_order_rate;
	}

	set base_to_order_rate(value: number){
		this._base_to_order_rate = value;
	}

	get billing_address_id(): number{
		return this._billing_address_id;
	}

	set billing_address_id(value: number){
		this._billing_address_id = value;
	}

	get can_ship_partially(): number{
		return this._can_ship_partially;
	}

	set can_ship_partially(value: number){
		this._can_ship_partially = value;
	}

	get can_ship_partially_item(): number{
		return this._can_ship_partially_item;
	}

	set can_ship_partially_item(value: number){
		this._can_ship_partially_item = value;
	}

	get coupon_code(): string{
		return this._coupon_code;
	}

	set coupon_code(value: string){
		this._coupon_code = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get customer_dob(): string{
		return this._customer_dob;
	}

	set customer_dob(value: string){
		this._customer_dob = value;
	}

	get customer_email(): string{
		return this._customer_email;
	}

	set customer_email(value: string){
		this._customer_email = value;
	}

	get customer_firstname(): string{
		return this._customer_firstname;
	}

	set customer_firstname(value: string){
		this._customer_firstname = value;
	}

	get customer_gender(): number{
		return this._customer_gender;
	}

	set customer_gender(value: number){
		this._customer_gender = value;
	}

	get customer_group_id(): number{
		return this._customer_group_id;
	}

	set customer_group_id(value: number){
		this._customer_group_id = value;
	}

	get customer_id(): number{
		return this._customer_id;
	}

	set customer_id(value: number){
		this._customer_id = value;
	}

	get customer_is_guest(): number{
		return this._customer_is_guest;
	}

	set customer_is_guest(value: number){
		this._customer_is_guest = value;
	}

	get customer_lastname(): string{
		return this._customer_lastname;
	}

	set customer_lastname(value: string){
		this._customer_lastname = value;
	}

	get customer_middlename(): string{
		return this._customer_middlename;
	}

	set customer_middlename(value: string){
		this._customer_middlename = value;
	}

	get customer_note(): string{
		return this._customer_note;
	}

	set customer_note(value: string){
		this._customer_note = value;
	}

	get customer_note_notify(): number{
		return this._customer_note_notify;
	}

	set customer_note_notify(value: number){
		this._customer_note_notify = value;
	}

	get customer_prefix(): string{
		return this._customer_prefix;
	}

	set customer_prefix(value: string){
		this._customer_prefix = value;
	}

	get customer_suffix(): string{
		return this._customer_suffix;
	}

	set customer_suffix(value: string){
		this._customer_suffix = value;
	}

	get customer_taxvat(): string{
		return this._customer_taxvat;
	}

	set customer_taxvat(value: string){
		this._customer_taxvat = value;
	}

	get discount_amount(): number{
		return this._discount_amount;
	}

	set discount_amount(value: number){
		this._discount_amount = value;
	}

	get discount_canceled(): number{
		return this._discount_canceled;
	}

	set discount_canceled(value: number){
		this._discount_canceled = value;
	}

	get discount_description(): string{
		return this._discount_description;
	}

	set discount_description(value: string){
		this._discount_description = value;
	}

	get discount_invoiced(): number{
		return this._discount_invoiced;
	}

	set discount_invoiced(value: number){
		this._discount_invoiced = value;
	}

	get discount_refunded(): number{
		return this._discount_refunded;
	}

	set discount_refunded(value: number){
		this._discount_refunded = value;
	}

	get edit_increment(): number{
		return this._edit_increment;
	}

	set edit_increment(value: number){
		this._edit_increment = value;
	}

	get email_sent(): number{
		return this._email_sent;
	}

	set email_sent(value: number){
		this._email_sent = value;
	}

	get entity_id(): number{
		return this._entity_id;
	}

	set entity_id(value: number){
		this._entity_id = value;
	}

	get ext_customer_id(): string{
		return this._ext_customer_id;
	}

	set ext_customer_id(value: string){
		this._ext_customer_id = value;
	}

	get ext_order_id(): string{
		return this._ext_order_id;
	}

	set ext_order_id(value: string){
		this._ext_order_id = value;
	}

	get forced_shipment_with_invoice(): number{
		return this._forced_shipment_with_invoice;
	}

	set forced_shipment_with_invoice(value: number){
		this._forced_shipment_with_invoice = value;
	}

	get global_currency_code(): string{
		return this._global_currency_code;
	}

	set global_currency_code(value: string){
		this._global_currency_code = value;
	}

	get grand_total(): number{
		return this._grand_total;
	}

	set grand_total(value: number){
		this._grand_total = value;
	}

	get discount_tax_compensation_amount(): number{
		return this._discount_tax_compensation_amount;
	}

	set discount_tax_compensation_amount(value: number){
		this._discount_tax_compensation_amount = value;
	}

	get discount_tax_compensation_invoiced(): number{
		return this._discount_tax_compensation_invoiced;
	}

	set discount_tax_compensation_invoiced(value: number){
		this._discount_tax_compensation_invoiced = value;
	}

	get discount_tax_compensation_refunded(): number{
		return this._discount_tax_compensation_refunded;
	}

	set discount_tax_compensation_refunded(value: number){
		this._discount_tax_compensation_refunded = value;
	}

	get hold_before_state(): string{
		return this._hold_before_state;
	}

	set hold_before_state(value: string){
		this._hold_before_state = value;
	}

	get hold_before_status(): string{
		return this._hold_before_status;
	}

	set hold_before_status(value: string){
		this._hold_before_status = value;
	}

	get increment_id(): string{
		return this._increment_id;
	}

	set increment_id(value: string){
		this._increment_id = value;
	}

	get is_virtual(): number{
		return this._is_virtual;
	}

	set is_virtual(value: number){
		this._is_virtual = value;
	}

	get order_currency_code(): string{
		return this._order_currency_code;
	}

	set order_currency_code(value: string){
		this._order_currency_code = value;
	}

	get original_increment_id(): string{
		return this._original_increment_id;
	}

	set original_increment_id(value: string){
		this._original_increment_id = value;
	}

	get payment_authorization_amount(): number{
		return this._payment_authorization_amount;
	}

	set payment_authorization_amount(value: number){
		this._payment_authorization_amount = value;
	}

	get payment_auth_expiration(): number{
		return this._payment_auth_expiration;
	}

	set payment_auth_expiration(value: number){
		this._payment_auth_expiration = value;
	}

	get protect_code(): string{
		return this._protect_code;
	}

	set protect_code(value: string){
		this._protect_code = value;
	}

	get quote_address_id(): number{
		return this._quote_address_id;
	}

	set quote_address_id(value: number){
		this._quote_address_id = value;
	}

	get quote_id(): number{
		return this._quote_id;
	}

	set quote_id(value: number){
		this._quote_id = value;
	}

	get relation_child_id(): string{
		return this._relation_child_id;
	}

	set relation_child_id(value: string){
		this._relation_child_id = value;
	}

	get relation_child_real_id(): string{
		return this._relation_child_real_id;
	}

	set relation_child_real_id(value: string){
		this._relation_child_real_id = value;
	}

	get relation_parent_id(): string{
		return this._relation_parent_id;
	}

	set relation_parent_id(value: string){
		this._relation_parent_id = value;
	}

	get relation_parent_real_id(): string{
		return this._relation_parent_real_id;
	}

	set relation_parent_real_id(value: string){
		this._relation_parent_real_id = value;
	}

	get remote_ip(): string{
		return this._remote_ip;
	}

	set remote_ip(value: string){
		this._remote_ip = value;
	}

	get shipping_amount(): number{
		return this._shipping_amount;
	}

	set shipping_amount(value: number){
		this._shipping_amount = value;
	}

	get shipping_canceled(): number{
		return this._shipping_canceled;
	}

	set shipping_canceled(value: number){
		this._shipping_canceled = value;
	}

	get shipping_description(): string{
		return this._shipping_description;
	}

	set shipping_description(value: string){
		this._shipping_description = value;
	}

	get shipping_discount_amount(): number{
		return this._shipping_discount_amount;
	}

	set shipping_discount_amount(value: number){
		this._shipping_discount_amount = value;
	}

	get shipping_discount_tax_compensation_amount(): number{
		return this._shipping_discount_tax_compensation_amount;
	}

	set shipping_discount_tax_compensation_amount(value: number){
		this._shipping_discount_tax_compensation_amount = value;
	}

	get shipping_incl_tax(): number{
		return this._shipping_incl_tax;
	}

	set shipping_incl_tax(value: number){
		this._shipping_incl_tax = value;
	}

	get shipping_invoiced(): number{
		return this._shipping_invoiced;
	}

	set shipping_invoiced(value: number){
		this._shipping_invoiced = value;
	}

	get shipping_refunded(): number{
		return this._shipping_refunded;
	}

	set shipping_refunded(value: number){
		this._shipping_refunded = value;
	}

	get shipping_tax_amount(): number{
		return this._shipping_tax_amount;
	}

	set shipping_tax_amount(value: number){
		this._shipping_tax_amount = value;
	}

	get shipping_tax_refunded(): number{
		return this._shipping_tax_refunded;
	}

	set shipping_tax_refunded(value: number){
		this._shipping_tax_refunded = value;
	}

	get state(): string{
		return this._state;
	}

	set state(value: string){
		this._state = value;
	}

	get status(): string{
		return this._status;
	}

	set status(value: string){
		this._status = value;
	}

	get store_currency_code(): string{
		return this._store_currency_code;
	}

	set store_currency_code(value: string){
		this._store_currency_code = value;
	}

	get store_id(): number{
		return this._store_id;
	}

	set store_id(value: number){
		this._store_id = value;
	}

	get store_name(): string{
		return this._store_name;
	}

	set store_name(value: string){
		this._store_name = value;
	}

	get store_to_base_rate(): number{
		return this._store_to_base_rate;
	}

	set store_to_base_rate(value: number){
		this._store_to_base_rate = value;
	}

	get store_to_order_rate(): number{
		return this._store_to_order_rate;
	}

	set store_to_order_rate(value: number){
		this._store_to_order_rate = value;
	}

	get subtotal(): number{
		return this._subtotal;
	}

	set subtotal(value: number){
		this._subtotal = value;
	}

	get subtotal_canceled(): number{
		return this._subtotal_canceled;
	}

	set subtotal_canceled(value: number){
		this._subtotal_canceled = value;
	}

	get subtotal_incl_tax(): number{
		return this._subtotal_incl_tax;
	}

	set subtotal_incl_tax(value: number){
		this._subtotal_incl_tax = value;
	}

	get subtotal_invoiced(): number{
		return this._subtotal_invoiced;
	}

	set subtotal_invoiced(value: number){
		this._subtotal_invoiced = value;
	}

	get subtotal_refunded(): number{
		return this._subtotal_refunded;
	}

	set subtotal_refunded(value: number){
		this._subtotal_refunded = value;
	}

	get tax_amount(): number{
		return this._tax_amount;
	}

	set tax_amount(value: number){
		this._tax_amount = value;
	}

	get tax_canceled(): number{
		return this._tax_canceled;
	}

	set tax_canceled(value: number){
		this._tax_canceled = value;
	}

	get tax_invoiced(): number{
		return this._tax_invoiced;
	}

	set tax_invoiced(value: number){
		this._tax_invoiced = value;
	}

	get tax_refunded(): number{
		return this._tax_refunded;
	}

	set tax_refunded(value: number){
		this._tax_refunded = value;
	}

	get total_canceled(): number{
		return this._total_canceled;
	}

	set total_canceled(value: number){
		this._total_canceled = value;
	}

	get total_due(): number{
		return this._total_due;
	}

	set total_due(value: number){
		this._total_due = value;
	}

	get total_invoiced(): number{
		return this._total_invoiced;
	}

	set total_invoiced(value: number){
		this._total_invoiced = value;
	}

	get total_item_count(): number{
		return this._total_item_count;
	}

	set total_item_count(value: number){
		this._total_item_count = value;
	}

	get total_offline_refunded(): number{
		return this._total_offline_refunded;
	}

	set total_offline_refunded(value: number){
		this._total_offline_refunded = value;
	}

	get total_online_refunded(): number{
		return this._total_online_refunded;
	}

	set total_online_refunded(value: number){
		this._total_online_refunded = value;
	}

	get total_paid(): number{
		return this._total_paid;
	}

	set total_paid(value: number){
		this._total_paid = value;
	}

	get total_qty_ordered(): number{
		return this._total_qty_ordered;
	}

	set total_qty_ordered(value: number){
		this._total_qty_ordered = value;
	}

	get total_refunded(): number{
		return this._total_refunded;
	}

	set total_refunded(value: number){
		this._total_refunded = value;
	}

	get updated_at(): string{
		return this._updated_at;
	}

	set updated_at(value: string){
		this._updated_at = value;
	}

	get weight(): number{
		return this._weight;
	}

	set weight(value: number){
		this._weight = value;
	}

	get x_forwarded_for(): string{
		return this._x_forwarded_for;
	}

	set x_forwarded_for(value: string){
		this._x_forwarded_for = value;
	}

	//private _items: Array<OrderItemModel> = [];
	get items(): Array<OrderItemModel>{
		return this._items;
	}

	get_item(key: number): OrderItemModel{
		return this.items[key];
	}

	set items(value: Array<OrderItemModel>){
		this._items = value;
	}

	set_item(value: OrderItemModel): void{
		this.items.push(value);
	}

	get billing_address(): OrderAddressModel{
		return this._billing_address;
	}

	set billing_address(value: OrderAddressModel){
		this._billing_address = value;
	}
	
	get payment(): OrderPaymentModel{
		return this._payment;
	}

	set payment(value: OrderPaymentModel){
		this._payment = value;
	}
	
	get status_histories(): Array<OrderStatusHistoryModel>{
		return this._status_histories;
	}

	get_status_history(key: number): OrderStatusHistoryModel{
		return this.status_histories[key];
	}

	set status_histories(value: Array<OrderStatusHistoryModel>){
		this._status_histories = value;
	}

	set_status_history(value: OrderStatusHistoryModel){
		this.status_histories.push(value);
	}
	
	get extension_attributes(): OrderExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: OrderExtensionModel){
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
		this.adjustment_negative = data.adjustment_negative;
		this.adjustment_positive = data.adjustment_positive;
		this.applied_rule_ids = data.applied_rule_ids;
		this.base_adjustment_negative = data.base_adjustment_negative;
		this.base_adjustment_positive = data.base_adjustment_positive;
		this.base_currency_code = data.base_currency_code;
		this.base_discount_amount = data.base_discount_amount;
		this.base_discount_canceled = data.base_discount_canceled;
		this.base_discount_invoiced = data.base_discount_invoiced;
		this.base_discount_refunded = data.base_discount_refunded;
		this.base_grand_total = data.base_grand_total;
		this.base_discount_tax_compensation_amount = data.base_discount_tax_compensation_amount;
		this.base_discount_tax_compensation_invoiced = data.base_discount_tax_compensation_invoiced;
		this.base_discount_tax_compensation_refunded = data.base_discount_tax_compensation_refunded;
		this.base_shipping_amount = data.base_shipping_amount;
		this.base_shipping_canceled = data.base_shipping_canceled;
		this.base_shipping_discount_amount = data.base_shipping_discount_amount;
		this.base_shipping_discount_tax_compensation_amnt = data.base_shipping_discount_tax_compensation_amnt;
		this.base_shipping_incl_tax = data.base_shipping_incl_tax;
		this.base_shipping_invoiced = data.base_shipping_invoiced;
		this.base_shipping_refunded = data.base_shipping_refunded;
		this.base_shipping_tax_amount = data.base_shipping_tax_amount;
		this.base_shipping_tax_refunded = data.base_shipping_tax_refunded;
		this.base_subtotal = data.base_subtotal;
		this.base_subtotal_canceled = data.base_subtotal_canceled;
		this.base_subtotal_incl_tax = data.base_subtotal_incl_tax;
		this.base_subtotal_invoiced = data.base_subtotal_invoiced;
		this.base_subtotal_refunded = data.base_subtotal_refunded;
		this.base_tax_amount = data.base_tax_amount;
		this.base_tax_canceled = data.base_tax_canceled;
		this.base_tax_invoiced = data.base_tax_invoiced;
		this.base_tax_refunded = data.base_tax_refunded;
		this.base_total_canceled = data.base_total_canceled;
		this.base_total_due = data.base_total_due;
		this.base_total_invoiced = data.base_total_invoiced;
		this.base_total_invoiced_cost = data.base_total_invoiced_cost;
		this.base_total_offline_refunded = data.base_total_offline_refunded;
		this.base_total_online_refunded = data.base_total_online_refunded;
		this.base_total_paid = data.base_total_paid;
		this.base_total_qty_ordered = data.base_total_qty_ordered;
		this.base_total_refunded = data.base_total_refunded;
		this.base_to_global_rate = data.base_to_global_rate;
		this.base_to_order_rate = data.base_to_order_rate;
		this.billing_address_id = data.billing_address_id;
		this.can_ship_partially = data.can_ship_partially;
		this.can_ship_partially_item = data.can_ship_partially_item;
		this.coupon_code = data.coupon_code;
		this.created_at = data.created_at;
		this.customer_dob = data.customer_dob;
		this.customer_email = data.customer_email;
		this.customer_firstname = data.customer_firstname;
		this.customer_gender = data.customer_gender;
		this.customer_group_id = data.customer_group_id;
		this.customer_id = data.customer_id;
		this.customer_is_guest = data.customer_is_guest;
		this.customer_lastname = data.customer_lastname;
		this.customer_middlename = data.customer_middlename;
		this.customer_note = data.customer_note;
		this.customer_note_notify = data.customer_note_notify;
		this.customer_prefix = data.customer_prefix;
		this.customer_suffix = data.customer_suffix;
		this.customer_taxvat = data.customer_taxvat;
		this.discount_amount = data.discount_amount;
		this.discount_canceled = data.discount_canceled;
		this.discount_description = data.discount_description;
		this.discount_invoiced = data.discount_invoiced;
		this.discount_refunded = data.discount_refunded;
		this.edit_increment = data.edit_increment;
		this.email_sent = data.email_sent;
		this.entity_id = data.entity_id;
		this.ext_customer_id = data.ext_customer_id;
		this.ext_order_id = data.ext_order_id;
		this.forced_shipment_with_invoice = data.forced_shipment_with_invoice;
		this.global_currency_code = data.global_currency_code;
		this.grand_total = data.grand_total;
		this.discount_tax_compensation_amount = data.discount_tax_compensation_amount;
		this.discount_tax_compensation_invoiced = data.discount_tax_compensation_invoiced;
		this.discount_tax_compensation_refunded = data.discount_tax_compensation_refunded;
		this.hold_before_state = data.hold_before_state;
		this.hold_before_status = data.hold_before_status;
		this.increment_id = data.increment_id;
		this.is_virtual = data.is_virtual;
		this.order_currency_code = data.order_currency_code;
		this.original_increment_id = data.original_increment_id;
		this.payment_authorization_amount = data.payment_authorization_amount;
		this.payment_auth_expiration = data.payment_auth_expiration;
		this.protect_code = data.protect_code;
		this.quote_address_id = data.quote_address_id;
		this.quote_id = data.quote_id;
		this.relation_child_id = data.relation_child_id;
		this.relation_child_real_id = data.relation_child_real_id;
		this.relation_parent_id = data.relation_parent_id;
		this.relation_parent_real_id = data.relation_parent_real_id;
		this.remote_ip = data.remote_ip;
		this.shipping_amount = data.shipping_amount;
		this.shipping_canceled = data.shipping_canceled;
		this.shipping_description = data.shipping_description;
		this.shipping_discount_amount = data.shipping_discount_amount;
		this.shipping_discount_tax_compensation_amount = data.shipping_discount_tax_compensation_amount;
		this.shipping_incl_tax = data.shipping_incl_tax;
		this.shipping_invoiced = data.shipping_invoiced;
		this.shipping_refunded = data.shipping_refunded;
		this.shipping_tax_amount = data.shipping_tax_amount;
		this.shipping_tax_refunded = data.shipping_tax_refunded;
		this.state = data.state;
		this.status = data.status;
		this.store_currency_code = data.store_currency_code;
		this.store_id = data.store_id;
		this.store_name = data.store_name;
		this.store_to_base_rate = data.store_to_base_rate;
		this.store_to_order_rate = data.store_to_order_rate;
		this.subtotal = data.subtotal;
		this.subtotal_canceled = data.subtotal_canceled;
		this.subtotal_incl_tax = data.subtotal_incl_tax;
		this.subtotal_invoiced = data.subtotal_invoiced;
		this.subtotal_refunded = data.subtotal_refunded;
		this.tax_amount = data.tax_amount;
		this.tax_canceled = data.tax_canceled;
		this.tax_invoiced = data.tax_invoiced;
		this.tax_refunded = data.tax_refunded;
		this.total_canceled = data.total_canceled;
		this.total_due = data.total_due;
		this.total_invoiced = data.total_invoiced;
		this.total_item_count = data.total_item_count;
		this.total_offline_refunded = data.total_offline_refunded;
		this.total_online_refunded = data.total_online_refunded;
		this.total_paid = data.total_paid;
		this.total_qty_ordered = data.total_qty_ordered;
		this.total_refunded = data.total_refunded;
		this.updated_at = data.updated_at;
		this.weight = data.weight;
		this.x_forwarded_for = data.x_forwarded_for;

		if(data.items){
			for(let item of data.items){
				let model: OrderItemModel = new OrderItemModel();
				this.set_item( model.fromJson(item) );
			}
		}
		
		let billingModel: OrderAddressModel = new OrderAddressModel();
		this.billing_address = billingModel.fromJson(data.billing_address);
		
		let paymentModel: OrderPaymentModel = new OrderPaymentModel();
		this.payment = paymentModel.fromJson(data.payment);
		
		if(data.status_histories){
			for(let status of data.status_histories){
				let model: OrderStatusHistoryModel = new OrderStatusHistoryModel();
				this.set_status_history( model.fromJson(status) );
			}
		}

		let extensionModel: OrderExtensionModel = new OrderExtensionModel();		
		this.extension_attributes = extensionModel.fromJson(data.extension_attributes);

		return this;
	}

	/**
	 * @public
	 * @method fullCustomerName
	 * @description Full name of the customer
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return string
	 */
	public fullCustomerName(): string{
		if(this.customer_middlename){
			// Not sure if needed with no option to enter in a middle name
			return this.customer_firstname + ' ' + this.customer_middlename + ' ' + this.customer_lastname;
		} else {
			return this.customer_firstname + ' ' + this.customer_lastname;
		}
	}

	/**
	 * @public
	 * @method getAdditionalFee
	 * @description Get the additional fee
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return number
	 */
	public getAdditionalFee(): number{
		return this.extension_attributes.app_additional_fee;
	}

	/**
	 * @public
	 * @method getBaseAdditionalFee
	 * @description Get the base additional fee
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return number
	 */
	public getBaseAdditionalFee(): number{
		return this.extension_attributes.base_app_additional_fee;
	}
}

//applied taxes

//item applied taxes

export class OrderAddressModel extends AddressModel{
	private _address_type: string;
	private _customer_address_id: number;
    private _email: string;
    private _entity_id: number;
    private _parent_id: number;
    private _region: string;
    private _region_code: string;
    private _vat_is_valid: number;
    private _vat_request_date: string;
    private _vat_request_id: string;
    private _vat_request_success: number;
    //private extension_attributes;

    get address_type(): string{
		return this._address_type;
    }

	set address_type(value: string){
		this._address_type = value;
	}

	get customer_address_id(): number{
		return this._customer_address_id;
	}

	set customer_address_id(value: number){
		this._customer_address_id = value;
	}

    get email(): string{
		return this._email;
    }

	set email(value: string){
		this._email = value;
	}

    get entity_id(): number{
		return this._entity_id;
    }

	set entity_id(value: number){
		this._entity_id = value;
	}

    get parent_id(): number{
		return this._parent_id;
    }

	set parent_id(value: number){
		this._parent_id = value;
	}

    get region(): string{
		return this._region;
    }

	set region(value: string){
		this._region = value;
	}

    get region_code(): string{
		return this._region_code;
    }

	set region_code(value: string){
		this._region_code = value;
	}

    get vat_is_valid(): number{
		return this._vat_is_valid;
    }

	set vat_is_valid(value: number){
		this._vat_is_valid = value;
	}

    get vat_request_date(): string{
		return this._vat_request_date;
    }

	set vat_request_date(value: string){
		this._vat_request_date = value;
	}

    get vat_request_id(): string{
		return this._vat_request_id;
    }

	set vat_request_id(value: string){
		this._vat_request_id = value;
	}

    get vat_request_success(): number{
		return this._vat_request_success;
    }

	set vat_request_success(value: number){
		this._vat_request_success = value;
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
		this.customer_id = data.customer_id;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.middlename = data.middlename;
		this.prefix = data.prefix;
		this.suffix = data.suffix;
		this.street = data.street;
		this.city = data.city;
		this.region_id = data.region_id;
		this.country_id = data.country_id;
		this.postcode = data.postcode;
		this.company = data.company;
		this.telephone = data.telephone;
		this.fax = data.fax;
		this.vat_id = data.vat_id;

		this.address_type = data.address_type;
		this.customer_address_id = data.customer_address_id;
	    this.email = data.email;
	    this.entity_id = data.entity_id;
	    this.parent_id = data.parent_id;
	    this.region = data.region;
	    this.region_code = data.region_code;
	    this.vat_is_valid = data.vat_is_valid;
	    this.vat_request_date = data.vat_request_date;
	    this.vat_request_id = data.vat_request_id;
	    this.vat_request_success = data.vat_request_success;

		return this;
	}

    /**
     * @public
     * @method fullMetroAddress
	 * @description Return the full metro location of the address
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return string
	 */
	fullMetroAddress(): string{
		return this.city + ', ' + this.region + ' ' + this.postcode;
	}
}

export class OrderItemModel{
	private _additional_data: string;
	private _amount_refunded: number;
	private _applied_rule_ids: string;
	private _base_amount_refunded: number;
	private _base_cost: number;
	private _base_discount_amount: number;
	private _base_discount_invoiced: number;
	private _base_discount_refunded: number;
	private _base_discount_tax_compensation_amount: number;
	private _base_discount_tax_compensation_invoiced: number;
	private _base_discount_tax_compensation_refunded: number;
	private _base_original_price: number;
	private _base_price: number;
	private _base_price_incl_tax: number;
	private _base_row_invoiced: number;
	private _base_row_total: number;
	private _base_row_total_incl_tax: number;
	private _base_tax_amount: number;
	private _base_tax_before_discount: number;
	private _base_tax_invoiced: number;
	private _base_tax_refunded: number;
	private _base_weee_tax_applied_amount: number;
	private _base_weee_tax_applied_row_amnt: number;
	private _base_weee_tax_disposition: number;
	private _base_weee_tax_row_disposition: number;
	private _created_at: string;
	private _description: string;
	private _discount_amount: number;
	private _discount_invoiced: number;
	private _discount_percent: number;
	private _discount_refunded: number;
	private _event_id: number;
	private _ext_order_item_id: string;
	private _free_shipping: number;
	private _gw_base_price: number;
	private _gw_base_price_invoiced: number;
	private _gw_base_price_refunded: number;
	private _gw_base_tax_amount: number;
	private _gw_base_tax_amount_invoiced: number;
	private _gw_base_tax_amount_refunded: number;
	private _gw_id: number;
	private _gw_price: number;
	private _gw_price_invoiced: number;
	private _gw_price_refunded: number;
	private _gw_tax_amount: number;
	private _gw_tax_amount_invoiced: number;
	private _gw_tax_amount_refunded: number;
	private _discount_tax_compensation_amount: number;
	private _discount_tax_compensation_canceled: number;
	private _discount_tax_compensation_invoiced: number;
	private _discount_tax_compensation_refunded: number;
	private _is_qty_decimal: number;
	private _is_virtual: number;
	private _item_id: number;
	private _locked_do_invoice: number;
	private _locked_do_ship: number;
	private _name: string;
	private _no_discount: number;
	private _order_id: number;
	private _original_price: number;
	private _parent_item_id: number;
	private _price: number;
	private _price_incl_tax: number;
	private _product_id: number;
	private _product_type: string;
	private _qty_backordered: number;
	private _qty_canceled: number;
	private _qty_invoiced: number;
	private _qty_ordered: number;
	private _qty_refunded: number;
	private _qty_returned: number;
	private _qty_shipped: number;
	private _quote_item_id: number;
	private _row_invoiced: number;
	private _row_total: number;
	private _row_total_incl_tax: number;
	private _row_weight: number;
	private _sku: string;
	private _store_id: number;
	private _tax_amount: number;
	private _tax_before_discount: number;
	private _tax_canceled: number;
	private _tax_invoiced: number;
	private _tax_percent: number;
	private _tax_refunded: number;
	private _updated_at: string;
	private _weee_tax_applied: string;
	private _weee_tax_applied_amount: number;
	private _weee_tax_applied_row_amount: number;
	private _weee_tax_disposition: number;
	private _weee_tax_row_disposition: number;
	private _weight: number;
	//private parent_item;
	//product_option
	//extension_attributes

	get additional_data(): string{
		return this._additional_data;
	}

	set additional_data(value: string){
		this._additional_data = value;
	}

	get amount_refunded(): number{
		return this._amount_refunded;
	}

	set amount_refunded(value: number){
		this._amount_refunded = value;
	}

	get applied_rule_ids(): string{
		return this._applied_rule_ids;
	}

	set applied_rule_ids(value: string){
		this._applied_rule_ids = value;
	}

	get base_amount_refunded(): number{
		return this._base_amount_refunded;
	}

	set base_amount_refunded(value: number){
		this._base_amount_refunded = value;
	}

	get base_cost(): number{
		return this._base_cost;
	}

	set base_cost(value: number){
		this._base_cost = value;
	}

	get base_discount_amount(): number{
		return this._base_discount_amount;
	}

	set base_discount_amount(value: number){
		this._base_discount_amount = value;
	}

	get base_discount_invoiced(): number{
		return this._base_discount_invoiced;
	}

	set base_discount_invoiced(value: number){
		this._base_discount_invoiced = value;
	}

	get base_discount_refunded(): number{
		return this._base_discount_refunded;
	}

	set base_discount_refunded(value: number){
		this._base_discount_refunded = value;
	}

	get base_discount_tax_compensation_amount(): number{
		return this._base_discount_tax_compensation_amount;
	}

	set base_discount_tax_compensation_amount(value: number){
		this._base_discount_tax_compensation_amount = value;
	}

	get base_discount_tax_compensation_invoiced(): number{
		return this._base_discount_tax_compensation_invoiced;
	}

	set base_discount_tax_compensation_invoiced(value: number){
		this._base_discount_tax_compensation_invoiced = value;
	}

	get base_discount_tax_compensation_refunded(): number{
		return this._base_discount_tax_compensation_refunded;
	}

	set base_discount_tax_compensation_refunded(value: number){
		this._base_discount_tax_compensation_refunded = value;
	}

	get base_original_price(): number{
		return this._base_original_price;
	}

	set base_original_price(value: number){
		this._base_original_price = value;
	}

	get base_price(): number{
		return this._base_price;
	}

	set base_price(value: number){
		this._base_price = value;
	}

	get base_price_incl_tax(): number{
		return this._base_price_incl_tax;
	}

	set base_price_incl_tax(value: number){
		this._base_price_incl_tax = value;
	}

	get base_row_invoiced(): number{
		return this._base_row_invoiced;
	}

	set base_row_invoiced(value: number){
		this._base_row_invoiced = value;
	}

	get base_row_total(): number{
		return this._base_row_total;
	}

	set base_row_total(value: number){
		this._base_row_total = value;
	}

	get base_row_total_incl_tax(): number{
		return this._base_row_total_incl_tax;
	}

	set base_row_total_incl_tax(value: number){
		this._base_row_total_incl_tax = value;
	}

	get base_tax_amount(): number{
		return this._base_tax_amount;
	}

	set base_tax_amount(value: number){
		this._base_tax_amount = value;
	}

	get base_tax_before_discount(): number{
		return this._base_tax_before_discount;
	}

	set base_tax_before_discount(value: number){
		this._base_tax_before_discount = value;
	}

	get base_tax_invoiced(): number{
		return this._base_tax_invoiced;
	}

	set base_tax_invoiced(value: number){
		this._base_tax_invoiced = value;
	}

	get base_tax_refunded(): number{
		return this._base_tax_refunded;
	}

	set base_tax_refunded(value: number){
		this._base_tax_refunded = value;
	}

	get base_weee_tax_applied_amount(): number{
		return this._base_weee_tax_applied_amount;
	}

	set base_weee_tax_applied_amount(value: number){
		this._base_weee_tax_applied_amount = value;
	}

	get base_weee_tax_applied_row_amnt(): number{
		return this._base_weee_tax_applied_row_amnt;
	}

	set base_weee_tax_applied_row_amnt(value: number){
		this._base_weee_tax_applied_row_amnt = value;
	}

	get base_weee_tax_disposition(): number{
		return this._base_weee_tax_disposition;
	}

	set base_weee_tax_disposition(value: number){
		this._base_weee_tax_disposition = value;
	}

	get base_weee_tax_row_disposition(): number{
		return this._base_weee_tax_row_disposition;
	}

	set base_weee_tax_row_disposition(value: number){
		this._base_weee_tax_row_disposition = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get description(): string{
		return this._description;
	}

	set description(value: string){
		this._description = value;
	}

	get discount_amount(): number{
		return this._discount_amount;
	}

	set discount_amount(value: number){
		this._discount_amount = value;
	}

	get discount_invoiced(): number{
		return this._discount_invoiced;
	}

	set discount_invoiced(value: number){
		this._discount_invoiced = value;
	}

	get discount_percent(): number{
		return this._discount_percent;
	}

	set discount_percent(value: number){
		this._discount_percent = value;
	}

	get discount_refunded(): number{
		return this._discount_refunded;
	}

	set discount_refunded(value: number){
		this._discount_refunded = value;
	}

	get event_id(): number{
		return this._event_id;
	}

	set event_id(value: number){
		this._event_id = value;
	}

	get ext_order_item_id(): string{
		return this._ext_order_item_id;
	}

	set ext_order_item_id(value: string){
		this._ext_order_item_id = value;
	}

	get free_shipping(): number{
		return this._free_shipping;
	}

	set free_shipping(value: number){
		this._free_shipping = value;
	}

	get gw_base_price(): number{
		return this._gw_base_price;
	}

	set gw_base_price(value: number){
		this._gw_base_price = value;
	}

	get gw_base_price_invoiced(): number{
		return this._gw_base_price_invoiced;
	}

	set gw_base_price_invoiced(value: number){
		this._gw_base_price_invoiced = value;
	}

	get gw_base_price_refunded(): number{
		return this._gw_base_price_refunded;
	}

	set gw_base_price_refunded(value: number){
		this._gw_base_price_refunded = value;
	}

	get gw_base_tax_amount(): number{
		return this._gw_base_tax_amount;
	}

	set gw_base_tax_amount(value: number){
		this._gw_base_tax_amount = value;
	}

	get gw_base_tax_amount_invoiced(): number{
		return this._gw_base_tax_amount_invoiced;
	}

	set gw_base_tax_amount_invoiced(value: number){
		this._gw_base_tax_amount_invoiced = value;
	}

	get gw_base_tax_amount_refunded(): number{
		return this._gw_base_tax_amount_refunded;
	}

	set gw_base_tax_amount_refunded(value: number){
		this._gw_base_tax_amount_refunded = value;
	}

	get gw_id(): number{
		return this._gw_id;
	}

	set gw_id(value: number){
		this._gw_id = value;
	}

	get gw_price(): number{
		return this._gw_price;
	}

	set gw_price(value: number){
		this._gw_price = value;
	}

	get gw_price_invoiced(): number{
		return this._gw_price_invoiced;
	}

	set gw_price_invoiced(value: number){
		this._gw_price_invoiced = value;
	}

	get gw_price_refunded(): number{
		return this._gw_price_refunded;
	}

	set gw_price_refunded(value: number){
		this._gw_price_refunded = value;
	}

	get gw_tax_amount(): number{
		return this._gw_tax_amount;
	}

	set gw_tax_amount(value: number){
		this._gw_tax_amount = value;
	}

	get gw_tax_amount_invoiced(): number{
		return this._gw_tax_amount_invoiced;
	}

	set gw_tax_amount_invoiced(value: number){
		this._gw_tax_amount_invoiced = value;
	}

	get gw_tax_amount_refunded(): number{
		return this._gw_tax_amount_refunded;
	}

	set gw_tax_amount_refunded(value: number){
		this._gw_tax_amount_refunded = value;
	}

	get discount_tax_compensation_amount(): number{
		return this._discount_tax_compensation_amount;
	}

	set discount_tax_compensation_amount(value: number){
		this._discount_tax_compensation_amount = value;
	}

	get discount_tax_compensation_canceled(): number{
		return this._discount_tax_compensation_canceled;
	}

	set discount_tax_compensation_canceled(value: number){
		this._discount_tax_compensation_canceled = value;
	}

	get discount_tax_compensation_invoiced(): number{
		return this._discount_tax_compensation_invoiced;
	}

	set discount_tax_compensation_invoiced(value: number){
		this._discount_tax_compensation_invoiced = value;
	}

	get discount_tax_compensation_refunded(): number{
		return this._discount_tax_compensation_refunded;
	}

	set discount_tax_compensation_refunded(value: number){
		this._discount_tax_compensation_refunded = value;
	}

	get is_qty_decimal(): number{
		return this._is_qty_decimal;
	}

	set is_qty_decimal(value: number){
		this._is_qty_decimal = value;
	}

	get is_virtual(): number{
		return this._is_virtual;
	}

	set is_virtual(value: number){
		this._is_virtual = value;
	}

	get item_id(): number{
		return this._item_id;
	}

	set item_id(value: number){
		this._item_id = value;
	}

	get locked_do_invoice(): number{
		return this._locked_do_invoice;
	}

	set locked_do_invoice(value: number){
		this._locked_do_invoice = value;
	}

	get locked_do_ship(): number{
		return this._locked_do_ship;
	}

	set locked_do_ship(value: number){
		this._locked_do_ship = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get no_discount(): number{
		return this._no_discount;
	}

	set no_discount(value: number){
		this._no_discount = value;
	}

	get order_id(): number{
		return this._order_id;
	}

	set order_id(value: number){
		this._order_id = value;
	}

	get original_price(): number{
		return this._original_price;
	}

	set original_price(value: number){
		this._original_price = value;
	}

	get parent_item_id(): number{
		return this._parent_item_id;
	}

	set parent_item_id(value: number){
		this._parent_item_id = value;
	}

	get price(): number{
		return this._price;
	}

	set price(value: number){
		this._price = value;
	}

	get price_incl_tax(): number{
		return this._price_incl_tax;
	}

	set price_incl_tax(value: number){
		this._price_incl_tax = value;
	}

	get product_id(): number{
		return this._product_id;
	}

	set product_id(value: number){
		this._product_id = value;
	}

	get product_type(): string{
		return this._product_type;
	}

	set product_type(value: string){
		this._product_type = value;
	}

	get qty_backordered(): number{
		return this._qty_backordered;
	}

	set qty_backordered(value: number){
		this._qty_backordered = value;
	}

	get qty_canceled(): number{
		return this._qty_canceled;
	}

	set qty_canceled(value: number){
		this._qty_canceled = value;
	}

	get qty_invoiced(): number{
		return this._qty_invoiced;
	}

	set qty_invoiced(value: number){
		this._qty_invoiced = value;
	}

	get qty_ordered(): number{
		return this._qty_ordered;
	}

	set qty_ordered(value: number){
		this._qty_ordered = value;
	}

	get qty_refunded(): number{
		return this._qty_refunded;
	}

	set qty_refunded(value: number){
		this._qty_refunded = value;
	}

	get qty_returned(): number{
		return this._qty_returned;
	}

	set qty_returned(value: number){
		this._qty_returned = value;
	}

	get qty_shipped(): number{
		return this._qty_shipped;
	}

	set qty_shipped(value: number){
		this._qty_shipped = value;
	}

	get quote_item_id(): number{
		return this._quote_item_id;
	}

	set quote_item_id(value: number){
		this._quote_item_id = value;
	}

	get row_invoiced(): number{
		return this._row_invoiced;
	}

	set row_invoiced(value: number){
		this._row_invoiced = value;
	}

	get row_total(): number{
		return this._row_total;
	}

	set row_total(value: number){
		this._row_total = value;
	}

	get row_total_incl_tax(): number{
		return this._row_total_incl_tax;
	}

	set row_total_incl_tax(value: number){
		this._row_total_incl_tax = value;
	}

	get row_weight(): number{
		return this._row_weight;
	}

	set row_weight(value: number){
		this._row_weight = value;
	}

	get sku(): string{
		return this._sku;
	}

	set sku(value: string){
		this._sku = value;
	}

	get store_id(): number{
		return this._store_id;
	}

	set store_id(value: number){
		this._store_id = value;
	}

	get tax_amount(): number{
		return this._tax_amount;
	}

	set tax_amount(value: number){
		this._tax_amount = value;
	}

	get tax_before_discount(): number{
		return this._tax_before_discount;
	}

	set tax_before_discount(value: number){
		this._tax_before_discount = value;
	}

	get tax_canceled(): number{
		return this._tax_canceled;
	}

	set tax_canceled(value: number){
		this._tax_canceled = value;
	}

	get tax_invoiced(): number{
		return this._tax_invoiced;
	}

	set tax_invoiced(value: number){
		this._tax_invoiced = value;
	}

	get tax_percent(): number{
		return this._tax_percent;
	}

	set tax_percent(value: number){
		this._tax_percent = value;
	}

	get tax_refunded(): number{
		return this._tax_refunded;
	}

	set tax_refunded(value: number){
		this._tax_refunded = value;
	}

	get updated_at(): string{
		return this._updated_at;
	}

	set updated_at(value: string){
		this._updated_at = value;
	}

	get weee_tax_applied(): string{
		return this._weee_tax_applied;
	}

	set weee_tax_applied(value: string){
		this._weee_tax_applied = value;
	}

	get weee_tax_applied_amount(): number{
		return this._weee_tax_applied_amount;
	}

	set weee_tax_applied_amount(value: number){
		this._weee_tax_applied_amount = value;
	}

	get weee_tax_applied_row_amount(): number{
		return this._weee_tax_applied_row_amount;
	}

	set weee_tax_applied_row_amount(value: number){
		this._weee_tax_applied_row_amount = value;
	}

	get weee_tax_disposition(): number{
		return this._weee_tax_disposition;
	}

	set weee_tax_disposition(value: number){
		this._weee_tax_disposition = value;
	}

	get weee_tax_row_disposition(): number{
		return this._weee_tax_row_disposition;
	}

	set weee_tax_row_disposition(value: number){
		this._weee_tax_row_disposition = value;
	}

	get weight(): number{
		return this._weight;
	}

	set weight(value: number){
		this._weight = value;
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
		this.additional_data = data.additional_data;
		this.amount_refunded = data.amount_refunded;
		this.applied_rule_ids = data.applied_rule_ids;
		this.base_amount_refunded = data.base_amount_refunded;
		this.base_cost = data.base_cost;
		this.base_discount_amount = data.base_discount_amount;
		this.base_discount_invoiced = data.base_discount_invoiced;
		this.base_discount_refunded = data.base_discount_refunded;
		this.base_discount_tax_compensation_amount = data.base_discount_tax_compensation_amount;
		this.base_discount_tax_compensation_invoiced = data.base_discount_tax_compensation_invoiced;
		this.base_discount_tax_compensation_refunded = data.base_discount_tax_compensation_refunded;
		this.base_original_price = data.base_original_price;
		this.base_price = data.base_price;
		this.base_price_incl_tax = data.base_price_incl_tax;
		this.base_row_invoiced = data.base_row_invoiced;
		this.base_row_total = data.base_row_total;
		this.base_row_total_incl_tax = data.base_row_total_incl_tax;
		this.base_tax_amount = data.base_tax_amount;
		this.base_tax_before_discount = data.base_tax_before_discount;
		this.base_tax_invoiced = data.base_tax_invoiced;
		this.base_tax_refunded = data.base_tax_refunded;
		this.base_weee_tax_applied_amount = data.base_weee_tax_applied_amount;
		this.base_weee_tax_applied_row_amnt = data.base_weee_tax_applied_row_amnt;
		this.base_weee_tax_disposition = data.base_weee_tax_disposition;
		this.base_weee_tax_row_disposition = data.base_weee_tax_row_disposition;
		this.created_at = data.created_at;
		this.description = data.description;
		this.discount_amount = data.discount_amount;
		this.discount_invoiced = data.discount_invoiced;
		this.discount_percent = data.discount_percent;
		this.discount_refunded = data.discount_refunded;
		this.event_id = data.event_id;
		this.ext_order_item_id = data.ext_order_item_id;
		this.free_shipping = data.free_shipping;
		this.gw_base_price = data.gw_base_price;
		this.gw_base_price_invoiced = data.gw_base_price_invoiced;
		this.gw_base_price_refunded = data.gw_base_price_refunded;
		this.gw_base_tax_amount = data.gw_base_tax_amount;
		this.gw_base_tax_amount_invoiced = data.gw_base_tax_amount_invoiced;
		this.gw_base_tax_amount_refunded = data.gw_base_tax_amount_refunded;
		this.gw_id = data.gw_id;
		this.gw_price = data.gw_price;
		this.gw_price_invoiced = data.gw_price_invoiced;
		this.gw_price_refunded = data.gw_price_refunded;
		this.gw_tax_amount = data.gw_tax_amount;
		this.gw_tax_amount_invoiced = data.gw_tax_amount_invoiced;
		this.gw_tax_amount_refunded = data.gw_tax_amount_refunded;
		this.discount_tax_compensation_amount = data.discount_tax_compensation_amount;
		this.discount_tax_compensation_canceled = data.discount_tax_compensation_canceled;
		this.discount_tax_compensation_invoiced = data.discount_tax_compensation_invoiced;
		this.discount_tax_compensation_refunded = data.discount_tax_compensation_refunded;
		this.is_qty_decimal = data.is_qty_decimal;
		this.is_virtual = data.is_virtual;
		this.item_id = data.item_id;
		this.locked_do_invoice = data.locked_do_invoice;
		this.locked_do_ship = data.locked_do_ship;
		this.name = data.name;
		this.no_discount = data.no_discount;
		this.order_id = data.order_id;
		this.original_price = data.original_price;
		this.parent_item_id = data.parent_item_id;
		this.price = data.price;
		this.price_incl_tax = data.price_incl_tax;
		this.product_id = data.product_id;
		this.product_type = data.product_type;
		this.qty_backordered = data.qty_backordered;
		this.qty_canceled = data.qty_canceled;
		this.qty_invoiced = data.qty_invoiced;
		this.qty_ordered = data.qty_ordered;
		this.qty_refunded = data.qty_refunded;
		this.qty_returned = data.qty_returned;
		this.qty_shipped = data.qty_shipped;
		this.quote_item_id = data.quote_item_id;
		this.row_invoiced = data.row_invoiced;
		this.row_total = data.row_total;
		this.row_total_incl_tax = data.row_total_incl_tax;
		this.row_weight = data.row_weight;
		this.sku = data.sku;
		this.store_id = data.store_id;
		this.tax_amount = data.tax_amount;
		this.tax_before_discount = data.tax_before_discount;
		this.tax_canceled = data.tax_canceled;
		this.tax_invoiced = data.tax_invoiced;
		this.tax_percent = data.tax_percent;
		this.tax_refunded = data.tax_refunded;
		this.updated_at = data.updated_at;
		this.weee_tax_applied = data.weee_tax_applied;
		this.weee_tax_applied_amount = data.weee_tax_applied_amount;
		this.weee_tax_applied_row_amount = data.weee_tax_applied_row_amount;
		this.weee_tax_disposition = data.weee_tax_disposition;
		this.weee_tax_row_disposition = data.weee_tax_row_disposition;
		this.weight = data.weight;

		//private parent_item;
		//product_option
		//extension_attributes

		return this;
	}
}

export class OrderStatusHistoryModel{
	private _comment: string;
	private _created_at: string;
	private _entity_id: number;
	private _entity_name: string;
	private _is_customer_notified: number;
	private _is_visible_on_front: number;
	private _parent_id: number;
	private _status: string;
	//private extension_attributes;

	get comment(): string{
		return this._comment;
	}

	set comment(value: string){
		this._comment = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get entity_id(): number{
		return this._entity_id;
	}

	set entity_id(value: number){
		this._entity_id = value;
	}

	get entity_name(): string{
		return this._entity_name;
	}

	set entity_name(value: string){
		this._entity_name = value;
	}

	get is_customer_notified(): number{
		return this._is_customer_notified;
	}

	set is_customer_notified(value: number){
		this._is_customer_notified = value;
	}

	get is_visible_on_front(): number{
		return this._is_visible_on_front;
	}

	set is_visible_on_front(value: number){
		this._is_visible_on_front = value;
	}

	get parent_id(): number{
		return this._parent_id;
	}

	set parent_id(value: number){
		this._parent_id = value;
	}

	get status(): string{
		return this._status;
	}

	set status(value: string){
		this._status = value;
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
		this.comment = data.comment;
		this.created_at = data.created_at;
		this.entity_id = data.entity_id;
		this.entity_name = data.entity_name;
		this.is_customer_notified = data.is_customer_notified;
		this.is_visible_on_front = data.is_visible_on_front;
		this.parent_id = data.parent_id;
		this.status = data.status;

		//private extension_attributes;

		return this;
	}
}

export class OrderPaymentModel{
	private _account_status: string;
	private _additional_data: string;
	private _additional_information: Array<string> = [];
	private _address_status: string;
	private _amount_authorized: number;
	private _amount_canceled: number;
	private _amount_ordered: number;
	private _amount_paid: number;
	private _amount_refunded: number;
	private _anet_trans_method: string;
	private _base_amount_authorized: number;
	private _base_amount_canceled: number;
	private _base_amount_ordered: number;
	private _base_amount_paid: number;
	private _base_amount_paid_online: number;
	private _base_amount_refunded: number;
	private _base_amount_refunded_online: number;
	private _base_shipping_amount: number;
	private _base_shipping_captured: number;
	private _base_shipping_refunded: number;
	private _cc_approval: string;
	private _cc_avs_status: string;
	private _cc_cid_status: string;
	private _cc_debug_request_body: string;
	private _cc_debug_response_body: string;
	private _cc_debug_response_serialized: string;
	private _cc_exp_month: string;
	private _cc_exp_year: string;
	private _cc_last4: string;
	private _cc_number_enc: string;
	private _cc_owner: string;
	private _cc_secure_verify: string;
	private _cc_ss_issue: string;
	private _cc_ss_start_month: string;
	private _cc_ss_start_year: string;
	private _cc_status: string;
	private _cc_status_description: string;
	private _cc_trans_id: string;
	private _cc_type: string;
	private _echeck_account_name: string;
	private _echeck_account_type: string;
	private _echeck_bank_name: string;
	private _echeck_routing_number: string;
	private _echeck_type: string;
	private _entity_id: number;
	private _last_trans_id: string;
	private _method: string;
	private _parent_id: number;
	private _po_number: string;
	private _protection_eligibility: string;
	private _quote_payment_id: number;
	private _shipping_amount: number;
	private _shipping_captured: number;
	private _shipping_refunded: number;
	private _extension_attributes: OrderPaymentExtensionModel;

	get account_status(): string{
		return this._account_status;
	}

	set account_status(value: string){
		this._account_status = value;
	}

	get additional_data(): string{
		return this._additional_data;
	}

	set additional_data(value: string){
		this._additional_data = value;
	}

	get additional_information(): Array<string>{
		return this._additional_information;
	}

	get_additional_information(key: number): string{
		return this.additional_information[key];
	}

	set additional_information(value: Array<string>){
		this._additional_information;
	}

	set_additional_information(value: string){
		this.additional_information.push(value);
	}

	get address_status(): string{
		return this._address_status;
	}

	set address_status(value: string){
		this._address_status = value;
	}

	get amount_authorized(): number{
		return this._amount_authorized;
	}

	set amount_authorized(value: number){
		this._amount_authorized = value;
	}

	get amount_canceled(): number{
		return this._amount_canceled;
	}

	set amount_canceled(value: number){
		this._amount_canceled = value;
	}

	get amount_ordered(): number{
		return this._amount_ordered;
	}

	set amount_ordered(value: number){
		this._amount_ordered = value;
	}

	get amount_paid(): number{
		return this._amount_paid;
	}

	set amount_paid(value: number){
		this._amount_paid = value;
	}

	get amount_refunded(): number{
		return this._amount_refunded;
	}

	set amount_refunded(value: number){
		this._amount_refunded = value;
	}

	get anet_trans_method(): string{
		return this._anet_trans_method;
	}

	set anet_trans_method(value: string){
		this._anet_trans_method = value;
	}

	get base_amount_authorized(): number{
		return this._base_amount_authorized;
	}

	set base_amount_authorized(value: number){
		this._base_amount_authorized = value;
	}

	get base_amount_canceled(): number{
		return this._base_amount_canceled;
	}

	set base_amount_canceled(value: number){
		this._base_amount_canceled = value;
	}

	get base_amount_ordered(): number{
		return this._base_amount_ordered;
	}

	set base_amount_ordered(value: number){
		this._base_amount_ordered = value;
	}

	get base_amount_paid(): number{
		return this._base_amount_paid;
	}

	set base_amount_paid(value: number){
		this._base_amount_paid = value;
	}

	get base_amount_paid_online(): number{
		return this._base_amount_paid_online;
	}

	set base_amount_paid_online(value: number){
		this._base_amount_paid_online = value;
	}

	get base_amount_refunded(): number{
		return this._base_amount_refunded;
	}

	set base_amount_refunded(value: number){
		this._base_amount_refunded = value;
	}

	get base_amount_refunded_online(): number{
		return this._base_amount_refunded_online;
	}

	set base_amount_refunded_online(value: number){
		this._base_amount_refunded_online = value;
	}

	get base_shipping_amount(): number{
		return this._base_shipping_amount;
	}

	set base_shipping_amount(value: number){
		this._base_shipping_amount = value;
	}

	get base_shipping_captured(): number{
		return this._base_shipping_captured;
	}

	set base_shipping_captured(value: number){
		this._base_shipping_captured = value;
	}

	get base_shipping_refunded(): number{
		return this._base_shipping_refunded;
	}

	set base_shipping_refunded(value: number){
		this._base_shipping_refunded = value;
	}

	get cc_approval(): string{
		return this._cc_approval;
	}

	set cc_approval(value: string){
		this._cc_approval = value;
	}

	get cc_avs_status(): string{
		return this._cc_avs_status;
	}

	set cc_avs_status(value: string){
		this._cc_avs_status = value;
	}

	get cc_cid_status(): string{
		return this._cc_cid_status;
	}

	set cc_cid_status(value: string){
		this._cc_cid_status = value;
	}

	get cc_debug_request_body(): string{
		return this._cc_debug_request_body;
	}

	set cc_debug_request_body(value: string){
		this._cc_debug_request_body = value;
	}

	get cc_debug_response_body(): string{
		return this._cc_debug_response_body;
	}

	set cc_debug_response_body(value: string){
		this._cc_debug_response_body = value;
	}

	get cc_debug_response_serialized(): string{
		return this._cc_debug_response_serialized;
	}

	set cc_debug_response_serialized(value: string){
		this._cc_debug_response_serialized = value;
	}

	get cc_exp_month(): string{
		return this._cc_exp_month;
	}

	set cc_exp_month(value: string){
		this._cc_exp_month = value;
	}

	get cc_exp_year(): string{
		return this._cc_exp_year;
	}

	set cc_exp_year(value: string){
		this._cc_exp_year = value;
	}

	get cc_last4(): string{
		return this._cc_last4;
	}

	set cc_last4(value: string){
		this._cc_last4 = value;
	}

	get cc_number_enc(): string{
		return this._cc_number_enc;
	}

	set cc_number_enc(value: string){
		this._cc_number_enc = value;
	}

	get cc_owner(): string{
		return this._cc_owner;
	}

	set cc_owner(value: string){
		this._cc_owner = value;
	}

	get cc_secure_verify(): string{
		return this._cc_secure_verify;
	}

	set cc_secure_verify(value: string){
		this._cc_secure_verify = value;
	}

	get cc_ss_issue(): string{
		return this._cc_ss_issue;
	}

	set cc_ss_issue(value: string){
		this._cc_ss_issue = value;
	}

	get cc_ss_start_month(): string{
		return this._cc_ss_start_month;
	}

	set cc_ss_start_month(value: string){
		this._cc_ss_start_month = value;
	}

	get cc_ss_start_year(): string{
		return this._cc_ss_start_year;
	}

	set cc_ss_start_year(value: string){
		this._cc_ss_start_year = value;
	}

	get cc_status(): string{
		return this._cc_status;
	}

	set cc_status(value: string){
		this._cc_status = value;
	}

	get cc_status_description(): string{
		return this._cc_status_description;
	}

	set cc_status_description(value: string){
		this._cc_status_description = value;
	}

	get cc_trans_id(): string{
		return this._cc_trans_id;
	}

	set cc_trans_id(value: string){
		this._cc_trans_id = value;
	}

	get cc_type(): string{
		return this._cc_type;
	}

	set cc_type(value: string){
		this._cc_type = value;
	}

	get echeck_account_name(): string{
		return this._echeck_account_name;
	}

	set echeck_account_name(value: string){
		this._echeck_account_name = value;
	}

	get echeck_account_type(): string{
		return this._echeck_account_type;
	}

	set echeck_account_type(value: string){
		this._echeck_account_type = value;
	}

	get echeck_bank_name(): string{
		return this._echeck_bank_name;
	}

	set echeck_bank_name(value: string){
		this._echeck_bank_name = value;
	}

	get echeck_routing_number(): string{
		return this._echeck_routing_number;
	}

	set echeck_routing_number(value: string){
		this._echeck_routing_number = value;
	}

	get echeck_type(): string{
		return this._echeck_type;
	}

	set echeck_type(value: string){
		this._echeck_type = value;
	}

	get entity_id(): number{
		return this._entity_id;
	}

	set entity_id(value: number){
		this._entity_id = value;
	}

	get last_trans_id(): string{
		return this._last_trans_id;
	}

	set last_trans_id(value: string){
		this._last_trans_id = value;
	}

	get method(): string{
		return this._method;
	}

	set method(value: string){
		this._method = value;
	}

	get parent_id(): number{
		return this._parent_id;
	}

	set parent_id(value: number){
		this._parent_id = value;
	}

	get po_number(): string{
		return this._po_number;
	}

	set po_number(value: string){
		this._po_number = value;
	}

	get protection_eligibility(): string{
		return this._protection_eligibility;
	}

	set protection_eligibility(value: string){
		this._protection_eligibility = value;
	}

	get quote_payment_id(): number{
		return this._quote_payment_id;
	}

	set quote_payment_id(value: number){
		this._quote_payment_id = value;
	}

	get shipping_amount(): number{
		return this._shipping_amount;
	}

	set shipping_amount(value: number){
		this._shipping_amount = value;
	}

	get shipping_captured(): number{
		return this._shipping_captured;
	}

	set shipping_captured(value: number){
		this._shipping_captured = value;
	}

	get shipping_refunded(): number{
		return this._shipping_refunded;
	}

	set shipping_refunded(value: number){
		this._shipping_refunded = value;
	}

	get extension_attributes(): OrderPaymentExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: OrderPaymentExtensionModel){
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
		this.account_status = data.account_status;
		this.additional_data = data.additional_data;
		this.additional_information = data.additional_information;
		this.address_status = data.address_status;
		this.amount_authorized = data.amount_authorized;
		this.amount_canceled = data.amount_canceled;
		this.amount_ordered = data.amount_ordered;
		this.amount_paid = data.amount_paid;
		this.amount_refunded = data.amount_refunded;
		this.anet_trans_method = data.anet_trans_method;
		this.base_amount_authorized = data.base_amount_authorized;
		this.base_amount_canceled = data.base_amount_canceled;
		this.base_amount_ordered = data.base_amount_ordered;
		this.base_amount_paid = data.base_amount_paid;
		this.base_amount_paid_online = data.base_amount_paid_online;
		this.base_amount_refunded = data.base_amount_refunded;
		this.base_amount_refunded_online = data.base_amount_refunded_online;
		this.base_shipping_amount = data.base_shipping_amount;
		this.base_shipping_captured = data.base_shipping_captured;
		this.base_shipping_refunded = data.base_shipping_refunded;
		this.cc_approval = data.cc_approval;
		this.cc_avs_status = data.cc_avs_status;
		this.cc_cid_status = data.cc_cid_status;
		this.cc_debug_request_body = data.cc_debug_request_body;
		this.cc_debug_response_body = data.cc_debug_response_body;
		this.cc_debug_response_serialized = data.cc_debug_response_serialized;
		this.cc_exp_month = data.cc_exp_month;
		this.cc_exp_year = data.cc_exp_year;
		this.cc_last4 = data.cc_last4;
		this.cc_number_enc = data.cc_number_enc;
		this.cc_owner = data.cc_owner;
		this.cc_secure_verify = data.cc_secure_verify;
		this.cc_ss_issue = data.cc_ss_issue;
		this.cc_ss_start_month = data.cc_ss_start_month;
		this.cc_ss_start_year = data.cc_ss_start_year;
		this.cc_status = data.cc_status;
		this.cc_status_description = data.cc_status_description;
		this.cc_trans_id = data.cc_trans_id;
		this.cc_type = data.cc_type;
		this.echeck_account_name = data.echeck_account_name;
		this.echeck_account_type = data.echeck_account_type;
		this.echeck_bank_name = data.echeck_bank_name;
		this.echeck_routing_number = data.echeck_routing_number;
		this.echeck_type = data.echeck_type;
		this.entity_id = data.entity_id;
		this.last_trans_id = data.last_trans_id;
		this.method = data.method;
		this.parent_id = data.parent_id;
		this.po_number = data.po_number;
		this.protection_eligibility = data.protection_eligibility;
		this.quote_payment_id = data.quote_payment_id;
		this.shipping_amount = data.shipping_amount;
		this.shipping_captured = data.shipping_captured;
		this.shipping_refunded = data.shipping_refunded;

		/* Somehow returning as an array instead of a single object as stated in the documentation
		if(data.extension_attributes){
			let extensionModel: OrderPaymentExtensionModel = new OrderPaymentExtensionModel();
			this.extension_attributes = extensionModel.fromJson(data.extension_attributes);	
		}
		*/
		

		return this;
	}
}

export class OrderPaymentExtensionModel{
	private _vault_payment_token: OrderPaymentExtensionVaultPaymentModel;

	get vault_payment_token(): OrderPaymentExtensionVaultPaymentModel{
		return this._vault_payment_token;
	}

	set vault_payment_token(value: OrderPaymentExtensionVaultPaymentModel){
		this._vault_payment_token = value;
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
		let tokenModel: OrderPaymentExtensionVaultPaymentModel = new OrderPaymentExtensionVaultPaymentModel();
		this.vault_payment_token = tokenModel.fromJson( data.vault_payment_token );
		
		return this;
	}
}

export class OrderPaymentExtensionVaultPaymentModel{
	private _entity_id: number;
    private _customer_id: number;
    private _public_hash: string;
    private _payment_method_code: string;
    private _type: string;
    private _created_at: string;
    private _expires_at: string;
    private _gateway_token: string;
    private _token_details: string;
    private _is_active: boolean;
    private _is_visible: boolean;

    get entity_id(): number{
		return this._entity_id;
    }

	set entity_id(value: number){
		this._entity_id = value;
	}

    get customer_id(): number{
		return this._customer_id;
    }

	set customer_id(value: number){
		this._customer_id = value;
	}

    get public_hash(): string{
		return this._public_hash;
    }

	set public_hash(value: string){
		this._public_hash = value;
	}

    get payment_method_code(): string{
		return this._payment_method_code;
    }

	set payment_method_code(value: string){
		this._payment_method_code = value;
	}

    get type(): string{
		return this._type;
    }

	set type(value: string){
		this._type = value;
	}

    get created_at(): string{
		return this._created_at;
    }

	set created_at(value: string){
		this._created_at = value;
	}

    get expires_at(): string{
		return this._expires_at;
    }

	set expires_at(value: string){
		this._expires_at = value;
	}

    get gateway_token(): string{
		return this._gateway_token;
    }

	set gateway_token(value: string){
		this._gateway_token = value;
	}

    get token_details(): string{
		return this._token_details;
    }

	set token_details(value: string){
		this._token_details = value;
	}

    get is_active(): boolean{
		return this._is_active;
    }

	set is_active(value: boolean){
		this._is_active = value;
	}

    get is_visible(): boolean{
		return this._is_visible;
    }

	set is_visible(value: boolean){
		this._is_visible = value;
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
		this.entity_id = data.entity_id;
	    this.customer_id = data.customer_id;
	    this.public_hash = data.public_hash;
	    this.payment_method_code = data.payment_method_code;
	    this.type = data.type;
	    this.created_at = data.created_at;
	    this.expires_at = data.expires_at;
	    this.gateway_token = data.gateway_token;
	    this.token_details = data.token_details;
	    this.is_active = data.is_active;
	    this.is_visible = data.is_visible;

		return this;
	}
}

export class OrderExtensionModel{
	private _shipping_assignments: Array<OrderExtensionShippingAssignmentModel> = [];
	//private _applied_taxes: any;
	//private _item_applied_taxes: any;
	private _converting_from_quote: boolean;
	private _company_order_attributes: OrderExtensionCompanyOrderModel;
	private _base_customer_balance_amount: number;
	private _customer_balance_amount: number;
	private _base_customer_balance_invoiced: number;
	private _customer_balance_invoiced: number;
	private _base_customer_balance_refunded: number;
	private _customer_balance_refunded: number;
	private _base_customer_balance_total_refunded: number;
	private _customer_balance_total_refunded: number;
	private _gift_cards: Array<OrderExtensionGiftCardModel> = [];
	private _base_gift_cards_amount: number;
	private _gift_cards_amount: number;
	private _base_gift_cards_invoiced: number;
	private _gift_cards_invoiced: number;
	private _base_gift_cards_refunded: number;
	private _gift_cards_refunded: number;
	//private _gift_message: any;
	private _gw_id: string;
	private _gw_allow_gift_receipt: string;
	private _gw_add_card: string;
	private _gw_base_price: string;
	private _gw_price: string;
	private _gw_items_base_price: string;
	private _gw_items_price: string;
	private _gw_card_base_price: string;
	private _gw_card_price: string;
	private _gw_base_tax_amount: string;
	private _gw_tax_amount: string;
	private _gw_items_base_tax_amount: string;
	private _gw_items_tax_amount: string;
	private _gw_card_base_tax_amount: string;
	private _gw_card_tax_amount: string;
	private _gw_base_price_incl_tax: string;
	private _gw_price_incl_tax: string;
	private _gw_items_base_price_incl_tax: string;
	private _gw_items_price_incl_tax: string;
	private _gw_card_base_price_incl_tax: string;
	private _gw_card_price_incl_tax: string;
	private _gw_base_price_invoiced: string;
	private _gw_price_invoiced: string;
	private _gw_items_base_price_invoiced: string;
	private _gw_items_price_invoiced: string;
	private _gw_card_base_price_invoiced: string;
	private _gw_card_price_invoiced: string;
	private _gw_base_tax_amount_invoiced: string;
	private _gw_tax_amount_invoiced: string;
	private _gw_items_base_tax_invoiced: string;
	private _gw_items_tax_invoiced: string;
	private _gw_card_base_tax_invoiced: string;
	private _gw_card_tax_invoiced: string;
	private _gw_base_price_refunded: string;
	private _gw_price_refunded: string;
	private _gw_items_base_price_refunded: string;
	private _gw_items_price_refunded: string;
	private _gw_card_base_price_refunded: string;
	private _gw_card_price_refunded: string;
	private _gw_base_tax_amount_refunded: string;
	private _gw_tax_amount_refunded: string;
	private _gw_items_base_tax_refunded: string;
	private _gw_items_tax_refunded: string;
	private _gw_card_base_tax_refunded: string;
	private _gw_card_tax_refunded: string;

	// Custom
	private _app_additional_fee: number;
	private _base_app_additional_fee: number;
	private _from_app: boolean;

	get shipping_assignments(): Array<OrderExtensionShippingAssignmentModel>{
		return this._shipping_assignments;
	}

	get_shipping_assignment(key: number): OrderExtensionShippingAssignmentModel{
		return this.shipping_assignments[key];
	}

	set shipping_assignments(value: Array<OrderExtensionShippingAssignmentModel>){
		this._shipping_assignments = value;
	}

	set_shipping_assignment(value: OrderExtensionShippingAssignmentModel){
		this.shipping_assignments.push(value);
	}

	//applied_taxes
	//item_applied_taxes

	get converting_from_quote(): boolean{
		return this._converting_from_quote;
	}

	set converting_from_quote(value: boolean){
		this._converting_from_quote = value;
	}

	get company_order_attributes(): OrderExtensionCompanyOrderModel{
		return this._company_order_attributes;
	}

	set company_order_attributes(value: OrderExtensionCompanyOrderModel){
		this._company_order_attributes = value;
	}

	get base_customer_balance_amount(): number{
		return this._base_customer_balance_amount;
	}

	set base_customer_balance_amount(value: number){
		this._base_customer_balance_amount = value;
	}

	get customer_balance_amount(): number{
		return this._customer_balance_amount;
	}

	set customer_balance_amount(value: number){
		this._customer_balance_amount = value;
	}

	get base_customer_balance_invoiced(): number{
		return this._base_customer_balance_invoiced;
	}

	set base_customer_balance_invoiced(value: number){
		this._base_customer_balance_invoiced = value;
	}

	get customer_balance_invoiced(): number{
		return this._customer_balance_invoiced;
	}

	set customer_balance_invoiced(value: number){
		this._customer_balance_invoiced = value;
	}

	get base_customer_balance_refunded(): number{
		return this._base_customer_balance_refunded;
	}

	set base_customer_balance_refunded(value: number){
		this._base_customer_balance_refunded = value;
	}

	get customer_balance_refunded(): number{
		return this._customer_balance_refunded;
	}

	set customer_balance_refunded(value: number){
		this._customer_balance_refunded = value;
	}

	get base_customer_balance_total_refunded(): number{
		return this._base_customer_balance_total_refunded;
	}

	set base_customer_balance_total_refunded(value: number){
		this._base_customer_balance_total_refunded = value;
	}

	get customer_balance_total_refunded(): number{
		return this._customer_balance_total_refunded;
	}

	set customer_balance_total_refunded(value: number){
		this._customer_balance_total_refunded = value;
	}

	get gift_cards(): Array<OrderExtensionGiftCardModel>{
		return this._gift_cards;
	}

	get_gift_cards(key: number): OrderExtensionGiftCardModel{
		return this.gift_cards[key];
	}

	set gift_cards(value: Array<OrderExtensionGiftCardModel>){
		this._gift_cards = value;
	}

	set_gift_cards(value: OrderExtensionGiftCardModel){
		this.gift_cards.push(value);
	}

	get base_gift_cards_amount(): number{
		return this._base_gift_cards_amount;
	}

	set base_gift_cards_amount(value: number){
		this._base_gift_cards_amount = value;
	}

	get gift_cards_amount(): number{
		return this._gift_cards_amount;
	}

	set gift_cards_amount(value: number){
		this._gift_cards_amount = value;
	}

	get base_gift_cards_invoiced(): number{
		return this._base_gift_cards_invoiced;
	}

	set base_gift_cards_invoiced(value: number){
		this._base_gift_cards_invoiced = value;
	}

	get gift_cards_invoiced(): number{
		return this._gift_cards_invoiced;
	}

	set gift_cards_invoiced(value: number){
		this._gift_cards_invoiced = value;
	}

	get base_gift_cards_refunded(): number{
		return this._base_gift_cards_refunded;
	}

	set base_gift_cards_refunded(value: number){
		this._base_gift_cards_refunded = value;
	}

	get gift_cards_refunded(): number{
		return this._gift_cards_refunded;
	}

	set gift_cards_refunded(value: number){
		this._gift_cards_refunded = value;
	}

	//private _gift_message: any;

	get gw_id(): string{
		return this._gw_id;
	}

	set gw_id(value: string){
		this._gw_id = value;
	}

	get gw_allow_gift_receipt(): string{
		return this._gw_allow_gift_receipt;
	}

	set gw_allow_gift_receipt(value: string){
		this._gw_allow_gift_receipt = value;
	}

	get gw_add_card(): string{
		return this._gw_add_card;
	}

	set gw_add_card(value: string){
		this._gw_add_card = value;
	}

	get gw_base_price(): string{
		return this._gw_base_price;
	}

	set gw_base_price(value: string){
		this._gw_base_price = value;
	}

	get gw_price(): string{
		return this._gw_price;
	}

	set gw_price(value: string){
		this._gw_price = value;
	}

	get gw_items_base_price(): string{
		return this._gw_items_base_price;
	}

	set gw_items_base_price(value: string){
		this._gw_items_base_price = value;
	}

	get gw_items_price(): string{
		return this._gw_items_price;
	}

	set gw_items_price(value: string){
		this._gw_items_price = value;
	}

	get gw_card_base_price(): string{
		return this._gw_card_base_price;
	}

	set gw_card_base_price(value: string){
		this._gw_card_base_price = value;
	}

	get gw_card_price(): string{
		return this._gw_card_price;
	}

	set gw_card_price(value: string){
		this._gw_card_price = value;
	}

	get gw_base_tax_amount(): string{
		return this._gw_base_tax_amount;
	}

	set gw_base_tax_amount(value: string){
		this._gw_base_tax_amount = value;
	}

	get gw_tax_amount(): string{
		return this._gw_tax_amount;
	}

	set gw_tax_amount(value: string){
		this._gw_tax_amount = value;
	}

	get gw_items_base_tax_amount(): string{
		return this._gw_items_base_tax_amount;
	}

	set gw_items_base_tax_amount(value: string){
		this._gw_items_base_tax_amount = value;
	}

	get gw_items_tax_amount(): string{
		return this._gw_items_tax_amount;
	}

	set gw_items_tax_amount(value: string){
		this._gw_items_tax_amount = value;
	}

	get gw_card_base_tax_amount(): string{
		return this._gw_card_base_tax_amount;
	}

	set gw_card_base_tax_amount(value: string){
		this._gw_card_base_tax_amount = value;
	}

	get gw_card_tax_amount(): string{
		return this._gw_card_tax_amount;
	}

	set gw_card_tax_amount(value: string){
		this._gw_card_tax_amount = value;
	}

	get gw_base_price_incl_tax(): string{
		return this._gw_base_price_incl_tax;
	}

	set gw_base_price_incl_tax(value: string){
		this._gw_base_price_incl_tax = value;
	}

	get gw_price_incl_tax(): string{
		return this._gw_price_incl_tax;
	}

	set gw_price_incl_tax(value: string){
		this._gw_price_incl_tax = value;
	}

	get gw_items_base_price_incl_tax(): string{
		return this._gw_items_base_price_incl_tax;
	}

	set gw_items_base_price_incl_tax(value: string){
		this._gw_items_base_price_incl_tax = value;
	}

	get gw_items_price_incl_tax(): string{
		return this._gw_items_price_incl_tax;
	}

	set gw_items_price_incl_tax(value: string){
		this._gw_items_price_incl_tax = value;
	}

	get gw_card_base_price_incl_tax(): string{
		return this._gw_card_base_price_incl_tax;
	}

	set gw_card_base_price_incl_tax(value: string){
		this._gw_card_base_price_incl_tax = value;
	}

	get gw_card_price_incl_tax(): string{
		return this._gw_card_price_incl_tax;
	}

	set gw_card_price_incl_tax(value: string){
		this._gw_card_price_incl_tax = value;
	}

	get gw_base_price_invoiced(): string{
		return this._gw_base_price_invoiced;
	}

	set gw_base_price_invoiced(value: string){
		this._gw_base_price_invoiced = value;
	}

	get gw_price_invoiced(): string{
		return this._gw_price_invoiced;
	}

	set gw_price_invoiced(value: string){
		this._gw_price_invoiced = value;
	}

	get gw_items_base_price_invoiced(): string{
		return this._gw_items_base_price_invoiced;
	}

	set gw_items_base_price_invoiced(value: string){
		this._gw_items_base_price_invoiced = value;
	}

	get gw_items_price_invoiced(): string{
		return this._gw_items_price_invoiced;
	}

	set gw_items_price_invoiced(value: string){
		this._gw_items_price_invoiced = value;
	}

	get gw_card_base_price_invoiced(): string{
		return this._gw_card_base_price_invoiced;
	}

	set gw_card_base_price_invoiced(value: string){
		this._gw_card_base_price_invoiced = value;
	}

	get gw_card_price_invoiced(): string{
		return this._gw_card_price_invoiced;
	}

	set gw_card_price_invoiced(value: string){
		this._gw_card_price_invoiced = value;
	}

	get gw_base_tax_amount_invoiced(): string{
		return this._gw_base_tax_amount_invoiced;
	}

	set gw_base_tax_amount_invoiced(value: string){
		this._gw_base_tax_amount_invoiced = value;
	}

	get gw_tax_amount_invoiced(): string{
		return this._gw_tax_amount_invoiced;
	}

	set gw_tax_amount_invoiced(value: string){
		this._gw_tax_amount_invoiced = value;
	}

	get gw_items_base_tax_invoiced(): string{
		return this._gw_items_base_tax_invoiced;
	}

	set gw_items_base_tax_invoiced(value: string){
		this._gw_items_base_tax_invoiced = value;
	}

	get gw_items_tax_invoiced(): string{
		return this._gw_items_tax_invoiced;
	}

	set gw_items_tax_invoiced(value: string){
		this._gw_items_tax_invoiced = value;
	}

	get gw_card_base_tax_invoiced(): string{
		return this._gw_card_base_tax_invoiced;
	}

	set gw_card_base_tax_invoiced(value: string){
		this._gw_card_base_tax_invoiced = value;
	}

	get gw_card_tax_invoiced(): string{
		return this._gw_card_tax_invoiced;
	}

	set gw_card_tax_invoiced(value: string){
		this._gw_card_tax_invoiced = value;
	}

	get gw_base_price_refunded(): string{
		return this._gw_base_price_refunded;
	}

	set gw_base_price_refunded(value: string){
		this._gw_base_price_refunded = value;
	}

	get gw_price_refunded(): string{
		return this._gw_price_refunded;
	}

	set gw_price_refunded(value: string){
		this._gw_price_refunded = value;
	}

	get gw_items_base_price_refunded(): string{
		return this._gw_items_base_price_refunded;
	}

	set gw_items_base_price_refunded(value: string){
		this._gw_items_base_price_refunded = value;
	}

	get gw_items_price_refunded(): string{
		return this._gw_items_price_refunded;
	}

	set gw_items_price_refunded(value: string){
		this._gw_items_price_refunded = value;
	}

	get gw_card_base_price_refunded(): string{
		return this._gw_card_base_price_refunded;
	}

	set gw_card_base_price_refunded(value: string){
		this._gw_card_base_price_refunded = value;
	}

	get gw_card_price_refunded(): string{
		return this._gw_card_price_refunded;
	}

	set gw_card_price_refunded(value: string){
		this._gw_card_price_refunded = value;
	}

	get gw_base_tax_amount_refunded(): string{
		return this._gw_base_tax_amount_refunded;
	}

	set gw_base_tax_amount_refunded(value: string){
		this._gw_base_tax_amount_refunded = value;
	}

	get gw_tax_amount_refunded(): string{
		return this._gw_tax_amount_refunded;
	}

	set gw_tax_amount_refunded(value: string){
		this._gw_tax_amount_refunded = value;
	}

	get gw_items_base_tax_refunded(): string{
		return this._gw_items_base_tax_refunded;
	}

	set gw_items_base_tax_refunded(value: string){
		this._gw_items_base_tax_refunded = value;
	}

	get gw_items_tax_refunded(): string{
		return this._gw_items_tax_refunded;
	}

	set gw_items_tax_refunded(value: string){
		this._gw_items_tax_refunded = value;
	}

	get gw_card_base_tax_refunded(): string{
		return this._gw_card_base_tax_refunded;
	}

	set gw_card_base_tax_refunded(value: string){
		this._gw_card_base_tax_refunded = value;
	}

	get gw_card_tax_refunded(): string{
		return this._gw_card_tax_refunded;
	}

	set gw_card_tax_refunded(value: string){
		this._gw_card_tax_refunded = value;
	}

	// Custom
	get app_additional_fee(): number{
		return this._app_additional_fee;
	}

	set app_additional_fee(value: number){
		this._app_additional_fee = value;
	}

	get base_app_additional_fee(): number{
		return this._base_app_additional_fee;
	}

	set base_app_additional_fee(value: number){
		this._base_app_additional_fee = value;
	}

	get from_app(): boolean{
		return this._from_app;
	}

	set from_app(value: boolean){
		this._from_app = value;
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
		//private _shipping_assignments: Array<OrderExtensionShippingAssignmentModel> = [];
		if(data.shipping_assignments){
			for(let assignment of data.shipping_assignments){
				let model: OrderExtensionShippingAssignmentModel = new OrderExtensionShippingAssignmentModel();
				this.set_shipping_assignment( model.fromJson(assignment) );
			}
		}

		//private _applied_taxes: any;
		//private _item_applied_taxes: any;

		this.converting_from_quote = data.converting_from_quote;
		
		//private _company_order_attributes: OrderExtensionCompanyOrderModel;
		if(data.company_order_attributes){
			let orderAttributeModel: OrderExtensionCompanyOrderModel = new OrderExtensionCompanyOrderModel;
			this.company_order_attributes = orderAttributeModel.fromJson( data.company_order_attributes );	
		}
		
		
		this.base_customer_balance_amount = data.base_customer_balance_amount;
		this.customer_balance_amount = data.customer_balance_amount;
		this.base_customer_balance_invoiced = data.base_customer_balance_invoiced;
		this.customer_balance_invoiced = data.customer_balance_invoiced;
		this.base_customer_balance_refunded = data.base_customer_balance_refunded;
		this.customer_balance_refunded = data.customer_balance_refunded;
		this.base_customer_balance_total_refunded = data.base_customer_balance_total_refunded;
		this.customer_balance_total_refunded = data.customer_balance_total_refunded;

		//private _gift_cards: Array<OrderExtensionGiftCardModel> = [];
		if(data.gift_cards){
			for(let card of data.gift_cards){
				let model: OrderExtensionGiftCardModel = new OrderExtensionGiftCardModel();
				this.set_gift_cards( model.fromJson(card) );
			}
		}
		
		this.base_gift_cards_amount = data.base_gift_cards_amount;
		this.gift_cards_amount = data.gift_cards_amount;
		this.base_gift_cards_invoiced = data.base_gift_cards_invoiced;
		this.gift_cards_invoiced = data.gift_cards_invoiced;
		this.base_gift_cards_refunded = data.base_gift_cards_refunded;
		this.gift_cards_refunded = data.gift_cards_refunded;
		//private _gift_message: any;
		this.gw_id = data.gw_id;
		this.gw_allow_gift_receipt = data.gw_allow_gift_receipt;
		this.gw_add_card = data.gw_add_card;
		this.gw_base_price = data.gw_base_price;
		this.gw_price = data.gw_price;
		this.gw_items_base_price = data.gw_items_base_price;
		this.gw_items_price = data.gw_items_price;
		this.gw_card_base_price = data.gw_card_base_price;
		this.gw_card_price = data.gw_card_price;
		this.gw_base_tax_amount = data.gw_base_tax_amount;
		this.gw_tax_amount = data.gw_tax_amount;
		this.gw_items_base_tax_amount = data.gw_items_base_tax_amount;
		this.gw_items_tax_amount = data.gw_items_tax_amount;
		this.gw_card_base_tax_amount = data.gw_card_base_tax_amount;
		this.gw_card_tax_amount = data.gw_card_tax_amount;
		this.gw_base_price_incl_tax = data.gw_base_price_incl_tax;
		this.gw_price_incl_tax = data.gw_price_incl_tax;
		this.gw_items_base_price_incl_tax = data.gw_items_base_price_incl_tax;
		this.gw_items_price_incl_tax = data.gw_items_price_incl_tax;
		this.gw_card_base_price_incl_tax = data.gw_card_base_price_incl_tax;
		this.gw_card_price_incl_tax = data.gw_card_price_incl_tax;
		this.gw_base_price_invoiced = data.gw_base_price_invoiced;
		this.gw_price_invoiced = data.gw_price_invoiced;
		this.gw_items_base_price_invoiced = data.gw_items_base_price_invoiced;
		this.gw_items_price_invoiced = data.gw_items_price_invoiced;
		this.gw_card_base_price_invoiced = data.gw_card_base_price_invoiced;
		this.gw_card_price_invoiced = data.gw_card_price_invoiced;
		this.gw_base_tax_amount_invoiced = data.gw_base_tax_amount_invoiced;
		this.gw_tax_amount_invoiced = data.gw_tax_amount_invoiced;
		this.gw_items_base_tax_invoiced = data.gw_items_base_tax_invoiced;
		this.gw_items_tax_invoiced = data.gw_items_tax_invoiced;
		this.gw_card_base_tax_invoiced = data.gw_card_base_tax_invoiced;
		this.gw_card_tax_invoiced = data.gw_card_tax_invoiced;
		this.gw_base_price_refunded = data.gw_base_price_refunded;
		this.gw_price_refunded = data.gw_price_refunded;
		this.gw_items_base_price_refunded = data.gw_items_base_price_refunded;
		this.gw_items_price_refunded = data.gw_items_price_refunded;
		this.gw_card_base_price_refunded = data.gw_card_base_price_refunded;
		this.gw_card_price_refunded = data.gw_card_price_refunded;
		this.gw_base_tax_amount_refunded = data.gw_base_tax_amount_refunded;
		this.gw_tax_amount_refunded = data.gw_tax_amount_refunded;
		this.gw_items_base_tax_refunded = data.gw_items_base_tax_refunded;
		this.gw_items_tax_refunded = data.gw_items_tax_refunded;
		this.gw_card_base_tax_refunded = data.gw_card_base_tax_refunded;
		this.gw_card_tax_refunded = data.gw_card_tax_refunded;

		// Custom

		this.app_additional_fee = data.app_additional_fee;
		this.base_app_additional_fee = data.base_app_additional_fee;
		this.from_app = data.from_app;
		
		return this;
	}
}

export class OrderExtensionCompanyOrderModel{
	private _order_id: number;
	private _company_id: number;
	private _company_name: string;
	//extension_attributes

	get order_id(): number{
		return this._order_id;
	}

	set order_id(value: number){
		this._order_id = value;
	}

	get company_id(): number{
		return this._company_id;
	}

	set company_id(value: number){
		this._company_id = value;
	}

	get company_name(): string{
		return this._company_name;
	}

	set company_name(value: string){
		this._company_name = value;
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
		this.order_id = data.order_id;
		this.company_id = data.company_id;
		this.company_name = data.company_name;

		return this;
	}
}

export class OrderExtensionGiftCardModel{
	private _id: number;
	private _code: string;
	private _amount: number;
	private _base_amount: number;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get code(): string{
		return this._code;
	}

	set code(value: string){
		this._code = value;
	}

	get amount(): number{
		return this._amount;
	}

	set amount(value: number){
		this._amount = value;
	}

	get base_amount(): number{
		return this._base_amount;
	}

	set base_amount(value: number){
		this._base_amount = value;
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
		this.id = data.id;
		this.code = data.code;
		this.amount = data.amount;
		this.base_amount = data.base_amount;
		return this;
	}
}

export class OrderExtensionShippingAssignmentModel{
	private _shipping: ShippingAssignmentShippingModel;
	//private _items: any;
	private _stock_id: number;
	//private _extension_attributes;

	get shipping(): ShippingAssignmentShippingModel{
		return this._shipping;
	}

	set shipping(value: ShippingAssignmentShippingModel){
		this._shipping = value;
	}

	// items

	get stock_id(): number{
		return this._stock_id;
	}

	set stock_id(value: number){
		this._stock_id = value;
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
		let shippingModel: ShippingAssignmentShippingModel = new ShippingAssignmentShippingModel();
		this.shipping = shippingModel.fromJson(data.shipping);

		this.stock_id = data.stock_id;

		return this;
	}
}

export class ShippingAssignmentShippingModel{
	private _address: OrderAddressModel;
	private _method: string;
	private _total: ShippingTotalModel;
	//private extension_attributes;

	get address(): OrderAddressModel{
		return this._address;
	}

	set address(value: OrderAddressModel){
		this._address = value;
	}

	get method(): string{
		return this._method;
	}

	set method(value: string){
		this._method = value;
	}

	get total(): ShippingTotalModel{
		return this._total;
	}

	set total(value: ShippingTotalModel){
		this._total = value;
	}

	//extension attribute

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		let orderModel: OrderAddressModel = new OrderAddressModel();
		this.address = orderModel.fromJson(data.address);

		this.method = data.method;

		let totalModel: ShippingTotalModel = new ShippingTotalModel();
		this.total = totalModel.fromJson(data.total);

		return this;
	}
}

export class ShippingTotalModel{
	private _base_shipping_amount: number;
	private _base_shipping_canceled: number;
	private _base_shipping_discount_amount: number;
	private _base_shipping_discount_tax_compensation_amnt: number;
	private _base_shipping_incl_tax: number;
	private _base_shipping_invoiced: number;
	private _base_shipping_refunded: number;
	private _base_shipping_tax_amount: number;
	private _base_shipping_tax_refunded: number;
	private _shipping_amount: number;
	private _shipping_canceled: number;
	private _shipping_discount_amount: number;
	private _shipping_discount_tax_compensation_amount: number;
	private _shipping_incl_tax: number;
	private _shipping_invoiced: number;
	private _shipping_refunded: number;
	private _shipping_tax_amount: number;
	private _shipping_tax_refunded: number;
	//"extension_attributes": {}

	get base_shipping_amount(): number{
		return this._base_shipping_amount;
	}

	set base_shipping_amount(value: number){
		this._base_shipping_amount = value;
	}

	get base_shipping_canceled(): number{
		return this._base_shipping_canceled;
	}

	set base_shipping_canceled(value: number){
		this._base_shipping_canceled = value;
	}

	get base_shipping_discount_amount(): number{
		return this._base_shipping_discount_amount;
	}

	set base_shipping_discount_amount(value: number){
		this._base_shipping_discount_amount = value;
	}

	get base_shipping_discount_tax_compensation_amnt(): number{
		return this._base_shipping_discount_tax_compensation_amnt;
	}

	set base_shipping_discount_tax_compensation_amnt(value: number){
		this._base_shipping_discount_tax_compensation_amnt = value;
	}

	get base_shipping_incl_tax(): number{
		return this._base_shipping_incl_tax;
	}

	set base_shipping_incl_tax(value: number){
		this._base_shipping_incl_tax = value;
	}

	get base_shipping_invoiced(): number{
		return this._base_shipping_invoiced;
	}

	set base_shipping_invoiced(value: number){
		this._base_shipping_invoiced = value;
	}

	get base_shipping_refunded(): number{
		return this._base_shipping_refunded;
	}

	set base_shipping_refunded(value: number){
		this._base_shipping_refunded = value;
	}

	get base_shipping_tax_amount(): number{
		return this._base_shipping_tax_amount;
	}

	set base_shipping_tax_amount(value: number){
		this._base_shipping_tax_amount = value;
	}

	get base_shipping_tax_refunded(): number{
		return this._base_shipping_tax_refunded;
	}

	set base_shipping_tax_refunded(value: number){
		this._base_shipping_tax_refunded = value;
	}

	get shipping_amount(): number{
		return this._shipping_amount;
	}

	set shipping_amount(value: number){
		this._shipping_amount = value;
	}

	get shipping_canceled(): number{
		return this._shipping_canceled;
	}

	set shipping_canceled(value: number){
		this._shipping_canceled = value;
	}

	get shipping_discount_amount(): number{
		return this._shipping_discount_amount;
	}

	set shipping_discount_amount(value: number){
		this._shipping_discount_amount = value;
	}

	get shipping_discount_tax_compensation_amount(): number{
		return this._shipping_discount_tax_compensation_amount;
	}

	set shipping_discount_tax_compensation_amount(value: number){
		this._shipping_discount_tax_compensation_amount = value;
	}

	get shipping_incl_tax(): number{
		return this._shipping_incl_tax;
	}

	set shipping_incl_tax(value: number){
		this._shipping_incl_tax = value;
	}

	get shipping_invoiced(): number{
		return this._shipping_invoiced;
	}

	set shipping_invoiced(value: number){
		this._shipping_invoiced = value;
	}

	get shipping_refunded(): number{
		return this._shipping_refunded;
	}

	set shipping_refunded(value: number){
		this._shipping_refunded = value;
	}

	get shipping_tax_amount(): number{
		return this._shipping_tax_amount;
	}

	set shipping_tax_amount(value: number){
		this._shipping_tax_amount = value;
	}

	get shipping_tax_refunded(): number{
		return this._shipping_tax_refunded;
	}

	set shipping_tax_refunded(value: number){
		this._shipping_tax_refunded = value;
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
		this.base_shipping_amount = data.base_shipping_amount;
		this.base_shipping_canceled = data.base_shipping_canceled;
		this.base_shipping_discount_amount = data.base_shipping_discount_amount;
		this.base_shipping_discount_tax_compensation_amnt = data.base_shipping_discount_tax_compensation_amnt;
		this.base_shipping_incl_tax = data.base_shipping_incl_tax;
		this.base_shipping_invoiced = data.base_shipping_invoiced;
		this.base_shipping_refunded = data.base_shipping_refunded;
		this.base_shipping_tax_amount = data.base_shipping_tax_amount;
		this.base_shipping_tax_refunded = data.base_shipping_tax_refunded;
		this.shipping_amount = data.shipping_amount;
		this.shipping_canceled = data.shipping_canceled;
		this.shipping_discount_amount = data.shipping_discount_amount;
		this.shipping_discount_tax_compensation_amount = data.shipping_discount_tax_compensation_amount;
		this.shipping_incl_tax = data.shipping_incl_tax;
		this.shipping_invoiced = data.shipping_invoiced;
		this.shipping_refunded = data.shipping_refunded;
		this.shipping_tax_amount = data.shipping_tax_amount;
		this.shipping_tax_refunded = data.shipping_tax_refunded;
		
		return this;
	}
}