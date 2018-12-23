import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router){}
  title = 'app';
  color = 'red';
  name = [{name:'jorge', color:'danger'},{name:'Alex',color:'primary'},{name:'Carlos',color:'waring'}]


  tittle(i,name){
    console.log(name);
    this.name.forEach(function(item){
      if (item == i ) {
        item.name = name;
      }
    });
  }

  changescolores(name, color){
    this.name.forEach(function(item){
      if (item.color == name ) {
        console.log(item.color);
        item.color = color; 
      }
    });
  }
}
