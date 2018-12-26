import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})

export class DetailsPage implements OnInit  {

  infos = [];
  ref = firebase.database().ref('pictures');
  id = 0;
  constructor(private route: ActivatedRoute, private router: Router){
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.ref.on('value', resp => {
        this.infos = [];
        this.infos = this.snapshotToArray(resp);
      });
    });
  }

  snapshotToArray(snapshot) {
    let returnArr = [];
  
    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      console.log(item);
      console.log(this.id)
      if(item.id === this.id)
      returnArr.push(item);
  });
  return returnArr;
  }
}
