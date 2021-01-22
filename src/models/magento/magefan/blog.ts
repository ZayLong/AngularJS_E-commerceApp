export enum Type{
	Archive = 'archive',
	Author = 'author',
	Category = 'category',
	Search = 'search',
	Tag = 'tag'
}

export class BlogListModel{
	private _posts: Array<BlogPostModel> = [];
	private _total_number: number;
	private _current_page: number;
	private _last_page: number;

	get posts(): Array<BlogPostModel>{
		return this._posts;
	}

	get_posts(key: number): BlogPostModel{
		return this.posts[key];
	}

	set posts(value: Array<BlogPostModel>){
		this._posts = value;
	}

	set_posts(value: BlogPostModel): void{
		this.posts.push(value);
	}

	get total_number(): number{
		return this._total_number;
	}

	set total_number(value: number){
		this._total_number = value;
	}

	get current_page(): number{
		return this._current_page;
	}

	set current_page(value: number){
		this._current_page = value;
	}

	get last_page(): number{
		return this._last_page;
	}

	set last_page(value: number){
		this._last_page = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { Object } data
	 * @return { this }
	 */
	fromJson(data: any): this{
		if(data.posts){
			for(let item of data.posts){
				let model: BlogPostModel = new BlogPostModel();
				this.set_posts(model.fromJson(item));
			}
		}

		this.total_number = data.total_number;
		this.current_page = data.current_page;
		this.last_page = data.last_page;
		return this;
	}
}

export class BlogPostModel{
	private __first_store_id: Array<string> = [];
	private _author_id: string;
	private _categories: Array<string> = [];
	private _content: string;
	private _content_heading: string;
	private _creation_time: string;
	private _custom_layout: string;
	private _custom_layout_update_xml: string;
	private _custom_theme: string;
	private _custom_theme_from: string;
	private _custom_theme_to: string;
	private _featured_image: string;
	private _featured_img: string;
	private _filtered_content: string;
	private _first_image: string;
	private _identifier: string;
	private _include_in_recent: string;
	private _is_active: string;
	private _is_recent_posts_skip: string;
	private _layout_update_xml: string;
	private _media_gallery: string;
	private _meta_description: string;
	private _meta_keywords: string;
	private _meta_title: string;
	private _og_description: string;
	private _og_image: boolean;
	private _og_img: string;
	private _og_title: string;
	private _og_type: string;
	private _page_layout: string;
	private _position: string;
	private _post_id: string;
	private _post_image: string;
	private _post_url: string;
	private _publish_time: string;
	private _secret: string;
	private _short_content: string;
	private _short_filtered_content: string;
	private _store_id: number;
	private _store_ids: Array<string> = [];
	private _title: string;
	private _update_time: string;
	private _views_count: string;

	get _first_store_id(): Array<string>{
		return this.__first_store_id;
	}

	get__first_store_id(key: number): string{
		return this._first_store_id[key];
	}

	set _first_store_id(value: Array<string>){
		this.__first_store_id = value;
	}

	set__first_store_id(value: string): void{
		this._first_store_id.push(value);
	}

	get author_id(): string{
		return this._author_id;
	}

	set author_id(value: string){
		this._author_id = value;
	}

	get categories(): Array<string>{
		return this._categories;
	}

	get_categories(key: number): string{
		return this.categories[key];
	}

	set categories(value: Array<string>){
		this._categories = value;
	}

	set_categories(value: string): void{
		this.categories.push(value);
	}

	get content(): string{
		return this._content;
	}

	set content(value: string){
		this._content = value;
	}

	get content_heading(): string{
		return this._content_heading;
	}

	set content_heading(value: string){
		this._content_heading = value;
	}

	get creation_time(): string{
		return this._creation_time;
	}

	set creation_time(value: string){
		this._creation_time = value;
	}

	get custom_layout(): string{
		return this._custom_layout;
	}

	set custom_layout(value: string){
		this._custom_layout = value;
	}

	get custom_layout_update_xml(): string{
		return this._custom_layout_update_xml;
	}

	set custom_layout_update_xml(value: string){
		this._custom_layout_update_xml = value;
	}

	get custom_theme(): string{
		return this._custom_theme;
	}

	set custom_theme(value: string){
		this._custom_theme = value;
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

	get featured_image(): string{
		return this._featured_image;
	}

	set featured_image(value: string){
		this._featured_image = value;
	}

	get featured_img(): string{
		return this._featured_img;
	}

	set featured_img(value: string){
		this._featured_img = value;
	}

	get filtered_content(): string{
		return this._filtered_content;
	}

	set filtered_content(value: string){
		this._filtered_content = value;
	}

	get first_image(): string{
		return this._first_image;
	}

	set first_image(value: string){
		this._first_image = value;
	}

	get identifier(): string{
		return this._identifier;
	}

	set identifier(value: string){
		this._identifier = value;
	}

	get include_in_recent(): string{
		return this._include_in_recent;
	}

	set include_in_recent(value: string){
		this._include_in_recent = value;
	}

	get is_active(): string{
		return this._is_active;
	}

	set is_active(value: string){
		this._is_active = value;
	}

	get is_recent_posts_skip(): string{
		return this._is_recent_posts_skip;
	}

	set is_recent_posts_skip(value: string){
		this._is_recent_posts_skip = value;
	}

	get layout_update_xml(): string{
		return this._layout_update_xml;
	}

	set layout_update_xml(value: string){
		this._layout_update_xml = value;
	}

	get media_gallery(): string{
		return this._media_gallery;
	}

	set media_gallery(value: string){
		this._media_gallery = value;
	}

	get meta_description(): string{
		return this._meta_description;
	}

	set meta_description(value: string){
		this._meta_description = value;
	}

	get meta_keywords(): string{
		return this._meta_keywords;
	}

	set meta_keywords(value: string){
		this._meta_keywords = value;
	}

	get meta_title(): string{
		return this._meta_title;
	}

	set meta_title(value: string){
		this._meta_title = value;
	}

	get og_description(): string{
		return this._og_description;
	}

	set og_description(value: string){
		this._og_description = value;
	}

	get og_image(): boolean{
		return this._og_image;
	}

	set og_image(value: boolean){
		this._og_image = value;
	}

	get og_img(): string{
		return this._og_img;
	}

	set og_img(value: string){
		this._og_img = value;
	}

	get og_title(): string{
		return this._og_title;
	}

	set og_title(value: string){
		this._og_title = value;
	}

	get og_type(): string{
		return this._og_type;
	}

	set og_type(value: string){
		this._og_type = value;
	}

	get page_layout(): string{
		return this._page_layout;
	}

	set page_layout(value: string){
		this._page_layout = value;
	}

	get position(): string{
		return this._position;
	}

	set position(value: string){
		this._position = value;
	}

	get post_id(): string{
		return this._post_id;
	}

	set post_id(value: string){
		this._post_id = value;
	}

	get post_image(): string{
		return this._post_image;
	}

	set post_image(value: string){
		this._post_image = value;
	}

	get post_url(): string{
		return this._post_url;
	}

	set post_url(value: string){
		this._post_url = value;
	}

	get publish_time(): string{
		return this._publish_time;
	}

	set publish_time(value: string){
		this._publish_time = value;
	}

	get secret(): string{
		return this._secret;
	}

	set secret(value: string){
		this._secret = value;
	}

	get short_content(): string{
		return this._short_content;
	}

	set short_content(value: string){
		this._short_content = value;
	}

	get short_filtered_content(): string{
		return this._short_filtered_content;
	}

	set short_filtered_content(value: string){
		this._short_filtered_content = value;
	}

	get store_id(): number{
		return this._store_id;
	}

	set store_id(value: number){
		this._store_id = value;
	}

	get store_ids(): Array<string>{
		return this._store_ids;
	}

	get_store_ids(key: number): string{
		return this.store_ids[key];
	}

	set store_ids(value: Array<string>){
		this._store_ids = value;
	}

	set_store_ids(value: string): void{
		this.store_ids.push(value);
	}

	get title(): string{
		return this._title;
	}

	set title(value: string){
		this._title = value;
	}

	get update_time(): string{
		return this._update_time;
	}

	set update_time(value: string){
		this._update_time = value;
	}

	get views_count(): string{
		return this._views_count;
	}

	set views_count(value: string){
		this._views_count = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this._first_store_id = data._first_store_id;
		this.author_id = data.author_id;
		this.categories = data.categories;
		this.content = data.content;
		this.content_heading = data.content_heading;
		this.creation_time = data.creation_time;
		this.custom_layout = data.custom_layout;
		this.custom_layout_update_xml = data.custom_layout_update_xml;
		this.custom_theme = data.custom_theme;
		this.custom_theme_from = data.custom_theme_from;
		this.custom_theme_to = data.custom_theme_to;
		this.featured_image = data.featured_image;
		this.featured_img = data.featured_img;
		this.filtered_content = data.filtered_content;
		this.first_image = data.first_image;
		this.identifier = data.identifier;
		this.include_in_recent = data.include_in_recent;
		this.is_active = data.is_active;
		this.is_recent_posts_skip = data.is_recent_posts_skip;
		this.layout_update_xml = data.layout_update_xml;
		this.media_gallery = data.media_gallery;
		this.meta_description = data.meta_description;
		this.meta_keywords = data.meta_keywords;
		this.meta_title = data.meta_title;
		this.og_description = data.og_description;
		this.og_image = data.og_image;
		this.og_img = data.og_img;
		this.og_title = data.og_title;
		this.og_type = data.og_type;
		this.page_layout = data.page_layout;
		this.position = data.position;
		this.post_id = data.post_id;
		this.post_image = data.post_image;
		this.post_url = data.post_url;
		this.publish_time = data.publish_time;
		this.secret = data.secret;
		this.short_content = data.short_content;
		this.short_filtered_content = data.short_filtered_content;
		this.store_id = data.store_id;
		this.store_ids = data.store_ids;
		this.title = data.title;
		this.update_time = data.update_time;
		this.views_count = data.views_count;

		return this;
	}

	/**
	 * @public
	 * @method getMediaGallery
	 * @description Separate the semi-colon string into an array
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @return { Array<string> }
	 */
	public getMediaGallery(): Array<string>{
		let domain = 'https://stage.theindustrysource.com/pub/media/';
		let mediaGallery: Array<string> = [];

		if(this.media_gallery != null){
			for(let image of this.media_gallery.split(';')){
				mediaGallery.push(domain + image);
			}
		}

		return mediaGallery;
	}

	/**
	 * @public
	 * @method getCreationTime
	 * @description Get the creation time as a Date object
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @return { Date }
	 */
	public getCreationTime(): Date{
		let dateString = this.creation_time.replace(' ', 'T');
		return new Date(dateString);
	}

	/**
	 * @public
	 * @method getUpdateTime
	 * @description Get the update time as a Date object
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @return { Date }
	 */
	public getUpdateTime(): Date{
		let dateString = this.update_time.replace(' ', 'T');
		return new Date(dateString);
	}

	/**
	 * @public
	 * @method getPublishTime
	 * @description Get the publish time as a Date object
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @return { Date }
	 */
	public getPublishTime(): Date{
		let dateString = this.publish_time.replace(' ', 'T');
		return new Date(dateString);
	}
}

export class BlogCategoryModel{
	private _category_id: string;
	private _title: string;
	private _meta_title: string;
	private _category_image: string;
	private _meta_keywords: string;
	private _meta_description: string;
	private _identifier: string;
	private _content_heading: string;
	private _content: string;
	private _path: string;
	private _position: string;
	private _posts_sort_by: string;
	private _include_in_menu: string;
	private _is_active: string;
	private _display_mode: string;
	private _page_layout: string;
	private _layout_update_xml: string;
	private _custom_theme: string;
	private _custom_layout: string;
	private _custom_layout_update_xml: string;
	private _custom_theme_from: string;
	private _custom_theme_to: string;
	private _store_ids: Array<string>;

	get category_id(): string{
		return this._category_id;
	}

	set category_id(value: string){
		this._category_id = value;
	}

	get title(): string{
		return this._title;
	}

	set title(value: string){
		this._title = value;
	}

	get meta_title(): string{
		return this._meta_title;
	}

	set meta_title(value: string){
		this._meta_title = value;
	}

	get category_image(): string{
		return this._category_image;
	}

	set category_image(value: string){
		this._category_image = value;
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

	get identifier(): string{
		return this._identifier;
	}

	set identifier(value: string){
		this._identifier = value;
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

	get path(): string{
		return this._path;
	}

	set path(value: string){
		this._path = value;
	}

	get position(): string{
		return this._position;
	}

	set position(value: string){
		this._position = value;
	}

	get posts_sort_by(): string{
		return this._posts_sort_by;
	}

	set posts_sort_by(value: string){
		this._posts_sort_by = value;
	}

	get include_in_menu(): string{
		return this._include_in_menu;
	}

	set include_in_menu(value: string){
		this._include_in_menu = value;
	}

	get is_active(): string{
		return this._is_active;
	}

	set is_active(value: string){
		this._is_active = value;
	}

	get display_mode(): string{
		return this._display_mode;
	}

	set display_mode(value: string){
		this._display_mode = value;
	}

	get page_layout(): string{
		return this._page_layout;
	}

	set page_layout(value: string){
		this._page_layout = value;
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

	get custom_layout(): string{
		return this._custom_layout;
	}

	set custom_layout(value: string){
		this._custom_layout = value;
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

	get store_ids(): Array<string>{
		return this._store_ids;
	}

	get_store_ids(key: number): string{
		return this.store_ids[key];
	}

	set store_ids(value: Array<string>){
		this._store_ids = value;
	}

	set_store_ids(value: string): void{
		this.store_ids.push(value);
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.category_id = data.category_id;
		this.title = data.title;
		this.meta_title = data.meta_title;
		this.category_image = data.category_image;
		this.meta_keywords = data.meta_keywords;
		this.meta_description = data.meta_description;
		this.identifier = data.identifier;
		this.content_heading = data.content_heading;
		this.content = data.content;
		this.path = data.path;
		this.position = data.position;
		this.posts_sort_by = data.posts_sort_by;
		this.include_in_menu = data.include_in_menu;
		this.is_active = data.is_active;
		this.display_mode = data.display_mode;
		this.page_layout = data.page_layout;
		this.layout_update_xml = data.layout_update_xml;
		this.custom_theme = data.custom_theme;
		this.custom_layout = data.custom_layout;
		this.custom_layout_update_xml = data.custom_layout_update_xml;
		this.custom_theme_from = data.custom_theme_from;
		this.custom_theme_to = data.custom_theme_to;
		this.store_ids = data.store_ids;

		return this;
	}
}