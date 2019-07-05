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
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  imports: [
	CommonModule,
	AngularMaterialModule
  ],
  declarations: [
	  InboxComponent,
	  TodayComponent,
	  WeekComponent,
	  MonthComponent,
	  FutureComponent,
	  WorkComponent,
	  LifeComponent,
	  OthersComponent,
	  StatisticsComponent
	],
  exports: [
	InboxComponent,
	TodayComponent,
	WeekComponent,
	MonthComponent,
	FutureComponent,
	WorkComponent,
	LifeComponent,
	OthersComponent,
	StatisticsComponent
  ]
})
export class PageModule { }
