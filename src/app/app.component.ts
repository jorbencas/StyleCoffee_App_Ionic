import { environment } from './../environments/environment.prod';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { timeInterval} from 'rxjs/operators';

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
export class AppComponent {
  /*public appPages = [
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
      url: '/xat',
      icon: 'chatboxes'
    },
    {
      title: 'Favoritos',
      url: '/xat',
      icon: 'chatboxes'
    }
  ];*/
  
  
  
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  
 showSplash = true; // <-- show animation

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image
      sourcef.subscribe(() => {this.showSplash = false});
    });
    
    firebase.initializeApp(config);
  }
}
