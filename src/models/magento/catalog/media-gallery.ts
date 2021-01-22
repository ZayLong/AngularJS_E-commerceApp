export class MediaGalleryModel{
	private _id: number;
	private _media_type: string;
	private _label: string;
	private _position: number;
	private _disabled: boolean;
	private _types: Array<string>;
	private _file: string;
	private _content: MediaGalleryContentModel;
	private _extension_attributes: MediaGalleryExtensionModel;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get media_type(): string{
		return this._media_type;
	}

	set media_type(value: string){
		this._media_type = value;
	}

	get label(): string{
		return this._label;
	}

	set label(value: string){
		this._label = value;
	}

	get position(): number{
		return this._position;
	}

	set position(value: number){
		this._position = value;
	}

	get disabled(): boolean{
		return this._disabled;
	}

	set disabled(value: boolean){
		this._disabled = value;
	}

	get types(): Array<string>{
		return this._types;
	}

	get_type(key: number): string{
		return this.types[key];
	}

	set types(value: Array<string>){
		this._types = value;
	}

	set_type(value: string): void{
		this.types.push(value);
	}

	get file(): string{
		return this._file;
	}

	set file(value: string){
		this._file = value;
	}

	get content(): MediaGalleryContentModel{
		return this._content;
	}

	set content(value: MediaGalleryContentModel){
		this._content = value;
	}

	get extension_attributes(): MediaGalleryExtensionModel{
		return this._extension_attributes;
	}

	set extension_attributes(value: MediaGalleryExtensionModel){
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
		this.id = data.id;
		this.media_type = data.media_type;
		this.label = data.label;
		this.position = data.position;
		this.disabled = data.disabled;
		this.types = data.types;
		this.file = data.file;
		
		if(data.content){
			let contentModel: MediaGalleryContentModel = new MediaGalleryContentModel();
			this.content = contentModel.fromJson(data.content);	
		}
		
		if(data.extension_attributes){
			let extensionModel: MediaGalleryExtensionModel = new MediaGalleryExtensionModel();
			this.extension_attributes = extensionModel.fromJson(data.extension_attributes);
		}
		

		return this;
	}

	/**
	 * @public
	 * @method imagePath
	 * @description Get the full image path using the config model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @example https://www.theindustrysource.com/media/catalog/product/5/2/520214.1_2.jpg
	 * @param ConfigModel config
	 * @return string
	 */
	imagePath(): string{
		if(this.file){
			return 'https://www.theindustrysource.com/media/catalog/product' + this.file;
		} else {
			return null;
		}	
	}
}

export class MediaGalleryContentModel{
	private _base64_encoded_data: string;
	private _type: string;
	private _name: string;

	get base64_encoded_data(): string{
		return this._base64_encoded_data;
	}

	set base64_encoded_data(value: string){
		this._base64_encoded_data = value;
	}

	get type(): string{
		return this._type;
	}

	set type(value: string){
		this._type = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
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
		this.base64_encoded_data = data.base64_encoded_data;
		this.type = data.type;
		this.name = data.name;

		return this;
	}
}

export class MediaGalleryExtensionModel{
	private _video_content;

	get video_content(): VideoContentModel{
		return this._video_content;
	}

	set video_content(value: VideoContentModel){
		this._video_content = value;
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
		let videoModel: VideoContentModel = new VideoContentModel();
		this.video_content = videoModel.fromJson(data.video_content);

		return this;
	}
}

export class VideoContentModel{
	private _media_type: string;
	private _video_provider: string;
	private _video_url: string;
	private _video_title: string;
	private _video_description: string;
	private _video_metadata: string;

	get media_type(): string{
		return this._media_type;
	}

	set media_type(value: string){
		this._media_type = value;
	}

	get video_provider(): string{
		return this._video_provider;
	}

	set video_provider(value: string){
		this._video_provider = value;
	}

	get video_url(): string{
		return this._video_url;
	}

	set video_url(value: string){
		this._video_url = value;
	}

	get video_title(): string{
		return this._video_title;
	}

	set video_title(value: string){
		this._video_title = value;
	}

	get video_description(): string{
		return this._video_description;
	}

	set video_description(value: string){
		this._video_description = value;
	}

	get video_metadata(): string{
		return this._video_metadata;
	}

	set video_metadata(value: string){
		this._video_metadata = value;
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
		this.media_type = data.media_type;
		this.video_provider = data.video_provider;
		this.video_url = data.video_url;
		this.video_title = data.video_title;
		this.video_description = data.video_description;
		this.video_metadata = data.video_metadata;

		return this;
	}
}