import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';


@Component({
    selector: 'app-edit',
    templateUrl: 'edit.page.html',
    styleUrls: ['edit.page.scss']
  })

export class EditPage implements OnInit{
  
   infos = [];
   ref = firebase.database().ref('pictures');
   title = 'app';
    color = 'red';
    //name = [{id:'1',name:'jorge', color:'danger'},{id:'2',name:'Alex',color:'primary'},{id:'3',name:'Carlos',color:'waring'}]
  
    constructor(
      private router: Router ,
      public loadingController: LoadingController){}
  
      ngOnInit(): void {
        this.loaddata();
       }
  
    async loaddata(){
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      await this.ref.on('value', resp => {
        this.infos = [];
        this.infos = snapshotToArray(resp);
      });
      loading.dismiss();
    }
   
  }
  
  export const snapshotToArray = snapshot => {
    let returnArr = [];
  
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        
        returnArr.push(item);
    });
  
    return returnArr;
  }
