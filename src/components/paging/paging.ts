import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'paging',
	templateUrl: 'paging.html'
})

export class PagingComponent {

	@Output() pageFeed: EventEmitter<number> = new EventEmitter();

	@Input('currentPage') currentPage;
	@Input('itemsPerPage') itemsPerPage;
	@Input('totalPages') totalPages;

	public maximumPage: number;
	public minimumPage: number;
	public previousPage: number;
	public nextPage: number;

	public otherPages: Array<number> = [];

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public constructor() {}

	/**
	 * @public
	 * @method ngOnInit (angular lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ngOnInit(){
		this.process();
	}

	/**
	 * @private
	 * @method process
	 * @description Process the pagination
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	private process(): void{
		this.currentPage = parseInt(this.currentPage);
		this.itemsPerPage = parseInt(this.itemsPerPage);
		this.totalPages = parseInt(this.totalPages);
		this.maximumPage = this.totalPages;
		this.minimumPage = 1;

		if(this.currentPage == this.minimumPage){
			this.previousPage = this.minimumPage;
		} else {
			this.previousPage = this.currentPage - 1;
		}

		if(this.currentPage == this.maximumPage){
			this.nextPage = this.maximumPage;
		} else {
			this.nextPage = this.currentPage + 1;
		}

		if(this.maximumPage > 5){
			switch(this.currentPage){
				case (this.minimumPage >= 0):
				case 1:
				case 2:
					//console.log('Page 1 or 2');
					this.otherPages = [1, 2, 3, 4, 5];
					break;
				case this.maximumPage:
				case (this.maximumPage - 1):
					//console.log('Page Last or SecondToLast');
					this.otherPages = [this.maximumPage - 4, this.maximumPage - 3, this.maximumPage - 2, this.maximumPage - 1, this.maximumPage];
					break
				default:
					//console.log('Middle Page');
					this.otherPages = [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2];
					break;
			}
		} else {
			this.otherPages = []; // Clear the array

			for(let i = 1; i <= this.maximumPage; i++){
				this.otherPages.push(i); // Push the page numbers to the array
			}
		}

		//console.info('currentPage', this.currentPage);
		//console.info('itemsPerPage', this.itemsPerPage);
		//console.info('totalPages', this.totalPages);
		//console.info('maximumPage', this.maximumPage);
		//console.info('minimumPage', this.minimumPage);
		//console.info('previousPage', this.previousPage);
		//console.info('nextPage', this.nextPage);
		//console.info('otherPages', this.otherPages);
	}

	/**
	 * @public
	 * @method gotoPage
	 * @description Go to page in the feed
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } page
	 */
	public gotoPage(page: number){
		this.currentPage = page; // Change the current page
		this.process(); // Reprocess the pagination
		
		this.pageFeed.emit(page);
	}
}
