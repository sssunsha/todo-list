import { Component, OnInit } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { mockTickets } from '../../mock/tickets.mock';
import { LISTCONFIG } from '../page.config';
import { filterTicketsForPage } from '../../utils'
import { AppService } from '../../app.service';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = LISTCONFIG;
  constructor(private service: AppService) { }

  ngOnInit() {
	this.ticketList = filterTicketsForPage(this.service.tickets, EPageState.work);
  }

}
