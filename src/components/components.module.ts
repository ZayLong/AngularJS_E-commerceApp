import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

// Universal
import { HeaderComponent } from './header/header';
import { ProfileMenuComponent } from './profile-menu/profile-menu';
import { PagingComponent } from './paging/paging';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { LoadingComponent } from './loading/loading';

// Page Only
import { HomeItemComponent } from '../pages/home/home-item/home-item';
import { PostListComponent } from '../pages/blog/post-list/post-list';

// Feed Page
import { ListFeedItemComponent } from '../pages/feeds/list-feed-item/list-feed-item';
import { GridFeedItemComponent } from '../pages/feeds/grid-feed-item/grid-feed-item';

// Product Page
import { ProductSocialComponent } from '../pages/product/product-social/product-social';
import { ProductInstockComponent } from '../pages/product/product-instock/product-instock';
import { ProductPriceComponent } from '../pages/product/product-price/product-price';
import { ProductAddtocartComponent } from '../pages/product/product-addtocart/product-addtocart';
import { ProductReviewComponent } from '../pages/product/product-review/product-review';
import { ProductReviewAverageStarComponent } from '../pages/product/product-review/product-review-average-star/product-review-average-star';

@NgModule({
	declarations: [
		HeaderComponent,
    	ProfileMenuComponent,
    	PagingComponent,
    	ProgressBarComponent,
    	LoadingComponent,
        // Page Components
        HomeItemComponent,
        PostListComponent,
        // Feed Page Components
        ListFeedItemComponent,
        GridFeedItemComponent,
        // Product Page Components
        ProductSocialComponent,
        ProductInstockComponent,
        ProductPriceComponent,
        ProductAddtocartComponent,
        ProductReviewComponent,
        ProductReviewAverageStarComponent
    ],

	imports: [
		//If something goes funky with using ion-icon or other ionic components, add this:
		//IonicModule.forRoot(HeaderComponent)
		IonicModule
	],
	
	exports: [
		HeaderComponent,
        ProfileMenuComponent,
        PagingComponent,
        ProgressBarComponent,
        LoadingComponent,
        // Page Components
        HomeItemComponent,
        PostListComponent,
        // Feed Page Components
        ListFeedItemComponent,
        GridFeedItemComponent,
        // Product Page Components
        ProductSocialComponent,
        ProductInstockComponent,
        ProductPriceComponent,
        ProductAddtocartComponent,
        ProductReviewComponent,
        ProductReviewAverageStarComponent
	]
})

export class ComponentsModule {}
