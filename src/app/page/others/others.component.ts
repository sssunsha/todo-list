import { Component, OnInit } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { mockTickets } from '../../mock/tickets.mock';
import { LISTCONFIG } from '../page.config';
import { Helper } from '../../utils'
import { AppService } from '../../app.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
	ticketList: Array<Ticket>;
	listConfig: Array<string> = LISTCONFIG;

  constructor(private service: AppService) { }

  ngOnInit() {
	this.ticketList = Helper.filterTicketsForPage(this.service.tickets, EPageState.others);
  }

}
