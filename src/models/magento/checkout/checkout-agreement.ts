export class CheckoutAgreementModel{
	private _agreement_id: number;
    private _name: string;
    private _content: string;
    private _content_height: string;
    private _checkbox_text: string;
    private _is_active: boolean;
    private _is_html: boolean;
    private _mode: number;

    get agreement_id(): number{
		return this._agreement_id;
    }

	set agreement_id(value: number){
		this._agreement_id = value;
	}

    get name(): string{
		return this._name;
    }

	set name(value: string){
		this._name = value;
	}

    get content(): string{
		return this._content;
    }

	set content(value: string){
		this._content = value;
	}

    get content_height(): string{
		return this._content_height;
    }

	set content_height(value: string){
		this._content_height = value;
	}

    get checkbox_text(): string{
		return this._checkbox_text;
    }

	set checkbox_text(value: string){
		this._checkbox_text = value;
	}

    get is_active(): boolean{
		return this._is_active;
    }

	set is_active(value: boolean){
		this._is_active = value;
	}

    get is_html(): boolean{
		return this._is_html;
    }

	set is_html(value: boolean){
		this._is_html = value;
	}

    get mode(): number{
		return this._mode;
    }

	set mode(value: number){
		this._mode = value;
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
		this.agreement_id = data.agreement_id;
    	this.name = data.name;
    	this.content = data.content;
    	this.content_height = data.content_height;
    	this.checkbox_text = data.checkbox_text;
    	this.is_active = data.is_active;
    	this.is_html = data.is_html;
    	this.mode = data.mode;
		
		return this;
	}
}