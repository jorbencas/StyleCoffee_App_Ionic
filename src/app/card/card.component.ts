import { Component, OnInit } from '@angular/core';
import { CardService } from '../core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor( private cardservices: CardService) { }

  ngOnInit() {
    
  }

}
