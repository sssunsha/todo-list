import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	_cosConfig: any;
	_appConfig: any;
  constructor(private service: AppService) { 
	  this._cosConfig = this.service.cosConfig;
	  this._appConfig = this.service.appConfig;
  }

  ngOnInit() {
  }
}
