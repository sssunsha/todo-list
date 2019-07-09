import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/app/app.model';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

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

  private close(): void {
	this._bottomSheetRef.dismiss();
  }

}
