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


  ngOnInit() {
    this.cangetauth();

    this.Collectionsservices.getCollectionsUser(this.currentUser.usuario).subscribe(collections =>{
      this.collections = collections.map(e => e);
    });
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
    let user = this.currentUser.usuario;
    this.Collectionsservices.deletecolection(collection, user).subscribe( collections => {
      console.log(collections);
      this.collections = collections.map(e => e);
    });
  }

}
