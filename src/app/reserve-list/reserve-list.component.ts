import { Component, OnInit } from '@angular/core';
import { ReserveService ,User, UserService } from '../core';
import {  LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.scss']
})
export class ReserveListComponent implements OnInit {

  constructor(private reserveservices: ReserveService,
    public loadingController: LoadingController,
    private userService: UserService) { }
  list = [];
  reserve: {};
  authenticated = false;
  currentUser: User;
  

  ngOnInit() {
    this.cangetauth();
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.list = [];
    let user = this.currentUser.usuario;
    this.reserveservices.getAllReserves(user).subscribe(reserve => {
      this.list.push(reserve);
    });
  }

  ionViewCanEnter(){
    this.stopLoading();
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

  deletereserve(reserve){
    this.reserveservices.removeReserve(reserve).subscribe(data => {
      console.log("Rserve hecha");
    });

    this.reserveservices.getAllReserves(this.currentUser.usuario).subscribe(reserve => {
      this.list.push(reserve);
    });

  }
}
