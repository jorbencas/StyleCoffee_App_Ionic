import { environment } from './../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { timeInterval} from 'rxjs/operators';
import { User, UserService } from './core';
import { ActivatedRoute, Router } from '@angular/router';

  // Initialize Firebase
  var config = {
    apiKey:  environment.apiKey,
    authDomain:  environment.authDomain,
    databaseURL:  environment.databaseURL,
    projectId:  environment.projectId,
    storageBucket:  environment.storageBucket,
    messagingSenderId:  environment.messagingSenderId
  };

  var sourcef = timer(4000, 3000).pipe(
    timeInterval()
  )

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.scss']
  
})
export class AppComponent implements OnInit {
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeApp();
  }

  
 showSplash = true; // <-- show animation
 currentUser: User;
 busqueda: '';
 visible = false;

 public appPages = [
   {
     title: 'Home',
     url: '/tabs',
     icon: 'home'
   },
   {
     title: 'login',
     url: '/login',
     icon: 'person'
   },
   {
     title: 'Configuración',
     url: '/list',
     icon: 'settings'
   },
   {
     title: 'Chat',
     url: '/xat',
     icon: 'chatboxes'
   },
   {
     title: 'Administración',
     url: '/xat',
     icon: 'chatboxes'
   },
   {
     title: 'Reservas',
     url: '/reserve-list',
     icon: 'chatboxes'
   },
   {
     title: 'Favoritos',
     url: '/xat',
     icon: 'chatboxes'
   }
 ];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image
      sourcef.subscribe(() => {this.showSplash = false});
    });
    
    firebase.initializeApp(config);
  }



  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    /* if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'white');
    } */
  }
}
