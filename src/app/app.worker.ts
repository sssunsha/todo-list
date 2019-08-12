import { AlarmService } from './alarm.service';
/// <reference lib="webworker" />

let clock: any;

function clockCallback() {
	if (AlarmService.alarmConfigList.length > 0) {
		const now = new Date();
		AlarmService.alarmConfigList.forEach(a => {
			// start to check if some alarm need to alarm up
		});
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
	if (data === 'start') {
		startClock();
	} else if (data === 'stop') {
		stopClock();
	}
}

addEventListener('message', ({ data }) => {
  handleAlarmMessage(data);
});