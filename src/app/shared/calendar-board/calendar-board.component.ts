import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, AfterViewChecked, AfterContentChecked } from '@angular/core';
// import * as Calendar from 'tui-calendar';
import { ECalendarType, Schedule } from '../../app.model';
declare const require: any;
var Calendar = require('tui-calendar');

import { NgxTuiCalendarComponent} from 'ngx-tui-calendar';

// reference wiki: https://nhn.github.io/tui.calendar/latest/tutorial-example00-basic


@Component({
  selector: 'app-calendar-board',
  templateUrl: './calendar-board.component.html',
  styleUrls: ['./calendar-board.component.scss']
})
export class CalendarBoardComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {
	@ViewChild('calendarBoard', {static: false}) calendarBoard: NgxTuiCalendarComponent;
	@Input()
	type: ECalendarType;

	schedules: Schedule[]; // Schedule not exported by ngx-tui-calendar, so copy into app.model

  constructor() { }

  ngOnInit() {
	  // sample schedules
	  this.schedules = [
		  {
			  id: '1',
			  calendarId: '1',
			  title: 'my schedule',
			  category: 'time',
			  dueDateClass: '',
			  start: (new Date()),
			  end: (new Date())
			}
		];
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
	this.calendarBoard.changeView(this.type);
  }

  ngAfterContentChecked() {
  }

  onTuiCalendarCreate($event) {
	/* at this point the calendar has been created and it's methods are available via the ViewChild defined above, so for example you can do: */
	}

	onDate(date) {
	}

	onTime(dateTime) {
	}

	onSchedule(schedule) {
	}

	onDateChange($event) {
		this.calendarBoard.setDate(new Date($event.target.value));
	}

	onBeforeCreateSchedule(event: any) {
	}




}
