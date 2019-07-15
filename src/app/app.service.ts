import { Injectable } from '@angular/core';
import { EPageState, Ticket } from './app.model';
import { mockTickets } from './mock/tickets.mock';
import * as COS from 'cos-js-sdk-v5';
import { cosConfig } from './shared/app.config';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentPage: EPageState;
  
  // store tickets data here
  tickets: Array<Ticket>;
  cos: any;

  constructor() {
	  this.currentPage = EPageState.today;
	  this.tickets = mockTickets;
	  this.initClient();
   }

   initClient(): void {
	   this.cos = new COS({
		   SecretId: cosConfig.SecretId,
		   SecretKey: cosConfig.SecretKey,
	   });
	   this.cos.getBucket({
		Bucket: cosConfig.Bucket,
		Region: cosConfig.Region,
		Prefix: '',
	}, function (err, data) {
		console.log(err || data.Contents);
	});
	}
}
