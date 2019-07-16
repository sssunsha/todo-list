import { Component, OnInit } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { mockTickets } from '../../mock/tickets.mock';
import { LISTCONFIG } from '../page.config';
import { Helper } from '../../utils'
import { AppService } from '../../app.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = LISTCONFIG;

  constructor(private service: AppService) { }

  ngOnInit() {
	  this.ticketList = Helper.filterTicketsForPage(this.service.tickets, EPageState.today);
  }

}
