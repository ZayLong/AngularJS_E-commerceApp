import { Component, Input } from '@angular/core';

@Component({
	selector: 'loading',
	templateUrl: 'loading.html'
})

export class LoadingComponent {
	@Input('message') message: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public constructor() {
		this.message = 'Loading...';
	}
}
