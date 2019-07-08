import { Component, OnInit, Input } from '@angular/core';
import { ETicketEffort } from '../../app.model';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
	@Input()
	effort: ETicketEffort;
  constructor() { }

  ngOnInit() {
  }

}
