import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 infos = [];
 ref = firebase.database().ref('pictures');

  constructor(private router: Router){
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    });
  }
  title = 'app';
  color = 'red';
  name = [{id:'1',name:'jorge', color:'danger'},{id:'2',name:'Alex',color:'primary'},{id:'3',name:'Carlos',color:'waring'}]

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      
      returnArr.push(item);
  });

  return returnArr;
}