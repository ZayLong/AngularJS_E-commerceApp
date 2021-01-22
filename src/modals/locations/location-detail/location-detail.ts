import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

// Models
import { TisLocationModel } from '../../../models/tng/tis';

// Natives
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

// Open Layers
declare var ol: any;

// Providers
import { CommonProvider } from '../../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'modal-location-detail',
	templateUrl: 'location-detail.html',
})

export class LocationDetailModal {

	public store: TisLocationModel;
	public map: any; // Map Object

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @version 1.1.0
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { Platform } platform
	 * @param { LaunchNavigation } navigation
	 * @param { Geolocation } geolocation
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public platform: Platform,
		public geolocation: Geolocation,
		public navigation: LaunchNavigator,
		public commonProvider: CommonProvider
	) {}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		this.store = this.navParams.get('store');

		setTimeout(() => {
			this.loadMap();
		}, 500);
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @version 1.1.0
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'location_' + this.store.id,
			item_name: this.store.name,
			item_category: 'Location'
		});
	}

	/**
	 * @public
	 * @method dismiss (click)
	 * @description Dismiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @version 1.1.0
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss(null);
	}

	/**
	 * @private
	 * @method loadMap
	 * @description Load the map on the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.5.0
	 * @version 1.5.0
	 */
	private loadMap(): void{
		// Swap the src of the icon image depending on location id
		let src: string = '';
		if(this.store.id === '17'){
			src = 'assets/img/locations/marker-circle-logistics.png';
		} else {
			src = 'assets/img/locations/marker-circle.png';
		}

		// Create the marker
		let markers = new ol.Collection([]);

		let icon = new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [22.5, 22.5],
				anchorXUnits: 'pixels',
				anchorYUnits: 'pixels',
				size: [45, 45],
				src: src
			})
		});

		let marker = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(this.store.lng), parseFloat(this.store.lat)]))
		});

		marker.setStyle(icon);
		markers.push(marker);

		var map = new ol.Map({
			target: 'mapper',
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
				center: ol.proj.fromLonLat([parseFloat(this.store.lng), parseFloat(this.store.lat)]),
				zoom: 15
			})
		});
	}

	/**
	 * @public
	 * @method directions (click)
	 * @description Get turn-by-turn directions with Google Maps
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @version 1.1.0
	 * @uses GoogleMapsJavascriptAPI (3rd Party API)
	 * @uses Geolocation (native)
	 * @param { TisLocationModel } location
	 */
	public directions(location: TisLocationModel): void{
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
				this.navigation.navigate([parseFloat(location.lat), parseFloat(location.lng)], options)
				.then(data => console.info(data))
				.catch(onrejected => console.error(onrejected));
			}).catch(err => {
				options.app = this.navigation.APP.USER_SELECT;

				//Try again with the user select option for app
				this.navigation.navigate([parseFloat(location.lat), parseFloat(location.lng)], options)
				.then(data => console.info(data))
				.catch(onrejected => console.error(onrejected));
			});
		}).catch(onrejected => {
			console.error('LocationsPage - directions() - getCurrentPosition()', onrejected);

			this.commonProvider.toast('Unable to get your current location.');
		});
	}
}