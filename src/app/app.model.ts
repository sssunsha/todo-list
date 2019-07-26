export enum EPageState {
	inbox = 'inbox',
	today = 'today',
	this_week = 'week',
	this_month = 'month',
	future = 'future',
	work = 'work',
	life = 'life',
	others = 'others',
	statistics = 'statistics',
	// other pages
	settings = 'settings',
	calendar = 'calendar'
}

export const PAGELIST = [
	EPageState.inbox,
	EPageState.today,
	EPageState.this_week,
	EPageState.this_month,
	EPageState.future,
	EPageState.work,
	EPageState.life,
	EPageState.others,
]

export interface ISelectConfig {
	value: any;
	label: string;
	icon? : string;
}

export interface IAlertConfig {
	title: string;
	message?: string;
}

export enum EPriority {
	high = 'high',
	medium = 'medium',
	low = 'low',
	null = 'null',
}

export const TICKETPRIORITYSELECTCONFIG: Array<ISelectConfig> = [
	{label: 'High', value: EPriority.high},
	{label:'Medium', value: EPriority.medium},
	{label: 'Low', value: EPriority.low},
	{label:'None', value: EPriority.null},
];

export enum ETicketType {
	task = 'task',
	note = 'note',
	reminder = 'reminder',
	event = 'event',
}

export const TICKETTYPESELECTCONFIG: Array<ISelectConfig> = [
	{label: 'Task', value: ETicketType.task, icon: 'work'},
	{label: 'Note', value: ETicketType.note, icon: 'comment'},
	{label: 'Reminder', value: ETicketType.reminder, icon: 'access_alarms'},
	{label: 'Event', value: ETicketType.event, icon: 'event'},
];

export enum ETicketEffort {
	half_hour = 0,
	one_hour = 1,
	half_day = 2,
	one_day = 3,
	half_week = 4,
	one_week = 5,
	half_month = 6,
	one_month = 7,
	three_month = 8,
	half_year = 9,
}

export const TICKETEFFORTSELECTCONFIG: Array<ISelectConfig> = [
	{label: '0.5h', value: ETicketEffort.half_hour},
	{label: '1h', value: ETicketEffort.one_hour},
	{label: '0.5d', value: ETicketEffort.half_day},
	{label: '1d', value: ETicketEffort.one_day},
	{label: '0.5 week', value: ETicketEffort.half_week},
	{label: '1 week', value: ETicketEffort.one_week},
	{label: '0.5 month', value: ETicketEffort.half_month},
	{label: '1 month', value: ETicketEffort.one_month},
	{label: '3 months', value: ETicketEffort.three_month},
	{label: '0.5 year', value: ETicketEffort.half_year},
];

export enum ETicktProgress {
	not_start = 0,
	just_begin = 1,
	half_done = 2,
	nearly_done = 3,
	finished = 4,
}

export const TICKETPROGRESSSELECTCONFIG: Array<ISelectConfig> = [
	{label: 'Not start', value: ETicktProgress.not_start},
	{label: 'Just begin', value: ETicktProgress.just_begin},
	{label: 'Half done', value: ETicktProgress.half_done},
	{label: 'Nearly done', value: ETicktProgress.nearly_done},
	{label: 'Finished', value: ETicktProgress.finished},
];

// use this interface to record the time cost for every ticket
export interface ITicketTimeCost {
	from: number; // start timestamp
	to: number; // end timestamp
}

export class Ticket {
	id?: string;
	summary: string;
	description: string;
	priority?: EPriority;
	createdAt: string;
	modifiedAt: string;
	ticketType: ETicketType;
	effort?: ETicketEffort;
	progress?: ETicktProgress;
	inPages?: Array<EPageState>;
	records?: Array<string>;
	timeCosts?: Array<ITicketTimeCost>; // for every tickets, can be finished with some group of time
	constructor(data: Partial<Ticket>) {
		this.id = data.id;
		this.summary = data.summary;
		this.description = data.description;
		this.priority = data.priority;
		this.createdAt = data.createdAt;
		this.modifiedAt = data.modifiedAt;
		this.ticketType = data.ticketType;
		this.effort = data.effort;
		this.inPages = data.inPages;
		this.records = data.records;
		this.timeCosts = data.timeCosts;
	}
}

export class Task extends Ticket {
	constructor(data: Partial<Task>) {
		super(data);
		this.ticketType = ETicketType.task;
	}
}

export class Note extends Ticket {
	constructor(data: Partial<Note>) {
		super(data);
		this.ticketType = ETicketType.note;
	}
}

export class Reminder extends Ticket {
	constructor(data: Partial<Reminder>) {
		super(data);
		this.ticketType = ETicketType.reminder;
	}
}

export class Event extends Ticket {
	constructor(data: Partial<Event>) {
		super(data);
		this.ticketType = ETicketType.event;
	}
}

export const defaultTicket:Ticket = {
	id: '',
	summary: '',
	description: '',
	priority: EPriority.high,
	createdAt: '',
	modifiedAt: '',
	ticketType: ETicketType.task,
	effort: ETicketEffort.half_hour,
	inPages: [],
}

export interface TicketFile {
	version: number;
	modifiedAt: string;
	value: Array<Ticket>;
}

export interface IAlarm {
	id?: string;
	at: number; // timestamp
	ticketID?: string;
	message?: string;
}