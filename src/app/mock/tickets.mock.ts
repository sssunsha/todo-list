import { Ticket, EPriority, ETicketType, EPageState, ETicketEffort, ETicktProgress } from '../app.model';
import { generateMd5Hash, generateCreatedAt } from '../utils';


export const mockTickets: Array<Ticket> = 
	[
		{
			id: generateMd5Hash('1'),
			summary: 'ticket 1',
			description: 'ticket 1 description',
			priority: EPriority.high,
			createdAt: generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.task,
			effort: ETicketEffort.half_week,
			progress: ETicktProgress.half_done,
			inPages: [EPageState.inbox],
		},
		{
			id: generateMd5Hash('2'),
			summary: 'ticket 2',
			description: 'ticket 2 description',
			priority: EPriority.medium,
			createdAt: generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.note,
			// effort: ETicketEffort.half_hour,
			// progress: ETicktProgress.not_start,
			inPages: [EPageState.inbox, EPageState.future],
		},
		{
			id: generateMd5Hash('3'),
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
			createdAt: generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.reminder,
			effort: ETicketEffort.one_month,
			progress: ETicktProgress.nearly_done,
			inPages: [EPageState.inbox, EPageState.today],
		}
		
	];