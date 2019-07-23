import { Component, OnInit, Input } from '@angular/core';
import { Ticket, EPriority, EPageState, ETicketType } from '../../app.model';
import { AppService } from '../../app.service';
import { Helper } from '../../utils';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input()
	ticket: Ticket;
  constructor(private service: AppService) { }

  ngOnInit() {
  }

  handlePriorityChanged(priority: EPriority): void {
	  this.ticket.priority = priority;
	  this.service.notifyTicketsChanged();
  }

  handleMovetoChanged(page: EPageState): void {
	  this.ticket.inPages = [page];
	  this.service.notifyTicketsChanged();
  }

  handleTicketTypeChanged(type: ETicketType): void {
	  this.ticket.ticketType = type;
	  this.service.notifyTicketsChanged();
  }
}
