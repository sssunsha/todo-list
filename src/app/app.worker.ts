import { ITicketRecurrency } from './app.model';
import { appConfig } from './shared/app.config';
/// <reference lib="webworker" />

/*
	here has a default timer to auto sync for tickets data to cloud
*/
let lastSyncedAt = new Date().getTime();


let clock: any;
let alarmList: Array<ITicketRecurrency>;

function compareDateInMinutes(date1: Date, date2: Date): number {
	const d1 = new Date(date1);
	const d2 = new Date(date2);
	d1.setSeconds(0);
	d2.setSeconds(0);
	d1.setMilliseconds(0);
	d2.setMilliseconds(0);
	return d1.getTime() - d2.getTime();
}

function clockCallback() {
	const now = new Date();
	if (alarmList.length > 0) {
		alarmList.forEach(a => {
			// start to check if some alarm need to alarm up
			if (compareDateInMinutes(now, new Date(a.at)) >= 0) {
				postMessage(a);
			}
		});
	}
	// for auto sync the tickets data to cloud
	if (now.getTime() - lastSyncedAt >=  appConfig.syncInterval) {
		postMessage('auto-sync');
		lastSyncedAt = now.getTime();
	}
}

function startClock() {
	clock = setInterval(()=> {
		clockCallback();
	}, 60000); // tirgged every 1 minute
}

function stopClock() {
	if (clock) {
		clearInterval(clock);
	}
}

function handleAlarmMessage(data: any) {
	if (data.command === 'start') {
		if (data.alarms) {
			alarmList = data.alarms;
		}
		startClock();
	} else if (data.command === 'stop') {
		stopClock();
	} else if (data.command === 'update') {
		stopClock();
		if (data.alarms) {
			alarmList = data.alarms;
		}
		startClock();
	}
}

addEventListener('message', ({ data }) => {
  handleAlarmMessage(data);
});