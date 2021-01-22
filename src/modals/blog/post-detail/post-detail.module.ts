import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDetailModal } from './post-detail';

// Providers
import { MagefanBlogProvider } from '../../../providers/magento/magefan/blog';

@NgModule({
	declarations: [
		PostDetailModal,
	],

	imports: [
		IonicPageModule.forChild(PostDetailModal),
	],

	providers: [
		MagefanBlogProvider
	]
})

export class BlogDetailModalModule {}