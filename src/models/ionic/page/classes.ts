import { ProductModel } from '../../magento/catalog/product';

/**
 * @public
 * @class ClassModel
 * @author J. Trpka <jtrpka@tngworldwide.com>
 * @since 1.2.0
 * @version 1.2.0
 * @prop { string } name
 * @prop { Date } startDateTime
 * @prop { Date } endDateTime
 * @prop { string } location
 * @prop { ProductModel } product
 */
export class ClassModel{
	private _name: string;
	private _startDateTime: Date = new Date();
	private _endDateTime: Date = new Date();
	private _location: string;
	private _product: ProductModel;

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get startDateTime(): Date{
		return this._startDateTime;
	}

	set startDateTime(value: Date){
		this._startDateTime = value;
	}

	get endDateTime(): Date{
		return this._endDateTime;
	}

	set endDateTime(value: Date){
		this._endDateTime = value;
	}

	get location(): string{
		return this._location;
	}

	set location(value: string){
		this._location = value;
	}

	get product(): ProductModel{
		return this._product;
	}

	set product(value: ProductModel){
		this._product = value;
	}

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { ProductModel } product (optional)
	 */
	public constructor(product?: ProductModel){
		if(product){
			// Run any retrieve data from description methods here
			this.product = product;
			this.name = product.name;
			console.info('Class - ', this.name);

			let description = product.get_custom_attribute('description').value;

			// Replace all &nbsp; character(s)
			description = description.replace(/&nbsp;/g, '');

			console.info('ClassesModel - constructor() - description (before)', description);
			description = ClassModel.removeInlineStyles(description);
			console.info('ClassesModel - constructor() - description (after)', description);

			this.getStartFromProduct(description);
			this.getEndFromProduct(description);
			
			//this.getLocationFromProduct(product.get_custom_attribute('description').value);

			//console.info('ClassModel - constructor()', this);
		}
	}

	/**
	 * @public
	 * @method getStartFromProduct
	 * @description Get the start date and time from the description
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { string } description
	 */
	public getStartFromProduct(description: string): void{
		// console.log('Start');

		// Get the substrings
		let find: string = '<strong>Start:</strong>';
		
		// Find the start and final positions
		let startPosition: number = description.indexOf(find);
		let finalPosition: number = description.indexOf('<br />', startPosition);

		// Retrieve the substring
		let start: string = description.substring(startPosition + find.length, finalPosition).trim();

		// Split the values
		let split: Array<string> = start.split(' ');
		console.info('ClassesModel - getStartFromProduct() - split', split);

		// Set the month by converting the string to a number value
		let month = ClassModel.convertMonthToNumber(split[0]);
		// Set the date by removing the comma after the date
		let date = parseInt(split[1].replace(',', ''));
		this.startDateTime.setMonth(month, date);

		// Set the year
		this.startDateTime.setFullYear(parseInt(split[2]));

		// Set the hour and minute
		let hourMinute: { hour: number, minute: number } = ClassModel.convertTimeToNumbers(split[4], split[5]);
		//console.info('ClassesModel - getStartFromProduct() - hourMinute()', hourMinute);
		this.startDateTime.setHours(hourMinute.hour, hourMinute.minute, 0, 0);
	}

	/**
	 * @public
	 * @method getEndFromProduct
	 * @description Get the end date and time from the description
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { string } description
	 */
	public getEndFromProduct(description: string): void{
		// console.log('End');

		// Get the substrings
		let find: string = '<strong>End:</strong>';
		
		// Find the start and final positions
		let startPosition: number = description.indexOf(find);
		let finalPosition: number = description.indexOf('</p>', startPosition);

		// Retrieve the substring
		let end: string = description.substring(startPosition + find.length, finalPosition).trim();

		// Split the values
		let split: Array<string> = end.split(' ');
		console.info('ClassesModel - getEndFromProduct() - split', split);

		// Set the month by converting the string to a number value
		let month = ClassModel.convertMonthToNumber(split[0]);
		// Set the date by removing the comma after the date
		let date = parseInt(split[1].replace(',', ''));
		this.endDateTime.setMonth(month, date);

		// Set the year
		this.endDateTime.setFullYear(parseInt(split[2]));

		// Set the hour and minute
		let hourMinute: { hour: number, minute: number } = ClassModel.convertTimeToNumbers(split[4], split[5]);
		//console.info('ClassesModel - getEndFromProduct() - hourMinute()', hourMinute);
		this.endDateTime.setHours(hourMinute.hour, hourMinute.minute, 0, 0);
	}

	/**
	 * @public
	 * @method getLocationFromProduct
	 * @description Get the location from the description
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { string } description
	 */
	public getLocationFromProduct(description: string): void{
		// Get the substrings
		let find: string = '<strong>Class Location:</strong>';

		// Find the start and final positions
		let startPosition: number = description.indexOf(find);
		let finalPosition: number = description.indexOf('</span>', startPosition); // not being used

		// Apparently not being used
		// let location: string = description.substring(startPosition + find.length, finalPosition).trim();
	}

	/**
	 * @private
	 * @method removeInlineStyles
	 * @description Remove any inline styles from the description
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.3
	 * @version 1.5.3
	 * @param { string } description
	 * @return { string }
	 */
	private static removeInlineStyles(description: string): string{
		let nomore: boolean = false;
		let findStart: string = ' style="';
		let findEnd: string = '"';

		// Check for any instance of style attribute 
		while(nomore == false){
			let startPosition: number = description.indexOf(findStart);

			if(startPosition > -1){
				let endPosition: number = description.indexOf(findEnd, startPosition + findStart.length);

				let found: string = description.substring(startPosition + findStart.length, endPosition).trim();

				description = description.replace(findStart + found + findEnd, '');
			} else {
				console.warn('Unable to find style attribute. That is quite alright!');
				nomore = true;
			}
		}

		// Then remove any <span> tags

		nomore = false; // Revert back to false to do another while loop
		let findSpanStart: string = '<span>';
		let findSpanEnd: string = '</span>';

		// Clear out the starting <span> tags
		while(nomore == false){
			
			let startPosition: number = description.indexOf(findSpanStart);

			if(startPosition > -1){
				// console.log('Found a <span>');
				description = description.replace(findSpanStart, '');
				description = description.replace(findSpanEnd, '');
			} else {
				// console.log('No <span> found');
				nomore = true;
			}
		}

		return description;
	}

	/**
	 * @private
	 * @static
	 * @method convertMonthToNumber
	 * @description Convert the month string to a number
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { string } month
	 * @return { number }
	 */
	private static convertMonthToNumber(month: string): number{
		// Some month text may have unnecessary character(s)
		month = month.replace('&nbsp;', '');

		switch(month){
			case 'January': return 0;
			case 'February': return 1;
			case 'March': return 2;
			case 'April': return 3;
			case 'May': return 4;
			case 'June': return 5;
			case 'July': return 6;
			case 'August': return 7;
			case 'September': return 8;
			case 'October': return 9;
			case 'November': return 10;
			case 'December': return 11;
		}
	}

	/**
	 * @private
	 * @static
	 * @method convertTimeToNumbers
	 * @description Convert the time string(s) to numbers
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.2.0
	 * @version 1.2.0
	 * @param { string } time
	 * @param { string } meridian
	 * @return { { hour: number, minute: number } }
	 */
	private static convertTimeToNumbers(time: string, meridian: string){
		// Some time and meridian text may have unnecessary character(s)
		time = time.replace('&nbsp;', '');
		meridian = meridian.replace('&nbsp;', '');

		// Create a return value, and initialize it
		let returnTime: { hour: number, minute: number} = {
			hour: 0,
			minute: 0
		};

		// Split the string into an array
		let hourMinute = time.split(':');

		if(hourMinute.length > 1){
			// Hour and minute
			returnTime.minute = parseInt(hourMinute[1]);
		} else {
			// Just hour, set minutes to 0
			returnTime.minute = 0;
		}

		switch(meridian.toLowerCase()){
			case 'a.m.':
			case 'am':
				if(hourMinute[0] == '12'){
					// If midnight, set hour to 0 to handle 24 hour settings
					returnTime.hour = 0
				} else {
					// Otherwise set hour as is
					returnTime.hour = parseInt(hourMinute[0]);
				}
				
				return returnTime;
			case 'p.m.':
			case 'pm':
				if(hourMinute[0] == '12'){
					// If noon, set hour to 12 as is
					returnTime.hour = 12;
				} else {
					// Otherwise set hour plus 12 to handle 24 hour settings
					returnTime.hour = parseInt(hourMinute[0]) + 12;	
				}

				return returnTime;
		}
	}
}