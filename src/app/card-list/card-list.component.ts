import { Component, OnInit } from '@angular/core';
import { CardService } from '../core';
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  constructor( private cardservices: CardService) { }
  products = [];
  ngOnInit() {
   /*  this.cardservices.getAllProducts().subscribe(products =>{
      this.products.push(products);
    }); */
  }

}
