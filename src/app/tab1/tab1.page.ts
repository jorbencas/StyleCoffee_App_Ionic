import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CoffeeService } from '../core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  segment = 'all';
  infos = [];
  ref = firebase.database().ref('pictures');
  color = 'default';
  colorSecundary = 'default';
  //name = [{ id: '1', name: 'jorge', color: 'danger' }, { id: '2', name: 'Alex', color: 'primary' }, { id: '3', name: 'Carlos', color: 'waring' }]
 
  constructor(
    public alertCtrl: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private toastCtrl : ToastController,
    public modalCtrl: ModalController,
    private CoffeeService:CoffeeService) { }

    dayIndex = 0;
    tab_active = 1;
    queryText = '';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;
    coffees = [];

  ngOnInit(): void {
    this.loaddata();
    this.CoffeeService.getAllcoffe().subscribe(coffees =>{
      this.coffees.push(coffees);
    });
  }

  ngAfterContentInit() {
    
  }

  setab(tab: number) { this.tab_active = tab};
 
  onToggleFavorite(){
    
  }
/*
  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      await alert.present();
    }
    
  
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
