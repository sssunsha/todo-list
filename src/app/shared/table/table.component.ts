import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  constructor() { }

  ngOnInit() {
	  this.expandedElement = this.dataSource;
  }
}
