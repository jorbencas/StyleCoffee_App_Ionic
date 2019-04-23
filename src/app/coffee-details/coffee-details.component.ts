import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService,  User, UserService, } from '../core';
@Component({
  selector: 'app-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss']
})
export class CoffeeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private CoffeeService: CoffeeService,
    private userService: UserService,) { }

  coffee = [];
  id = 0;
  authcolor = 'default';
  authenticated = false;
  currentUser: User;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.CoffeeService.getCoffee(this.id).subscribe(coffee => {
        this.coffee.push(coffee);
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
