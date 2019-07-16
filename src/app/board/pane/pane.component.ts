import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { EPageState } from '../../app.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Helper } from '../../utils';


@Component({
  selector: 'app-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.scss']
})
export class PaneComponent implements OnInit {
	isSyncing: boolean;
  constructor(
	  private service: AppService,
	  private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
	  this.isSyncing = false;
  }

  onClick(event): void {
	this.service.currentPage = event;
}
	startSync(): void {
		this.isSyncing = true;
		this.service.startSync().subscribe(() => {
			this.isSyncing = false;
		});
	}
}
