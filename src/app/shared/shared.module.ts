import {NgModule} from '@angular/core';
import { AngularMaterialModule } from '../core/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { StarComponent } from './star/star.component';
import { ProgressComponent } from './progress/progress.component';
import { CardComponent } from './card/card.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AngularMaterialModule,
		ReactiveFormsModule 
	],
	declarations: [
		TableComponent,
		StarComponent,
		ProgressComponent,
		CardComponent,
		BottomSheetComponent,
		AlertComponent,
	],
	exports: [
		TableComponent,
		StarComponent,
		CardComponent,
		BottomSheetComponent,
		AlertComponent,
	],
	entryComponents: [BottomSheetComponent, AlertComponent],
})
export class SharedComponentModule {}