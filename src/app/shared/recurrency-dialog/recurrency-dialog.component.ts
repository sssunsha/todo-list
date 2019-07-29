import { Component, OnInit, Input, Inject } from '@angular/core';
import { ETicketRecurrencyType, ITicketRecurrency, ITicketRecurrencyDialogConfig } from '../../app.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Helper } from '../../utils';

@Component({
  selector: 'app-recurrency-dialog',
  templateUrl: './recurrency-dialog.component.html',
  styleUrls: ['./recurrency-dialog.component.scss']
})
export class RecurrencyDialogComponent implements OnInit {
	// @Input()
	// type: ETicketRecurrencyType;
	// @Input()
	// alarm: ITicketRecurrency;

  constructor(
	  private _dialogRef: MatDialogRef<RecurrencyDialogComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: ITicketRecurrencyDialogConfig
  ) { }

  ngOnInit() {
	  if (!this.data.ticketAlarm) {
		  // should generate a new one
		  this.data.ticketAlarm = 
		  	Helper.generateDefaultTicketAlarm(this.data.type !== ETicketRecurrencyType.once);
	  }
  }

  onCancel() {

  }

  onSave() {

  }

}
