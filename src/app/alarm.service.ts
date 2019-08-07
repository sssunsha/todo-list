import { Injectable } from '@angular/core';
import { IAlarm, Ticket, ETicketRecurrencyType, ITicketRecurrency, EDayOfWeek, EWeekOfMonth } from './app.model';
import { Helper } from './utils';
import * as Alarm from 'alarm';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';

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
	  	  
	//   switch (ticket.alram.type) {
	// 	case ETicketRecurrencyType.once:
	// 		alarm.at = this.calculateOnceAlarmTriggeredAt(ticket.alram);
	// 		break;
	// 	case ETicketRecurrencyType.day:
	// 		alarm.at = this.calculateDailyRecurrenyTriggeredAt(ticket.alram);
	// 		break;
	// 	case ETicketRecurrencyType.week:
	// 		alarm.at = this.calculateWeeklyRecurrencyTriggeredAt(ticket.alram);
	// 		break;
	// 	case ETicketRecurrencyType.monthDate:
	// 		alarm.at = this.calculateMonthlyDateRecurrencyTriggeredAt(ticket.alram);
	// 		break;
	// 	case ETicketRecurrencyType.monthDay:
	// 		alarm.at = this.calculateeMonthlyDayRecurrencyTriggeredAt(ticket.alram);
	// 		break;
	//   }

	  return alarm;
  }

  // convert the ticket recurrency data
  // -1 means no need to add the alarm, the timestamp is past

  private convertTicketOnceAlarm(t: ITicketRecurrency): number {
	  const now = new Date().getTime();
	  const alarmTimestamp = t.at.getTime();
	  return alarmTimestamp > now ? alarmTimestamp : -1;
  }

  private convertTicketDailyRecurrenyAlarm(t: ITicketRecurrency): number {
	  const now = new Date().getTime();
	  if (t.interval > 0) {
		  const dayInterval =  DAYINMS * t.interval;
		  while(t.legs > 0 || t.legs === -1) {
			let atTS = t.at.getTime();
			if(atTS < now){
				t.at = new Date(atTS + dayInterval);
				t.legs = t.legs !== -1 ? t.legs -1 : -1;
			} else {
				return atTS;
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

		  let atTS = t.at.getTime();
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
			  if(atTS < now.getTime()) {
				t.at = new Date(atTS + weekInterval);
				t.legs = t.legs !== -1 ? t.legs -1 : -1;
			  } else {
				  return atTS;
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
		let atTS = t.at.getTime();
		if(t.index > t.at.getDate()) {
			// shpuld move to the right date of current month
			t.at.setDate(t.index);

		} else if(t.index < t.at.getDate()) {
			// shpuld move to the right date of next month
			t.at.setMonth(t.at.getMonth() + 1);
			t.at.setDate(t.index);
		}
		while(t.legs > 0 || t.legs === -1) {
			if(atTS < now.getTime()) {
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
				return atTS;
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
