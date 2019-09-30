import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Ticket, TICKETCATEGORYSELECTCONFIG } from '../../app.model';
import { Helper } from '../../utils';
import {
	TICKETPRIORITYSELECTCONFIG,
	TICKETTYPESELECTCONFIG,
	TICKETEFFORTSELECTCONFIG,
	TICKETPROGRESSSELECTCONFIG,
	PAGELIST,
	defaultTicket,
	EPageState
  } from  'src/app/app.model';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {
	_TICKETPRIORITYSELECTCONFIG = TICKETPRIORITYSELECTCONFIG;
	_TICKETTYPESELECTCONFIG = TICKETTYPESELECTCONFIG;
	_TICKETEFFORTSELECTCONFIG = TICKETEFFORTSELECTCONFIG;
	_TICKETPROGRESSSELECTCONFIG = TICKETPROGRESSSELECTCONFIG;
	_TICKETCATEGORYSELECTCONFIG = TICKETCATEGORYSELECTCONFIG;
	_PAGELIST = PAGELIST;

	ticket: Ticket;
  constructor(
	  private _dialogRef: MatDialogRef<TicketDialogComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
	  this.ticket = Object.assign({}, defaultTicket);
  }

  onCancel(): void {
	  this._dialogRef.close();
  }

  onSave(): void {
	  this.prepareForSaving();
	this._dialogRef.close(this.ticket);
  }

  prepareForSaving(): void {
	  // default in page is inbox
	  this.ticket.inPages = [EPageState.inbox];
	  this.ticket.createdAt = Helper.generateCreatedAt();
  }

}
