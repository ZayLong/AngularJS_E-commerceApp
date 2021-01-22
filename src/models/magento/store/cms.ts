export class CmsBlockModel{
	private _id: number;
	private _identifier: string;
	private _title: string;
	private _content: string;
	private _creation_time: string;
	private _update_time: string;
	private _active: boolean;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get identifier(): string{
		return this._identifier;
	}

	set identifier(value: string){
		this._identifier = value;
	}

	get title(): string{
		return this._title;
	}

	set title(value: string){
		this._title = value;
	}

	get content(): string{
		return this._content;
	}

	set content(value: string){
		this._content = value;
	}

	get creation_time(): string{
		return this._creation_time;
	}

	set creation_time(value: string){
		this._creation_time = value;
	}

	get update_time(): string{
		return this._update_time;
	}

	set update_time(value: string){
		this._update_time = value;
	}

	get active(): boolean{
		return this._active;
	}

	set active(value: boolean){
		this._active = value;
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
		this.identifier = data.identifier;
		this.title = data.title;
		this.content = data.content;
		this.creation_time = data.creation_time;
		this.update_time = data.update_time;
		this.active = data.active;
		
		return this;
	}
}

export class CmsPageModel{
	private _id: number;
	private _identifier: string;
	private _title: string;
	private _page_layout: string;
	private _meta_title: string;
	private _meta_keywords: string;
	private _meta_description: string;
	private _content_heading: string;
	private _content: string;
	private _creation_time: string;
	private _update_time: string;
	private _sort_order: string;
	private _layout_update_xml: string;
	private _custom_theme: string;
	private _custom_root_template: string;
	private _custom_layout_update_xml: string;
	private _custom_theme_from: string;
	private _custom_theme_to: string;
	private _active: boolean;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get identifier(): string{
		return this._identifier;
	}

	set identifier(value: string){
		this._identifier = value;
	}

	get title(): string{
		return this._title;
	}

	set title(value: string){
		this._title = value;
	}

	get page_layout(): string{
		return this._page_layout;
	}

	set page_layout(value: string){
		this._page_layout = value;
	}

	get meta_title(): string{
		return this._meta_title;
	}

	set meta_title(value: string){
		this._meta_title = value;
	}

	get meta_keywords(): string{
		return this._meta_keywords;
	}

	set meta_keywords(value: string){
		this._meta_keywords = value;
	}

	get meta_description(): string{
		return this._meta_description;
	}

	set meta_description(value: string){
		this._meta_description = value;
	}

	get content_heading(): string{
		return this._content_heading;
	}

	set content_heading(value: string){
		this._content_heading = value;
	}

	get content(): string{
		return this._content;
	}

	set content(value: string){
		this._content = value;
	}

	get creation_time(): string{
		return this._creation_time;
	}

	set creation_time(value: string){
		this._creation_time = value;
	}

	get update_time(): string{
		return this._update_time;
	}

	set update_time(value: string){
		this._update_time = value;
	}

	get sort_order(): string{
		return this._sort_order;
	}

	set sort_order(value: string){
		this._sort_order = value;
	}

	get layout_update_xml(): string{
		return this._layout_update_xml;
	}

	set layout_update_xml(value: string){
		this._layout_update_xml = value;
	}

	get custom_theme(): string{
		return this._custom_theme;
	}

	set custom_theme(value: string){
		this._custom_theme = value;
	}

	get custom_root_template(): string{
		return this._custom_root_template;
	}

	set custom_root_template(value: string){
		this._custom_root_template = value;
	}

	get custom_layout_update_xml(): string{
		return this._custom_layout_update_xml;
	}

	set custom_layout_update_xml(value: string){
		this._custom_layout_update_xml = value;
	}

	get custom_theme_from(): string{
		return this._custom_theme_from;
	}

	set custom_theme_from(value: string){
		this._custom_theme_from = value;
	}

	get custom_theme_to(): string{
		return this._custom_theme_to;
	}

	set custom_theme_to(value: string){
		this._custom_theme_to = value;
	}

	get active(): boolean{
		return this._active;
	}

	set active(value: boolean){
		this._active = value;
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
		this.id = data.id;
		this.identifier = data.identifier;
		this.title = data.title;
		this.page_layout = data.page_layout;
		this.meta_title = data.meta_title;
		this.meta_keywords = data.meta_keywords;
		this.meta_description = data.meta_description;
		this.content_heading = data.content_heading;
		this.content = data.content;
		this.creation_time = data.creation_time;
		this.update_time = data.update_time;
		this.sort_order = data.sort_order;
		this.layout_update_xml = data.layout_update_xml;
		this.custom_theme = data.custom_theme;
		this.custom_root_template = data.custom_root_template;
		this.custom_layout_update_xml = data.custom_layout_update_xml;
		this.custom_theme_from = data.custom_theme_from;
		this.custom_theme_to = data.custom_theme_to;
		this.active = data.active;
		return this;
	}

	/**
	 * @public
	 * @method contentHTML
	 * @description Make the content HTML more app friendly
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @return { string }
	 */
	public contentHTML(): string{
		let html = this.content;


		// Convert image tags
		html = this.contentHTMLImages(html);

		return html;
	}

	/**
	 * @private
	 * @method contentHTMLImages
	 * @description Convert image tags to be more app friendly
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { string } html
	 * @return { string }
	 */
	private contentHTMLImages(html: string): string{
		let bracketsBeginning: string = 'src=\"{{';
		let bracketsEnd: string = '}}';

		let imageUrl: string = 'https://www.theindustrysource.com/media/';

		let startIndex: number = 0;
		let finishIndex: number = 0;
		let currentIndex: number = 0;

		// Lets start by finding the beginning search string
		while ((startIndex = html.indexOf(bracketsBeginning, currentIndex)) > -1) {
			console.info('CmsPageModel - contentHTMLImages - start', startIndex);

	        // Find the index of the end search string
	        finishIndex = html.indexOf(bracketsEnd, currentIndex);
	        console.info('CmsPageModel - contentHTMLImages - finish', finishIndex);

	        // Now we have the start and finish index positions, we can retrieve the entire string to modify
	        let imageSrc: string = html.substring(startIndex + bracketsBeginning.length, finishIndex);
	        console.info('CmsPageModel - contentHTMLImages - imageSrc', imageSrc);

	        // Remove the Magento CMS scripting from the string
	        imageSrc = imageSrc.replace('media url=', '');
	        console.info('CmsPageModel - contentHTMLImages - imageSrc (w/o extras)', imageSrc);

	        // Add the preceding image url href for the src attribute
	        imageSrc = imageSrc.substr(0, 1) + imageUrl + imageSrc.substr(1);
	        console.info('CmsPageModel - contentHTMLImages - imageSrc (add url)', imageSrc);

	        // Then apply the new image src to the html string
	        html = html.substr(0, startIndex + 4) + imageSrc + html.substr((finishIndex + 1) + bracketsEnd.length);
	        console.info('CmsPageModel - contentHTMLImages - substring (remove)', html);
	    }

		return html;
	}
}