import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailModal } from './order-detail';

// Natives
import { Diagnostic } from '@ionic-native/diagnostic';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

// Providers
import { CatalogProvider } from '../../../providers/magento/catalog';

@NgModule({
	declarations: [
		OrderDetailModal,
	],

	imports: [
		IonicPageModule.forChild(OrderDetailModal),
	],

	providers: [
		// Natives
		Diagnostic,
		File,
		FileOpener,
		// Providers
		CatalogProvider
	]
})

export class OrderDetailModalModule {}