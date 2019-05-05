import { Component, OnInit } from '@angular/core';
import { CollectionsService, UserService } from '../core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})

export class CollectionsListComponent implements OnInit {

  authForm: FormGroup;

  constructor( 
    private Collectionsservices: CollectionsService,
    public modalCtrl: ModalController,
    private userservice: UserService,
    private fb: FormBuilder) {
      // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'collectionname': ['', Validators.maxLength(25)]
    });
     }
     
  collections = [];
  eleement = {};
   
  ngOnInit() {
    this.Collectionsservices.getAllcollections().subscribe(collections =>{
      this.collections.push(collections);
    });
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  addelement(){
    let user = this.userservice.getCurrentUser();
    this.eleement = {'user':user,'name':this.authForm};
    this.Collectionsservices.addelement(this.eleement);
  }

  submitForm (){
    this.Collectionsservices.addCollection(this.authForm.value);
  }
}
