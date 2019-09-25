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
			this.service.isNeedToClose = true;
			this.service.startSync();
			Helper.openSnackBar(this.service._snackBar, 'sync before leave ...');
			event.preventDefault();
			event.returnValue = 'We need to sync local data to cloud, before leave ...';
			return event;
		} 
	}

}
