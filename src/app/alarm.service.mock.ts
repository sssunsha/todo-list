import { IAlarmConfig } from "./alarm.service";

export const mockAlarmConfigList: Array<IAlarmConfig> = [
	{
		cancelFunction: null,
		alarmObject: {
			id: '1',
			at: new Date().getTime() + 666,
			message: 'mock alarm 1',
		}
	},
	{
		cancelFunction: null,
		alarmObject: {
			id: '2',
			at: new Date().getTime() + 777777,
			message: 'mock alarm 2',
		}
	},
	{
		cancelFunction: null,
		alarmObject: {
			id: '3',
			at: new Date().getTime() + 8888888,
			message: 'mock alarm 3',
		}
	},
	{
		cancelFunction: null,
		alarmObject: {
			id: '4',
			at: new Date().getTime() + 99999999,
			message: 'mock alarm 4',
		}
	}
];