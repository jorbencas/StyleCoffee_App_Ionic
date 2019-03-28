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
  id = 0;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.CoffeeService.getCoffee(this.id).subscribe(coffee => {
        this.coffee.push(coffee);
      });
    });
  }
}
