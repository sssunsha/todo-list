import { Ticket, EPageState, defaultTicket } from "../app.model";
import * as TicketActions from '../actions/ticket';
import { Helper } from '../utils';



export function reducer(ticket = defaultTicket, action: TicketActions.Actions ): Ticket {
    switch(action.type) {
        case TicketActions.ETicketActionType.create:
        return handleTicketCreateAction(ticket, action);
    }
}

function handleTicketCreateAction(ticket: Ticket, action: TicketActions.Actions): Ticket {
    let newTicket = Object.assign({}, ticket);
        newTicket.createdAt = Helper.generateCreatedAt();
        newTicket.id = Helper.generateMd5Hash(newTicket.createdAt);
        return newTicket;
}