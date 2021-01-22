import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Models
import { GoogleAddressModel } from '../../models/ionic/provider/api/google';

@Injectable()
export class GoogleProvider {

	apiKey: string = 'AIzaSyCdC-Dfkg2b6QwBvievvrvj-dBD6dnMQtQ';

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpClient } http
	 */
	constructor(public http: HttpClient) {}

	// GOOGLE MAPS

	/**
	 * @public
	 * @method gMapsGeocodingByCoords
	 * @description Get geocode information from coordinates
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses GoogleMaps
	 * @param { number } lat
	 * @param { number } long
	 */
	public gMapsGeocodingByCoords(lat: number, long: number){
		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + this.apiKey);
	}

	/**
	 * @public
	 * @method convertGMapResult
	 * @description Convert Google Maps reverse-coords result to an address array
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { GoogleAddressModel }
	 */
	public convertGMapResult(data: any): GoogleAddressModel{
		let address = new GoogleAddressModel;

		//Only take the first result
		for(let component of data.results[0].address_components){
			switch(component.types[0]){
				case 'street_number':
					address.setStreetNumber(component.long_name);
					break;
				// this may pick up highways
				case 'route':
					address.setStreetName(component.short_name);
					break;
				case 'neighborhood':
					address.setCity(component.long_name);
					break;
				// also cities
				case 'locality':
					address.setTownship(component.short_name);
					break;
				case 'administrative_area_level_2':
					address.setCounty(component.long_name);
					break;
				case 'administrative_area_level_1':
					address.setRegionAbbr(component.short_name);
					address.setRegion(component.long_name);
					break;
				case 'postal_code':
					address.setPostal(component.long_name);
					break;
				case 'country':
					address.setCountryAbbr(component.short_name);
					address.setCountry(component.long_name);
					break;
				//case 'political'
				// picks up metropolitian areas
			}
		}

		return address;
	}
}