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
	isError = false;
	notificationMsg: string;

  constructor(
	  private _dialogRef: MatDialogRef<RecurrencyDialogComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: ITicketRecurrencyDialogConfig
  ) { }

  ngOnInit() {
	  if (!this.data.ticketAlarm) {
		  // should generate a new one
		  this.data.ticketAlarm = 
		  	Helper.generateDefaultTicketAlarm(this.data.type );
	  } else {
		  this.data.ticketAlarm.type =this.data.type;
	  }
	  this.generateNotificationMessage();
  }

  isDateValid(date: Date): boolean {
	if (date > new Date()) {
		return true;
	}
	return Helper.isDateToday(date);
}

	onChanged(): void {
		this.isError = false;
		this.generateNotificationMessage();
	}

  onCancel() {
	  this._dialogRef.close();
  }

  onSave() {
	this.prepareForSaving();
	if (!this.isError) {
		this._dialogRef.close();
	}
  }

  private generateNotificationMessage() {
	this.notificationMsg = this.data.ticketAlarm.type + ' ' +
		this.data.ticketAlarm.at || '' + ' ' +
		this.data.ticketAlarm.weekOfMonth || '' + ' ' +
		this.data.ticketAlarm.dayOfWeek || '' + ' ' +
		this.data.ticketAlarm.index || '' + ' ' +
		this.data.ticketAlarm.interval || '' + ' ' +
		this.data.ticketAlarm.legs || '';
  }

  private prepareForSaving() {
	  // first check the payload  validation for different type
	  switch(this.data.type) {
		case ETicketRecurrencyType.monthDate:
			this.checkRecurrencyAt();
			this.checkRecurrencyInterval();
			this.checkRecurrencyLegs();
			this.checkRecurrencyIndex();
			break;
		case ETicketRecurrencyType.monthDay:
			this.checkRecurrencyAt();
			this.checkRecurrencyInterval();
			this.checkRecurrencyLegs();
			this.checkRecurrencyWeekOfMonth();
			this.checkRecurrencyDayOfWeek();
			break;
		case ETicketRecurrencyType.week:
			this.checkRecurrencyAt();
			this.checkRecurrencyInterval();
			this.checkRecurrencyLegs();
			this.checkRecurrencyDayOfWeek();
			break;
		case ETicketRecurrencyType.day:
			this.checkRecurrencyAt();
			this.checkRecurrencyInterval();
			this.checkRecurrencyLegs();
			break;
		case ETicketRecurrencyType.once:
			this.checkRecurrencyAt();
			break;
	  }
  }

  private checkRecurrencyAt(): boolean {
	  if (!this.data.ticketAlarm.at) {
		  this.isError = true;
		  this.notificationMsg = 'at is invalid';
		  return false;
	  }
	  return true;
  }

  private checkRecurrencyInterval(): boolean {
	  if (!this.data.ticketAlarm.interval) {
		  this.isError = true;
		  this.notificationMsg = 'interval is invalid';
	  }
	  return true;
  }

  private checkRecurrencyLegs(): boolean {
	  if (this.data.ticketAlarm.legs > 0 || this.data.ticketAlarm.legs === -1){
		  return true;
	  } else {
		  this.isError = true;
		  this.notificationMsg = 'legs is invalid';
		return false;
	  }
  }

  private checkRecurrencyDayOfWeek(): boolean {
	  if (!this.data.ticketAlarm.dayOfWeek) {
		  this.isError = true;
		  this.notificationMsg = 'dayOfWeek is invalid';
	  }
	  return true;
  }

  private checkRecurrencyWeekOfMonth(): boolean {
	  if (!this.data.ticketAlarm.weekOfMonth) {
		  this.isError = true;
		  this.notificationMsg = 'weekOfMonth is invalid';
	  }
	  return true;
  }

  private checkRecurrencyIndex(): boolean {
	  if (this.data.ticketAlarm.index > 31 || this.data.ticketAlarm.index < 1) {
		  this.isError = true;
		  this.notificationMsg = 'index is invalid';
	  }
	  return true;
  }

}
