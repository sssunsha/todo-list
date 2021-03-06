import { Ticket, EPageState, defaultTicket } from "../app.model";
import * as PageActions from '../actions/page';
import { Helper } from '../utils';

export function reducer(ticket = defaultTicket, action: PageActions.Actions ): Ticket {
    switch(action.type) {
        case PageActions.EPageActionType.inbox_in:
        Helper.updateArrayData(ticket.inPages, EPageState.inbox, true);
        return ticket;
        case PageActions.EPageActionType.inbox_out:
        Helper.updateArrayData(ticket.inPages, EPageState.inbox, false);
        return ticket;
        case PageActions.EPageActionType.today_in:
        Helper.updateArrayData(ticket.inPages, EPageState.today, true);
        return ticket;
        case PageActions.EPageActionType.today_out:
        Helper.updateArrayData(ticket.inPages, EPageState.today, false);
        return ticket;
        case PageActions.EPageActionType.this_week_in:
        Helper.updateArrayData(ticket.inPages, EPageState.this_week, true);
        return ticket;
        case PageActions.EPageActionType.this_week_out:
        Helper.updateArrayData(ticket.inPages, EPageState.this_week, false);
        return ticket;
        case PageActions.EPageActionType.this_month_in:
        Helper.updateArrayData(ticket.inPages, EPageState.this_month, true);
        return ticket;
        case PageActions.EPageActionType.this_month_out:
        Helper.updateArrayData(ticket.inPages, EPageState.this_month, false);
        return ticket;
        case PageActions.EPageActionType.future_in:
        Helper.updateArrayData(ticket.inPages, EPageState.future, true);
        return ticket;
        case PageActions.EPageActionType.future_out:
        Helper.updateArrayData(ticket.inPages, EPageState.future, false);
        return ticket;
        case PageActions.EPageActionType.work_in:
        Helper.updateArrayData(ticket.inPages, EPageState.work, true);
        return ticket;
        case PageActions.EPageActionType.work_out:
        Helper.updateArrayData(ticket.inPages, EPageState.work, false);
        return ticket;
        case PageActions.EPageActionType.life_in:
        Helper.updateArrayData(ticket.inPages, EPageState.life, true);
        return ticket;
        case PageActions.EPageActionType.life_out:
        Helper.updateArrayData(ticket.inPages, EPageState.life, false);
        return ticket;
        case PageActions.EPageActionType.others_in:
        Helper.updateArrayData(ticket.inPages, EPageState.others, true);
        return ticket;
        case PageActions.EPageActionType.others_out:
        Helper.updateArrayData(ticket.inPages, EPageState.others, false);
        return ticket;
        case PageActions.EPageActionType.statistics_in:
        Helper.updateArrayData(ticket.inPages, EPageState.statistics, true);
        return ticket;
        case PageActions.EPageActionType.statistics_out:
        Helper.updateArrayData(ticket.inPages, EPageState.statistics, false);
        return ticket;
    }
}