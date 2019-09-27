import { Component, OnInit, Input } from '@angular/core';
import { Ticket, EPriority, EPageState, ETicketType, ETicketRecurrencyType } from '../../app.model';
import { AppService } from '../../app.service';
import { Helper } from '../../utils';
import { RecurrencyDialogComponent } from '../recurrency-dialog/recurrency-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlarmService } from '../../alarm.service';
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';

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
	  if (type === ETicketType.reminder) {
		  // add or set the alarm
		  this.handleTicketAlarmSet();
	  } else {
		  if (this.ticket.ticketType === ETicketType.reminder) {
			  // clear the alarm
			  this.handleTickeAlarmClear(type);
		  } else {
			this.ticket.ticketType = type;
		  }
	  }
	  this.service.notifyTicketsChanged();
  }

  handleTickeAlarmClear(newTicketType: ETicketType = ETicketType.task): void {
	  if (this.ticket.alarm && this.ticket.alarm.id) {
		this.alarmService.removeAlarm(this.ticket.alarm.id);
		this.ticket.alarm = null;
		this.ticket.ticketType = newTicketType; // task is the default type
		this.service.updateIickets(this.ticket);
		this.service.notifyTicketsChanged();
	  }
	  if (this.ticket.ticketType === ETicketType.reminder) {
		this.ticket.ticketType = newTicketType; // task is the default type
		this.service.updateIickets(this.ticket);
		this.service.notifyTicketsChanged();
	  }
  }

  handleTicketAlarmSet(type: ETicketRecurrencyType = ETicketRecurrencyType.once): void {
	  const dialogRef = this.dialog.open(RecurrencyDialogComponent, {
		  maxWidth: '1000px',
		  data: {
			  type: type,
			  ticketAlarm: this.ticket.alarm ? Object.assign({}, this.ticket.alarm) : null
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

  handleTicketDelete():void {
	  const dialogRef = this.dialog.open(BasicDialogComponent, {
		  width: '400px',
		  data: {
			  title: 'Delete this ticket?',
			  content: `Are you sure want to delete the ticket ${this.ticket.summary} ?`
		  }
	  });
	  dialogRef.afterClosed().subscribe(isOk => {
		  if (isOk) {
			  this.service.deleteTicketById(this.ticket.id);
		  }
	  })
  }
}
