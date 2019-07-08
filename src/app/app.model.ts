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
}

export enum EPriority {
	high = 'high',
	medium = 'medium',
	low = 'low',
	null = 'null',
}

export enum ETicketType {
	task = 'task',
	note = 'note',
	reminder = 'reminder',
}

export enum ETicketEffort {
	half_hour = 'half_hour',
	one_hour = 'one_hour',
	half_day = 'half_day',
	one_day = 'one_day',
	half_week = 'half_week',
	one_week = 'one_week',
	half_month = 'half_month',
	one_month = 'one_month',
}


export class Ticket {
	id?: string;
	summary: string;
	description: string;
	priority: EPriority;
	createdAt: string;
	modifiedAt: string;
	ticketType: ETicketType;
	effort?: ETicketEffort;
	inPages: Array<EPageState>;
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

export const defaultTicket:Ticket = {
	id: '',
	summary: '',
	description: '',
	priority: EPriority.high,
	createdAt: '',
	modifiedAt: '',
	ticketType: ETicketType.task,
	inPages: [],
}