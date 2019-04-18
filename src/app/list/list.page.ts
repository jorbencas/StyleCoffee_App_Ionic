import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../core';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  items = [];
  constructor(private FavoriteService: FavoriteService) {}

  ngOnInit() {
    this.FavoriteService.getAllFavorites().subscribe(favorite => {
      this.items.push(favorite);
    });
  }
  
}
