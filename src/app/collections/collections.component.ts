import { Component, OnInit } from '@angular/core';
import { CollectionsService, User, UserService  } from '../core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsListComponent implements OnInit {

  constructor( private Collectionsservices: CollectionsService,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private userService: UserService,) { }
  collections = [];
  
  addcollection = false;
  authenticated = false;
  currentUser: User;

  ngOnInit() {
    this.cangetauth();
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.Collectionsservices.getCollectionsUser(this.currentUser.usuario).subscribe(collections =>{
      this.collections = collections.map(e => e);
     
    });
  }
  ionViewWillUnload(){
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

  
  delete(collection){
    let user = this.currentUser.usuario;
    this.Collectionsservices.deletecolection(collection, user).subscribe( collections => {
      console.log(collections);
      this.collections = collections.map(e => e);
    });
  }

  async viewdetails(event){
    if(event['expand']){
      const alert = await this.alertCtrl.create({
        header: event.name,
        subHeader: "Usuario: " + event.usuario,
        message: 'Titulo: ' + event.titulo + '<br><br>: ' + event.numpags,
        buttons: ['OK']
      });
      alert.present();
      event['expand'] = false;
    }else{
      event['expand'] = true;
    }
   
  }


}
