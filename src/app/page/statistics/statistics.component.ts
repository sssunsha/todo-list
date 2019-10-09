import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ticket, EPageState, ITicketTimeCost, ITicketRecurrency } from '../../app.model';
import { Helper } from '../../utils'
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { STATISTICSPAGELISTCONFIG } from '../page.config';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = STATISTICSPAGELISTCONFIG;
	ticketsSubscription: Subscription;
	pageEvent: PageEvent;
  constructor(private service: AppService) { }

  ngOnInit() {
	this.loadTickets();
	this.ticketsSubscription = this.service.ticketsSubject.subscribe(() => this.loadTickets());
  }

  ngOnDestroy() {
	this.ticketsSubscription.unsubscribe();
}

	loadTickets(sortingItem: string = '') {
		this.ticketList = Object.assign([], this.service.getTicketsWithPagenation(this.pageEvent, sortingItem));
	}

	handlePageChanged(event: PageEvent) {
		this.pageEvent = event;
		this.loadTickets();
	}

	handleColumnSorting(event: string): void {
		this.loadTickets(event);
	}
}
