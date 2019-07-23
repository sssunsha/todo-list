import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { LISTCONFIG } from '../page.config';
import { Helper } from '../../utils'
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit, OnDestroy {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = LISTCONFIG;
	ticketsSubscription: Subscription;

  constructor(private service: AppService) { }

  ngOnInit() {
	this.loadTickets();
	this.ticketsSubscription = this.service.ticketsSubject.subscribe(() => this.loadTickets());
  }

  ngOnDestroy() {
	  this.ticketsSubscription.unsubscribe();
  }

  loadTickets() {
	this.ticketList = Helper.filterTicketsForPage(this.service.getTickets(), EPageState.this_month);
  }

}
