import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../app.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input()
	ticket: Ticket;
  constructor() { }

  ngOnInit() {
  }

}
