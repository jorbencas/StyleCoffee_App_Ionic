import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import * as firebase from 'firebase'; */
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CoffeeService, User, UserService, BookService, FavoriteService } from '../core';

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
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private CoffeeService: CoffeeService,
    private BookService: BookService,
    private userService: UserService,
    private FavoriteService: FavoriteService
  ) { }

  infos = [];
  color = 'default';
  colorSecundary = 'default';
  visible = false;
  authenticated = false;
  currentUser: User;
  tab_active = 'book';
  coffees = [];
  contentavaible = false;

  ngOnInit(): void {

    
  /*   this.BookService.createBook(book).subscribe(book =>{
      console.log(book);
    }); */
    
    this.presentLoading();

    this.route.params.subscribe(param => {
      let genere = param['genere'];
      let kind = param['kind'];

      if (genere) {
        this.BookService.getBookbyGenere(genere).subscribe(book => {
          this.infos.push(book);
        });
      } else if (kind) {
        this.CoffeeService.getByKind(kind).subscribe(coffee => {
          this.coffees.push(coffee);
        });
      } else {
        this.BookService.getAll().subscribe(book => {
          this.infos.push(book);
        });
        this.CoffeeService.getAllcoffe().subscribe(coffees => {
          this.coffees.push(coffees);
        });
      }
    });
    console.log( this.infos.length);
    console.log(this.coffees.length);
    this.cangetdata();
    this.cangetauth();

    setTimeout(() => { this.stopLoading() }, 1000);
  }

  setab(tab: string) {
    this.tab_active = tab;
    this.cangetdata();
    console.log(this.contentavaible);
  };

  cangetdata() {
    if (this.tab_active === 'book' && this.infos.length > 0) {
      this.contentavaible = true;
    } else if (this.tab_active === 'coffee' && this.coffees.length > 0) {
      this.contentavaible = true;
    } else {
      this.contentavaible = false;
    }
  }

  cangetauth() {
    if (!this.authenticated) {
      this.userService.currentUser.subscribe(
        (userData) => {
          this.currentUser = userData;
          if (this.currentUser.usuario !== '') this.authenticated = true;
        }
      );
    }
  }

  async removeFavorite(id) {
    if (this.hasFavorite(id)) {
      // create an alert instance
      const alert = await this.alertCtrl.create({
        header: 'Favorite removed',
        buttons: [{
          text: 'OK'
        }]
      });

      let user = this.currentUser.usuario;
      this.FavoriteService.removeFavorite(id, user);

      // now present the alert on top of all other content
      await alert.present();
    }
  };

  async addFavorite(id) {
    // create an alert instance
    if (this.hasFavorite(id)) {
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK'
        }]
      });

      let user = this.currentUser.usuario;
      this.FavoriteService.addFavorite(id,user);

      // now present the alert on top of all other content
      await alert.present();
    }

  }

  hasFavorite(id) {
    let favorite = false;
    this.infos.forEach((item, i) => {
      if (item.isbn === id) {
        if (item.favorite) favorite = false;
        else favorite = true;
      }
    });
    return favorite;
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

  async stopLoading() {
    return await this.loadingController.dismiss();
  }

  clickEventHandler(event) {
    if (event.color === 'default') {
      event.color = 'danger';
      this.addFavorite(event.id);
    } else {
      event.color = 'default';
      this.removeFavorite(event.id);
    }
  }

  clickEventHandlerSave(event) {
    if (event.colorSecundary === 'dark') {
      this.colorSecundary = 'default';
      event.colorSecundary = this.colorSecundary;
    } else {
      this.colorSecundary = 'dark';
      event.colorSecundary = this.colorSecundary;
    }

  }

  doRefresh(event) {
    if (this.tab_active === 'book') {
      this.BookService.getAll().subscribe(book => {
        this.infos.push(book);
      });
    } else if (this.tab_active === 'coffee') {
      this.CoffeeService.getAllcoffe().subscribe(coffees => {
        this.coffees.push(coffees);
      });
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}

/* export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    returnArr.push(item);
  });

  return returnArr.reverse();
} */

/* async sendNotification(message: string) {
  let toast = await this.toastCtrl.create({
    message: message,
    duration: 3000
  });
  toast.present();

} */