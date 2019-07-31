import { Injectable } from '@angular/core';
import { IAlarm, Ticket, ETicketRecurrencyType, ITicketRecurrency } from './app.model';
import { Helper } from './utils';
import * as Alarm from 'alarm';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface IAlarmConfig {
	cancelFunction: Function;
	alarmObject: IAlarm;
}

/*
	in alarm service, for recurrency alarm, everytime only one instance avaliable in the alarm COnfigList
	after one instance be triggerred, the next one will be generated
*/

@Injectable({
  providedIn: 'root'
})
export class AlramService {
	private alarmConfigList: Array<IAlarmConfig>;

  constructor(private dialog: MatDialog) { 
	  this.alarmConfigList = [];
  }

  addAlaram(newAlarm: IAlarm): void {
	  const that = this;
	  if (newAlarm) {
		  newAlarm.id = Helper.generateMd5Hash(newAlarm.at.toString());
		  this.alarmConfigList.push({
			  alarmObject: newAlarm,
			  cancelFunction: Alarm(newAlarm.at,
				// TODO: here is the draft callback function for test alarm features
				() => {
				Helper.createAlert(that.dialog, {
					title: 'Alarm',
					message: '... ...'
				});
			  })
			});
	  }
  }

  removeAlarm(id: string):void {
	  this.alarmConfigList = this.alarmConfigList.filter(alarm => alarm.alarmObject.id !== id);
  }

  changeAlarm(newAlarm: IAlarm): void {
	  this.alarmConfigList.forEach(alram => {
		  if (alram.alarmObject.id === newAlarm.id) {
			  alram.alarmObject = newAlarm;
			  return;
		  }
	  })
  }

  getalarmConfigList(): Array<IAlarmConfig> {
	  return this.alarmConfigList;
  }

  prepareAlarmConfigList(tickets: Array<Ticket>): void {
	  tickets.forEach(t => {
		  if (t.alram) {
			  this.addAlaram(this.generateAlarmConfig(t));
		  }
	  });
  }

  private generateAlarmConfig(ticket: Ticket): IAlarm {
	  let alarm: IAlarm;
	  alarm.id  = Helper.generateMd5Hash(Helper.generateCreatedAt() + 'alarm id');
	  alarm.ticketID = ticket.id;
	  alarm.message = ticket.summary;
	  	  
	  switch (ticket.alram.type) {
		case ETicketRecurrencyType.once:
			alarm.at = this.calculateOnceAlarmTriggeredAt(ticket.alram);
			break;
		case ETicketRecurrencyType.day:
			alarm.at = this.calculateDailyRecurrenyTriggeredAt(ticket.alram);
			break;
		case ETicketRecurrencyType.week:
			alarm.at = this.calculateWeeklyRecurrencyTriggeredAt(ticket.alram);
			break;
		case ETicketRecurrencyType.monthDate:
			alarm.at = this.calculateMonthlyDateRecurrencyTriggeredAt(ticket.alram);
			break;
		case ETicketRecurrencyType.monthDay:
			alarm.at = this.calculateeMonthlyDayRecurrencyTriggeredAt(ticket.alram);
			break;
	  }

	  return alarm;
  }

  // TODO: need to calculate alarm timestamp
  private calculateOnceAlarmTriggeredAt(ticketAlarm: ITicketRecurrency): number {
	  return 0;
  }

  private calculateDailyRecurrenyTriggeredAt(ticketAlarm: ITicketRecurrency): number {
	  return 0;
  }

  private calculateWeeklyRecurrencyTriggeredAt(ticketAlarm: ITicketRecurrency): number {
	  return 0;
  }

  private calculateMonthlyDateRecurrencyTriggeredAt(ticketAlarm: ITicketRecurrency): number {
	  return 0;
  }

  private calculateeMonthlyDayRecurrencyTriggeredAt(ticketAlarm: ITicketRecurrency): number {
	  return 0;
  }
}
