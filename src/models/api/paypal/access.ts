// ENUM

export enum PayPalSandbox{
	ClientId = 'AbUoKc8npvxpznkG9xIHvXx588JC3YooD7yG38DsZHAjrlSWJlZ-bqn7TAdN8WS97rCXWXJvsnudz8cF',
	Secret = 'ENWJTrPl1qT6o0PDUeYzK4lBRhbCHEc8uUH5xmy8f3V7cGh7p9JiHh-bkmhm5zllA5ibtyRSKxqudPQp'
}

export enum PayPalProduction{
	ClientId = 'AUYO7hDwBTePmNK5ftUpEcVUX-LvzZRfCbyArOt-8jW2OI2quFSRcdUqiBZ4',
	Secret = 'EF7BjRC9ZpP2QWuvBXV73wmzuMbkpeXpBxQKdFhJkRl6epTC7cB-QCDRBPlP'
}

// RESPONSE

export class PayPalAccessTokenModel{
	private _scope: string;
	private _nonce: string;
	private _access_token: string;
	private _token_type: string;
	private _app_id: string;
	private _expires_in: string;

	get scope(): string{
		return this._scope;
	}

	set scope(value: string){
		this._scope = value;
	}

	get nonce(): string{
		return this._nonce;
	}

	set nonce(value: string){
		this._nonce = value;
	}

	get access_token(): string{
		return this._access_token;
	}

	set access_token(value: string){
		this._access_token = value;
	}

	get token_type(): string{
		return this._token_type;
	}

	set token_type(value: string){
		this._token_type = value;
	}

	get app_id(): string{
		return this._app_id;
	}

	set app_id(value: string){
		this._app_id = value;
	}

	get expires_in(): string{
		return this._expires_in;
	}

	set expires_in(value: string){
		this._expires_in = value;
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
	fromJson(data: any): this{
		this.scope = data.scope;
		this.nonce = data.nonce;
		this.access_token = data.access_token;
		this.token_type = data.token_type;
		this.app_id = data.app_id;
		this.expires_in = data.expires_in;

		return this;
	}
}