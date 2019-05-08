import { Component, OnInit } from '@angular/core';
import { CollectionsService, User, UserService } from '../core';
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
    private userService: UserService,
    private fb: FormBuilder) {
      
    this.authForm = this.fb.group({
      'collectionname': ['', Validators.maxLength(25)]
    });
     }
     
  collections = [];
  element = {};
  addcollection = false;
  authenticated = false;
  currentUser: User;

  ngOnInit() {
    this.Collectionsservices.getAllcollections().subscribe(collections =>{
      this.collections.push(collections);
    });
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  addelement(){
    this.element = {'user':this.currentUser.usuario,'name':this.authForm};
    this.Collectionsservices.addelement(this.element);
  }

  submitForm (){
    this.Collectionsservices.addCollection(this.authForm.value);
  }
}
