import { Injectable, OnDestroy } from '@angular/core';
import { EPageState, Ticket, TicketFile, ITicketRecurrency, ETicketType, ITicketTimeCost, ITicketFilter, ITicketsWithPagenationResponse } from './app.model';
import * as COS from 'cos-js-sdk-v5';
import { cosConfig, appConfig } from './shared/app.config';
import { Observable, Subject, Subscription } from 'rxjs';
import { Helper } from './utils';
import * as FileSaver from 'file-saver';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlarmService } from './alarm.service';
import { PageEvent } from '@angular/material';



@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy{
  currentPage: EPageState;
  
  // store tickets data here
  private tickets: Array<Ticket> = [];
  ticketsSubject: Subject<any> = new Subject<any>();

  // config data
  cosConfig = cosConfig;
  appConfig = appConfig;

  // cos client object
  cos: any;
  cosFileVersion: number;
  modifiedAt: string;

  // autoSync handler
  autoSyncHandler = null;

  // alarm service relative
  ticketAlarmUpdateScription: Subscription;

  // mark now working on ticket
  private currentWorkingOnTicketId: string = '';

  // flag for sync
  isInSync = false;
  isNeedToClose = false;
  syncSubject: Subject<any> = new Subject<any>();

  // for sorting
  sortingColumnItems: Array<string> = [];

  constructor(
	  private _snackBar: MatSnackBar,
	  private alarmService: AlarmService) {
	  this.init();
   }

   init(): void {
		this.currentPage = EPageState.today;
		if (this.autoSyncHandler) {
			window.clearInterval(this.autoSyncHandler);
		}
	   this.initClient();
	   this.ticketAlarmUpdateScription = 
		   this.alarmService.alarmNotificationSubject.subscribe(data => 
			{
				if (data.action === 'auto-sync') {
					this.startSync();
				} else {
					this.ticketAlarmUpdateHandle(data.alarm, data.action);
				}
			});
   }

   ngOnDestroy() {
	   this.ticketAlarmUpdateScription.unsubscribe();
   }

// public mthod for private ticket member ===========================================================
   setTickets(tickets: Array<Ticket>): void {
	   this.tickets  = tickets;
	   this.sortTicketByPriority();
	   this.ticketsSubject.next('tickets set updated');
   }

   getTickets(): Array<Ticket> {
	   return this.tickets;
   }

   getTicketsCount(): number {
	   return this.tickets.length;
   }

   getTicketsWithPagenation(pageEvent: PageEvent, ticketFilter:ITicketFilter, sortingItem: string): ITicketsWithPagenationResponse {
	   // for filter
	   let ticketList = this.tickets.filter(t => {
		   let filterResult = true;
		   if( ticketFilter && ticketFilter.category &&  ticketFilter.category !== t.category) {
			   filterResult =false;
		   }
		   if( ticketFilter && ticketFilter.ticketType &&  ticketFilter.ticketType !== t.ticketType) {
				filterResult =false;
			}
			if( ticketFilter && ticketFilter.priority &&  ticketFilter.priority !== t.priority) {
				filterResult =false;
			}
			if( ticketFilter && ticketFilter.inPage &&  !t.inPages.includes(ticketFilter.inPage)) {
				filterResult =false;
			}
			return filterResult;
	   });
	   // for sorting
	   if (sortingItem) {
		   let isSortingASC = true;
		   if(this.sortingColumnItems.includes(sortingItem)) {
			   isSortingASC = false;
			   this.sortingColumnItems.splice(this.sortingColumnItems.indexOf(sortingItem), 1);
			} else {
				this.sortingColumnItems.push(sortingItem);
				isSortingASC = true;
			}
			ticketList = ticketList.sort((t1, t2) => {
				if(this.generateColumnSortingData(t1, sortingItem) > this.generateColumnSortingData(t2, sortingItem)) {
					return isSortingASC ? 1 : -1;
				} else {
					return isSortingASC ? -1 : 1;
				}
			});
		}

	   if(pageEvent) {
		   return {
			   tickets: ticketList.slice(pageEvent.pageIndex*pageEvent.pageSize, pageEvent.pageIndex*pageEvent.pageSize+pageEvent.pageSize),
			   length: ticketList.length,
		   };
	   } else {
		   return {
			   tickets: ticketList,
			   length: ticketList.length,  
		   };
	   }
   }

   deleteTicketById(id: string): void {
	   let index = 0;
	   for (const t of this.tickets) {
		   if (t.id === id) {
			   this.tickets.splice(index, 1);
			   this.ticketsSubject.next('tickets set updated');
			   return;
		   }
		   index++;
	   }
   }

   getTicketById(id: string): Ticket {
	   for (const t of this.tickets) {
		   if (t.id === id) {
			   return t;
		   }
	   }
	   return null;
   }

   pushIntoTickets(ticket: Ticket): void {
	   this.tickets.push(ticket);
	   this.sortTicketByPriority();
	   this.ticketsSubject.next('ticket push updated')
   }

   updateIickets(ticket: Ticket): void {
	   if (ticket) {
		   this.tickets = this.tickets.filter(t => t.id !== ticket.id);
		   this.tickets.push(Object.assign({}, ticket));
		   this.sortTicketByPriority();
	   }
   }

   notifyTicketsChanged(): void {
	   this.ticketsSubject.next('ticket notified updated');
   }

   startCurrentWorkingOnTicket(id: string): void {
	   if (id) {
		   // first stop other now working on ticket
		   this.stopCurrentWorkingOnTicket();

		   this.currentWorkingOnTicketId = id;
		   for (const t of this.tickets) {
			   if (t.id === id) {
				   t.isWorkingOn = true;
				   // save the 'from' for time cost
				   const timeCost: ITicketTimeCost = {
					   from: new Date().getTime(),
					   to: 0
				   }
				   if (!Array.isArray(t.timeCosts)) {
					   t.timeCosts = [];
				   }
				   t.timeCosts.push(timeCost);
			   } else {
				   t.isWorkingOn = false;
			   }
		   }

		   this.notifyTicketsChanged();
	   }
   }

   stopCurrentWorkingOnTicket(): void {
	   for (const t of this.tickets) {
			t.isWorkingOn = false;
			if (this.currentWorkingOnTicketId === t.id) {
				if (!Array.isArray(t.timeCosts)) {
					t.timeCosts = [];
				}
				if (t.timeCosts.length > 0) {
					// get the last item and save the timestamp to 'to'
					if (t.timeCosts[t.timeCosts.length - 1].to === 0 && t.timeCosts[t.timeCosts.length - 1].from > 0) {
						t.timeCosts[t.timeCosts.length - 1].to = new Date().getTime();
					}
				}
			}
	   }
	   this.currentWorkingOnTicketId = '';
	   this.notifyTicketsChanged();
   }

   getCurrentWorkingOnTicketId(): string {
	   return this.currentWorkingOnTicketId;
   }

   // set the ticket to done, and move the ticket to statistics page
   doneTicketById(id: string): void {
	   for (const t of this.tickets) {
		   if (t.id === id){
			   t.inPages = [EPageState.statistics];
			   this.notifyTicketsChanged();
			   return;
		   }
	   }
   }

   private sortTicketByPriority(): void {
	   this.tickets.sort((t1, t2) => {
		if (t1.priority > t2.priority) {
			return 1;
		} else if (t1.priority === t2.priority) {
			return 0;
		} else {
			return -1;
		}
	   });
   }
// alarm methods =======================================================================================
   ticketAlarmUpdateHandle(alarm: ITicketRecurrency, action: string) {
	   this.tickets.forEach(t => {
		   if(t.alarm && t.alarm.id === alarm.id) {
			   if (action === 'delete') {
				   t.alarm = null;
				   t.ticketType = ETicketType.task;
			   } else if (action === 'update') {
				   t.alarm = alarm;
			   }
		   }
	   });
   }
// COS =================================================================================================
   initClient(): void {
	   this.cos = new COS({
		   SecretId: this.cosConfig.SecretId,
		   SecretKey: this.cosConfig.SecretKey,
	   });
	   this.cos.getBucket({
		Bucket: this.cosConfig.Bucket,
		Region: this.cosConfig.Region,
		Prefix: 'todo-list/',
	}, (err, data) => {
		if (!err) {
			this.downloadTicketFileFromSOC();
		}
	});
	}

	startSync(): Observable<any> {
		this.isInSync = true;
		var subject = new Subject();
		this.uploadTicketFileToSOC(subject);
		return subject.asObservable();
	}

	downloadTicketFileFromSOC(): void {
		// read the basic information 
		const key = Helper.generateTicketFilePath(this.appConfig.isLiveMode)
		this.cos.getObject({
			Bucket: this.cosConfig.Bucket,
			Region: this.cosConfig.Region,
			Key: key}, (err, data) =>{
				if (!err && data.Body) {
					// save the download tickets
					const ticketFileData = JSON.parse(data.Body)
					this.setTickets(ticketFileData.value);
					this.cosFileVersion = ticketFileData.version;
					this.modifiedAt = ticketFileData.modifiedAt;
					this.parseDownloadTickets();
					Helper.openSnackBar(this._snackBar, 'download ticket file finished');
					// start alarm setup
					this.alarmService.prepareAlarmConfigListFromTickets(this.tickets);
				}
			});
	}

	uploadTicketFileToSOC(subject: Subject<any>): void {
		const key = Helper.generateTicketFilePath(this.appConfig.isLiveMode)
		this.cos.putObject({
			Bucket: this.cosConfig.Bucket,
			Region: this.cosConfig.Region,
			Key: key,
			Body: JSON.stringify(Helper.generateTicketFile(this.getTickets()))}, (err, data) => {
				if(!err) {
					Helper.openSnackBar(this._snackBar, 'upload ticket file finished');
					this.isInSync = false;
					this.syncSubject.next(true) // sync finished
				} else {
					console.error(err);
					this.isInSync = false;
					this.syncSubject.next(false) // sync failed
				}
				subject.next(1);
				subject.complete();
		});
	}

// html5 local storage for backup========================================================================
	startTicketsLocalStorageBackup(): void {
		localStorage.setItem(Helper.generateTicketFilePath(this.appConfig.isLiveMode),
			JSON.stringify(Helper.generateTicketFile(this.getTickets())));
	}

	retrieveTicketsFromLocalStorage(): void {
		const localBackupTicketsFile = localStorage.getItem(Helper.generateTicketFilePath(this.appConfig.isLiveMode));
		if (localBackupTicketsFile) {
			const localBackupTicketsFileJson = JSON.parse(localBackupTicketsFile);
			this.setTickets(localBackupTicketsFileJson.value);
			this.cosFileVersion = localBackupTicketsFileJson.version;
			this.modifiedAt = localBackupTicketsFileJson.modifiedAt;
			this.parseDownloadTickets();
			Helper.openSnackBar(this._snackBar, 'retrieve backup ticket file finished');
		}
	}



// tickets save as file to backup
	startSaveASFile(): void {
		let blob = new Blob([JSON.stringify(Helper.generateTicketFile(this.getTickets()))], {type: "application/json;charset=utf-8"});
		FileSaver.saveAs(blob, `${Helper.generateTicketFileName()}`);
	}

	// do something before window close
	beforeUnloadHnadler(): void {
		this.isNeedToClose = true;
		this.startSync();
		Helper.openSnackBar(this._snackBar, 'sync before leave ...');
	}

	// parse download tickets
	parseDownloadTickets(): void {
		this.tickets.forEach(t => {
			if (t.isWorkingOn) {
				this.currentWorkingOnTicketId = t.id;
				return;
			}
		})
	}

// ticket sorting relative  functions
	private generateColumnSortingData(t: Ticket, event: string): string | number {
		switch(event) {
			case 'scheduled':
				return this.ticketTicketAlarmSorting(t.alarm);
			case 'inPages':
				return this.ticketInPagesSorting(t.inPages);
			case 'timeCosts':
				return this.ticketTimeCostSorting(t.timeCosts);
			default:
				return t[event];
		}
	}


	private ticketInPagesSorting(inPages: Array<EPageState>): string {
		return inPages.sort((p1, p2) => p1 <= p2 ? -1 : 1).toString();
	}

	private ticketTimeCostSorting(timeCosts: Array<ITicketTimeCost>): number {
		let timeCostTotal = 0;
		if (timeCosts && timeCosts.length > 0) {
			for (const tc of timeCosts) {
				timeCostTotal += tc.to - tc.from;
			}
		}
		return timeCostTotal;
	}

	private ticketTicketAlarmSorting(alarm: ITicketRecurrency): number {
		let at = 32503680000000; // 3000-01-01
		if (alarm && alarm.at) {
			at = alarm.at.getTime();
		}
		return at;
	}
}
