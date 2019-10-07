import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Ticket, ETicktProgress, ITicketTimeCost, ITicketTImeCostConfig } from '../../app.model';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import { Helper } from 'src/app/utils';
import { AppService } from '../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';
import { DatePipe } from '@angular/common';

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
	/**
	 * used to mark the edit timecost element in ticket timeCost
	 * @var -1: no edit
	 * @var 9999: new add
	 * @var 0 ~ xxx: the index of the timeCost array index in edit
	 *
	 * @type {number}
	 * @memberof TableComponent
	 */
	inEditTicketTimeCostIndex: number;
	newTicketTimeCost: ITicketTImeCostConfig;
  constructor(
	private _bottomSheet: MatBottomSheet,
	private service: AppService,
	private dialog: MatDialog
  ) { }

  ngOnInit() {
	  this.inEditTicketTimeCostIndex = -1;
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

  handleTicketTimeCostAdd(ticket: Ticket): void {
	  this.preareDefaultTicketTimeCost();
	  this.inEditTicketTimeCostIndex = 9999;
  }

  handleTicketTImeCostSave(isSave: boolean, ticket: Ticket): void {
	  if(isSave && this.newTicketTimeCost.fromDate && this.newTicketTimeCost.fromTime
			&& this.newTicketTimeCost.toDate && this.newTicketTimeCost.toTime) {
			if (this.inEditTicketTimeCostIndex === 9999) {
				ticket.timeCosts.push(this.generateNewTicketTimeCost());
			} else if (this.inEditTicketTimeCostIndex >= 0) {
				ticket.timeCosts.splice(this.inEditTicketTimeCostIndex, 1, this.generateNewTicketTimeCost());
			}
			this.service.notifyTicketsChanged();
	  }

	  this.inEditTicketTimeCostIndex = -1;
  }

  handleTicketCostTimeEdit(ticket:Ticket, cost:ITicketTimeCost): void {
	  let index = 0;
	  for (const t of ticket.timeCosts) {
		  if (t.from === cost.from && t.to === cost.to) {
			  this.preareDefaultTicketTimeCost(new Date(cost.from), new Date(cost.to));
			  this.inEditTicketTimeCostIndex = index;
			  return;
		  }
		  index++;
	  }
  }

  handleTicketCostTimeDelete(ticket:Ticket, cost:ITicketTimeCost): void {
	  let index = 0;
	  ticket.timeCosts.forEach(tc => {
		  if (tc.from === cost.from && tc.to === cost.to) {
			  ticket.timeCosts.splice(index, 1);
			  this.service.notifyTicketsChanged();
			  return;
		  }
		  index++;
	  })
}

  getDate(timeStamp: number): string {
	  const date = new Date(timeStamp);
	  return date.toLocaleString();
  }

  private preareDefaultTicketTimeCost(from: Date = new Date(), to: Date = new Date()): void {
	  const fromDate = new DatePipe('en-US').transform(from, 'yyyy-MM-dd');
	  const fromTime = new DatePipe('en-US').transform(from, 'HH:mm');
	  const toDate = new DatePipe('en-US').transform(to, 'yyyy-MM-dd');
	  const toTime = new DatePipe('en-US').transform(to, 'HH:mm');
	  this.newTicketTimeCost = {
		fromDate: fromDate,
		toDate: toDate,
		fromTime: fromTime,
		toTime: toTime,
	  };
  }

  private generateNewTicketTimeCost(): ITicketTimeCost {
	  const newTicketTimeCost: ITicketTimeCost = {
		  from: (new Date(`${this.newTicketTimeCost.fromDate} ${this.newTicketTimeCost.fromTime}`)).getTime(),
		  to: (new Date(`${this.newTicketTimeCost.toDate} ${this.newTicketTimeCost.toTime}`)).getTime(),
	  };

	  return newTicketTimeCost;
  }
}
