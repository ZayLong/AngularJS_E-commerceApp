import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';

// Models
import { BlogListModel, Type } from '../../models/magento/magefan/blog';

// Providers
import { CommonProvider } from '../../providers/ionic/common';
import { MagefanBlogProvider } from '../../providers/magento/magefan/blog';

@IonicPage()
@Component({
	selector: 'page-blog',
	templateUrl: 'blog.html',
})

export class BlogPage {

	// Used for scrollToTop
	@ViewChild(Content) content: Content;

	public blogList: BlogListModel;
	public noOfItems: number = 10;
	public currentPage: number = 1;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { MagefanBlogProvider } magefanBlogProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public events: Events,
		public magefanBlogProvider: MagefanBlogProvider,
		public commonProvider: CommonProvider) {}

	/**
	 * @public
	 * @method ionViewDidLoad (ionic lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	public ionViewDidLoad() {
		this.getBlogList();
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_blog',
			item_name: 'Blog Page',
			item_category: 'Page'
		});

		this.commonProvider.analyticsLogEvent('view_item_list', {
			item_category: 'Blog'
		});
	}

	/**
	 * @private
	 * @method getBlogList
	 * @description Retrieve the blog list
	 * @author J. Trpka <jtrpka@tngworldwide.com
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	private getBlogList(){
		this.magefanBlogProvider.getPostList(Type.Category, '1', this.currentPage, this.noOfItems).subscribe(data => {

			this.blogList = data;

		}, err => console.error('BlogPage - ionViewDidLoad() - getPostList()', err));
	}

	/**
	 * @public
	 * @method pageBlog
	 * @description Go to page in the blog feed
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @uses PagingComponent
	 * @param { number } page
	 */
	public pageBlog(page: number): void{
		this.content.scrollToTop(100);

		this.currentPage = page;
		this.getBlogList();
	}

	/**
	 * @public
	 * @method refresh (refresher)
	 * @description Perform a refresh
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { any } event
	 */
	public refresh(event: any): void{
		setTimeout(() => {
			this.getBlogList();

			event.complete();
		}, 2000); // Delay for two seconds
	}
}
