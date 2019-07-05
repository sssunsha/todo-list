import { Injectable } from '@angular/core';
import { EPageState } from './app.model';


@Injectable({
  providedIn: 'root'
})
export class AppService {
	currentPage: EPageState;

  constructor() {
	  this.currentPage = EPageState.today;
   }
}
