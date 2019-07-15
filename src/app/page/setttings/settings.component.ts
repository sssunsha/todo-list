import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import {Md5} from "ts-md5";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
	_cosConfig: any;
  _appConfig: any;
  checkSum: string;
  constructor(private service: AppService) { 
	  this._cosConfig = this.service.cosConfig;
    this._appConfig = this.service.appConfig;
    this.checkSum = Md5.hashStr(JSON.stringify(this._appConfig) + JSON.stringify(this._cosConfig)).toString();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    const newCheckSum = Md5.hashStr(JSON.stringify(this._appConfig) + JSON.stringify(this._cosConfig)).toString();
    if (newCheckSum !== this.checkSum) {
      // the config has changed, should reload settings
      this.service.init();
    }
  }
}
