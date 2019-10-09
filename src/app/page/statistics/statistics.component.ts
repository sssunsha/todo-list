import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
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
	sortingColumnItems: Array<string> = [];
  constructor(private service: AppService) { }

  ngOnInit() {
	this.loadTickets();
	this.ticketsSubscription = this.service.ticketsSubject.subscribe(() => this.loadTickets());
  }

  ngOnDestroy() {
	this.ticketsSubscription.unsubscribe();
}

	loadTickets() {
		this.ticketList = this.service.getTicketsWithPagenation(this.pageEvent);
	}

	handlePageChanged(event: PageEvent) {
		this.pageEvent = event;
		this.loadTickets();
	}

	handleColumnSorting(event: string): void {
		let isSortingASC = true;
		if(this.sortingColumnItems.includes(event)) {
			isSortingASC = false;
			this.sortingColumnItems.splice(this.sortingColumnItems.indexOf(event), 1);
		} else {
			this.sortingColumnItems.push(event);
			isSortingASC = true;
		}
		this.ticketList = this.ticketList.sort((t1, t2) => {
			if(t1[event] > t2[event]) {
				return isSortingASC ? 1 : -1;
			} else {
				return isSortingASC ? -1 : 1;
			}
		})
	}

}
