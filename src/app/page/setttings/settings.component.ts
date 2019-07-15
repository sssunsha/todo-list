import { Component, OnInit } from '@angular/core';
import { cosConfig } from '../../shared/app.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	_cosConfig: object;
  constructor() { 
	  this._cosConfig = cosConfig;
  }

  ngOnInit() {
  }

}
