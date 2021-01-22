export class PaymetricCardModel{
	private _card_number: string;
	private _card_type: string;
	private _valid_to: string;

	get card_number(): string{
		return this._card_number;
	}

	set card_number(value: string){
		this._card_number = value;
	}

	get card_type(): string{
		return this._card_type;
	}

	set card_type(value: string){
		this._card_type = value;
	}

	get valid_to(): string{
		return this._valid_to;
	}

	set valid_to(value: string){
		this._valid_to = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.card_number = data.card_number;
		this.card_type = data.card_type;
		this.valid_to = data.valid_to;

		return this;
	}

	/**
	 * @public
	 * @method fullCardType
	 * @description Get the full name of the card type (brand)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @return { string }
	 */
	public fullCardType(): string{
		switch(this.card_type.toLowerCase()){
			case 'visa':
			case 'vi':
				return 'Visa';
			// end case visa
			case 'mc':
				return 'Mastercard';
			// end case ????
			case 'disc':
			case 'di':
				return 'Discover';
			// end case disc
			case 'amex':
			case 'ae':
				return 'American Express';
			// end case amex
			default:
				return 'Unknown';
			// end default
		}
	}

	// Should make one to get image logo

	/**
	 * @public
	 * @method cardExpiration
	 * @description Get the expiration date
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @return { PaymetricExpirationCardModel }
	 */
	public cardExpiration(): PaymetricExpirationCardModel{
		let expiration: PaymetricExpirationCardModel = new PaymetricExpirationCardModel;

		let dateArray = this.valid_to.split('-');
		expiration.month = parseInt(dateArray[1]);
		expiration.year = parseInt(dateArray[0]);

		return expiration;
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
		let stringToArray: Array<string> = this.card_number.split('-');

		//-E803-7653-5Q1B3Z5AFQNB0K
		// [0] = null, [1] = E803. [2] = target

		return stringToArray[2];
	}
}

export class PaymetricExpirationCardModel{
	private _month: number;
	private _year: number;

	get month(): number{
		return this._month;
	}

	set month(value: number){
		this._month = value;
	}

	get year(): number{
		return this._year;
	}

	set year(value: number){
		this._year = value;
	}
}