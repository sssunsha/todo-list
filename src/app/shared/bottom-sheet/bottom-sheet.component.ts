import { Component, OnInit } from '@angular/core';
import { Ticket, ETicktProgress } from 'src/app/app.model';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';
import { AppService } from '../../app.service';
import { TICKETCATEGORYSELECTCONFIG } from '../../app.model';
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
  _TICKETCATEGORYSELECTCONFIG = TICKETCATEGORYSELECTCONFIG;
  _PAGELIST = PAGELIST;
  backupTicket: Ticket;

  constructor(
	  private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
	  private dialog: MatDialog,
	  private service: AppService,
	  @Inject(MAT_BOTTOM_SHEET_DATA) private ticket: Ticket) { }

  ngOnInit() {
	  this.backupTicket = Object.assign({}, this.ticket);
  }

  onOk(): void {
	  this._bottomSheetRef.dismiss();
  }

  onAddRecord(): void {
	  if (this.ticket.records && this.ticket.records.length > 0)
	  {
		this.ticket.records.push('');
	  } else {
		  // if the records is undefined, create one
		  this.ticket.records = [''];
	  }
  }

  onRemoveRecord(): void {
    this.ticket.records.pop();
  }

  handleProgressChanged(): void {
	  if (this.ticket.progress === ETicktProgress.finished) {
		if(!this.ticket.timeCosts || this.ticket.timeCosts.length === 0) {
			const dialogRef = this.dialog.open(BasicDialogComponent, {
					width: '400px',
					data: {
					title: 'Forget fill timeCost?',
					content: `Have you forget to fill the timeCost for ${this.ticket.summary} ?`,
					isOnlyOk: true
				}
			});
			this.ticket.progress = this.backupTicket.progress;
			dialogRef.afterClosed().subscribe(isOk => {
			});  
		  } else {
			  this.backupTicket = Object.assign({}, this.ticket);
			  this.service.doneTicketById(this.ticket.id);
		  }
	  }
  }
}
