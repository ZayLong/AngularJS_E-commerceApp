import { Component, Input } from '@angular/core';

@Component({
	selector: 'progress-bar',
	templateUrl: 'progress-bar.html'
})

export class ProgressBarComponent {
	@Input('progress') progress: number;
	@Input('subTitle') subTitle: string;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public constructor() {}
}
