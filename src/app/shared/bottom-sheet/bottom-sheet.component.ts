import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/app.model';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {
  TICKETPRIORITYSELECTCONFIG,
  TICKETTYPESELECTCONFIG,
  TICKETEFFORTSELECTCONFIG,
  TICKETPROGRESSSELECTCONFIG,
  PAGELIST
} from  'src/app/app.model';

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
	  @Inject(MAT_BOTTOM_SHEET_DATA) private ticket: Ticket) { }

  ngOnInit() {
  }

  onOk(): void {
	  this._bottomSheetRef.dismiss();
  }

  onAddRecord(): void {
    this.ticket.records.push('');
  }

  onRemoveRecord(): void {
    this.ticket.records.pop();
  }
}
