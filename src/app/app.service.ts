import { Injectable } from '@angular/core';
import { EPageState, Ticket, TicketFile } from './app.model';
import { mockTickets } from './mock/tickets.mock';
import * as COS from 'cos-js-sdk-v5';
import { cosConfig, appConfig } from './shared/app.config';
import { Observable, Subject } from 'rxjs';
import { Helper } from './utils';
import * as FileSaver from 'file-saver';
import {MatSnackBar} from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentPage: EPageState;
  
  // store tickets data here
  tickets: Array<Ticket> = [];

  // config data
  cosConfig = cosConfig;
  appConfig = appConfig;

  // cos client object
  cos: any;
  cosFileVersion: number;
  modifiedAt: string;

  // autoSync handler
  autoSyncHandler = null;

  constructor(private _snackBar: MatSnackBar) {
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

	// download the relative ticket file on COS, and read the basic information
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
					this.tickets = ticketFileData.value;
					this.cosFileVersion = ticketFileData.version;
					this.modifiedAt = ticketFileData.modifiedAt;
					Helper.openSnackBar(this._snackBar, 'download ticket file finished');
				}
			});
	}

	uploadTicketFileToSOC(subject: Subject<any>): void {
		const key = Helper.generateTicketFilePath(this.appConfig.isLiveMode)
		this.cos.putObject({
			Bucket: this.cosConfig.Bucket,
			Region: this.cosConfig.Region,
			Key: key,
			Body: JSON.stringify(Helper.generateTicketFile(this.tickets))}, (err, data) => {
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

// local storage
	startLocalStage(): void {
		let blob = new Blob([JSON.stringify(Helper.generateTicketFile(this.tickets))], {type: "application/json;charset=utf-8"});
		FileSaver.saveAs(blob, `${Helper.generateTicketFileName()}`);
	}
}
