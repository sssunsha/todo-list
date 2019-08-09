import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/ticket';
import * as TicketActions from '../../actions/ticket';
import { Ticket, EPageState } from '../../app.model';
import { Helper } from '../../utils';
import {MatDialog} from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { TicketDialogComponent } from '../../shared/ticket-dialog/ticket-dialog.component';
import { AlarmService } from '../../alarm.service';
import { mockAlarmConfigList } from '../../alarm.service.mock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string;
  isShowAlarmList: false;
  _MOCKALARMCONFIGLIST = mockAlarmConfigList;


  constructor(private dialog: MatDialog,
	private alarmService: AlarmService,
	private service: AppService) {

	}
//   constructor(private store: Store<Ticket>) { }

  ngOnInit() {
  }

  onSearch() {
    
  }

  onNewTicket() {
	  // TODO: dispatch to store for testing
	// this.store.dispatch(new TicketActions.TicketCreateAction());
	const dialogRef = this.dialog.open(TicketDialogComponent, {
		width: '600px',
	});
	dialogRef.afterClosed().subscribe(newTicket => {
		if (newTicket) {
			this.service.pushIntoTickets(newTicket);
		}
	})
  }

  onMenuSaveAs(): void {
	  this.service.startSaveASFile();
  }

  onMenuSettings(): void {
	  this.service.currentPage = EPageState.settings;
  }

  onMenuRetrieveLocalStorageBackup(): void {
	  this.service.retrieveTicketsFromLocalStorage();
  }

  getInboxTicketSize(): number {
	return this.service.getTickets().filter(t => t.inPages.includes(EPageState.inbox)).length
  }

  getTodayTicketSize(): number {
	return this.service.getTickets().filter(t => t.inPages.includes(EPageState.today)).length
  }

  goto(pageState: EPageState): void {
	  this.service.currentPage = pageState;
  }

}