import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* import * as firebase from 'firebase'; */
import { BookService,  User, UserService, } from '../core';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})

export class DetailsPage implements OnInit  {

  infos = [];
  isbn = "";
  authcolor = 'default';
  authenticated = false;
  currentUser: User;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private BookService: BookService,
    private userService: UserService,){
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isbn = params['isbn'];
      this.BookService.getBook(this.isbn).subscribe(book =>{
        this.infos.push(book);
      });
    });
    this.cangetauth();
  }

  cangetauth() {
    if (!this.authenticated) {
      this.userService.currentUser.subscribe(
        (userData) => {
          this.currentUser = userData;
          if (this.currentUser.usuario !== undefined) {
            this.authenticated = true;
            this.authcolor = 'dark';
          }
        }
      );
    }
  }
  
}
