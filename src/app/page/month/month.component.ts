import { Component, OnInit } from '@angular/core';
import { Ticket, EPageState } from '../../app.model';
import { LISTCONFIG } from '../page.config';
import { Helper } from '../../utils'
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
	this.ticketList = Helper.filterTicketsForPage(this.service.getTickets(), EPageState.this_month);
  }

}
