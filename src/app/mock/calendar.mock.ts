import { Schedule, EScheduleCategory, ETicketType } from '../app.model';
import { Helper } from '../utils';
export const mockSchedules: Array<Schedule> = [
	{
		id: '1',
		calendarId	: '1',
		title: 'mock scheduler 1',
		start: new Date(),
		end: Helper.generateDateLate(3600000),
		ticketType:ETicketType.task,
	},
	{
		id: '2',
		calendarId	: '2',
		title: 'mock scheduler 2',
		start: Helper.generateDateLate(3600000*2),
		end: Helper.generateDateLate(3600000*3),
		ticketType: ETicketType.event,
	},
	{
		id: '3',
		calendarId	: '3',
		title: 'mock scheduler 3',
		start: Helper.generateDateLate(3600000*4),
		end: Helper.generateDateLate(3600000*5),
		ticketType: ETicketType.reminder,
	},
	{
		id: '4',
		calendarId	: '4',
		title: 'mock scheduler 4',
		start: Helper.generateDateLate(3600000*6),
		end: Helper.generateDateLate(3600000*6.5),
		ticketType: ETicketType.note,
	}
];