export class GoogleAddressModel{
	private streetNumber: string;
	private streetName: string;
	private suite: string;
	private city: string;
	private county: string;
	private township: string;
	private regionAbbr: string;
	private region: string;
	private postal: string;
	private countryAbbr: string;
	private country: string;

	getStreetNumber(): string{
		return this.streetNumber;
	}

	setStreetNumber(value: string){
		this.streetNumber = value;
	}

	getStreetName(): string{
		return this.streetName;
	}

	setStreetName(value: string){
		this.streetName = value;
	}

	getSuite(): string{
		return this.suite;
	}

	setSuite(value: string){
		this.suite = value;
	}

	getCity(): string{
		return this.city;
	}

	setCity(value: string){
		this.city = value;
	}

	getCounty(): string{
		return this.county;
	}

	setCounty(value: string){
		this.county = value;
	}

	getTownship(): string{
		return this.township;
	}

	setTownship(value: string){
		this.township = value;
	}

	getRegionAbbr(): string{
		return this.regionAbbr;
	}

	setRegionAbbr(value: string){
		this.regionAbbr = value;
	}

	getRegion(): string{
		return this.region;
	}

	setRegion(value: string){
		this.region = value;
	}

	getPostal(): string{
		return this.postal;
	}

	setPostal(value: string){
		this.postal = value;
	}

	getCountryAbbr(): string{
		return this.countryAbbr;
	}

	setCountryAbbr(value: string){
		this.countryAbbr = value;
	}

	getCountry(): string{
		return this.country;
	}

	setCountry(value: string){
		this.country = value;
	}

	streetAddress(){
		return this.getStreetNumber() + ' ' + this.getStreetName();
	}

	fullStreetAddress(){
		return this.getStreetNumber() + ' ' + this.getStreetName() + ' ' + this.getSuite();
	}

	metroAddress(){
		return this.getCity() + ', ' + this.getRegionAbbr() + ' ' + this.getPostal();
	}
}