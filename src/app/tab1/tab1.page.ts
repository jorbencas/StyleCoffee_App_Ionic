import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CoffeeService, User, UserService } from '../core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
    private toastCtrl : ToastController,
    public modalCtrl: ModalController,
    private CoffeeService:CoffeeService,
    private userService: UserService) { }

    
  segment = 'all';
  infos = [];
  ref = firebase.database().ref('pictures');
  color = 'default';
  colorSecundary = 'default';
  visible = false;
  authenticated = false;
  currentUser: User;

    dayIndex = 0;
    tab_active = 1;
    queryText = '';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;
    coffees = [];

  ngOnInit(): void {
    console.log(this.router);
    this.presentLoading();
    this.ref.on('value', resp => {
      this.infos = snapshotToArray(resp);
      /* setTimeout(() => {
        this.stopLoading();
      }, 1000); */
    });

    this.CoffeeService.getAllcoffe().subscribe(coffees =>{
      this.coffees.push(coffees);
      //this.stopLoading();
    });
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        if(this.currentUser.usuario !== '') this.authenticated = true;
      }
    );
    
  }

/*   ngAfterContentInit() {
    
  } */

  setab(tab: number) { this.tab_active = tab};
 
 /*  onToggleFavorite(){
    
  } */

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

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Cargando',
      cssClass: 'custom-class custom-loading',
      duration: 1000
    });

    return await loading.present();
  }
  async stopLoading() {
    return await this.loadingController.dismiss();
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
