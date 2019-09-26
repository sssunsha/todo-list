import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, AfterViewChecked, AfterContentChecked } from '@angular/core';
// import * as Calendar from 'tui-calendar';
import { ECalendarType, Schedule, Ticket, ETicketType, EScheduleCategory } from '../../app.model';
declare const require: any;
var Calendar = require('tui-calendar');

import { NgxTuiCalendarComponent} from 'ngx-tui-calendar';
import { mockSchedules } from '../../mock/calendar.mock';
import { Arr } from 'tern';
import { AppService } from '../../app.service';

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

	schedules: Array<Schedule>; // Schedule not exported by ngx-tui-calendar, so copy into app.model
	focusedDateStr: string;

  constructor(private service: AppService) { }

  ngOnInit() {
	  // sample schedules
	this.schedules = this.parseSchedulesToSchedules(this.parseTicketsToSchedules(this.service.getTickets()));
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

	onCalendarNext() {
		this.calendarBoard.next();
	}

	onCalendarPrev() {
		this.calendarBoard.prev();
	}

	onToday() {
		this.calendarBoard.setDate(new Date());
	}

	parseSchedulesToSchedules(schedules: Array<Schedule>): Array<Schedule> {
		for (const s of schedules) {
			switch(s.ticketType) {
				case ETicketType.task:
					s.bgColor = '#B35C37';
					s.color = 'white';
					break;
				case ETicketType.reminder:
					s.bgColor = 'darkorchid';
					s.color = 'white';
					break;
				case ETicketType.note:
					s.bgColor = '#7BA23F';
					s.color = 'white';
					break;
				case ETicketType.event:
					s.bgColor = '#BAF4FF';
					break;
			}
			s.category = EScheduleCategory.time;
		}

		return schedules;
	}

	parseTicketsToSchedules(tickets: Array<Ticket>): Array<Schedule> {
		const schedules: Array<Schedule> = [];
		for (const t of tickets) {
			if (t.timeCosts && t.timeCosts.length > 0) {
				for (const c of t.timeCosts) {
					let s: Schedule = {
						id: t.id,
						calendarId: t.id,
						start: new Date(c.from),
						end: new Date(c.to),
						title: t.summary,
						category: EScheduleCategory.time,
						ticketType: t.ticketType,
					};
					schedules.push(s);
				}
			}
		}
		return schedules;
	}
}
