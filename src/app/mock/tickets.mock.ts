import { Ticket, EPriority, ETicketType, EPageState } from '../app.model';
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
			inPages: [EPageState.inbox, EPageState.future],
		},
		{
			id: generateMd5Hash('3'),
			summary: 'ticket 3',
			description: 'ticket 3 description',
			priority: EPriority.low,
			createdAt: generateCreatedAt(),
			modifiedAt: null,
			ticketType: ETicketType.reminder,
			inPages: [EPageState.inbox, EPageState.today],
		}
		
	];