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
		this.ticketList = Object.assign([], this.service.getTicketsWithPagenation(this.pageEvent));
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
		this.ticketList = Object.assign([], this.ticketList.sort((t1, t2) => {
			if(this.generateColumnSortingData(t1, event) > this.generateColumnSortingData(t2, event)) {
				return isSortingASC ? 1 : -1;
			} else {
				return isSortingASC ? -1 : 1;
			}
		}));
	}

	private generateColumnSortingData(t: Ticket, event: string): string | number {
		switch(event) {
			case 'scheduled':
				return this.ticketTicketAlarmSorting(t.alarm);
			case 'inPages':
				return this.ticketInPagesSorting(t.inPages);
			case 'timeCosts':
				return this.ticketTimeCostSorting(t.timeCosts);
			default:
				return t[event];
		}
	}


	private ticketInPagesSorting(inPages: Array<EPageState>): string {
		return inPages.sort((p1, p2) => p1 <= p2 ? -1 : 1).toString();
	}

	private ticketTimeCostSorting(timeCosts: Array<ITicketTimeCost>): number {
		let timeCostTotal = 0;
		if (timeCosts && timeCosts.length > 0) {
			for (const tc of timeCosts) {
				timeCostTotal += tc.to - tc.from;
			}
		}
		return timeCostTotal;
	}

	private ticketTicketAlarmSorting(alarm: ITicketRecurrency): number {
		let at = 32503680000000; // 3000-01-01
		if (alarm && alarm.at) {
			at = alarm.at.getTime();
		}
		return at;
	}

}
