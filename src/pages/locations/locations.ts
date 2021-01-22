import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ActionSheetController, ActionSheetButton } from 'ionic-angular';

// Modals
import { LocationDetailModal } from '../../modals/locations/location-detail/location-detail';

// Models
import { CartModel } from '../../models/magento/cart/cart';
import { TisLocationModel } from '../../models/tng/tis';

// Natives
import { Geolocation } from '@ionic-native/geolocation';

// Open Layers
declare var ol: any;

// Provider
import { AuthenticateProvider } from '../../providers/magento/authenticate';
import { CartProvider } from '../../providers/magento/cart';
import { CommonProvider } from '../../providers/ionic/common';
import { TisProvider } from '../../providers/tng/tis';

@IonicPage()
@Component({
	selector: 'page-locations',
	templateUrl: 'locations.html',
})

export class LocationsPage {

	// Customer, Cart
	public logged: boolean;
	public cart: CartModel;

	// Maps
	public locations: Array<TisLocationModel> = [];
	public logistics: TisLocationModel;
	public map: any; // Map Object

	public loading: boolean = true;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @version 1.5.2
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { Events } events
	 * @param { ModalController } modalCtrl
	 * @param { ActionSheetController } asCtrl
	 * @param { LaunchNavigation } navigation
	 * @param { Geolocation } geolocation
	 * @param { AuthenticateProvider } authProvider
	 * @param { CartProvider } cartProvider
	 * @param { CommonProvider } commonProvider
	 * @param { TisProvider } tisProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public events: Events,
		public modalCtrl: ModalController,
		public asCtrl: ActionSheetController,
		public geolocation: Geolocation,
		public authProvider: AuthenticateProvider,
		public cartProvider: CartProvider,
		public commonProvider: CommonProvider,
		public tisProvider: TisProvider
	) {}

	/**
 	 * @public
 	 * @method ionViewDidLoad (lifecycle)
 	 * @author J. Trpka <jtrpka@tngworldwide.com>
 	 * @since 1.1.0
 	 * @version 1.5.0
	 */
	public ionViewDidLoad() {
		this.cart = this.authProvider.getCurrentCartProvider();

		if(this.cart != null && this.cart.customer.id){
			this.logged = true;
		} else {
			this.logged = false;
		}

		this.getLocations();
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'page_locations',
			item_name: 'Locations Page',
			item_category: 'Page'
		});
	}

	/**
	 * @private
	 * @method getLocations
	 * @description Get the locations
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.3.0
	 * @version 1.5.0
	 * @uses OpenLayers
	 */
	private getLocations(): void{
		this.geolocation.getCurrentPosition().then(data => {
			let center: Array<number> = [data.coords.latitude, data.coords.longitude];

			this.tisProvider.readStoreLocations().subscribe(data => {
				// Markers for OpenLayers
				let markers = new ol.Collection([]);

				// Icons for OpenLayers
				let icon = new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [22.5, 22.5],
						anchorXUnits: 'pixels',
						anchorYUnits: 'pixels',
						size: [45, 45],
						src: 'assets/img/locations/marker-circle.png'
					})
				});

				let iconLogistic = new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [22.5, 22.5],
						anchorXUnits: 'pixels',
						anchorYUnits: 'pixels',
						size: [45, 45],
						src: 'assets/img/locations/marker-circle-logistics.png'
					})
				});

				for(let loc of data){
					// Create the markers
					let marker = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(loc.lng), parseFloat(loc.lat)])),
						location: loc
					});

					// Mongo Note: db.storeMap.remove({"id":"13"}, {justOnce:true})
					// Use this command to remove the Taylor location at the end of the year, or maybe after you survive your winter camping. :)

					// Logistics Center (17)
					if(loc.id !== '17'){
						// Stores
						this.locations.push(loc);
						marker.setStyle(icon);
					} else if(loc.id === '17'){
						// Logistics Center
						this.logistics = loc;
						marker.setStyle(iconLogistic);
					}

					markers.push(marker);
				}

				this.loading = false;

				var map = new ol.Map({
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
						center: ol.proj.fromLonLat([center[1], center[0]]),
						zoom: 10
					})
				});

				
				// Will need to make the instanced class in a separate variable for scope sake
				let that = this;

				// Open the location details modal
				map.on('click', function(e){
					map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
						let location: TisLocationModel = feature.values_.location;
						that.locationModal(location);

						return true;
					});
				})
			});
		}).catch(onrejected => {
			console.error('LocationsPage - getLocations() - getCurrentPosition()', onrejected);

			let toast = this.commonProvider.toast('Unable to get your current location.');
			toast.present();
		});
	}

	/**
	 * @public
	 * @method locationModal (click)
	 * @description Launch the location detail modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @uses ModalController
	 * @param { TisLocationModel } store
	 */
	public locationModal(store: TisLocationModel): void{
		this.commonProvider.analyticsLogEvent('select_content', {
			content_type: 'Location',
			item_id: 'location_' + store.id
		});

		let modal = this.modalCtrl.create(LocationDetailModal, {
			store: store
		});

		modal.present();
	}

	/**
	 * @public
	 * @method locationActionSheet (click)
	 * @description Launch the location action sheet
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @since 1.1.0
	 * @uses ActionSheetController
	 */
	public locationActionSheet(): void{

		let actionSheet = this.asCtrl.create({
			title: 'Find Store Location'
		});

		// Add the store locations
		for(let store of this.locations){
			let button: ActionSheetButton = {};
			button.text = store.name;
			button.handler = () => {
				this.locationModal(store);
			};

			actionSheet.addButton(button);
		}

		// Then add the logistics location
		let logisticsButton: ActionSheetButton = {};
		logisticsButton.text = this.logistics.name;
		logisticsButton.handler = () => {
			this.locationModal(this.logistics);
		};

		actionSheet.addButton(logisticsButton);

		// Finally add a cancel button
		let cancelButton: ActionSheetButton = {};
		cancelButton.text = 'Close';
		cancelButton.role = 'cancel';

		actionSheet.addButton(cancelButton);

		actionSheet.present();
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
		// Give it a delay of two(2) seconds
		setTimeout(() => {
			this.cartProvider.getCart().subscribe(data => {
				this.logged = data.logged;
				this.cart = data.cart;
				this.authProvider.setCurrentCartProvider(data.cart);

				this.getLocations();

				event.complete();
			}, err => {
				console.error('LocationsPage - refresh() - cart()', err);

				event.complete();
			});
		}, 2000); // Delay for two seconds
	}
}