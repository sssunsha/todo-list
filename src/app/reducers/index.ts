import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromTicket from './ticket';
import * as fromPage from './page';
import { Ticket } from '../app.model';

const reducers = {
	ticket: fromTicket.reducer,
	page: fromPage.reducer,
}

export interface State {
	ticket: Ticket,
	page: Ticket,
}

const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return productionReducer(state, action);
  }