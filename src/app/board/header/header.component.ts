import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/ticket-reducer';
import * as TicketActions from '../../actions/ticket-action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  onSearch() {
    
  }

  onNewTicket() {
    this.store.dispatch(new TicketActions.TicketCreateAction());
  }

}
