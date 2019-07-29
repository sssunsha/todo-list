import { Component, OnInit, Input, Inject } from '@angular/core';
import { ETicketRecurrencyType, IRecurrency } from '../../app.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recurrency-dialog',
  templateUrl: './recurrency-dialog.component.html',
  styleUrls: ['./recurrency-dialog.component.scss']
})
export class RecurrencyDialogComponent implements OnInit {
	// @Input()
	// type: ETicketRecurrencyType;
	// @Input()
	// alarm: IRecurrency;

  constructor(
	  private _dialogRef: MatDialogRef<RecurrencyDialogComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onCancel() {

  }

  onSave() {

  }

}
