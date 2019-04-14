import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(
    private userService: UserService) { }

  currentUser: User;
  auth = false;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        if(this.currentUser.usuario  !== undefined){
          console.log(this.currentUser.usuario);
          this.auth = true;
        }
      }
    );
  }

}
