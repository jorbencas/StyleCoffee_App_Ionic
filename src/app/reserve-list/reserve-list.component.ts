import { Component, OnInit } from '@angular/core';
import { ReserveService } from '../core';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.scss']
})
export class ReserveListComponent implements OnInit {

  constructor(private reserveservices: ReserveService) { }
  list = [];

  ngOnInit() {
    this.reserveservices.getAllReserves().subscribe(reserve => {
      this.list.push(reserve);
      console.log(this.list);
    });
  }

}
