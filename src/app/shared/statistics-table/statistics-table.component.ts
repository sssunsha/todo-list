import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppService } from '../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { Ticket, EPageState, ITicketTimeCost } from '../../app.model';
import { Helper } from '../../utils';


@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss']
})
export class StatisticsTableComponent {
	@Input()
	dataSource: Array<any>;
	@Input()
	columnsToDisplay: Array<string>;
	@Output() 
	sorting: EventEmitter<string>  = new EventEmitter<string>();


  constructor(
	private service: AppService
  ) { }

  isDisplayColumnItem(column: string): boolean {
	switch(column) {
		default:
			return true;
		}
	}

	isDisplayRowItemText(column: string): boolean {
		switch(column) {
			case 'status':
			case 'scheduled':
			case 'progress':
			case 'effort':
				return false;
			default:
				return true;
		}
	}

	generateTicketStatus(ticket: Ticket): boolean {
		if (ticket.inPages.length === 1 &&  ticket.inPages[0] === EPageState.statistics) {
			return true;
		} else {
			return false;
		}
	}

	generateTicketScheduled(ticket: Ticket): boolean {
		if (ticket.alarm) {
			return true;
		} else {
			return false;
		}
	}

	generateTicketDataText(column: string,data: object): string {
		switch(column) {
			case 'timeCosts':
				return this.calculateTicketTotalTimeCost(data as Array<ITicketTimeCost>);
			case 'id':
				return data.toString().slice(0, 6);
			default:
				if (data === undefined) {
					return '';
				}
				return data.toString();
		}
	}

	calculateTicketTotalTimeCost(timeCost: Array<ITicketTimeCost>): string {
		let totalTimeCost = 0;
		for (const tc of timeCost) {
			totalTimeCost += tc.to - tc.from;
		}

		return Helper.timeCostFormat(totalTimeCost);
	}

	onSortingClicked(column: string) {
		this.sorting.emit(column);
	}
	

}
