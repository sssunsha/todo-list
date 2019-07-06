import { Action } from '@ngrx/store';
import { Ticket } from '../app.model';

export enum ETicketActionType {
    create = 'ticket_create',
    created = 'ticket_created',
    search = 'ticket_search',
    searched = 'ticket_searched',
    edit = 'ticket_edit',
    edited = 'ticket_edited',
    save = 'ticket_save',
    saved = 'ticket_saved',
}

export class TicketCreateAction implements Action {
    readonly type = ETicketActionType.create;
    constructor(public payload: Ticket) { }
}

export class TicketCreatedAction implements Action {
    readonly type = ETicketActionType.created;
    constructor(public payload: Ticket) { }
}

export class TicketSearchAction implements Action {
    readonly type = ETicketActionType.search;
    constructor(public payload: string) { }
}

export class TicketSearchedAction implements Action {
    readonly type = ETicketActionType.searched;
    constructor(public payload: Ticket) { }
}

export class TicketEditAction implements Action {
    readonly type = ETicketActionType.edit;
    constructor(public payload: Ticket) { }
}

export class TicketEditedAction implements Action {
    readonly type = ETicketActionType.edited;
    constructor(public payload: Ticket) { }
}

export class TicketSaveAction implements Action {
    readonly type = ETicketActionType.save;
    constructor(public payload: Ticket) { }
}

export class TicketSavedAction implements Action {
    readonly type = ETicketActionType.saved;
    constructor(public payload: Ticket) { }
}

export type Actions
    = TicketCreateAction
    | TicketCreatedAction
    | TicketEditAction
    | TicketEditedAction
    | TicketSaveAction
    | TicketSavedAction
    | TicketSearchAction
    | TicketSearchedAction


