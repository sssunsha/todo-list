import { Injectable } from '@angular/core';
import { IAlarm, Ticket } from './app.model';
import { Helper } from './utils';
import * as Alarm from 'alarm';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface IAlarmConfig {
	cancelFunction: Function;
	alarmObject: IAlarm;
}

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

  }
}
