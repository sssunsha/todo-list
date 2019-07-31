import { Injectable, OnDestroy } from '@angular/core';
import { EPageState, Ticket, TicketFile } from './app.model';
import * as COS from 'cos-js-sdk-v5';
import { cosConfig, appConfig } from './shared/app.config';
import { Observable, Subject } from 'rxjs';
import { Helper } from './utils';
import * as FileSaver from 'file-saver';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlarmService } from './alarm.service';



@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy{
  currentPage: EPageState;
  
  // store tickets data here
  private tickets: Array<Ticket> = [];
  ticketsSubject: Subject<any> = new Subject<any>();
  // mark the current working on tickets
  private workingOnTickets: Array<Ticket> = [];
  workingOnTicketsSubject: Subject<any> = new Subject<any>();

  // config data
  cosConfig = cosConfig;
  appConfig = appConfig;

  // cos client object
  cos: any;
  cosFileVersion: number;
  modifiedAt: string;

  // autoSync handler
  autoSyncHandler = null;

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
	   this.startAutoSync();
   }

   ngOnDestroy() {
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

   setWorkingOnTickets(tickets: Array<Ticket>): void {
	   this.workingOnTickets = tickets;
	   this.workingOnTicketsSubject.next('workingOnTicket set updated');
   }

   pushIntoWorkingOnTicket(ticket: Ticket): void {
	   this.workingOnTickets.push(ticket);
	   this.workingOnTicketsSubject.next('workingOnTicket push updated');
   }

   notifyTicketsChanged(): void {
	   this.ticketsSubject.next('ticket notified updated');
   }

   notifyWorkingOnTicketsChanged(): void {
	   this.workingOnTicketsSubject.next('workingOnTicket notified updated');
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
					Helper.openSnackBar(this._snackBar, 'download ticket file finished');
					// start alram setup
					this.alarmService.prepareAlarmConfigList(this.tickets);
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
				} else {
					console.error(err);
				}
				subject.next(1);
				subject.complete();
		});
	}

// auto sync ===========================================================================================
	startAutoSync(): void {
		if(this.appConfig.isAutoSync && this.appConfig.syncInterval) {
			this.autoSyncHandler = window.setInterval(() => {
				// start the sync
				this.startSync()
			}, this.appConfig.syncInterval * 1000);
		}
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
			Helper.openSnackBar(this._snackBar, 'retrieve backup ticket file finished');
		}
	}



// tickets save as file to backup
	startSaveASFile(): void {
		let blob = new Blob([JSON.stringify(Helper.generateTicketFile(this.getTickets()))], {type: "application/json;charset=utf-8"});
		FileSaver.saveAs(blob, `${Helper.generateTicketFileName()}`);
	}
}
