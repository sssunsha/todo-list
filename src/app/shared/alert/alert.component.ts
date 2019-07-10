import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IAlertConfig } from '../../app.model';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<AlertComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IAlertConfig) {}

  ngOnInit() {
  }

  onOk(): void {
	this.dialogRef.close();
  }

}


