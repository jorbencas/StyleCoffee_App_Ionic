import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { CoffeeService, User, UserService, BookService, FavoriteService } from '../core';
import { CollectionsListComponent } from '../collections-list/collections-list.component';
import { Errors } from './../core';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  constructor(
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
    private CoffeeService: CoffeeService,
    private BookService: BookService,
    private userService: UserService,
    private FavoriteService: FavoriteService
  ) { }

  errors: Errors = {errors: {}};
  infos = [];
  colorSecundary = 'default';
  search = false;
  queryText = '';
  authenticated = false;
  currentUser: User;
  tab_active = 'book';
  coffees = [];
  contentavaible = false;

  ngOnInit(): void {

    this.presentLoading();

    this.route.params.subscribe(param => {
      let genere = param['genere'];
      let kind = param['kind'];

      if (genere) {
        this.BookService.getBookbyGenere(genere).subscribe(books => {
          books.forEach(element => {
            this.infos.push(element);
          });
        });
      } else if (kind) {
        this.CoffeeService.getByKind(kind).subscribe(coffees => {
          coffees.forEach(element => {
            this.coffees.push(element);
          });
        });
      } else {
        this.BookService.getAll().subscribe(books => {
          books.forEach(element => {
            this.infos.push(element);
          });
        });
        this.CoffeeService.getAllcoffe().subscribe(coffees => {
          coffees.forEach(element => {
            this.coffees.push(element);
          });
        });
      }
    });
  }

  ionViewWillEnter() {
    this.cangetauth();
  }

  cansearch(){
    console.log(this.search);
    if(this.search) this.search = false;
    else this.search = true;
  }

  updateSchedule(){
    console.log(this.queryText);
  }

  doRefresh(event) {
    if (this.tab_active === 'book') {
      this.BookService.getAll().subscribe(book => {
        if (book == this.infos) this.infos.push(book);
      });
    } else if (this.tab_active === 'coffee') {
      this.CoffeeService.getAllcoffe().subscribe(coffees => {
        if (this.coffees == coffees) this.coffees.push(coffees);
      });
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngAfterViewInit() {
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

  setab(tab: string) {
    this.tab_active = tab;
  };

  async removeFavorite(id) {
    if (this.hasFavorite(id)) {
      const alert = await this.alertCtrl.create({
        header: 'Favorite removed',
        buttons: [{
          text: 'OK'
        }]
      });

      let user = this.currentUser.usuario;
      this.FavoriteService.removeFavorite(id, user).subscribe(data =>{
        if(data){
           // now present the alert on top of all other content
          alert.present();
        }
      });
    }
  };

  async addFavorite(id) {
    // create an alert instance
    console.log(id);
    if (this.hasFavorite(id)) {
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK'
        }]
      });

      let user = this.currentUser.usuario;
      this.FavoriteService.addFavorite(id, user).subscribe(data =>{
        if(data){
           // now present the alert on top of all other content
          alert.present();
        }
      });
    }

  }

  hasFavorite(id) {
    let favorite = false;

    this.infos.forEach(item => {
      if (item.isbn === id) {
        if (item.favorite === 1) favorite = false;
        else favorite = true;
      }
    });
    return favorite;
  }

  clickEventHandler(event) {
    if (event.color === 'default') {
      this.addFavorite(event.id);
      event.color = 'danger';
    } else {
      this.removeFavorite(event.id);
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



  /*   loadData(event) {
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.infos.length == 50 || this.coffees.length == 50) {
          event.target.disabled = true;
        }
      }, 500);
    }
  
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    } */

}
