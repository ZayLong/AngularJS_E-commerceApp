import { FormControl } from '@angular/forms';

export class PasswordValidator{

	/**
	 * Check the strength of the password string by different character classes
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param FormControl control
	 */
	static strengthCheck(control: FormControl): any {
		let regexClasses: number = 0; // A valid password must have at least three classes of valid characters in string
		let minimumClasses: number = 3;

		// Regex Patterns
		let digitPattern = /\d/;
		let lowerPattern = /[a-z]/;
		let upperPattern = /[A-Z]/;
		let specialPattern = /[a-zA-Z0-9]/; // Check if its false instead of individual special characters

		// Check if pattern has a number
		//console.info('Digit test', digitPattern.test(control.value));
		if(digitPattern.test(control.value)){
			regexClasses = regexClasses + 1;
		}

		// Check if pattern has a lowercase alpha character
		//console.info('Lowercase test', lowerPattern.test(control.value));
		if(lowerPattern.test(control.value)){
			regexClasses = regexClasses + 1;
		}

		// Check if pattern has an uppercase alpha character
		//console.info('Uppercase test', upperPattern.test(control.value));
		if(upperPattern.test(control.value)){
			regexClasses = regexClasses + 1;
		}

		// Check if pattern has a special character
		//console.info('Special character test', !specialPattern.test(control.value));
		if(specialPattern.test(control.value)){
			regexClasses = regexClasses + 1;
		}

		//Check if regex classes matches or surpasses the minimum amount
		//console.info('Attempted vs Minimum', regexClasses + ' vs. ' + minimumClasses);
		if(regexClasses >= minimumClasses){
			return null;
		} else {
			return {
				"strengthCheck": true
			}
		}
	}

	/**
	 * Check if the confirm string matches the password string
	 * Works only on the confirm field, and when the password field is "password"
	 * @param FormControl control
	 * @return
	 */
	static equalConfirm(control: FormControl): any{
		if(control.value != control.root.value['password']){
			return{
				'equalConfirm': true
			}
		}
	}
}