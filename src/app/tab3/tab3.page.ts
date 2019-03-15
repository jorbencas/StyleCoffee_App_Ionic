import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(private CoffeeService:CoffeeService ){}
  coffees = [];
  color = 'default';
  colorSecundary = 'default';
  ngOnInit(): void {
    
    this.CoffeeService.getAllcoffe().subscribe(coffees =>{
      this.coffees.push(coffees);
      console.log(coffees);
    });
  }


  clickEventHandler(event) {
    if (event.color === 'default') {
      event.color = 'danger';
    } else {
      event.color = 'default';
    }
  }

  clickEventHandlerSave(event){
    if(event.colorSecundary === 'dark'){
      event.colorSecundary = 'default'
    }else{
      this.colorSecundary = 'dark';
      event.colorSecundary = this.colorSecundary
    }

  }
}
