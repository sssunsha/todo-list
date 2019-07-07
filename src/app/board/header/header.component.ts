import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/ticket';
import * as TicketActions from '../../actions/ticket';
import { Ticket } from '../../app.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string;
  constructor(private store: Store<Ticket>) { }

  ngOnInit() {
  }

  onSearch() {
    
  }

  onNewTicket() {
    this.store.dispatch(new TicketActions.TicketCreateAction());
  }

}
