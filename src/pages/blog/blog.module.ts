import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPage } from './blog';

// Modules
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';

// Providers
import { MagefanBlogProvider } from '../../providers/magento/magefan/blog';

@NgModule({
	declarations: [
		BlogPage,
	],

	imports: [
		ComponentsModule,
		IonicPageModule.forChild(BlogPage),
	],

	providers: [
		MagefanBlogProvider
	]
})

export class BlogPageModule {}