import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ECalendarType } from '../../app.model';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit  {

	@ViewChild('tabGroup', {static: false}) tabGroup;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
	}

	onSelectedTabChange(event: any) {
	}

	onFocusChange(event: any) {
	}

}
