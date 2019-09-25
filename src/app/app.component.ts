import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { Helper } from './utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private service: AppService) {
		
	}

	@HostListener('window:beforeunload', ['$event'])
	handleBeforeClose(event) {
		Helper.openSnackBar(this.service._snackBar, 'please sync local data to cloud before leave');
		event.preventDefault();
		event.returnValue = 'We need to sync local data to cloud, before leave ...';
		return event;
	}

}
