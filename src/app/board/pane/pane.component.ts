import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { EPageState } from '../../app.model';


@Component({
  selector: 'app-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.scss']
})
export class PaneComponent implements OnInit {

  constructor(
	  private service: AppService
  ) { }

  ngOnInit() {
  }

  onClick(event): void {
	this.service.currentPage = event;
}

}
