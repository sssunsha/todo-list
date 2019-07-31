import { Ticket, EPriority, ETicketType, EPageState, ETicketEffort, ETicktProgress } from '../app.model';
import { Helper } from '../utils';


export const mockTickets: Array<Ticket> = 
	[
		{
			id: Helper.generateMd5Hash('1'),
			summary: 'ticket 1',
			description: 'ticket 1 description',
			priority: EPriority.high,
			createdAt: Helper.generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.task,
			effort: ETicketEffort.half_week,
			progress: ETicktProgress.half_done,
			inPages: [EPageState.inbox],
		},
		{
			id: Helper.generateMd5Hash('2'),
			summary: 'ticket 2',
			description: 'ticket 2 description',
			priority: EPriority.intermediate,
			createdAt: Helper.generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.note,
			// effort: ETicketEffort.half_hour,
			progress: ETicktProgress.finished,
			inPages: [EPageState.inbox, EPageState.future],
			records: ['this the record for the first day I found', 'this the record for the second day I found', 'this the record for the third day I found']
		},
		{
			id: Helper.generateMd5Hash('3'),
			summary: 'ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey. ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey.',
			description: 'ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey. ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey.',
			priority: EPriority.low,
			createdAt: Helper.generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.reminder,
			effort: ETicketEffort.one_month,
			progress: ETicktProgress.nearly_done,
			inPages: [EPageState.inbox, EPageState.today],
			records: ['records 1 ..', 'records 2 ...', 'records 3 ...'],
		},
		{
			id: Helper.generateMd5Hash('4'),
			summary: 'ticket 4 ... ... ... ...',
			description: 'ticket 4 description ... ... ... ...',
			priority: EPriority.intermediate,
			createdAt: Helper.generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.note,
			// effort: ETicketEffort.half_hour,
			progress: ETicktProgress.finished,
			inPages: [EPageState.inbox, EPageState.future, EPageState.this_month, EPageState.this_week],
			records: ['this the record for the first day I found', 'this the record for the second day I found', 'this the record for the third day I found']
		},
		{
			id: Helper.generateMd5Hash('5'),
			summary: 'ticket 5 ... ... ... ... ...',
			description: 'ticket 5 description ... ... ... ...',
			priority: EPriority.intermediate,
			createdAt: Helper.generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.note,
			// effort: ETicketEffort.half_hour,
			progress: ETicktProgress.half_done,
			inPages: [EPageState.inbox, EPageState.life],
			records: ['this the record for the first day I found', 'this the record for the second day I found', 'this the record for the third day I found']
		},
		{
			id: Helper.generateMd5Hash('6'),
			summary: 'ticket 6 ... ... ... ... ...',
			description: 'ticket 6 description ... ... ... ...',
			priority: EPriority.intermediate,
			createdAt: Helper.generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.note,
			// effort: ETicketEffort.half_hour,
			progress: ETicktProgress.half_done,
			inPages: [EPageState.inbox, EPageState.work, EPageState.others],
			records: ['this the record for the first day I found', 'this the record for the second day I found', 'this the record for the third day I found']
		},
		{
			id: Helper.generateMd5Hash('7'),
			summary: 'ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey. ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey.',
			description: 'ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey. ticket 3, this is a test ticket with a very long long text,  I want to use this \
			long long text to test the table support for long long text, so let me have a look how is\
			the performance, hey hey.',
			priority: EPriority.low,
			createdAt: Helper.generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.reminder,
			effort: ETicketEffort.one_month,
			progress: ETicktProgress.nearly_done,
			inPages: [EPageState.inbox, EPageState.today],
			records: ['records 1 ..', 'records 2 ...', 'records 3 ...'],
		},
		
	];