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
import { CalendarBoardComponent } from './calendar-board/calendar-board.component';
import { NgxTuiCalendarModule } from 'ngx-tui-calendar';
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AngularMaterialModule,
		ReactiveFormsModule,
		OwlDateTimeModule, 
		OwlNativeDateTimeModule,
		NgxTuiCalendarModule.forRoot(),
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
		CalendarBoardComponent,
		BasicDialogComponent,
	],
	exports: [
		TableComponent,
		StarComponent,
		CardComponent,
		BottomSheetComponent,
		AlertComponent,
		TicketDialogComponent,
		RecurrencyDialogComponent,
		CalendarBoardComponent,
	],
	entryComponents: [
		BottomSheetComponent,
		AlertComponent,
		TicketDialogComponent,
		RecurrencyDialogComponent,
		CalendarBoardComponent,
		BasicDialogComponent,
	],
})
export class SharedComponentModule {}