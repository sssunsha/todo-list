import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
// import * as Calendar from 'tui-calendar';
import { ECalendarType } from '../../app.model';
declare const require: any;
var Calendar = require('tui-calendar');

import { NgxTuiCalendarComponent } from 'ngx-tui-calendar';

// reference wiki: https://nhn.github.io/tui.calendar/latest/tutorial-example00-basic


@Component({
  selector: 'app-calendar-board',
  templateUrl: './calendar-board.component.html',
  styleUrls: ['./calendar-board.component.scss']
})
export class CalendarBoardComponent implements OnInit, AfterViewInit {
	@ViewChild('calendarBoard', {static: false}) calendarBoard: NgxTuiCalendarComponent;
	@Input()
	type: ECalendarType;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onTuiCalendarCreate($event) {
	/* at this point the calendar has been created and it's methods are available via the ViewChild defined above, so for example you can do: */
	this.calendarBoard.createSchedules([]);
	}


}


//https://github.com/nhn/tui.ngx-calendar