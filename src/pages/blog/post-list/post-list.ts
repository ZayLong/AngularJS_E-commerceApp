import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

// Modals
import { PostDetailModal } from '../../../modals/blog/post-detail/post-detail';

// Models
import { BlogPostModel, BlogCategoryModel } from '../../../models/magento/magefan/blog';

// Providers
import { MagefanBlogProvider } from '../../../providers/magento/magefan/blog';
import { CommonProvider } from '../../../providers/ionic/common';

// RXJS
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
	selector: 'post-list',
	templateUrl: 'post-list.html'
})

export class PostListComponent {

	@Input('post') post: BlogPostModel;
	public categoryNames: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 * @param { ModalController } modalCtrl
	 * @param { MagefanBlogProvider } magefanBlogProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public modalCtrl: ModalController,
		public magefanBlogProvider: MagefanBlogProvider,
		public commonProvider: CommonProvider
	){}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ngOnInit(){
		this.process()
	}

	/**
	 * @private
	 * @method process
	 * @description Process the blog post item
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	private process(): void{
		this.getCategoryNames();
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
	 * @method gotoBlogPost
	 * @description Go to blog post
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.4.0
	 * @version 1.4.0
	 */
	public gotoBlogPost(): void{
		this.commonProvider.analyticsLogEvent('select_content', {
			content_type: 'Blog',
			item_id: 'blog_' + this.post.identifier
		});

		let modal = this.modalCtrl.create(PostDetailModal, {
			post: this.post
		});

		modal.present();
	}

}
