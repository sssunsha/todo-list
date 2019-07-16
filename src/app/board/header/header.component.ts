import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/ticket';
import * as TicketActions from '../../actions/ticket';
import { Ticket, EPageState } from '../../app.model';
import { Helper } from '../../utils';
import {MatDialog} from '@angular/material/dialog';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string;
  constructor(private dialog: MatDialog,
	private service: AppService) {}
//   constructor(private store: Store<Ticket>) { }

  ngOnInit() {
  }

  onSearch() {
    
  }

  onNewTicket() {
	  // TODO: dispatch to store for testing
	// this.store.dispatch(new TicketActions.TicketCreateAction());
	Helper.createAlert(this.dialog, {title: 'new ticket', message: 'new ticket message, new ticket message,\
		new ticket message, new ticket message, new ticket message, new ticket message'});
  }

  getInboxTicketSize(): number {
	return this.service.tickets.filter(t => t.inPages.includes(EPageState.inbox)).length
  }

  getTodayTicketSize(): number {
	return this.service.tickets.filter(t => t.inPages.includes(EPageState.today)).length
  }

  goto(pageState: EPageState): void {
	  this.service.currentPage = pageState;
  }

}