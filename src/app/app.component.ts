import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Helper } from './utils';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	syncSubscription: Subscription;

	constructor(private service: AppService) {
		
	}

	ngOnInit() {
		this.syncSubscription = this.service.syncSubject.subscribe(res => {
			if (res && this.service.isNeedToClose) {
				// sync finished, close the window
				window.close();
			}
		})
	}

	@HostListener('window:beforeunload', ['$event'])
	handleBeforeClose(event) {
		if (!this.service.isNeedToClose) {
			this.service.beforeUnloadHnadler();
			event.preventDefault();
			event.returnValue = 'do something before leave ...';
			return event;
		} 
	}

}
