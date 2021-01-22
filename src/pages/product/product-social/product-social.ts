import { Component, Input } from '@angular/core';
import { Platform } from 'ionic-angular';

// Models
import { CustomerModel } from '../../../models/magento/customer/customer';
import { ProductModel } from '../../../models/magento/catalog/product';

// Natives
import { SocialSharing } from '@ionic-native/social-sharing';

// Providers
import { CommonProvider } from '../../../providers/ionic/common';

@Component({
	selector: 'product-social',
	templateUrl: 'product-social.html'
})

export class ProductSocialComponent {

	@Input('product') product: ProductModel;
	@Input('customer') customer: CustomerModel;

	// Can Share...
	public canFacebook: boolean = false;
	public canInstagram: boolean = false;
	public canGooglePlus: boolean = false;
	public canPinterest: boolean = false;
	public canTwitter: boolean = false;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 * @param { Platform } platform
	 * @param { SocialSharing } social
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public platform: Platform,
		public social: SocialSharing,
		public commonProvider: CommonProvider
	) {}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the component
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private process(): void{
		let facebook: string;
		let instagram: string;
		let pinterest: string;
		let twitter: string;

		if(this.platform.is('android')){
			facebook = 'com.facebook.katana';
		} else if(this.platform.is('ios')){
			facebook = 'com.apple.social.facebook';
		}

		// Find correct name for both
		if(this.platform.is('android')){
			instagram = 'com.instagram.android';
		} else if(this.platform.is('ios')){
			instagram = '';
		}

		if(this.platform.is('android')){
			pinterest = 'com.pinterest';
		} else if(this.platform.is('ios')){
			pinterest = '';
		}

		if(this.platform.is('android')){
			twitter = 'com.twitter.android';
		} else if(this.platform.is('ios')){
			twitter = 'com.apple.social.twitter';
		}

		this.social.canShareVia(facebook, '', this.product.name, this.product.imageThumbnailPath(), this.product.urlStorePath()).then(data => {
			console.info('ProductSocialComponent - process() - canShareVia(facebook)', data);
			this.canFacebook = true;
		}).catch(onrejected => console.error('ProductSocialComponent - process() - canShareVia(facebook)', onrejected));

		this.social.canShareVia(instagram, '', this.product.name, this.product.imageThumbnailPath(), '').then(data => {
			console.info('ProductSocialComponent - process() - canShareVia(instagram)', data);
			this.canInstagram = true;
		}).catch(onrejected => console.error('ProductSocialComponent - process() - canShareVia(instagram)', onrejected));

		this.social.canShareVia(pinterest, '', this.product.name, this.product.imageThumbnailPath(), this.product.urlStorePath()).then(data => {
			console.info('ProductSocialComponent - process() - canShareVia(pinterest)', data);
			this.canPinterest = true;
		}).catch(onrejected => console.error('ProductSocialComponent - process() - canShareVia(pinterest)', onrejected));

		this.social.canShareVia(twitter, '', this.product.name, this.product.imageThumbnailPath(), this.product.urlStorePath()).then(data => {
			console.info('ProductSocialComponent - process() - canShareVia(twitter)', data);
			this.canTwitter = true;
		}).catch(onrejected => console.error('ProductSocialComponent - process() - canShareVia(twitter)', onrejected));

		// Android Only

		// Google+ is Android only based on social sharing github page
		if(this.platform.is('android')){
			this.social.canShareVia('com.google.android.apps.plus', '', this.product.name, this.product.imageThumbnailPath(), this.product.urlStorePath()).then(data => {
				console.info('ProductSocialComponent - process() - canShareVia(google+)', data);
				this.canGooglePlus = true;
			}).catch(onrejected => console.error('ProductSocialComponent - process() - canShareVia(facebook)', onrejected));
		}
	}

	/**
	 * @public
	 * @method socialSharing (click)
	 * @description Socially share a product
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 * @param { string } social
	 */
	public socialSharing(social: string): void{
		switch(social){
			case 'facebook':
				this.socialFacebook();
				break;
			// end case facebook
			case 'instagram':
				this.socialInstagram();
				break;
			// end case instagram
			case 'googlePlus':
				this.socialGooglePlus();
				break;
			// end case googlePlus
			case 'pinterest':
				this.socialPinterest();
				break;
			// end case pinterest
			case 'twitter':
				this.socialTwitter();
				break;
			// end case twitter
		}
	}

	/**
	 * @private
	 * @method socialFacebook
	 * @description Share a product to Facebook
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private socialFacebook(): void{
		let image: string;

		if(this.platform.is('android')){
			// Android does not support sharing posts that has both image and url
			image = '';
		} else if(this.platform.is('ios')){
			image = this.product.imageThumbnailPath();
		}

		this.social.shareViaFacebook('', image, this.product.urlStorePath()).then(data => {
			console.info('ProductSocialComponent - shareViaFacebook()', data);
		}).catch(onrejected => console.error('ProductSocialComponent - shareViaFacebook()', onrejected));
	}

	/**
	 * @private
	 * @method socialGooglePlus
	 * @description Share a product to Google+
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private socialGooglePlus(): void{
		if(this.platform.is('android')){
			this.social.shareVia('com.google.android.apps.plus', '', this.product.name, this.product.imageThumbnailPath(), this.product.urlStorePath()).then(data => {
				console.info('ProductSocialComponent - shareVia(Google+)', data);
			}).catch(onrejected => console.error('ProductSocialComponent - shareVia(Google+)', onrejected));
		}
	}

	/**
	 * @private
	 * @method socialInstagram
	 * @description Share a product to Instagram
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private socialInstagram(): void{
		this.social.shareViaInstagram('', this.product.imageThumbnailPath()).then(data => {
			console.info('ProductSocialComponent - socialInstagram()', data);
		}).catch(onrejected => console.error('ProductSocialComponent - socialInstagram()', onrejected));
	}

	/**
	 * @private
	 * @method socialPinterest
	 * @description Share a product to Pinterest
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private socialPinterest(): void{
		let appname: string;
		if(this.platform.is('android')){
			appname = 'com.pinterest';
		} else if(this.platform.is('ios')){
			appname = '';
		}

		this.social.shareVia(appname, '', this.product.name, this.product.imageThumbnailPath(), this.product.urlStorePath()).then(data => {
			console.info('ProductSocialComponent - socialPinterest()', data);
		}).catch(onrejected => console.error('ProductSocialComponent - socialPinterest()', onrejected));
	}

	/**
	 * @private
	 * @method socialTwitter
	 * @description Share a product to Twitter
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.3.0
	 */
	private socialTwitter(): void{
		this.social.shareViaTwitter('', this.product.imageThumbnailPath(), this.product.urlStorePath()).then(data => {
			console.info('ProductSocialComponent - socialTwitter()', data);
		}).catch(onrejected => console.error('ProductSocialComponent - socialTwitter()', onrejected));
	}
}
