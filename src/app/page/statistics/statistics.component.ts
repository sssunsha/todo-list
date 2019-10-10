import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ticket, EPageState, ITicketTimeCost, ITicketRecurrency, TICKETCATEGORYSELECTCONFIG, TICKETPRIORITYSELECTCONFIG, TICKETTYPESELECTCONFIG, PAGELIST, ITicketFilter, ITicketsWithPagenationResponse, ISelectConfig, TICKETINPAGESELECTCONFIG } from '../../app.model';
import { Helper } from '../../utils'
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { STATISTICSPAGELISTCONFIG } from '../page.config';
import { PageEvent } from '@angular/material';

const DEFAULTSELECTOPTION: ISelectConfig = {label: 'all', value: 'ALL'};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
	ticketList: Array<Ticket>;
	ticketListLength: number = 0;
	listConfig: Array<string> = STATISTICSPAGELISTCONFIG;
	ticketsSubscription: Subscription;
	pageEvent: PageEvent;

	_TICKETCATEGORYSELECTCONFIG = TICKETCATEGORYSELECTCONFIG;
	_TICKETPRIORITYSELECTCONFIG = TICKETPRIORITYSELECTCONFIG;
	_TICKETTYPESELECTCONFIG = TICKETTYPESELECTCONFIG;
	_TICKETINPAGESELECTCONFIG = TICKETINPAGESELECTCONFIG;


	ticketFilter: ITicketFilter = {};

  constructor(private service: AppService) { }

  ngOnInit() {
	// add 'all' option for select config
	this._TICKETCATEGORYSELECTCONFIG.push(DEFAULTSELECTOPTION);
	this._TICKETPRIORITYSELECTCONFIG.push(DEFAULTSELECTOPTION);
	this._TICKETTYPESELECTCONFIG.push(DEFAULTSELECTOPTION);
	this._TICKETINPAGESELECTCONFIG.push(DEFAULTSELECTOPTION);

	this.loadTickets();
	this.ticketsSubscription = this.service.ticketsSubject.subscribe(() => this.loadTickets());
  }

  ngOnDestroy() {
	this.ticketsSubscription.unsubscribe();
}

	loadTickets(sortingItem: string = '') {
		const ticketListResponse: ITicketsWithPagenationResponse = this.service.getTicketsWithPagenation(this.pageEvent,  this.ticketFilter, sortingItem);
		this.ticketList = Object.assign([], ticketListResponse.tickets);
		this.ticketListLength = ticketListResponse.length;
	}

	handlePageChanged(event: PageEvent) {
		this.pageEvent = event;
		this.loadTickets();
	}

	handleColumnSorting(event: string): void {
		this.loadTickets(event);
	}

	handelFilterChanged(): void {
		if (this.ticketFilter && this.ticketFilter.category === 'ALL') {
			delete this.ticketFilter.category;
		}
		if (this.ticketFilter && this.ticketFilter.priority === 'ALL') {
			delete this.ticketFilter.priority;
		}
		if (this.ticketFilter && this.ticketFilter.ticketType === 'ALL') {
			delete this.ticketFilter.ticketType;
		}
		if (this.ticketFilter && this.ticketFilter.inPage === 'ALL') {
			delete this.ticketFilter.inPage;
		}
		this.loadTickets();
	}
}
