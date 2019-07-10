import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/ticket';
import * as TicketActions from '../../actions/ticket';
import { Ticket } from '../../app.model';
import { createAlert } from '../../utils';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string;
  constructor(private dialog: MatDialog) {}
//   constructor(private store: Store<Ticket>) { }

  ngOnInit() {
  }

  onSearch() {
    
  }

  onNewTicket() {
	  // TODO: dispatch to store for testing
	// this.store.dispatch(new TicketActions.TicketCreateAction());
	createAlert(this.dialog, {title: 'new ticket', message: 'new ticket message, new ticket message,\
		new ticket message, new ticket message, new ticket message, new ticket message'});
  }

}
