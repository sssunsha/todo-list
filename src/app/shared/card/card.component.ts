import { Component, OnInit, Input } from '@angular/core';
import { Ticket, EPriority, EPageState, ETicketType, ETicketRecurrencyType } from '../../app.model';
import { AppService } from '../../app.service';
import { Helper } from '../../utils';
import { RecurrencyDialogComponent } from '../recurrency-dialog/recurrency-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlarmService } from '../../alarm.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input()
	ticket: Ticket;
  constructor(private service: AppService,
			private alarmService: AlarmService,
			private dialog: MatDialog
	) { }

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

  handleTickeAlarmClear(): void {
	  if (this.ticket.alarm && this.ticket.alarm.id) {
		this.alarmService.removeAlarm(this.ticket.alarm.id);
		this.ticket.alarm = null;
		this.service.updateIickets(this.ticket);
		this.service.notifyTicketsChanged();
	  }
  }

  handleTicketAlarmSet(type: ETicketRecurrencyType): void {
	  const dialogRef = this.dialog.open(RecurrencyDialogComponent, {
		  maxWidth: '1000px',
		  data: {
			  type: type,
			  ticketAlarm: Object.assign({}, this.ticket.alarm)
		  }
	  })

	  dialogRef.afterClosed().subscribe(alarm => {
		  if (alarm !== null) {
			  this.ticket.ticketType = ETicketType.reminder;
			  const isCreatedAlarm = this.ticket.alarm ? false : true;
			  this.ticket.alarm = alarm;
			  this.service.updateIickets(this.ticket);
			  this.service.notifyTicketsChanged();
			  if (isCreatedAlarm) {
				this.alarmService.createAlarm(this.ticket);
			  } else {
				  this.alarmService.changeAlarm(this.ticket);
			  }
		  }
	  })
  }
}
