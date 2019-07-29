import { Component, OnInit, Input, Inject } from '@angular/core';
import { ETicketRecurrencyType,
		ITicketRecurrency,
		ITicketRecurrencyDialogConfig,
		DAYOFWEEK,
		WEEKOFMONTH,
		TICKEALARMTYPESELECTCONFIG } from '../../app.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Helper } from '../../utils';

@Component({
  selector: 'app-recurrency-dialog',
  templateUrl: './recurrency-dialog.component.html',
  styleUrls: ['./recurrency-dialog.component.scss']
})
export class RecurrencyDialogComponent implements OnInit {
	_TICKEALARMTYPESELECTCONFIG = TICKEALARMTYPESELECTCONFIG;
	_DAYOFWEEK = DAYOFWEEK;
	_WEEKOFMONTH = WEEKOFMONTH;
	alarm: ITicketRecurrency;

  constructor(
	  private _dialogRef: MatDialogRef<RecurrencyDialogComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: ITicketRecurrencyDialogConfig
  ) { }

  ngOnInit() {
	  if (!this.data.ticketAlarm) {
		  // should generate a new one
		  this.data.ticketAlarm = 
		  	Helper.generateDefaultTicketAlarm(this.data.type !== ETicketRecurrencyType.once);
	  }
  }

  isDateValid(date: Date): boolean {
	if (date > new Date()) {
		return true;
	}
	return Helper.isDateToday(date);
}

  onCancel() {
	  this._dialogRef.close();
  }

  onSave() {
	this._dialogRef.close();
  }

}
