import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// import * as Calendar from 'tui-calendar';
declare const require: any;
var Calendar = require('tui-calendar');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit  {
	@ViewChild('calendarDaily', {static: false}) calendarDaily: ElementRef;
	@ViewChild('calendarWeekly', {static: false}) calendarWeekly: ElementRef;
	@ViewChild('calendarMonthly', {static: false}) calendarMonthly: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
	  this.calendarMonthly = new Calendar('#calendar-montly', {
			defaultView: 'month',
			taskView: true,
			template: {
				monthGridHeader: function(model) {
				var date = new Date(model.date);
				var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
				return template;
				}
			}
		});

		this.calendarWeekly = new Calendar('#calendar-weekly', {
			defaultView: 'week',
			taskView: true,
			template: {
				monthGridHeader: function(model) {
				var date = new Date(model.date);
				var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
				return template;
				}
			}
		});

		this.calendarDaily = new Calendar('#calendar-daily', {
			defaultView: 'day',
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
