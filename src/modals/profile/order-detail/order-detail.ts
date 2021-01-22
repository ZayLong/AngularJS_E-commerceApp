import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController, Content } from 'ionic-angular';

// Models
import { OrderModel, OrderItemModel } from '../../../models/magento/sales/order';
import { ProductModel } from '../../../models/magento/catalog/product';

// Natives
import { Diagnostic } from '@ionic-native/diagnostic';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

// Providers
import { CatalogProvider } from '../../../providers/magento/catalog';
import { CommonProvider } from '../../../providers/ionic/common';

@IonicPage()
@Component({
	selector: 'modal-order-detail',
	templateUrl: 'order-detail.html',
})

export class OrderDetailModal {

	@ViewChild(Content) content: Content;

	order: OrderModel;

	// Products
	items: Array<{order: OrderItemModel, product: ProductModel}> = [];
	showItem: boolean = false;
	showItemButton: string = 'Show Items';

	// Statuses
	showStatus: boolean = false;
	showStatusButton: string = 'Show Status History';
	showDownloadButton: boolean = true;

	/**
	 * @public
	 * @constructor
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @param { NavController } navCtrl
	 * @param { NavParams } navParams
	 * @param { ViewController } viewCtrl
	 * @param { Platform } platform
	 * @param { HttpClient } http
	 * @param { AlertController } alertCtrl
	 * @param { Diagnostic } diagnostic
	 * @param { File } file
	 * @param { FileOpener } fileOpener
	 * @param { CatalogProvider } catalogProvider
	 * @param { CommonProvider } commonProvider
	 */
	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public platform: Platform,
		public http: HttpClient,
		public alertCtrl: AlertController,
		public diagnostic: Diagnostic,
		public file: File,
		public fileOpener: FileOpener,
		public catalogProvider: CatalogProvider,
		public commonProvider: CommonProvider) {}

	/**
	 * @public
	 * @method ionViewDidLoad (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidLoad() {
		this.order = this.navParams.get('order');
		console.info('OrderDetailsModal - ionViewDidLoad() - order', this.order);
		console.info('OrderDetailsModal - ionViewDidLoad() - order', this.order.status_histories);

		for(let i = 0; i < this.order.items.length; i++){
			this.catalogProvider.readProduct(this.order.items[i].sku).subscribe(data => {
				//this.order.items[i].setProductModel( this.catalogProvider.getProduct(data) );
				this.items.push({
					order: this.order.items[i],
					product: data
				})
			}, err => console.error('OrderDetailModal - ionViewDidLoad() - readProduct()', err));
		}

		// Temporarily disable for iOS
		if(this.platform.is('ios')){
			this.showDownloadButton = false;
		}
	}

	/**
	 * @public
	 * @method ionViewDidEnter (lifecycle)
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public ionViewDidEnter() {
		this.commonProvider.analyticsLogEvent('view_item', {
			item_id: 'order_' + this.order.entity_id,
			item_name: this.order.increment_id,
			item_category: 'Order'
		});
	}

	/**
	 * @public
	 * @method dismiss
	 * @description Dismiss the modal
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public dismiss(): void{
		this.viewCtrl.dismiss(null);
	}

	/**
	 * @public
	 * @method showItems
	 * @description Toggle show items button
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public showItems(): void{
		this.showItem = !this.showItem;
		if(this.showItem){
			this.showItemButton = 'Hide Items';
		} else {
			this.showItemButton = 'Show Items';
			this.content.scrollToTop();
		}
	}

	/**
	 * @public
	 * @method showStatuses
	 * @description Toggle show items button
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 */
	public showStatuses(): void{
		this.showStatus = !this.showStatus;
		if(this.showStatus){
			this.showStatusButton = 'Hide Status History';

			setTimeout(() => {
				this.content.scrollToBottom();
			}, 100);
			
		} else {
			this.showStatusButton = 'Show Status History';
		}
	}

	/**
	 * @public
	 * @method downloadInvoice
	 * @description Download a PDF invoice
	 * @author J. Trpka <jtrpka@tngworldwide.com>
	 * @see https://forum.ionicframework.com/t/how-to-download-stuff-now-that-transfer-file-is-deprecated/127451/15
	 * @uses File (native)
	 * @uses Diagnostics (native)
	 * @uses FileOpen (native)
	 * @todo Test it on iOS
	 */
	public downloadInvoice(){
		let date = this.order.created_at.split(' '); // Get the date from created at
		let filename: string = 'Order-' + this.order.increment_id + '-' + date[0].replace(/-/g, '') + '.pdf'; // Construct the filename

		let source: string = 'https://www.theindustrysource.com/pub/media/insync/order/' + filename; // Go to the source target on the server
		let target: string = ''; // Initialize the destination target on the device

		// Alert message per user
		let alertMessage: string = '';

		// Determine target path based on path
		if(this.platform.is('android')){
			target = this.file.externalRootDirectory + '/Download/';
			alertMessage = 'Your invoice has been downloaded. Would you like to review it? If you want to do it later you can find it in your Downloads or Files folder.';
		} else if(this.platform.is('ios')){
			this.showDownloadButton = false; // disable for now
			target = this.file.documentsDirectory;
			alertMessage = 'How are you viewing this? Please report to TIS about this bug.';
		}

		// Retrieve the blob data of the file
		this.http.get(source, { responseType: 'blob' }).subscribe(data => {
			// Create an empty file first that will replace any existing file
			this.file.createFile(target, filename, true).then(() => {
				// Then overwrite the file with the data
				this.file.writeFile(target, filename, data, { replace: true }).then(data => {
					// let toast = this.commonProvider.toast('Download Completed');
					// toast.present();

					let alert = this.alertCtrl.create({
						title: 'Invoice Downloaded',
						message: alertMessage,
						buttons: [
							{
								text: 'Later',
								handler: () => {
									console.log('Later clicked');
								}
							},{
								text: 'Now',
								handler: () => {
									console.log('Now clicked');

									this.fileOpener.open(target + filename, 'application/pdf').then(() => {

									}).catch(onrejected => console.error('OrderDetailModal - downloadInvoice() - writeFile()', onrejected));
								}
							}
						]
					});

					alert.present();

				}).catch(onrejected => console.error('OrderDetailModal - downloadInvoice() - writeFile()', onrejected));
			}).catch(onrejected => console.error('OrderDetailModal - downloadInvoice() - createFile()', onrejected));
		});
	}
}
