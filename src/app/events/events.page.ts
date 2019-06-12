import { Component, OnInit } from '@angular/core';
import { EventsService,  User, UserService, BookService} from '../core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage implements OnInit {
  constructor(private eventservice:EventsService,  
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private userService: UserService,
    private bookservice: BookService,
    public loadingController: LoadingController,
      ){}
      authenticated = false;
      currentUser: User;
      tab_active = 'list';
      addevent = false;
      filter = 'disabled';
      event = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        allDay: false
      };
     
      minDate = new Date().toISOString();
      authors = [];
      authors2 = [];

      eventSource = [];
      eventSource2 = [];
      myevents_original = [];
      myevents = [];
      viewTitle;
     
     
  ngOnInit(): void {
    this.cangetauth();
  }
 
  ionViewWillEnter(){
    this.presentLoading();
    this.bookservice.getAll().subscribe(authors =>{
      authors.forEach(a =>{
        a['select'] = false;
        a['text'] = a['name'];
        a['name'] = this.filters(a['name']);
        this.authors.push(a);
      });
    });

    this.eventservice.getAllEvents().subscribe(events => {
      console.log(events);
      this.eventSource2 = events.map( e => { if(e['usuario'] == null){  e['checked'] = false; return e; } });
      this.eventSource = events.map( e => { if(e['usuario'] == null){ return e; } });;
      console.log(this.eventSource);
    });


    if(this.currentUser.usuario){
      this.eventservice.getAllEvents().subscribe(events => {
        console.log(events);
        this.eventSource2 = events.map( e => { if(e['usuario'] == null){  e['checked'] = false; return e; } });
        this.eventSource =  events.map( e => { if(e['usuario'] == null){ return e; } });;;
        console.log(this.eventSource);
      });
  
      let user = this.currentUser.usuario;
      this.eventservice.getMyevents(user).subscribe(events => {
        this.myevents_original = events.map( e => { e['checked'] = true; return e; });
        this.myevents = this.myevents_original;
      });

      this.eventservice.getMyauthors(user).subscribe(authors => {
        authors.forEach(a =>{
          a['select'] = false;
          a['text'] = a['name'];
          a['name'] = this.filters(a['name']);
          this.authors2.push(a);
        });
      });
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Cargando',
      cssClass: 'custom-class custom-loading',
      duration: 1000
    });

    return await loading.present();
  }

  ionViewCanEnter() {
    this.stopLoading();
  }
  async stopLoading() {
    return await this.loadingController.dismiss();
  }

  setab(tab: string) {
    this.tab_active = tab;

    if(this.tab_active == 'list'){
      let user = this.currentUser.usuario;
      this.eventservice.getMyevents(user).subscribe(events => {
        this.myevents_original = events.map( e => { e['checked'] = true; return e; });
        this.myevents = this.myevents_original;
      });

      this.eventservice.getMyauthors(user).subscribe(authors => {
        this.authors2 = [];
        authors.forEach(a =>{
          a['select'] = false;
          a['text'] = a['name'];
          a['name'] = this.filters(a['name']);

          this.authors2.push(a);
        });
      });
    }
  };

  findauthor(id){
    const filtrados = this.eventSource.filter(e => e['idauthor'] === id['id'] );
    console.log(filtrados);
    this.eventSource = filtrados.map( e => e);
    if(!id.select){
      id.name = id.text;
    }else{
      id.name = id.name.substring(0,7) +"...";
      this.eventSource = this.eventSource2;
    }
    id.select = !id.select ? true : false ;
  }

  ngAfterContentChecked() {
    if(this.authors.find( e => e['select'] == true) || this.eventSource.length !== this.eventSource2.length){
      {
        this.eventSource2 = this.eventSource;
      }
      
    }
  }
  filters(val){
    console.log(val);
    return val = val.length > 8 ? val.substring(0,7) +"...":val;
  }

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

  subscribeevent(element){
    let user = this.currentUser.usuario;
    let param = {'id':element.id,'usuario': user};

    this.eventservice.addElement(param).subscribe(e =>{
      console.log(e);
      element.checked =  true;
    });
  }

  unsubscribeevent(element){
    let user = this.currentUser.usuario;
    let param = {'id':element.id,'usuario': user};

    this.eventservice.removeElement(param).subscribe(e =>{
      console.log(e);
      element.checked = false;
    });
  };

  hendleevent(element){
    if(!element['checked']) this.subscribeevent(element);
    else this.unsubscribeevent(element);
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  async viewdetails(event){
    if(event['expand']){
      const alert = await this.alertCtrl.create({
        header: event.name,
        subHeader: event.description,
        message: 'From: ' + event.timestart + '<br><br>To: ' + event.timeend,
        buttons: ['OK']
      });
      alert.present();
      event['expand'] = false;
    }else{
      event['expand'] = true;
    }
   
  }
}
