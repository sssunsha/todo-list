import { Component, OnInit, Input } from '@angular/core';
import { ETicktProgress } from '../../app.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
	@Input()
	progress: ETicktProgress;
  constructor() { }

  ngOnInit() {
  }

}
