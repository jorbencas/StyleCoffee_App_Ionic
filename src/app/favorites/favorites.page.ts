import { Component, OnInit } from '@angular/core';
import { FavoriteService, User, UserService } from '../core';
@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements OnInit {

  items = [];
  currentUser: User;
  authenticated = false;
  search = false;
  queryText = '';

  constructor(private FavoriteService: FavoriteService,
    private userService: UserService) {}

  ngOnInit() {
    this.cangetauth();
    this.FavoriteService.getAllFavorites().subscribe(favorite => {
      favorite.forEach(element => {
        console.log(element); 
        this.items.push(element);
      });
    });
    this.currentUser = this.userService.getCurrentUser();  
  }

  async removeFavorite(id) {
    if (this.hasFavorite(id)) {
      let user = this.currentUser.usuario;
      this.FavoriteService.removeFavorite(id, user).subscribe(data =>{
        if(data){
           // now present the alert on top of all other content
        }
      });
    }
  };

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

  hasFavorite(id) {
    let favorite = false;

    this.items.forEach(item => {
      if (item.isbn === id) {
        if (item.favorite === 1) favorite = false;
        else favorite = true;
      }
    });
    return favorite;
  }

  
}
