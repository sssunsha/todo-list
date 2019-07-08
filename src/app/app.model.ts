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

export enum ETicktProgress {
	not_start = 0,
	just_begin = 1,
	half_done = 2,
	nearly_done = 3,
	finished = 4,
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
	progress?: ETicktProgress;
	inPages: Array<EPageState>;
	records?: Array<string>;
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