import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBoardComponent } from './calendar-board.component';

describe('CalendarBoardComponent', () => {
  let component: CalendarBoardComponent;
  let fixture: ComponentFixture<CalendarBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
