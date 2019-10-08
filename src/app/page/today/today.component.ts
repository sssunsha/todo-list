import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { DEFAULTPAGELISTCONFIG } from '../page.config';
import { Helper } from '../../utils'
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = DEFAULTPAGELISTCONFIG;
	ticketsSubscription: Subscription;

  constructor(private service: AppService) { }

  ngOnInit() {
	  this.loadTickets();
	  this.ticketsSubscription = this.service.ticketsSubject.subscribe(res => {
		this.loadTickets();
	});
  }

  ngOnDestroy() {
	  this.ticketsSubscription.unsubscribe();
  }

  loadTickets(): void {
	this.ticketList = Helper.filterTicketsForPage(this.service.getTickets(), EPageState.today);
  }


}
