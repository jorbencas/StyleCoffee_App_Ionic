import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReserveService } from '../core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  constructor(private reserveservices: ReserveService,
    private route: ActivatedRoute, 
    private router: Router) { }

    reserve = [];
  ngOnInit() {
    this.route.params.subscribe(params => {
      let action = params['actions'];
      let id = params['id'];
      if(action){
        switch (action){
          case "add":
            this.reserveservices.addReserve(id).subscribe(reserve => {
              this.reserve.push(reserve);
            });
            break;
          case "reserve":
            this.reserveservices.removeReserve(id).subscribe(reserve => {
              this.reserve.push(reserve);
            });
            break;
        }
      }else{
        this.reserveservices.getOneReserve(id).subscribe(reserve => {
          this.reserve.push(reserve);
        });
      }//end else 
    });
  }

}
