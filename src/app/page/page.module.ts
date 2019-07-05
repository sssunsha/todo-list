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
import { AngularMaterialModule } from '../core/angular-material.module';


@NgModule({
  imports: [
	CommonModule,
	AngularMaterialModule
  ],
  declarations: [InboxComponent, TodayComponent, WeekComponent, MonthComponent, FutureComponent, WorkComponent, LifeComponent, OthersComponent],
  exports: [InboxComponent, TodayComponent, WeekComponent, MonthComponent, FutureComponent, WorkComponent, LifeComponent, OthersComponent],
})
export class PageModule { }
