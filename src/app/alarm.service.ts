import { Injectable } from '@angular/core';
import { IAlarm, Ticket, ETicketRecurrencyType, ITicketRecurrency } from './app.model';
import { Helper } from './utils';
import * as Alarm from 'alarm';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface IAlarmConfig {
	cancelFunction: Function;
	alarmObject: IAlarm;
}

const DAYINMS = 86400000;
const WEEKINMS = 604800000;

/*
	in alarm service, for recurrency alarm, everytime only one instance avaliable in the alarm COnfigList
	after one instance be triggerred, the next one will be generated
*/

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
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

  // -1 means no need to add the alarm, the timestamp is past

  private calculateOnceAlarmTriggeredAt(t: ITicketRecurrency): number {
	  const now = new Date().getTime();
	  const alarmTimestamp = t.at.getTime();
	  return alarmTimestamp > now ? alarmTimestamp : -1;
  }

  private calculateDailyRecurrenyTriggeredAt(t: ITicketRecurrency): number {
	//   const now = new Date().getTime();
	//   const dayInterval =  DAYINMS * t.interval;
	//   if (t.legs > 0  && t.interval > 0) {
	// 	  while(t.legs > 0) {
	// 		  let timeStamp = t.at.getTime();
	// 		  if ( timeStamp < now && timeStamp + dayInterval > now) {
	// 			  t.at = new Date(timeStamp + dayInterval);
	// 			  t.legs -- ;
	// 		  } else {
	// 			  return timeStamp;
	// 		  }
	// 	  }
	//   } else if (t.legs === -1 && t.interval > 0) {
	// 	  while(1) {
	// 		let timeStamp = t.at.getTime();
	// 		  if (timeStamp + dayInterval < now ) {
	// 			t.at = new Date(timeStamp + dayInterval);
	// 		  } else {
	// 			  return timeStamp;
	// 		  }
	// 	  }
	//   }
	  return -1;
  }

  private calculateWeeklyRecurrencyTriggeredAt(t: ITicketRecurrency): number {
	//   const now = new Date().getTime();
	//   const weekInterval = WEEKINMS * t.interval;
	//   if (t.legs > 0 && t.interval > 0 && t.dayOfWeek) {
	// 	  while(t.legs >0) {
	// 		  let timeStamp = t.at.getTime();

	// 	  }

	//   } else if (t.legs === -1 && t.interval > 0 && t.dayOfWeek) {

	//   }

	  return -1;
  }

  private calculateMonthlyDateRecurrencyTriggeredAt(t: ITicketRecurrency): number {
	  return -1;
  }

  private calculateeMonthlyDayRecurrencyTriggeredAt(t: ITicketRecurrency): number {
	  return -1;
  }
}
