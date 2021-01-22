/**
 * Model Naming Scheme
 * - Yotpo{API_CALL}Model: The data of the model
 * - Yotpo{API_CALL}ReturnModel: The data that you get back from the API Call
 * - Yotpo{API_CALL}ResponseModel: The data inside the response parameter
 */

// Enums
export enum YotpoReviewSortType{
	Date = 'date',
	VotesUp = 'votes_up',
	VotesDown = 'votes_down',
	Time = 'time',
	Rating = 'rating',
	ReviewerType = 'reviewer_type'
}

export enum YotpoReviewSortDirection{
	Asc = 'asc',
	Desc = 'desc'
}

export enum YotpoReviewVote{
	Up = 'up',
	Down = 'down'
}

// Authentication

export class YotpoAuthenticationModel{
	private _access_token: string;
	private _token_type: string;

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

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.access_token = data.access_token;
		this.token_type = data.token_type;

		return this;
	}
}

// Account Platform

export class YotpoAccountPlatformReturnModel{
	private _status: YotpoStatusModel;
	private _response: YotpoAccountPlatformResponseModel;

	get status(): YotpoStatusModel{
		return this._status;
	}

	set status(value: YotpoStatusModel){
		this._status = value;
	}

	get response(): YotpoAccountPlatformResponseModel{
		return this._response;
	}

	set response(value: YotpoAccountPlatformResponseModel){
		this._response = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		let statusModel: YotpoStatusModel = new YotpoStatusModel;
		this.status = statusModel.fromJson(data.status);

		let responseModel: YotpoAccountPlatformResponseModel = new YotpoAccountPlatformResponseModel;
		this.response = responseModel.fromJson(data.response);

		return this;
	}
}

export class YotpoAccountPlatformResponseModel{
	private _account_platform: YotpoAccountPlatformModel;

	get account_platform(): YotpoAccountPlatformModel{
		return this._account_platform;
	}

	set account_platform(value: YotpoAccountPlatformModel){
		this._account_platform = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		let accountPlatformModel: YotpoAccountPlatformModel = new YotpoAccountPlatformModel;
		this.account_platform = accountPlatformModel.fromJson(data.account_platform);

		return this;
	}
}

export class YotpoAccountPlatformModel{
	private _id: number;
	private _shop_token: string;
	private _shop_domain: string;
	private _shop_api_url: string;
	private _plan_name: string;
	private _platform_type: YotpoAccountPlatformTypeModel;
	private _delete: boolean;
	private _shop_user_name: string;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get shop_token(): string{
		return this._shop_token;
	}

	set shop_token(value: string){
		this._shop_token = value;
	}

	get shop_domain(): string{
		return this._shop_domain;
	}

	set shop_domain(value: string){
		this._shop_domain = value;
	}

	get shop_api_url(): string{
		return this._shop_api_url;
	}

	set shop_api_url(value: string){
		this._shop_api_url = value;
	}

	get plan_name(): string{
		return this._plan_name;
	}

	set plan_name(value: string){
		this._plan_name = value;
	}

	get platform_type(): YotpoAccountPlatformTypeModel{
		return this._platform_type;
	}

	set platform_type(value: YotpoAccountPlatformTypeModel){
		this._platform_type = value;
	}

	get delete(): boolean{
		return this._delete;
	}

	set delete(value: boolean){
		this._delete = value;
	}

	get shop_user_name(): string{
		return this._shop_user_name;
	}

	set shop_user_name(value: string){
		this._shop_user_name = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.id = data.id;
		this.shop_token = data.shop_token;
		this.shop_domain = data.shop_domain;
		this.shop_api_url = data.shop_api_url;
		this.plan_name = data.plan_name;
		
		let typeModel:YotpoAccountPlatformTypeModel = new YotpoAccountPlatformTypeModel;
		this.platform_type = typeModel.fromJson(data.platform_type);

		this.delete = data.delete;
		this.shop_user_name = data.shop_user_name;

		return this;
	}
}

export class YotpoAccountPlatformTypeModel{
	private _id: number;
	private _name: string;
	private _description: string;
	private _billable: boolean;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get description(): string{
		return this._description;
	}

	set description(value: string){
		this._description = value;
	}

	get billable(): boolean{
		return this._billable;
	}

	set billable(value: boolean){
		this._billable = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.billable = data.billable;

		return this;
	}
}

// Reviews

export class YotpoProductReviewReturnModel{
	private _status: YotpoStatusModel;
	private _response: YotpoProductReviewResponseModel;

	get status(): YotpoStatusModel{
		return this._status;
	}

	set status(value: YotpoStatusModel){
		this._status = value;
	}

	get response(): YotpoProductReviewResponseModel{
		return this._response;
	}

	set response(value: YotpoProductReviewResponseModel){
		this._response = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		let statusModel: YotpoStatusModel = new YotpoStatusModel;
		this.status = statusModel.fromJson(data.status);

		let responseModel: YotpoProductReviewResponseModel = new YotpoProductReviewResponseModel;
		this.response = responseModel.fromJson(data.response);

		return this;
	}
}

export class YotpoProductReviewResponseModel{
	private _pagination: YotpoPaginationModel;
	private _bottomline: YotpoBottomlineModel;
	private _products: Array<YotpoProductModel> = [];
	//private _product_tag: 
	private _reviews: Array<YotpoReviewModel> = [];
	private _comment: YotpoCommentModel;

	get pagination(): YotpoPaginationModel{
		return this._pagination;
	}

	set pagination(value: YotpoPaginationModel){
		this._pagination = value;
	}

	get bottomline(): YotpoBottomlineModel{
		return this._bottomline;
	}

	set bottomline(value: YotpoBottomlineModel){
		this._bottomline = value;
	}

	get products(): Array<YotpoProductModel>{
		return this._products;
	}

	get_products(key: number): YotpoProductModel{
		return this.products[key];
	}

	set products(value: Array<YotpoProductModel>){
		this._products = value;
	}

	set_products(value: YotpoProductModel): void{
		this.products.push(value);
	}

	get reviews(): Array<YotpoReviewModel>{
		return this._reviews;
	}

	get_reviews(key: number): YotpoReviewModel{
		return this.reviews[key];
	}

	set reviews(value: Array<YotpoReviewModel>){
		this._reviews = value;
	}

	set_reviews(value: YotpoReviewModel): void{
		this.reviews.push(value);
	}

	get comment(): YotpoCommentModel{
		return this._comment;
	}

	set comment(value: YotpoCommentModel){
		this._comment = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		let paginationModel: YotpoPaginationModel = new YotpoPaginationModel;
		this.pagination = paginationModel.fromJson(data.pagination);

		let bottomlineModel: YotpoBottomlineModel = new YotpoBottomlineModel;
		this.bottomline = bottomlineModel.fromJson(data.bottomline);

		if(data.products){
			for(let item of data.products){
				let model: YotpoProductModel = new YotpoProductModel;
				this.set_products(model.fromJson(item));
			}
		}

		if(data.reviews){
			for(let item of data.reviews){
				let model: YotpoReviewModel = new YotpoReviewModel;
				this.set_reviews(model.fromJson(item));
			}
		}

		// May not have any data available
		if(data.comment){
			let commentModel: YotpoCommentModel = new YotpoCommentModel;
			this.comment = commentModel.fromJson(data.comment);	
		}
		
		return this;
	}
}

export class YotpoBottomlineModel{
	private _total_review: number;
	private _average_score: number;
	private _star_distribution: YotpoBottomlineStarDistributionModel;
	private _custom_fields_bottomline: string;

	get total_review(): number{
		return this._total_review;
	}

	set total_review(value: number){
		this._total_review = value;
	}

	get average_score(): number{
		return this._average_score;
	}

	set average_score(value: number){
		this._average_score = value;
	}

	get star_distribution(): YotpoBottomlineStarDistributionModel{
		return this._star_distribution;
	}

	set star_distribution(value: YotpoBottomlineStarDistributionModel){
		this._star_distribution = value;
	}

	get custom_fields_bottomline(): string{
		return this._custom_fields_bottomline;
	}

	set custom_fields_bottomline(value: string){
		this._custom_fields_bottomline = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.total_review = data.total_review;
		this.average_score = data.average_score;

		let starDistributionModel: YotpoBottomlineStarDistributionModel = new YotpoBottomlineStarDistributionModel; 
		this.star_distribution = starDistributionModel.fromJson(data.star_distribution);
		
		this.custom_fields_bottomline = data.custom_fields_bottomline;

		return this;
	}
}

export class YotpoBottomlineStarDistributionModel{
	private _one: number;
	private _two: number;
	private _three: number;
	private _four: number;
	private _five: number;

	get one(): number{
		return this._one;
	}

	set one(value: number){
		this._one = value;
	}

	get two(): number{
		return this._two;
	}

	set two(value: number){
		this._two = value;
	}

	get three(): number{
		return this._three;
	}

	set three(value: number){
		this._three = value;
	}

	get four(): number{
		return this._four;
	}

	set four(value: number){
		this._four = value;
	}

	get five(): number{
		return this._five;
	}

	set five(value: number){
		this._five = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.one = data["1"];
		this.two = data["2"];
		this.three = data["3"];
		this.four = data["4"];
		this.five = data["5"];

		return this;
	}
}

export class YotpoProductModel{
	private _id: number;
	private _domain_key: string;
	private _name: string;
	private _social_links: YotpoProductSocialLinksModel;
	private _embedded_widget_link: string;
	private _testimonials_product_link: string;
	private _product_link: string;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get domain_key(): string{
		return this._domain_key;
	}

	set domain_key(value: string){
		this._domain_key = value;
	}

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get social_links(): YotpoProductSocialLinksModel{
		return this._social_links;
	}

	set social_links(value: YotpoProductSocialLinksModel){
		this._social_links = value;
	}

	get embedded_widget_link(): string{
		return this._embedded_widget_link;
	}

	set embedded_widget_link(value: string){
		this._embedded_widget_link = value;
	}

	get testimonials_product_link(): string{
		return this._testimonials_product_link;
	}

	set testimonials_product_link(value: string){
		this._testimonials_product_link = value;
	}

	get product_link(): string{
		return this._product_link;
	}

	set product_link(value: string){
		this._product_link = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.id = data.id;
		this.domain_key = data.domain_key;
		this.name = data.name;
		
		let socialLinksModel: YotpoProductSocialLinksModel = new YotpoProductSocialLinksModel;
		this.social_links = socialLinksModel.fromJson(data.social_links);

		this.embedded_widget_link = data.embedded_widget_link;
		this.testimonials_product_link = data.testimonials_product_link;
		this.product_link = data.product_link;

		return this;
	}
}

export class YotpoProductSocialLinksModel{
	private _facebook: string;
	private _twitter: string;
	private _linkedin: string;
	private _google_oauth2: string;

	get facebook(): string{
		return this._facebook;
	}

	set facebook(value: string){
		this._facebook = value;
	}

	get twitter(): string{
		return this._twitter;
	}

	set twitter(value: string){
		this._twitter = value;
	}

	get linkedin(): string{
		return this._linkedin;
	}

	set linkedin(value: string){
		this._linkedin = value;
	}

	get google_oauth2(): string{
		return this._google_oauth2;
	}

	set google_oauth2(value: string){
		this._google_oauth2 = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.facebook = data.facebook;
		this.twitter = data.twitter;
		this.linkedin = data.linkedin;
		this.google_oauth2 = data.google_oauth2;

		return this;
	}
}

export class YotpoReviewModel{
	private _id: number;
	private _score: number;
	private _votes_up: number;
	private _votes_down: number;
	private _content: string;
	private _title: string;
	private _sentiment: number;
	private _created_at: string;
	private _verified_buyer: boolean;
	private _source_review_id: string;
	private _custom_fields: string;
	private _product_id: number;
	private _images_data: Array<YotpoReviewImageModel>;
	private _user: YotpoReviewUserModel;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get score(): number{
		return this._score;
	}

	set score(value: number){
		this._score = value;
	}

	get votes_up(): number{
		return this._votes_up;
	}

	set votes_up(value: number){
		this._votes_up = value;
	}

	get votes_down(): number{
		return this._votes_down;
	}

	set votes_down(value: number){
		this._votes_down = value;
	}

	get content(): string{
		return this._content;
	}

	set content(value: string){
		this._content = value;
	}

	get title(): string{
		return this._title;
	}

	set title(value: string){
		this._title = value;
	}

	get sentiment(): number{
		return this._sentiment;
	}

	set sentiment(value: number){
		this._sentiment = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get verified_buyer(): boolean{
		return this._verified_buyer;
	}

	set verified_buyer(value: boolean){
		this._verified_buyer = value;
	}

	get source_review_id(): string{
		return this._source_review_id;
	}

	set source_review_id(value: string){
		this._source_review_id = value;
	}

	get custom_fields(): string{
		return this._custom_fields;
	}

	set custom_fields(value: string){
		this._custom_fields = value;
	}

	get product_id(): number{
		return this._product_id;
	}

	set product_id(value: number){
		this._product_id = value;
	}

	get images_data(): Array<YotpoReviewImageModel>{
		return this._images_data;
	}

	get_images_data(key: number): YotpoReviewImageModel{
		return this.images_data[key];
	}

	set images_data(value: Array<YotpoReviewImageModel>){
		this._images_data = value;
	}

	set_images_data(value: YotpoReviewImageModel): void{
		this.images_data.push(value);
	}

	get user(): YotpoReviewUserModel{
		return this._user;
	}

	set user(value: YotpoReviewUserModel){
		this._user = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.id = data.id;
		this.score = data.score;
		this.votes_up = data.votes_up;
		this.votes_down = data.votes_down;
		this.content = data.content;
		this.title = data.title;
		this.sentiment = data.sentiment;
		this.created_at = data.created_at;
		this.verified_buyer = data.verified_buyer;
		this.source_review_id = data.source_review_id;
		this.custom_fields = data.custom_fields;
		this.product_id = data.product_id;

		if(data.images_data){
			for(let item of data.images_data){
				let model: YotpoReviewImageModel = new YotpoReviewImageModel;
				this.set_images_data(model.fromJson(item));
			}
		}

		let userModel: YotpoReviewUserModel = new YotpoReviewUserModel;
		this.user = userModel.fromJson(data.user);

		return this;
	}
}

export class YotpoReviewImageModel{
	private _id: number;
	private _thumb_url: string;
	private _original_url: string;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get thumb_url(): string{
		return this._thumb_url;
	}

	set thumb_url(value: string){
		this._thumb_url = value;
	}

	get original_url(): string{
		return this._original_url;
	}

	set original_url(value: string){
		this._original_url = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.id = data.id;
		this.thumb_url = data.thumb_url;
		this.original_url = data.original_url;

		return this;
	}
}

export class YotpoReviewUserModel{
	private _user_id: number;
	private _display_name: string;
	private _social_image: string;
	private _user_type: string;
	private _is_social_connected: number;

	get user_id(): number{
		return this._user_id;
	}

	set user_id(value: number){
		this._user_id = value;
	}

	get display_name(): string{
		return this._display_name;
	}

	set display_name(value: string){
		this._display_name = value;
	}

	get social_image(): string{
		return this._social_image;
	}

	set social_image(value: string){
		this._social_image = value;
	}

	get user_type(): string{
		return this._user_type;
	}

	set user_type(value: string){
		this._user_type = value;
	}

	get is_social_connected(): number{
		return this._is_social_connected;
	}

	set is_social_connected(value: number){
		this._is_social_connected = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.user_id = data.user_id;
		this.display_name = data.display_name;
		this.social_image = data.social_image;
		this.user_type = data.user_type;
		this.is_social_connected = data.is_social_connected;

		return this;
	}
}

export class YotpoCommentModel{
	private _id: number;
	private _content: string;
	private _created_at: string;
	private _comments_avatar: string;

	get id(): number{
		return this._id;
	}

	set id(value: number){
		this._id = value;
	}

	get content(): string{
		return this._content;
	}

	set content(value: string){
		this._content = value;
	}

	get created_at(): string{
		return this._created_at;
	}

	set created_at(value: string){
		this._created_at = value;
	}

	get comments_avatar(): string{
		return this._comments_avatar;
	}

	set comments_avatar(value: string){
		this._comments_avatar = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.id = data.id;
		this.content = data.content;
		this.created_at = data.created_at;
		this.comments_avatar = data.comments_avatar;

		return this;
	}
}

// Other

export class YotpoStatusModel{
	private _code: number;
	private _message: string;

	get code(): number{
		return this._code;
	}

	set code(value: number){
		this._code = value;
	}

	get message(): string{
		return this._message;
	}

	set message(value: string){
		this._message = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.code = data.code;
		this.message = data.message;

		return this;
	}
}

export class YotpoPaginationModel{
	private _page: number;
	private _per_page: number;
	private _total: number;

	get page(): number{
		return this._page;
	}

	set page(value: number){
		this._page = value;
	}

	get per_page(): number{
		return this._per_page;
	}

	set per_page(value: number){
		this._per_page = value;
	}

	get total(): number{
		return this._total;
	}

	set total(value: number){
		this._total = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 * @param { Object } data
	 * @return { this }
	 */
	public fromJson(data: any): this{
		this.page = data.page;
		this.per_page = data.per_page;
		this.total = data.total;

		return this;
	}
}