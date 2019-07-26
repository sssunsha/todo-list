import { Injectable } from '@angular/core';
import { IAlarm } from './app.model';
import { Helper } from './utils';
import * as Alarm from 'alarm';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AlramService {
	private alarmList: Array<IAlarm>;

  constructor(private dialog: MatDialog) { 
	  this.alarmList = [];
  }

  addAlaram(newAlarm: IAlarm): void {
	  if (newAlarm) {
		  newAlarm.id = Helper.generateMd5Hash(newAlarm.at.toString());
		  Alarm(new Date(newAlarm.at), this.alramCallback(this));
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

// this is the callback for  alram
  alramCallback(that: any): void {
	  // popup a notification for the alram reached
	  Helper.createAlert(that.dialog, {
		  title: 'Alarm',
		  message: '... ...'
	  });
  }
}
