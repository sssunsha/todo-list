import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/app/app.model';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {
  TICKETPRIORITYSELECTCONFIG,
  TICKETTYPESELECTCONFIG,
  TICKETEFFORTSELECTCONFIG,
  TICKETPROGRESSSELECTCONFIG,
  PAGELIST
} from  'src/app/app.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {
  _TICKETPRIORITYSELECTCONFIG = TICKETPRIORITYSELECTCONFIG;
  _TICKETTYPESELECTCONFIG = TICKETTYPESELECTCONFIG;
  _TICKETEFFORTSELECTCONFIG = TICKETEFFORTSELECTCONFIG;
  _TICKETPROGRESSSELECTCONFIG = TICKETPROGRESSSELECTCONFIG;
  _PAGELIST = PAGELIST;

  constructor(
	  private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
	  @Inject(MAT_BOTTOM_SHEET_DATA) public ticket: Ticket) { }

  ngOnInit() {
  }

  onCancel(): void {
	  this.close();
  }

  onSave(): void {
	  //TODO: save action handler
	  this.close();
  }

  onAddRecord(): void {
    this.ticket.records.push('');
  }

  onRemoveRecord(): void {
    this.ticket.records.pop();
  }

  private close(): void {
	this._bottomSheetRef.dismiss();
  }

}
