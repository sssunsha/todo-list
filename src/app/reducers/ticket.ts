import { Ticket, EPageState, defaultTicket } from "../app.model";
import * as TicketActions from '../actions/ticket';
import {
    generateCreatedAt,
    generateMd5Hash,
} from '../utils';



export function reducer(ticket = defaultTicket, action: TicketActions.Actions ): Ticket {
    switch(action.type) {
        case TicketActions.ETicketActionType.create:
        return handleTicketCreateAction(ticket, action);
    }
}

function handleTicketCreateAction(ticket: Ticket, action: TicketActions.Actions): Ticket {
    let newTicket = Object.assign({}, ticket);
        newTicket.createdAt = generateCreatedAt();
        newTicket.id = generateMd5Hash(newTicket.createdAt);
        return newTicket;
}