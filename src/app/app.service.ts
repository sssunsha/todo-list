import { Injectable } from '@angular/core';
import { EPageState, Ticket } from './app.model';
import { mockTickets } from './mock/tickets.mock';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentPage: EPageState;
  
  // store tickets data here
  tickets: Array<Ticket>;

  constructor() {
	  this.currentPage = EPageState.today;
	  this.tickets = mockTickets;
	  this.initClient();
   }

   initClient(): void {
	}
}
