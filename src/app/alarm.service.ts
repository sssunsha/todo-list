import { Injectable } from '@angular/core';
import { Ticket, ETicketRecurrencyType, ITicketRecurrency, EDayOfWeek, EWeekOfMonth } from './app.model';
import { Helper } from './utils';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subject } from 'rxjs';


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
	alarmList: Array<ITicketRecurrency>;
	worker: Worker;
	alarmNotificationSubject: Subject<{alarm?: ITicketRecurrency, action: string}> 
		= new Subject<{alarm?: ITicketRecurrency, action: string}>();

  constructor(private dialog: MatDialog) { 
	  this.alarmList = [];
	  this.init();
  }

  init() {
	  if (typeof Worker !== 'undefined') {
		  this.worker = new Worker('./app.worker', {type: 'module'});
		  this.worker.onmessage = ({data}) => {
			  if (data === 'auto-sync') {
				  console.log(' start auto sync now ...');
				  this.alarmNotificationSubject.next({action: 'auto-sync'});
			  } else {
				alert('It is time for: \n' + data.message);
				this.onAlarmFired(data);
			  }
		  }
	  } else {
		  console.error('Web worker are not supported in this environment.');
	  }
  }

  createAlarm(ticket: Ticket): void {
	  this.addAlaram(this.generateAlarmConfig(ticket));
	  this.worker.postMessage({
		command: 'update',
		alarms: this.alarmList
	  });
  }

  removeAlarm(id: string):void {
	  this.alarmList = this.alarmList.filter(alarm => alarm.id !== id);
	  this.worker.postMessage({
		command: 'update',
		alarms: this.alarmList
	  });
  }

  changeAlarm(ticket: Ticket): void {
	  this.alarmList.forEach(alarm => {
		  if (alarm.id === ticket.alarm.id) {
			  alarm = this.generateAlarmConfig(ticket);
			  return;
		  }
	  })
	  this.worker.postMessage({
		command: 'update',
		alarms: this.alarmList
	  });
  }

  getalarmList(): Array<ITicketRecurrency> {
	  return this.alarmList;
  }

  prepareAlarmConfigListFromTickets(tickets: Array<Ticket>): void {
	  tickets.forEach(t => {
		  if (t.alarm) {
			  const alarmConfig  = this.generateAlarmConfig(t);
			  if (alarmConfig) {
				  this.addAlaram(alarmConfig);
			  } else {
				  t.alarm = null;
			  }
		  }
	  });
	  // after prepare alarm from ticket, post message to alarm worker
	  this.worker.postMessage({
		command: 'start',
		alarms: this.alarmList
	  });
  }

  private addAlaram(newAlarm: ITicketRecurrency): void {
	const that = this;
	if (newAlarm) {
		if (!newAlarm.id) {
		  newAlarm.id = Helper.generateMd5Hash(newAlarm.at.toString());
		}
		this.alarmList.push(newAlarm);
	}
}

	private onAlarmFired(alarm: ITicketRecurrency): void {
		let result = -1;
		alarm.at = new Date(alarm.at);
		result = this.calculateNextRunAt(alarm);
		if (result === -1) {
			// should remove the alarm from alarmList
			this.removeAlarm(alarm.id);
			this.alarmNotificationSubject.next({alarm: alarm, action: 'delete'});
		} else {
			this.alarmNotificationSubject.next({alarm: alarm, action: 'update'});
		}
	}

  generateAlarmConfig(ticket: Ticket): ITicketRecurrency {
	  ticket.alarm.message = ticket.summary;
	  ticket.alarm.at = new Date(ticket.alarm.at);
	  let result = -1;
	  result = this.calculateNextRunAt(ticket.alarm);
	  if (result !== -1) {
		  return ticket.alarm;
	  } else {
		  // clear the ticket alarm
		  ticket.alarm = null;
		  return null;
	  }
  }

  private calculateNextRunAt(alarm: ITicketRecurrency): number {
	  let result = -1;
	  switch (alarm.type) {
		case ETicketRecurrencyType.once:
			result = this.convertTicketOnceAlarm(alarm);
			break;
		case ETicketRecurrencyType.day:
			result = this.convertTicketDailyRecurrenyAlarm(alarm);
			break;
		case ETicketRecurrencyType.week:
			result = this.convertTicketWeeklyRecurrencyAlarm(alarm);
			break;
		case ETicketRecurrencyType.monthDate:
			result = this.convertTicketMonthlyDateRecurrencyAlarm(alarm);
			break;
		case ETicketRecurrencyType.monthDay:
			result = this.convertTicketMonthlyDayRecurrencyAlarm(alarm);
			break;
		}

	return result;
  }

  // convert the ticket recurrency data
  // -1 means no need to add the alarm, the timestamp is past

  private convertTicketOnceAlarm(t: ITicketRecurrency): number {
	  const now = new Date().getTime();
	  const alarmTimestamp = t.at.getTime();
	  if (alarmTimestamp > now) {		  
		  return alarmTimestamp;
	  }

	  return -1;
  }

  private convertTicketDailyRecurrenyAlarm(t: ITicketRecurrency): number {
	  const now = new Date().getTime();
	  if (t.interval > 0) {
		  const dayInterval =  DAYINMS * t.interval;
		  while(t.legs > 0 || t.legs === -1) {
			if(t.at.getTime() < now){
				t.at = new Date(t.at.getTime() + dayInterval);
				t.legs = t.legs !== -1 ? t.legs -1 : -1;
			} else {
				return t.at.getTime();
			}
		  }
	  }
	  return -1;
  }

  private convertTicketWeeklyRecurrencyAlarm(t: ITicketRecurrency): number {
	  const now = new Date();
	  if(t.interval > 0) {
		  const weekInterval = WEEKINMS * t.interval;
		  let dayOfweekIndex = -1;
			  switch(t.dayOfWeek) {
				case EDayOfWeek.sunday:
					dayOfweekIndex = 0;
					break;
				case EDayOfWeek.monday:
					dayOfweekIndex = 1;
					break;
				case EDayOfWeek.tuesday:
					dayOfweekIndex = 2;
					break;
				case EDayOfWeek.wednesday:
					dayOfweekIndex = 3;
					break;
				case EDayOfWeek.thursday:
					dayOfweekIndex = 4;
					break;
				case EDayOfWeek.friday:
					dayOfweekIndex = 5;
					break;
				case EDayOfWeek.saturday:
					dayOfweekIndex = 6;
					break;
		  }

		  // first check the at day === dayOfWeek or not
		  let dayGap = dayOfweekIndex - t.at.getDay();
		  if (dayGap > 0) {
				// should move to the right day
				t.at = new Date(t.at.getTime() + WEEKINMS * dayGap);
			} else if(dayGap < 0) {
				// should move to the right day
				t.at = new Date(t.at.getTime() + WEEKINMS * (dayGap + 7));
			}
		
		  while(t.legs > 0 || t.legs === -1) {
			  if(t.at.getTime() < now.getTime()) {
				t.at = new Date(t.at.getTime() + weekInterval);
				t.legs = t.legs !== -1 ? t.legs -1 : -1;
			  } else {
				  return t.at.getTime();
			  }
		  }
	  }

	  return -1;
  }

  private convertTicketMonthlyDayRecurrencyAlarm(t: ITicketRecurrency): number {
	const now = new Date();
	now.setHours(t.at.getHours());
	now.setMinutes(t.at.getMinutes());
	now.setSeconds(t.at.getSeconds());
	now.setMilliseconds(t.at.getMilliseconds());
	const DayInNowMonth = this.caculateMatchedMonthlyDay(now, t.weekOfMonth, t.dayOfWeek);
	t.at = this.caculateMatchedMonthlyDay(t.at, t.weekOfMonth, t.dayOfWeek);
	if(t.interval > 0) {
		while(t.legs > 0 || t.legs === -1) {
			if (t.at.getTime() < DayInNowMonth.getTime()) {
				// move to the right day of next week
				t.at.setDate(1);
				t.at.setMonth(t.at.getMonth() + 1);
				t.at = this.caculateMatchedMonthlyDay(t.at, t.weekOfMonth, t.dayOfWeek);
			} else {
				return t.at.getTime();
			}
		}
	}
	  return -1;
  }

  private convertTicketMonthlyDateRecurrencyAlarm(t: ITicketRecurrency): number {
	const now = new Date();
	if (t.interval > 0) {
		if(t.index > t.at.getDate()) {
			// shpuld move to the right date of current month
			t.at.setDate(t.index);

		} else if(t.index < t.at.getDate()) {
			// shpuld move to the right date of next month
			t.at.setMonth(t.at.getMonth() + 1);
			t.at.setDate(t.index);
		}
		while(t.legs > 0 || t.legs === -1) {
			if(t.at.getTime() < now.getTime()) {
				switch(t.at.getMonth()) {
					case 0: //Jan.
						if (t.index > 29) {
							if (t.at.getFullYear()%4 === 0) {
								t.at.setDate(29);
								t.at.setMonth(t.at.getMonth() + 1);
							} else {
								t.at.setDate(28);
								t.at.setMonth(t.at.getMonth() + 1);
							}
						} else if(t.index === 29 && t.at.getFullYear() % 4 !== 0) {
							t.at.setDate(28);
							t.at.setMonth(t.at.getMonth() + 1);
						} else {
							t.at.setMonth(t.at.getMonth() + 1);
						}
						break;
					case 1: // Feb.
						t.at.setMonth(t.at.getMonth() + 1);
						break;
					case 2: // March.
						if(t.index === 31) {
							t.at.setDate(30);
							t.at.setMonth(t.at.getMonth() + 1);
						} else {
							t.at.setMonth(t.at.getMonth() + 1);
						}
						break;
					case 3: // April
						t.at.setMonth(t.at.getMonth() + 1);
						break;
					case 4:
						if(t.index === 31) {
							t.at.setDate(30);
							t.at.setMonth(t.at.getMonth() + 1);
						} else {
							t.at.setMonth(t.at.getMonth() + 1);
						}
						break;
					case 5:
						t.at.setMonth(t.at.getMonth() + 1);
						break;
					case 6:
						t.at.setMonth(t.at.getMonth() + 1);
						break;
					case 7:
						if(t.index === 31) {
							t.at.setDate(30);
							t.at.setMonth(t.at.getMonth() + 1);
						} else {
							t.at.setMonth(t.at.getMonth() + 1);
						}
						break;
					case 8:
						t.at.setMonth(t.at.getMonth() + 1);
						break;
					case 9:
						if(t.index === 31) {
							t.at.setDate(30);
							t.at.setMonth(t.at.getMonth() + 1);
						} else {
							t.at.setMonth(t.at.getMonth() + 1);
						}
						break;
					case 10:
						t.at.setMonth(t.at.getMonth() + 1);
						break;
					case 11:
						t.at.setMonth(t.at.getMonth() + 1);
						break;
				}
			  t.legs = t.legs !== -1 ? t.legs -1 : -1;
			} else {
				return t.at.getTime();
			}
		}
	}
	  return -1;
  }

  //  private help function
  private caculateMatchedMonthlyDay(t: Date, wom: EWeekOfMonth, dow: EDayOfWeek): Date {
	let weekOfMonth = 5; // 5 is the last week of month
	switch(wom) {
		case EWeekOfMonth.first:
			weekOfMonth = 1;
			break;
		case EWeekOfMonth.second:
			weekOfMonth = 2;
			break;
		case EWeekOfMonth.third:
			weekOfMonth = 3;
			break;
		case EWeekOfMonth.fourth:
			weekOfMonth = 4;
			break;
		case EWeekOfMonth.last:
			weekOfMonth = 5;
			break;
	}
	let dayOfweekIndex = -1;
	switch(dow) {
	  case EDayOfWeek.sunday:
		  dayOfweekIndex = 0;
		  break;
	  case EDayOfWeek.monday:
		  dayOfweekIndex = 1;
		  break;
	  case EDayOfWeek.tuesday:
		  dayOfweekIndex = 2;
		  break;
	  case EDayOfWeek.wednesday:
		  dayOfweekIndex = 3;
		  break;
	  case EDayOfWeek.thursday:
		  dayOfweekIndex = 4;
		  break;
	  case EDayOfWeek.friday:
		  dayOfweekIndex = 5;
		  break;
	  case EDayOfWeek.saturday:
		  dayOfweekIndex = 6;
		  break;
	}

	// caculate the at month date based on weekOfMonth and dayOfWeek
	let matchedDate: Date = null;
	let newAt = new Date(t);
	const currentMonth = newAt.getMonth();
	if (weekOfMonth <= 4) {
		// set newAt to the first day of the month
		newAt.setDate(1);
		let dayOfWeekNewAt = newAt.getDay();
		let weekOfMonthNewAt = 1;
		while (newAt.getMonth() === currentMonth) {
			if(dayOfWeekNewAt === dayOfweekIndex && weekOfMonthNewAt === weekOfMonth) {
				matchedDate = newAt;
			} else {
				newAt.setDate(newAt.getDate() + 1);
			}
		}
	} else { // for EWeekOfMonth.last
		// set newAt to the last day of the month
		newAt.setDate(1);
		newAt.setMonth(newAt.getMonth() + 1);
		newAt.setDate(newAt.getDate() - 1);
		let dayOfWeekNewAt = newAt.getDay();
		while(newAt.getMonth() == currentMonth) {
			if (dayOfWeekNewAt === dayOfweekIndex) {
				matchedDate = newAt;
			} else {
				newAt.setDate(newAt.getDate() - 1);
			}
		}
	}
	return matchedDate;
  }
}
