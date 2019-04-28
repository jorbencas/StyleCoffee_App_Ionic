import { Component, OnInit } from '@angular/core';
import { FavoriteService, User, UserService } from '../core';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  items = [];
  currentUser: User;

  constructor(private FavoriteService: FavoriteService,
    private userService: UserService,) {}

  ngOnInit() {
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
