import {NgModule} from '@angular/core';
import { AngularMaterialModule } from '../core/angular-material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { StarComponent } from './star/star.component';
import { ProgressComponent } from './progress/progress.component';
import { CardComponent } from './card/card.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AngularMaterialModule
	],
	declarations: [
		TableComponent,
		StarComponent,
		ProgressComponent,
		CardComponent,
		BottomSheetComponent,
	],
	exports: [
		TableComponent,
		StarComponent,
		CardComponent,
		BottomSheetComponent,
	],
	entryComponents: [BottomSheetComponent],
})
export class SharedComponentModule {}