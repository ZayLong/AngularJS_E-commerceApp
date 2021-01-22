import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// Model
import { BlogPostModel, BlogCategoryModel } from '../../../models/magento/magefan/blog';

// Providers
import { MagefanBlogProvider } from '../../../providers/magento/magefan/blog';
import { CommonProvider } from '../../../providers/ionic/common';

// RXJS
import { forkJoin } from 'rxjs/observable/forkJoin';

@IonicPage()
@Component({
	selector: 'modal-post-detail',
	templateUrl: 'post-detail.html',
})

export class PostDetailModal {

	public post: BlogPostModel;
	public categoryNames: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { MagefanBlogProvider } magefanBlogProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public magefanBlogProvider: MagefanBlogProvider,
		public commonProvider: CommonProvider) {
		
		this.post = this.navParams.get('post');
		this.getCategoryNames();
	}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	public ionViewDidLoad() {}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'blog_' + this.post.identifier,
			item_name: this.post.title,
			item_category: 'Blog'
		});	
	}

	/**
	 * @private
	 * @method getCategoryNames
	 * @description Get category names
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	private getCategoryNames(): void{
		let calls: Array<any> = [];
		let categoryNames: Array<string> = [];

		for(let categoryId of this.post.categories){
			calls.push(this.magefanBlogProvider.getCategory(categoryId));
		}

		forkJoin(calls).subscribe((data: Array<BlogCategoryModel>) => {
			for(let category of data){
				categoryNames.push(category.title);
			}

			this.categoryNames = categoryNames.join(', ');
		}, err => console.error('PostListComponent - process() - getCategory()', err));
	}

	/**
	 * @public
	 * @method dismiss (click)
	 * @description Dismiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss(null);
	}
}
