import { Injectable } from '@angular/core';
import { EPageState, Ticket } from './app.model';
import { mockTickets } from './mock/tickets.mock';
import * as COS from 'cos-js-sdk-v5';
import { cosConfig, appConfig } from './shared/app.config';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentPage: EPageState;
  
  // store tickets data here
  tickets: Array<Ticket>;

  // config data
  cosConfig = cosConfig;
  appConfig = appConfig;

  // cos client object
  cos: any;

  constructor() {
	  this.currentPage = EPageState.today;
	  this.tickets = mockTickets;
	  this.initClient();
   }

   initClient(): void {
	   this.cos = new COS({
		   SecretId: this.cosConfig.SecretId,
		   SecretKey: this.cosConfig.SecretKey,
	   });
	   this.cos.getBucket({
		Bucket: this.cosConfig.Bucket,
		Region: this.cosConfig.Region,
		Prefix: 'todo-list/',
	}, function (err, data) {
		console.log(err || data.Contents);
	});
	}
}
