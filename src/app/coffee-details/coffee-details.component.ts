import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss']
})
export class CoffeeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private CoffeeService: CoffeeService) { }

  coffee = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.CoffeeService.getCoffee(id).subscribe(coffee => {
        this.coffee.push(coffee);
      });
    });
  }
}
