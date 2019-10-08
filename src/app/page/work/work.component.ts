import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { DEFAULTPAGELISTCONFIG } from '../page.config';
import { Helper } from '../../utils'
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, OnDestroy {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = DEFAULTPAGELISTCONFIG;
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
	this.ticketList = Helper.filterTicketsForPage(this.service.getTickets(), EPageState.work);
}


}
