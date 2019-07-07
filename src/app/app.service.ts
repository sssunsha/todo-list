import { Injectable } from '@angular/core';
import { EPageState, Ticket } from './app.model';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentPage: EPageState;
  
  // store tickets data here
  tickets: Array<Ticket>;

  constructor() {
	  this.currentPage = EPageState.today;
   }
}
