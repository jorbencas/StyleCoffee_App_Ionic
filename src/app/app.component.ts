import { environment } from './../environments/environment.prod';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

  // Initialize Firebase
  var config = {
    apiKey:  environment.apiKey,
    authDomain:  environment.authDomain,
    databaseURL:  environment.databaseURL,
    projectId:  environment.projectId,
    storageBucket:  environment.storageBucket,
    messagingSenderId:  environment.messagingSenderId
  };

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
