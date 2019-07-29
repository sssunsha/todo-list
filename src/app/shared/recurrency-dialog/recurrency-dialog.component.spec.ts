import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrencyDialogComponent } from './recurrency-dialog.component';

describe('RecurrencyDialogComponent', () => {
  let component: RecurrencyDialogComponent;
  let fixture: ComponentFixture<RecurrencyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrencyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
