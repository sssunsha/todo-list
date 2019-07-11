import { Injectable } from '@angular/core';
import { EPageState, Ticket } from './app.model';
import { mockTickets } from './mock/tickets.mock';
// import * as COS from 'cos-nodejs-sdk-v5';
import * as COS from 'cos-js-sdk-v5';

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
		   SecretId: 'AKIDDJEzZ0xJGvsssiRp7HRV4EIBtRo1p5tZ',
		   SecretKey: 'd4JMEwSr690vgFdppspdKqAJH4f4FLMC'
	   });
	   this.cos.getBucket({
		Bucket: 'dashboard-1255953405',
		Region: 'ap-chengdu',
		Prefix: '/',
	}, function (err, data) {
		console.log(err || data.Contents);
	});
	}
}
