import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'sanitize',
})

export class SanitizePipe implements PipeTransform {
	constructor(public sanitize: DomSanitizer){}

	transform(value: string){
		//console.info('SanitizePipe - transform() - before', value);
		//console.info('SanitizePipe - transform() - after', this.sanitize.bypassSecurityTrustResourceUrl(value));
		return this.sanitize.bypassSecurityTrustResourceUrl(value);
	}
}
