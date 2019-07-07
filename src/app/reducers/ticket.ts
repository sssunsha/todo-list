import { Ticket, EPageState } from "../app.model";
import * as TicketActions from '../actions/ticket';
export interface State {
    ticket: Ticket;
    state: EPageState;
}

export const initTicketState: State = {
    ticket: null,
    state: null,
};


export function reducer(state = initTicketState, action: TicketActions.Actions ): State {
    switch(action.type) {
        case TicketActions.ETicketActionType.create:
        return Object.assign({}, initTicketState);
    }
}