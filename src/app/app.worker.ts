/// <reference lib="webworker" />

let clock: any;

function clockCallback() {
	postMessage('1 min past ...');
}

function startClock() {
	clock = setInterval(()=> {
		clockCallback();
	}, 60000); // tirgged every 1 minute
	postMessage('Alarm worker stated ...');
}

function stopClock() {
	if (clock) {
		clearInterval(clock);
	}
	postMessage('Alarm worker stopped ...');
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