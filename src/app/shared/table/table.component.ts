import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Ticket } from '../../app.model';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';

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
  constructor(
	private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
	  this.expandedElement = this.dataSource;
  }

  openEditSheet(ticket: Ticket) {
	  this._bottomSheet.open(BottomSheetComponent, {data: ticket, panelClass: 'bottom-sheet-custom'});
  }
}
