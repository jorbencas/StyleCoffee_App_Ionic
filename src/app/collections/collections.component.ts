import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsListComponent implements OnInit {

  constructor( private Collectionsservices: CollectionsService) { }
  products = [];
  ngOnInit() {
   /*  this.Collectionsservices.getAllProducts().subscribe(products =>{
      this.products.push(products);
    }); */
  }

}
