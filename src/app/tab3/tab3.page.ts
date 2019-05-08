import { Component, OnInit } from '@angular/core';
import { EventsService,  User, UserService, BookService} from '../core';
/* import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Inject, LOCALE_ID } from '@angular/core'; */
import { formatDate } from '@angular/common';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(private eventservice:EventsService,  
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
   /*   @Inject(LOCALE_ID) private locale: string, */
    private userService: UserService,
    private bookservice: BookService
      ){}
      authenticated = false;
      currentUser: User;
      tab_active = 'list';
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
      search = false;
      queryText = '';
      eventSource = [];
      eventSource2 = [
        {
          title: 'Event 1',
        desc: 'Desce events 1 2 3 4 5',
        startTime: '',
        endTime: '',
        allDay: false
        },{
          title: 'Event 2',
        desc: 'Desce events 1 2 3 4 5',
        startTime: '',
        endTime: '',
        allDay: false
        },{
          title: 'Event 3',
        desc: 'Desce events 1 2 3 4 5',
        startTime: '',
        endTime: '',
        allDay: false
        },{
          title: 'Event 4',
        desc: 'Desce events 1 2 3 4 5',
        startTime: '',
        endTime: '',
        allDay: false
        }
      ];
      viewTitle;
     
     /*  calendar = {
        mode: 'month',
        currentDate: new Date(),
      };
     
      @ViewChild(CalendarComponent) myCal: CalendarComponent; */
     
  ngOnInit(): void {
    //this.resetEvent();
    this.cangetauth();
    this.bookservice.getAll().subscribe(authors =>{
      authors.forEach(a =>{
        this.authors.push(a);
      });
    });
    console.log(this.authenticated);
    /* this.eventservice.getAllEvents().subscribe(events => {
      events.forEach(e =>{
        this.eventSource2.push(e);
      });
    }); */
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

  cansearch(){
    this.search = this.search ? false : true;
  }

  updateSchedule(){
    console.log(this.queryText);
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
    this.eventservice.addEvent(eventCopy);
    //this.myCal.loadEvents();
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
 /*  changeMode(mode) {
    this.calendar.mode = mode;
  } */
  
  // Focus today
  /* today() {
    this.calendar.currentDate = new Date();
  } */
  
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  
  // Calendar event was clicked
  /* async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
  
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  } */
  
  // Time slot was clicked
/*   onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  } */

}
