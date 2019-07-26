import { Injectable } from '@angular/core';
import { IAlarm } from './app.model';
import { Helper } from './utils';

@Injectable({
  providedIn: 'root'
})
export class AlramService {
	private alarmList: Array<IAlarm>;

  constructor() { 
	  this.alarmList = [];
  }

  addAlaram(newAlarm: IAlarm): void {
	  if (newAlarm) {
		  newAlarm.id = Helper.generateMd5Hash(newAlarm.at.getTime().toString());
		  this.alarmList.push(newAlarm);
	  }
  }

  removeAlarm(id: string):void {
	  this.alarmList = this.alarmList.filter(alarm => alarm.id !== id);
  }

  changeAlarm(newAlarm: IAlarm): void {
	  this.alarmList.forEach(alram => {
		  if (alram.id === newAlarm.id) {
			  alram = newAlarm;
			  return;
		  }
	  })
  }

  getAlarmList(): Array<IAlarm> {
	  return this.alarmList;
  }
}
