import { Injectable } from '@angular/core';
import { EPageState, Ticket } from './app.model';
import { mockTickets } from './mock/tickets.mock';

import * as Evernote from 'evernote';

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
	  this.initClient();
   }

   initClient(): void {
	   this.evernoteClient =  new Evernote.Client({sandbox: false, token: 'S=s31:U=6d0aeb:E=16c040e783b:\
	   C=16be001f0c0:P=1cd:A=en-devtoken:V=2:H=c4e0572c15d3c83875ed799e0364dd4a'});

	   const noteStore = this.evernoteClient.getNoteStore();
	   noteStore.listNotebooks((notebooks => {
		   notebooks.forEach(notebook => {
			   console.log('notebook: ' + notebook.name);
		   });
	   }));

	}
}
