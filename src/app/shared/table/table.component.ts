import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Ticket, ETicktProgress, ITicketTimeCost } from '../../app.model';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import { Helper } from 'src/app/utils';
import { AppService } from '../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
	trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0'})),
		state('expanded', style({height: '*'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
	  ]),
  ]
})
export class TableComponent implements OnInit {
	@Input()
	dataSource: Array<any>;
	@Input()
	columnsToDisplay: Array<string>;
	expandedElement: Array<any>;
	bottomSheetRef: MatBottomSheetRef;
	isAddNewTicketTimeCost: boolean;
	newTicketTimeCost: object;
  constructor(
	private _bottomSheet: MatBottomSheet,
	private service: AppService,
	private dialog: MatDialog
  ) { }

  ngOnInit() {
	  this.isAddNewTicketTimeCost = false;
	  this.newTicketTimeCost = {
		  fromDate: '',
		  fromTime: '',
		  toDate: '',
		  toTime: '',
	  };
	  this.expandedElement = this.dataSource;
  }

  openEditSheet(ticket: Ticket) {
	  this.bottomSheetRef = this._bottomSheet.open(BottomSheetComponent, {data: ticket, panelClass: 'bottom-sheet-custom'});
  }

  calculateTimeCost(element: Ticket): string {
	  const timeCost = element.timeCosts;
	  if (timeCost && timeCost.length > 0 ) {
		  let timeCostinMS = 0;
		  timeCost.forEach(data => timeCostinMS += data.to - data.from);
		  return Helper.timeCostFormat(timeCostinMS);
	  } else {
		  return ''
	  }
  }

  handleCurrentWorkingOnSwitch(id: string, isStop: boolean): void {
	  if (isStop) {
		  this.service.stopCurrentWorkingOnTicket();
	  } else {
		  this.service.startCurrentWorkingOnTicket(id);
	  }
  }

  handleTicketDelete(ticket: Ticket): void {
	  const dialogRef = this.dialog.open(BasicDialogComponent, {
		  width: '400px',
		  data: {
			title: 'Delete this ticket?',
			content: `Are you sure want to delete the ticket ${ticket.summary} ?`
		}
	  });
	  dialogRef.afterClosed().subscribe(isOk => {
		if (isOk) {
			this.service.deleteTicketById(ticket.id);
		}
	});
  }

  handleTicketDone(ticket: Ticket): void {
	  if(!ticket.timeCosts || ticket.timeCosts.length === 0) {
		const dialogRef = this.dialog.open(BasicDialogComponent, {
				width: '400px',
				data: {
				title: 'Forget fill timeCost?',
				content: `Have you forget to fill the timeCost for ${ticket.summary} ?`,
				isOnlyOk: true
			}
		});
		dialogRef.afterClosed().subscribe(isOk => {
		});  
	  } else {
		  ticket.progress = ETicktProgress.finished;
		  this.service.doneTicketById(ticket.id);
	  }
  }

  handleWholeTicketTimeCostEdit(ticket: Ticket): void {
	  if(this.isAddNewTicketTimeCost) {
		  this.isAddNewTicketTimeCost = false;
		  console.log(this.newTicketTimeCost);
	  } else {
		  this.isAddNewTicketTimeCost = true;
		  // clear the data for newTicketTimeCost
		  this.newTicketTimeCost = {
			fromDate: '',
			fromTime: '',
			toDate: '',
			toTime: '',
		};
	  }
  }

  handleTicketCostTimeEdit(ticket, ITicketTimeCost): void {

  }

  getDate(timeStamp: number): string {
	  const date = new Date(timeStamp);
	  return date.toLocaleString();
  }
}
