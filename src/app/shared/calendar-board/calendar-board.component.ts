import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
// import * as Calendar from 'tui-calendar';
import { ECalendarType } from '../../app.model';
declare const require: any;
var Calendar = require('tui-calendar');

// reference wiki: https://nhn.github.io/tui.calendar/latest/tutorial-example00-basic


@Component({
  selector: 'app-calendar-board',
  templateUrl: './calendar-board.component.html',
  styleUrls: ['./calendar-board.component.scss']
})
export class CalendarBoardComponent implements OnInit, AfterViewInit {
	@ViewChild('calendarBoard', {static: false}) calendarBoard: ElementRef;
	@Input()
	type: ECalendarType;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
	this.calendarBoard = new Calendar('#calendar-board', {
		defaultView: this.type,
		taskView: true,
		template: {
			monthGridHeader: function(model) {
			var date = new Date(model.date);
			var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
			return template;
			}
		}
	});
  }


}
