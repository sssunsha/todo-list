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
	intermediate = 'intermediate',
	low = 'low',
	null = 'null',
}

export const TICKETPRIORITYSELECTCONFIG: Array<ISelectConfig> = [
	{label: 'High', value: EPriority.high},
	{label:'Intermediate', value: EPriority.intermediate},
	{label: 'Low', value: EPriority.low},
	{label:'Null', value: EPriority.null},
];

export enum ETicketType {
	task = 'task', // task in plan should be done
	note = 'note', // others, maybe just an idea or others, can be split to tasks
	reminder = 'reminder', // task should be done in certain time
	event = 'event', // meeting, or some other things which occured but not in plan
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
	isWorkingOn?: boolean = false;
	alarm?: ITicketRecurrency;
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
		this.alarm = data.alarm;
		this.isWorkingOn = data.isWorkingOn;
	}
}

export enum ETicketRecurrencyType {
	once = 'once',
	day =  'day',
	week = 'week',
	monthDay = 'monthDay',
	monthDate = 'monthDate',
}

/*
	if type =  once, only need set at property
	if type != once, need interval, legs, and at is optional
*/
export interface ITicketRecurrency {
	id?: string;
	type: ETicketRecurrencyType;
	at?: Date; // the alarm time in UTC +8
	interval?: number;
	legs?: number; // -1: unlimited, other number will be the time it will occurred, the data should bigger than -2
	dayOfWeek?: EDayOfWeek; // for weekly and month day
	weekOfMonth?: EWeekOfMonth; // for month day
	index?: number; // for month date
	message?: string;
}

export enum EDayOfWeek {
	monday = 'monday',
	tuesday = 'tuesday',
	wednesday = 'wednesday',
	thursday = 'thursday',
	friday = 'friday',
	saturday = 'saturday',
	sunday = 'sunday',
}

export const DAYOFWEEK = [
	{label: 'monday', value: EDayOfWeek.monday},
	{label: 'tuesday', value: EDayOfWeek.tuesday},
	{label: 'wednesday', value: EDayOfWeek.wednesday},
	{label: 'thursday', value: EDayOfWeek.thursday},
	{label: 'friday', value: EDayOfWeek.friday},
	{label: 'saturday', value: EDayOfWeek.saturday},
	{label: 'sunday', value: EDayOfWeek.sunday}
];

export enum EWeekOfMonth {
	first = 'first',
	second = 'second',
	third = 'third',
	fourth = 'fourth',
	last = 'last',
}

export const WEEKOFMONTH = [
	{label: 'first', value: EWeekOfMonth.first},
	{label: 'second', value: EWeekOfMonth.second},
	{label: 'third', value: EWeekOfMonth.third},
	{label: 'fourth', value: EWeekOfMonth.fourth},
	{label: 'last', value: EWeekOfMonth.last},
];

export interface ITicketRecurrencyDialogConfig {
	ticketAlarm: ITicketRecurrency,
	type: ETicketRecurrencyType
}

export const TICKEALARMTYPESELECTCONFIG: Array<ISelectConfig> = [
	{label: 'Once', value: ETicketRecurrencyType.once},
	{label: 'Daily', value: ETicketRecurrencyType.day},
	{label: 'Weekly', value: ETicketRecurrencyType.week},
	{label: 'Monthly Date', value: ETicketRecurrencyType.monthDate},
	{label: 'Monthly Day', value: ETicketRecurrencyType.monthDay},
];


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
	isWorkingOn: false,
	timeCosts: [],
}

export interface TicketFile {
	version: number;
	modifiedAt: string;
	value: Array<Ticket>;
}


// for calendar part

export enum ECalendarType {
	day = 'day',
	week = 'week',
	month = 'month'
}

export interface Schedule {
	id: string
	calendarId: string
	title: string
	start: string | Date
	end: string | Date
	isAllDay?: boolean
	category: "milestone" | "task" | "allday" | "time";
	dueDateClass?: string
	location?: string
	attendees?: Array<string>
	recurrenceRule?: any
	isPending?: boolean
	isFocused?: boolean
	isVisible?: boolean
	isReadOnly?: boolean
	isPrivate?: boolean
	color?: string
	bgColor?: string
	dragBgColor?: string
	borderColor?: string
	customStyle?: string
	raw?: any
  }
  