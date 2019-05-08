import { Component, OnInit } from '@angular/core';
import { CollectionsService, User, UserService  } from '../core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsListComponent implements OnInit {

  constructor( private Collectionsservices: CollectionsService,
    private userService: UserService,) { }
  collections = [];
  
  addcollection = false;
  authenticated = false;
  currentUser: User;
  
  search = false;
  queryText = '';


  ngOnInit() {
    this.Collectionsservices.getAllcollections().subscribe(collections =>{
      this.collections.push(collections);
    });
  }

  
  
  cansearch(){
    this.search = this.search ? false : true;
  }

  updateSchedule(){
    console.log(this.queryText);
  }

  cangetauth() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
        if(authenticated){
          this.currentUser = this.userService.getCurrentUser();
        }
      }
    );   
  }

  
  delete(collection){
    this.Collectionsservices.deletecolection(collection);
  }

  ngAfterContentChecked() {
    this.Collectionsservices.getAllcollections().subscribe(collections =>{
      this.collections.push(collections);
    });
  }
}
