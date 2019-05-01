import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsListComponent implements OnInit {

  constructor( private Collectionsservices: CollectionsService) { }
  collections = [];

  ngOnInit() {
    this.Collectionsservices.getAllcollections().subscribe(collections =>{
      this.collections.push(collections);
    });
  }

  
  delete(collection){
    this.Collectionsservices.deletecolection(collection);
  }
}
