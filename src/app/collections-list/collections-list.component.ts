import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionsService  User, UserService } from '../core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent implements OnInit {

  constructor( 
    private Collectionsservices: CollectionsService,
    public modalCtrl: ModalController,
    private userservice: UserService) { }

  collections = [];
  collectionname = "";
  eleement = {};

  @ViewChild('element')
  
  ngOnInit() {
    this.Collectionsservices.getAllcollections().subscribe(collections =>{
      this.collections.push(collections);
    });
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }

  addelement(){
    let user = this.userservice.getCurrentUser();
    this.eleement = {'user':user,'name':this.collectionname,'idbook':,'idcoffee':0};
    this.Collectionsservices.addelement(this.eleement);
  }

  Submiting (){
    this.Collectionsservices.addCollection(this.collectionname);
  }
}
