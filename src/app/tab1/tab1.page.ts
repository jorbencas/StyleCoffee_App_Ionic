import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  infos = [];
  ref = firebase.database().ref('pictures');
  color = 'default';
  colorSecundary = 'default';
  //name = [{ id: '1', name: 'jorge', color: 'danger' }, { id: '2', name: 'Alex', color: 'primary' }, { id: '3', name: 'Carlos', color: 'waring' }]
 
  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private toastCtrl : ToastController) { }

  ngOnInit(): void {
    this.loaddata();
  }

  ngAfterContentInit() {
    
  }

  /*
async sendNotification(message: string) {
  let toast = await this.toastCtrl.create({
    message: message,
    duration: 3000
  });
  toast.present();

}
*/
  async loaddata() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Cargando',
      cssClass: 'custom-class custom-loading'
    });

    await loading.present();
    
    await this.ref.on('value', resp => {
      this.infos = snapshotToArray(resp);
      loading.dismiss();
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

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    returnArr.push(item);
  });

  return returnArr.reverse();
}
