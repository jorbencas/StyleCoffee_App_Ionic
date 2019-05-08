import { Component, OnInit } from '@angular/core';
import { ReserveService ,User, UserService } from '../core';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.scss']
})
export class ReserveListComponent implements OnInit {

  constructor(private reserveservices: ReserveService,
    private userService: UserService) { }
  list = [];
  reserve: {};
  authenticated = false;
  currentUser: User;
  
  search = false;
  queryText = '';

  ngOnInit() {
    this.cangetauth();
    this.reserveservices.getAllReserves().subscribe(reserve => {
      this.list.push(reserve);
      console.log(this.list);
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

  deletereserve(reserve){
    this.reserveservices.removeReserve(reserve).subscribe(data => {
      console.log("Rerve hecha");
    });

    this.reserveservices.getAllReserves().subscribe(reserve => {
      this.list.push(reserve);
    });

  }
}
