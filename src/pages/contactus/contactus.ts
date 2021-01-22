import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

// Natives
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

// Open Layers
declare var ol: any;

// Provider
import { CommonProvider } from '../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'page-contactus',
	templateUrl: 'contactus.html',
})

export class ContactusPage {

	// Maps
	public map: any;
	public coords: Array<number> = [42.50900, -83.58458];

	public loading: boolean = true;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Platform } platform
	 * @param { LaunchNavigation } navigation
	 * @param { Geolocation } geolocation
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public platform: Platform,
		public geolocation: Geolocation,
		public navigation: LaunchNavigator,
		public commonProvider: CommonProvider,
	) {}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		setTimeout(() => {
			this.loadMap();
		}, 500);
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_contactus',
			item_name: 'Contact Us Page',
			item_category: 'Page'
		});
	}

	/**
	 * @private
	 * @method loadMap
	 * @description Load the map
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private loadMap(): void{
		let markers = new ol.Collection([]);

		let icon = new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [22.5, 22.5],
				anchorXUnits: 'pixels',
				anchorYUnits: 'pixels',
				size: [45, 45],
				src: 'assets/img/locations/marker-circle-logistics.png'
			})
		});

		let marker = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.fromLonLat( [this.coords[1], this.coords[0]] ))
		});

		marker.setStyle(icon);

		markers.push(marker);

		this.loading = false;

		let map = new ol.Map({
			target: 'map',
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				}),
				new ol.layer.Vector({
					source: new ol.source.Vector({
						features: markers
					})
				})
			], view: new ol.View({
				center: ol.proj.fromLonLat([this.coords[1], this.coords[0]]),
				zoom: 16
			})
		});
	}

	/**
	 * @public
	 * @method email
	 * @description Call customer service
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public email(): void{
		window.open('mailto:sales@theindustrysource.com', '_system');
	}

	/**
	 * @public
	 * @method directions (click)
	 * @description Get turn-by-turn directions with Google Maps
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @uses GoogleMapsJavascriptAPI (3rd Party API)
	 * @uses Geolocation (native)
	 * @param { TisLocationModel } location
	 */
	public directions(): void{
		this.geolocation.getCurrentPosition().then(data => {
			let options: LaunchNavigatorOptions = {
				start: [data.coords.latitude, data.coords.longitude]
			};

			let appChoice: any = '';

			if(this.platform.is('android')){
				appChoice = this.navigation.APP.GOOGLE_MAPS;
			} else if(this.platform.is('ios')){
				appChoice = this.navigation.APP.APPLE_MAPS;
			} else if(this.platform.is('windows')){
				appChoice = this.navigation.APP.BING_MAPS;
			} else {
				appChoice = this.navigation.APP.USER_SELECT;
			}

			options.app = appChoice;

			this.navigation.isAppAvailable(appChoice).then(data => {
				this.navigation.navigate([this.coords[0], this.coords[1]], options)
				.then(data => console.info(data))
				.catch(onrejected => console.error(onrejected));
			}).catch(err => {
				options.app = this.navigation.APP.USER_SELECT;

				//Try again with the user select option for app
				this.navigation.navigate([this.coords[0], this.coords[1]], options)
				.then(data => console.info(data))
				.catch(onrejected => console.error(onrejected));
			});
		}).catch(onrejected => {
			console.error('LocationsPage - directions() - getCurrentPosition()', onrejected);

			this.commonProvider.toast('Unable to get your current location.');
		});
	}

	/**
	 * @public
	 * @method refresh (refresher)
	 * @description Perform a refresh
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @param { any } event
	 */
	public refresh(event: any): void{
		setTimeout(() => {
			event.complete();
		}, 2000); // Delay for two seconds
	}
}
