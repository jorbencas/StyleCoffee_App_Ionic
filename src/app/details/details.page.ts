import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* import * as firebase from 'firebase'; */
import { BookService,  User, UserService, FavoriteService} from '../core';

import { AlertController, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { CollectionsListComponent } from '../collections-list/collections-list.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})

export class DetailsPage implements OnInit  {

  books = [];
  isbn = 0;
  authenticated = false;
  currentUser: User;
  colorSecundary = 'default';

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private BookService: BookService,
    private userService: UserService,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
    private FavoriteService: FavoriteService,
    public toastCtrl: ToastController){
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isbn = params['isbn'];
      this.BookService.getBook(this.isbn).subscribe(book =>{
        this.books.push(book);
      });
    });
    this.cangetauth();
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

  reserve(){
    this.router.navigateByUrl("/reserve/"+ this.isbn);
  }

  async removeFavorite() {
    if (this.hasFavorite()) {
      let user = this.currentUser.usuario;
      this.FavoriteService.removeFavorite(this.isbn, user).subscribe(data =>{
        if(data){
           this.sendNotification("El ilbro " + data +  " se ha eliminado con exito");
        }
      });
    }
  };

  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async addFavorite() {
    // create an alert instance
    if (this.hasFavorite()) {
      let user = this.currentUser.usuario;
      this.FavoriteService.addFavorite(this.isbn, user).subscribe(data =>{
        if(data){
           this.sendNotification("El ilbro " + data +  " se ha añadido con exito");
        }
      });
    }
  }

  hasFavorite() {
    let favorite = false;

    this.books.forEach(item => {
      if (item.isbn === this.isbn) {
        favorite = item.favorite === 1  ? false : true;
      }
    });
    return favorite;
  }

  clickEventHandler(event) {
    if (event.color === 'default') {
      this.addFavorite();
      event.color = 'danger';
    } else {
      this.removeFavorite();
      event.color = 'default';
    }
  }

  async listcollections(id) {
    const modal = await this.modalCtrl.create({
      component: CollectionsListComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      
    }
  }

  
  clickEventHandlerSave(event) {
    if (event.colorSecundary === 'default') {
      this.listcollections(event.id);
      this.colorSecundary = 'dark';
      event.colorSecundary = this.colorSecundary;
    } else {
      this.colorSecundary = 'default';
      event.colorSecundary = this.colorSecundary;
    }
  }

  
}
