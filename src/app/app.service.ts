import { Injectable } from '@angular/core';
import { EPageState, Ticket } from './app.model';
import { mockTickets } from './mock/tickets.mock';

// import * as Evernote from 'evernote';

export const callbackUrl = "http://localhost:4200/oauth_callback";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentPage: EPageState;
  
  // store tickets data here
  tickets: Array<Ticket>;

  evernoteClient: any;
  oauthToken: string;
  oauthTokenSecret: string;

  constructor() {
	  this.currentPage = EPageState.today;
	  this.tickets = mockTickets;
	//   this.initClient();
   }

//    initClient(): void {
// 		this.evernoteClient = new Evernote.Client({
// 			consumerKey: 'sssunsha',
// 			consumerSecret: '04568e43ebe655a7',
// 			sandbox: true,
// 			china: false,
// 		});
// 		this.fetchOAuthToken();
//    }

//    fetchOAuthToken(): void {
// 	   this.evernoteClient.getRequestToken(callbackUrl, (error, oauthToken, oauthTokenSecret) => {
// 		   if(error) {
// 			   console.error(error);
// 		   } else {
// 			   this.oauthToken = oauthToken;
// 			   this.oauthTokenSecret = oauthTokenSecret;
// 			   console.log('[Appservice]fetchOAuthToken: succeed.');
// 		   }
// 	   });
//    }
}
