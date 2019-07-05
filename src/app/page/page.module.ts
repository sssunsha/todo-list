import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { TodayComponent } from './today/today.component';
import { WeekComponent } from './week/week.component';
import { MonthComponent } from './month/month.component';
import { FutureComponent } from './future/future.component';
import { WorkComponent } from './work/work.component';
import { LifeComponent } from './life/life.component';
import { OthersComponent } from './others/others.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InboxComponent, TodayComponent, WeekComponent, MonthComponent, FutureComponent, WorkComponent, LifeComponent, OthersComponent]
})
export class PageModule { }
