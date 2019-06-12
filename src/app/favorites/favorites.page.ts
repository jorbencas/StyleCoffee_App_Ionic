import { Component, OnInit } from '@angular/core';
import { FavoriteService, User, UserService } from '../core';
import { ToastController } from '@ionic/angular';
import {  LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements OnInit {

  items = [];
  currentUser: User;
  authenticated = false;

  constructor(private FavoriteService: FavoriteService,   
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    private userService: UserService) {}

  ngOnInit() {
    this.cangetauth();
  }

  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  ionViewWillEnter(){
    this.presentLoading();
    this.items = [];
    this.FavoriteService.getAllFavorites().subscribe(favorite => {
     favorite.forEach(element => {
       this.items.push(element);
     });
   });
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
  ionViewCanEnter(){
    this.stopLoading();
  }
  
  async stopLoading() {
    return await this.loadingController.dismiss();
  }

  async removeFavorite(id) {
    if (this.hasFavorite(id)) {
      let user = this.currentUser.usuario;
      this.FavoriteService.removeFavorite(id, user).subscribe(data =>{
        if(data){
           this.items = data.map(e => { return e;});
        }
        this.items = [];
      });
    }
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

  hasFavorite(id) {
    let favorite = false;

    this.items.forEach(item => {
      if (item.isbn === id) {
        if (item.favorite === 1) favorite = false;
        else favorite = true;
      }
    });
    return favorite;
  }

  
}
