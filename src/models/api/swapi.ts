/**
 * @desc This is a bunch of class models that uses the Star Wars API to store data
 * @desc Use this whenever the Magento server is down for practicing manipulating data
 * @uses SWAPI
 */

export class SwapiPeopleModel{
	private _name: string;
	private _height: string;
	private _mass: string;
	private _hair_color: string;
	private _skin_color: string;
	private _eye_color: string;
	private _birth_year: string;
	private _gender: string;
	private _homeworld: string;
	private _films: Array<string> = [];
	private _species: Array<string> = [];
	private _vehicles: Array<string> = [];
	private _starships: Array<string> = [];
	private _created: string;
	private _edited: string;
	private _url: string;

	get name(): string{
		return this._name;
	}

	set name(value: string){
		this._name = value;
	}

	get height(): string{
		return this._height;
	}

	set height(value: string){
		this._height = value;
	}

	get mass(): string{
		return this._mass;
	}

	set mass(value: string){
		this._mass = value;
	}

	get hair_color(): string{
		return this._hair_color;
	}

	set hair_color(value: string){
		this._hair_color = value;
	}

	get skin_color(): string{
		return this._skin_color;
	}

	set skin_color(value: string){
		this._skin_color = value;
	}

	get eye_color(): string{
		return this._eye_color;
	}

	set eye_color(value: string){
		this._eye_color = value;
	}

	get birth_year(): string{
		return this._birth_year;
	}

	set birth_year(value: string){
		this._birth_year = value;
	}

	get gender(): string{
		return this._gender;
	}

	set gender(value: string){
		this._gender = value;
	}

	get homeworld(): string{
		return this._homeworld;
	}

	set homeworld(value: string){
		this._homeworld = value;
	}

	get films(): Array<string>{
		return this._films;
	}

	get_film(key: number): string{
		return this.films[key];
	}

	set films(value: Array<string>){
		this._films = value;
	}

	set_film(value: string): void{
		this.films.push(value);
	}

	get species(): Array<string>{
		return this._species;
	}

	get_species(key: number): string{
		return this.species[key];
	}

	set species(value: Array<string>){
		this._species = value;
	}

	set_species(value: string): void{
		this.species.push(value);
	}

	get vehicles(): Array<string>{
		return this._vehicles;
	}

	get_vehicle(key: number): string{
		return this.vehicles[key];
	}

	set vehicles(value: Array<string>){
		this._vehicles = value;
	}

	set_vehicle(value: string): void{
		this.vehicles.push(value);
	}

	get starships(): Array<string>{
		return this._starships;
	}

	get_starship(key: number): string{
		return this.starships[key];
	}

	set starships(value: Array<string>){
		this._starships = value;
	}

	set_starship(value: string): void{
		this.starships.push(value);
	}

	get created(): string{
		return this._created;
	}

	set created(value: string){
		this._created = value;
	}

	get edited(): string{
		return this._edited;
	}

	set edited(value: string){
		this._edited = value;
	}

	get url(): string{
		return this._url;
	}

	set url(value: string){
		this._url = value;
	}

	/**
	 * @public
	 * @method fromJson
	 * @description Convert data from JSON
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param Object data
	 * @return this
	 */
	fromJson(data: any): this{
		this.name = data.name;
		this.height = data.height;
		this.mass = data.mass;
		this.hair_color = data.hair_color;
		this.skin_color = data.skin_color;
		this.eye_color = data.eye_color;
		this.birth_year = data.birth_year;
		this.gender = data.gender;
		this.homeworld = data.homeworld;
		this.films = data.films;
		this.species = data.species;
		this.vehicles = data.vehicles;
		this.starships = data.starships;
		this.created = data.created;
		this.edited = data.edited;
		this.url = data.url;

		return this;
	}
}