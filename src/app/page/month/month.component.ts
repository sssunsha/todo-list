import { Component, OnInit } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { mockTickets } from '../../mock/tickets.mock';
import { LISTCONFIG } from '../page.config';
import { filterTicketsForPage } from '../../utils'
import { AppService } from '../../app.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = LISTCONFIG;
  constructor(private service: AppService) { }

  ngOnInit() {
	this.ticketList = filterTicketsForPage(this.service.tickets, EPageState.this_month);
  }

}
