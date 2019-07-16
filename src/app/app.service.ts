import { Injectable } from '@angular/core';
import { EPageState, Ticket, TicketFile } from './app.model';
import { mockTickets } from './mock/tickets.mock';
import * as COS from 'cos-js-sdk-v5';
import { cosConfig, appConfig } from './shared/app.config';
import { Observable, Subject } from 'rxjs';
import { Helper } from './utils';
import * as FileSaver from 'file-saver';



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

  constructor() {
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
		window.setTimeout(()=> {
			// TODO: do the data sync with soc service here
			subject.next(1);
			subject.complete();
		}, 3000);
		return subject.asObservable();
	}

	prepareSocFile(): void {

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
				}
			});
	}

	uploadTicketFileToSOC(): void {

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
		const ticketFile: TicketFile = {
			version: Helper.generateVersion(),
			modifiedAt: Helper.generateCreatedAt(),
			value: this.tickets,
		}

		let blob = new Blob([JSON.stringify(ticketFile)], {type: "application/json;charset=utf-8"});
		FileSaver.saveAs(blob, `${Helper.generateTicketFileName()}`);
	}
}
