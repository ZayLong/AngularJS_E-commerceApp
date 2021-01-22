import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Models
import { SwapiPeopleModel } from '../../models/api/swapi';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

/**
 * @public
 * @class
 * @name SwapiProvider
 * @description This is for testing purposes when server is down
 * @uses SWAPI
 */
export class SwapiProvider {

	private apiUrl: string = 'https://swapi.co/api'

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { HttpClient } http
	 */
	public constructor(public http: HttpClient) {}

	/**
	 * @public
	 * @method readPeople
	 * @description Read a person from SW
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { number } id
	 * @return { Observable }
	 */
	public readPeople(id: number): Observable<SwapiPeopleModel>{
		return this.http.get<SwapiPeopleModel>(this.apiUrl + '/people/' + id).pipe(
			map( data => this.getSwapiPeopleModel(data))
		);
	}

	/**
	 * @private
	 * @method getSwapiPeopleModel
	 * @description Convert JSON data to a model
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { Object } data
	 * @return { SwapiPeopleModel }
	 */
	private getSwapiPeopleModel(data: any): SwapiPeopleModel{
		let model: SwapiPeopleModel = new SwapiPeopleModel();
		return model.fromJson(data);
	}
}
