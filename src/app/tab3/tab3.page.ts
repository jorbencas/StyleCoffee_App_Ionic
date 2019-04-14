import { Component, OnInit, ViewChild } from '@angular/core';
import { CoffeeService } from '../core';
import { CalendarComponent } from 'ionic2-calendar/calendar';

import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(private CoffeeService:CoffeeService,  public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
      ){}
  collapseCard = false;
  eventSource: [];
  viewtitle = 'Events';
  event = {
    title: '',
    desc: '',
    startTime: new Date().toUTCString(),
    endTime: new Date().toUTCString(),
    allDay: false
  };


  @ViewChild(CalendarComponent) mycal: CalendarComponent;

  ngOnInit(): void {
    this.resetEvent();
  }
  calendar = {
    mode: "week",
    currentDate: new Date().toUTCString()
  }

  addEvent(){
    let eventCopy = {
      title: this.event.title,
      desc: this.event.desc,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay
    }

    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()+ 1));
      this.mycal.loadEvents();
      this.resetEvent(); 
    }

    this.eventSource.push(eventCopy);

  }

  removeEvent(){

  }

  onCurrentDateChanged(){

  }

  reloadSource(){

  }
  onEventSelected(){

  }

  onViewTitleChanged(){

  }

  onTimeSelected(){

  }

  resetEvent(){
    this.event = {
    title: '',
    desc: '',
    startTime: new Date().toUTCString(),
    endTime: new Date().toUTCString(),
    allDay: true
    }
  }
  /*
  clickEventHandler(event) {
    if (event.color === 'default') {
      event.color = 'danger';
    } else {
      event.color = 'default';
    }
  }

  clickEventHandlerSave(event){
    if(event.colorSecundary === 'dark'){
      this.colorSecundary = 'default';
      event.colorSecundary = this.colorSecundary;
    }else{
      this.colorSecundary = 'dark';
      event.colorSecundary = this.colorSecundary;
    }

  }*/


  async presentFilter() {
    /* const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateSchedule();
    } */
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    /* if (this.user.hasFavorite(sessionData.name)) {
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
    } */

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            //this.user.removeFavorite(sessionData.name);
            //this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

}
