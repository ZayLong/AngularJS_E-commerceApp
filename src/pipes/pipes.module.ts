import { NgModule } from '@angular/core';
import { SanitizePipe } from './url/sanitize';

@NgModule({
	declarations: [SanitizePipe],
	imports: [],
	exports: [SanitizePipe]
})

export class PipesModule {}