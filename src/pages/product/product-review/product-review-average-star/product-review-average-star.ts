import { Component, Input } from '@angular/core';

@Component({
	selector: 'product-review-average-star',
	templateUrl: 'product-review-average-star.html'
})

export class ProductReviewAverageStarComponent {

	@Input('starNumber') starNumber: number; // star number
	@Input('starCount') starCount: number; // number of star rating reviews
	@Input('totalCount') totalCount: number; // number of reviews total

	public percentage: number = 0;
	public iconStars: Array<string> = [];

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public constructor() {
		
	}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the component
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private process(): void{
		let i: number = 0;

		do{
			this.iconStars.push('*');
			i++;
		} while(i < this.starNumber);

		if(this.starCount > 0){
			this.percentage = (this.starCount / this.totalCount) * 100;
		} else {
			this.percentage = 0;
		}
	}
}
