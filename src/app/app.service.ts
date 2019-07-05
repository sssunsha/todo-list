import { Injectable } from '@angular/core';
import { pageState } from './app.model';


@Injectable({
  providedIn: 'root'
})
export class AppService {
	currentPage: pageState;

  constructor() {
	  this.currentPage = pageState.today;
   }
}
