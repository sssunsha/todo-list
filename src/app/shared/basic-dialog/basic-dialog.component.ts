import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IBasicDialogConfig } from '../../app.model';

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.scss']
})
export class BasicDialogComponent implements OnInit {

  constructor(
	private _dialogRef: MatDialogRef<BasicDialogComponent>,
	@Inject(MAT_DIALOG_DATA) public data: IBasicDialogConfig
  ) { }

  ngOnInit() {
  }

  handleClick(isOk: boolean) {
	  this._dialogRef.close(isOk);
  }

}
