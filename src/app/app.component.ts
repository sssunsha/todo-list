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
	}

}
