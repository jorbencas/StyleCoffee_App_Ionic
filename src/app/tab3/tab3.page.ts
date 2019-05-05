import { Component, OnInit, ViewChild } from '@angular/core';
import { CoffeeService,  User, UserService, BookService} from '../core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import {  Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(private CoffeeService:CoffeeService,  
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
     @Inject(LOCALE_ID) private locale: string,
    private userService: UserService,
    private bookservice: BookService
      ){}
      authenticated = false;
      currentUser: User;
      tab_active = 'calendar';
      addevent = false;
    
      event = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        allDay: false
      };
     
      minDate = new Date().toISOString();
     authors = [];
      eventSource = [];
      viewTitle;
     
      calendar = {
        mode: 'month',
        currentDate: new Date(),
      };
     
      @ViewChild(CalendarComponent) myCal: CalendarComponent;
     
  ngOnInit(): void {
    //this.resetEvent();
    this.bookservice.getAll().subscribe(authors =>{
      authors.forEach(a =>{
        this.authors.push(a);
      });
    });
  }
 
  setab(tab: string) {
    this.tab_active = tab;
  };

  cangetauth() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
        if(authenticated){
          this.currentUser = this.userService.getCurrentUser();
        }
      }
    );   
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }
   // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }



  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  
  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
  
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
  
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
  
  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

}
