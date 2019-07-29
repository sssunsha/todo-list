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
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { RecurrencyDialogComponent } from './recurrency-dialog/recurrency-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AngularMaterialModule,
		ReactiveFormsModule,
		OwlDateTimeModule, 
        OwlNativeDateTimeModule,
	],
	declarations: [
		TableComponent,
		StarComponent,
		ProgressComponent,
		CardComponent,
		BottomSheetComponent,
		AlertComponent,
		TicketDialogComponent,
		RecurrencyDialogComponent,
	],
	exports: [
		TableComponent,
		StarComponent,
		CardComponent,
		BottomSheetComponent,
		AlertComponent,
		TicketDialogComponent,
		RecurrencyDialogComponent,
	],
	entryComponents: [
		BottomSheetComponent,
		AlertComponent,
		TicketDialogComponent,
		RecurrencyDialogComponent,
	],
})
export class SharedComponentModule {}